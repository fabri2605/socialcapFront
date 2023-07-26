import { PrivateKey, PublicKey, Mina, Field, AccountUpdate, fetchAccount } from "snarkyjs";
import { VotingContract } from "./VotingContract.js";

export { ClaimsVotingFactory, VotingInstance };

let proofsEnabled = true;

const ClaimsVotingFactory = {
  compile: compileVotingContract, 
  deploy: deployVotingContract,
  getInstance: getVotingInstance
}

type VotingInstance = {
  instance: any,
  address: PublicKey,
  secret?: PrivateKey
}


async function compileVotingContract(proofsEnabled?: boolean) {
  // compile Contract
  proofsEnabled = proofsEnabled === undefined ? true : proofsEnabled;
  console.log("proofs enabled=", proofsEnabled);
  console.log("compiling Contract ...");
  if (proofsEnabled) await VotingContract.compile();
  console.log("compiled !");
}


async function deployVotingContract(
  claimUid: Field,
  requiredVotes: Field,
  requiredPositives: Field,
  deployerAccount: PublicKey,
  deployerKey: PrivateKey,
): Promise<VotingInstance> {
  // we need to generate a new key pair for each deploy !
  const zkAppKey = PrivateKey.random();
  const zkAppAddr = zkAppKey.toPublicKey();
  console.log(`\nzkApp instance address=${zkAppAddr.toBase58()}`);

  let zkApp = new VotingContract(zkAppAddr);
  console.log("zkApp instance created!");
  
  // deploy it 
  let txn = await Mina.transaction(deployerAccount, () => {
    // IMPORTANT: the deployer account must already be funded 
    // or this will fail miserably ughhh
    AccountUpdate.fundNewAccount(deployerAccount);
    zkApp.deploy();
  });
  await txn.prove();

  // this tx needs .sign(), because `deploy()` adds an account update 
  // that requires signature authorization
  await txn.sign([deployerKey, zkAppKey]).send();
  console.log("zkApp instance deployed !")
  
  // wait for account ...
  await fetchAccount({ publicKey: zkAppAddr });

  // initialize it !
  // we can only call setup() AFTER we are sure the deployed account exists
  // otherwise we have failures when initializing ...
  txn = await Mina.transaction(deployerAccount, () => {
    zkApp.setup(claimUid, requiredVotes, requiredPositives);
  });
  await txn.prove();
  await txn.sign([deployerKey]).send();
  console.log("zkApp instance initialized !")

  // get some value after deploy
  let actionsState = zkApp.actionsState.get(); 
  console.log("zkApp instance actionsState=", actionsState.toString())

  const instance: VotingInstance = {
    instance: zkApp, 
    address: zkAppAddr, 
    secret: zkAppKey 
  };

  logIt(instance);
  return instance;
}


async function getVotingInstance(
  address: PublicKey
): Promise<VotingInstance> {
  // we need to create an instance of an already deployed contract
  console.log(`\nzkApp instance address=${address.toBase58()}`);

  let zkApp = new VotingContract(address);
  console.log("zkApp instance created!");
  
  // get some value after creating just for checking
  let actionsState = zkApp.actionsState.get(); 
  console.log("zkApp instance actionsState=", actionsState.toString())

  const instance: VotingInstance = {
    instance: zkApp, 
    address: address
  };

  logIt(instance);
  return instance;
}


function logIt(zkapp: any) {
  console.log(
    `instance= ${JSON.stringify(zkapp.instance.account, null, 2)}`
    +`\naddress= ${zkapp.address.toBase58()}`
    +`\nsecret= ${zkapp?.secret?.toBase58() || ''}`  
  );
}
