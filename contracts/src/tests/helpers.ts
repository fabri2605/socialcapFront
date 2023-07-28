import { Field, Mina, PrivateKey, PublicKey, AccountUpdate, fetchAccount } from "snarkyjs";
import { CommunitiesContract, MerkleMapUpdate } from "../CommunitiesContract.js";
import { ElectorsContract } from "../ElectorsContract.js";
import { ClaimingsContract } from "../ClaimingsContract.js";

let tstart = 0;


export function getArgvs(): [string, boolean] {
  let args = process.argv.slice(2);
  const netw = args[0] || "Local";
  const proofsEnabled = (args[1] === "proofsEnabled");
  console.log(`\nUsing network=${netw}, proofsEnabled=${proofsEnabled}`)
  return [netw, proofsEnabled];
}


export function startTest(testName: string) {
  console.log("\nBegin testing '"+testName+"' at=", (new Date()).toISOString());
  tstart = (new Date()).getTime();
}


export function assertTest(
  updated: MerkleMapUpdate,
  updatedRoot: Field,
) {
  console.log("MerkleMapUpdate=", JSON.stringify(updated, null, 2));
  console.log("updatedRoot=", updatedRoot.toString());
  console.log("assert updatedRoot eq .afterRoot is ", updatedRoot.equals(updated.afterRoot).toBoolean());
  let tend = (new Date()).getTime();
  console.log("Total time=", (tend - tstart)/1000, "secs")  ;
  console.log("Ended test at=", (new Date()).toISOString())
}


export async function getAccountsForTesting(
  netw: string, 
  proofsEnabled: boolean
): Promise<{
  deployerAccount: PublicKey,
  deployerKey: PrivateKey,
  senderAccount: PublicKey,
  senderKey: PrivateKey
}> {
  let deployer: any, sender: any

  if (netw === "Local") {
    console.log("\nRun on Mina.LocalBlockchain");
    const Local = Mina.LocalBlockchain({ proofsEnabled });
    Mina.setActiveInstance(Local);
    
    deployer = Local.testAccounts[0];
    sender = Local.testAccounts[1];
  }
  
  if (netw === "Berkeley") {
    console.log("\nRun on Mina.Berkeley");
    const 
      BERKELEY_URL = 'https://proxy.berkeley.minaexplorer.com/graphql',
      ARCHIVE_URL = 'https://archive.berkeley.minaexplorer.com/',
      SENDER_KEY = process.env.DEPLOYER_KEY as string,
      SENDER_ID = process.env.DEPLOYER_ID as string;

    const Berkeley = Mina.Network({
      mina: BERKELEY_URL, 
      archive: ARCHIVE_URL
    });
    Mina.setActiveInstance(Berkeley);

    // we use the same account for Deployer and Sender
    deployer = { 
      publicKey: PublicKey.fromBase58(SENDER_ID), 
      privateKey: PrivateKey.fromBase58(SENDER_KEY)
    };
    sender = deployer;
  }

  console.log("deployer Addr=", deployer.publicKey.toBase58());
  console.log("sender Addr=", sender.publicKey.toBase58());

  return {
    deployerAccount: deployer.publicKey, 
    deployerKey: deployer.privateKey, 
    senderAccount: sender.publicKey, 
    senderKey: sender.privateKey
  }
}


const CONTRACTS: any = {
  "Electors": ElectorsContract,
  "Claimings": ClaimingsContract,
  "Communities": CommunitiesContract
} ;

export async function useContract(
  name: string,
  zkAppAccountId: string,
): Promise<any> {
  console.log(`\nUsing '${name}Contract' ...`)

  let publicKey = PublicKey.fromBase58(zkAppAccountId); 

  let response = await fetchAccount(
    { publicKey: publicKey }
  );
  console.log("zkApp account exists ?", response);
  console.log("zkApp status=", response.account?.zkapp?.appState);
  
  let zkApp = new CONTRACTS[name](publicKey);
  console.log(`zkApp instance for ${name}Contract`);
  // console.log(`zkApp verificationKey=${verificationKey}`);

  return zkApp;
}


export async function deployContract(
  name: string,
  deployerAccount: PublicKey,
  deployerKey: PrivateKey,
): Promise<any> {
  console.log(`\nDeploying '${name}Contract' ...`)

  // we need to generate a new key pair for each deploy !
  const zkAppKey = PrivateKey.random();
  const zkAppAddr = zkAppKey.toPublicKey();
  console.log(`zkApp instance Addr=${zkAppAddr.toBase58()}`);
  console.log(`zkApp instance Key=${zkAppKey.toBase58()}`);

  let zkApp = new CONTRACTS[name](zkAppAddr);
  console.log(`zkApp instance created for ${name}Contract`);
  // console.log(`zkApp verificationKey=${verificationKey}`);

  const DEPLOY_TX_FEE = 300_000_000;

  // deploy it 
  let txn = await Mina.transaction(
    { sender: deployerAccount, fee: DEPLOY_TX_FEE }, 
    () => {
      // IMPORTANT: the deployer account must already be funded 
      // or this will fail miserably ughhh
      AccountUpdate.fundNewAccount(deployerAccount);
      // NOTE: this calls `init()` if this is the first deploy
      zkApp.deploy();
    }
  );
  await txn.prove();

  // this tx needs .sign(), because `deploy()` adds an account update 
  // that requires signature authorization
  await txn.sign([deployerKey, zkAppKey]).send();
  console.log("zkApp instance deployed !")
  
  // wait for account ...
  await fetchAccount({ publicKey: zkAppAddr });
  console.log("zkApp account exists !")

  await loopUntilAccountExists({
    account: zkAppAddr,
    eachTimeNotExist: () => {
      console.log('waiting for zkApp account to be fully available ...');
    },
    isZkAppAccount: true,
  });
  console.log("zkApp is available now !")

  return zkApp;
}


export function checkTransaction(pendingTx: any) {
  // check if Tx was success or failed
  if (!pendingTx.isSuccess) {
    console.log('Error sending transaction (see above)');
    // process.exit(0); // we will NOT exit here, but retry latter !!!
  }
  console.log(
    `See transaction at https://berkeley.minaexplorer.com/transaction/${pendingTx.hash()}
    Waiting for transaction to be included...`
    );
}


async function loopUntilAccountExists({
  account,
  eachTimeNotExist,
  isZkAppAccount,
}: {
  account: PublicKey;
  eachTimeNotExist: () => void;
  isZkAppAccount: boolean;
}) {
  for (;;) {
    let response = await fetchAccount({ publicKey: account });
    let accountExists = response.account !== undefined;
    
    if (isZkAppAccount) {
      // CHANGED: accountExists = response.account?.appState !== undefined;
      accountExists = response.account?.zkapp?.appState !== undefined;
    }
    console.log("account exists ? ", accountExists);

    if (!accountExists) {
      eachTimeNotExist();
      await new Promise((resolve) => setTimeout(resolve, 5000));
    } else {
      // TODO add optional check that verification key is correct once this is available in SnarkyJS
      return response.account!;
    }
  }
}
