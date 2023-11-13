import { fetchAccount, UInt64, Mina, PrivateKey, PublicKey, Field, MerkleMap } from "o1js";
import { SOCIALCAP_CONTRACT_ID } from "./addresses";
import { CLAIM_TX_FEE } from "./fees";
import { SocialcapContract, VotingContract, NullifierProxy, UID, DONE } from "@socialcap/contracts";
import { AppStatus } from "@utilities/app-status";
import { getNullifier } from "@apis/queries";
import { submitTask } from "@apis/mutations";

// Svelte stores
import { writable, get } from "svelte/store";

export const berkeleyNetwork$ = writable();
export const deployedSocialcap$ = writable();
export const deployedVoting$ = writable();
export const auroWallet$ = writable({
  connected: false,
  accountExists: false,
  publicKey:"",
  sender: PublicKey.empty()
});

const Berkeley = Mina.Network(
  "https://proxy.berkeley.minaexplorer.com/graphql"
);

export const MINAExplorer = "https://berkeley.minaexplorer.com"

export async function loadSnarky() {
  console.log("loading Snarkyjs and zkApp instance ...");

  Mina.setActiveInstance(Berkeley);

  // create an instance of the Add contract
  await SocialcapContract.compile();
  console.log("contract compiled !");

  // this is the fixed Public key of this zkApp
  const zkappPublicKey = PublicKey.fromBase58(SOCIALCAP_CONTRACT_ID);
  console.log("initZkapp zkappPublickKey=", SOCIALCAP_CONTRACT_ID);

  // init the instance
  const zkappInstance = new SocialcapContract(zkappPublicKey);
  console.log("zkAppInstance=", zkappInstance);

  // get the zkappAccount
  const result = await fetchAccount({ publicKey: zkappPublicKey });
  console.log(`Account exists ? `,   (result?.account !== undefined));
  console.log("zkappInstancePublicKey(s) assertEqual ? ",
    (SOCIALCAP_CONTRACT_ID === result?.account?.publicKey?.toBase58())
  );

  AppStatus.done("We are ready NOW !");
  berkeleyNetwork$.set(true);
  deployedSocialcap$.set(zkappInstance);
 
  return true;
}


export async function loadVotingZkapp(claimAccountId: string) {
  console.log("loading Snarkyjs and zkApp instance ...");

  Mina.setActiveInstance(Berkeley);

  // create an instance of the Add contract
  await VotingContract.compile();
  console.log("contract compiled !");

  // this is the fixed Public key of this zkApp
  const zkappPublicKey = PublicKey.fromBase58(claimAccountId);
  console.log("initZkapp zkappPublickKey=", claimAccountId);

  // init the instance
  const zkappInstance = new VotingContract(zkappPublicKey);
  console.log("zkAppInstance=", zkappInstance);

  // get the zkappAccount
  const result = await fetchAccount({ publicKey: zkappPublicKey });
  console.log(`Account exists ? `,   (result?.account !== undefined));
  console.log("zkappInstancePublicKey(s) assertEqual ? ",
    (claimAccountId === result?.account?.publicKey?.toBase58())
  );

  AppStatus.done("We are ready NOW !");
  berkeleyNetwork$.set(true);
  deployedVoting$.set(zkappInstance);
 
  return true;
}


export async function connectWallet() {
  // check if we have a MINA wallet
  console.log("getWalletAccount");

  const mina = window!.mina;
  if (mina == null) {
    // it ends here !
    return false;
  }
  console.log('getWalletAccount hasWallet=', true);

  Mina.setActiveInstance(Berkeley);

  // if we are here => we already have a MINA wallet
  // now get the current selected account in Auro wallet
  const accounts = await mina.requestAccounts();
  const publicKeyBase58 = accounts[0];
  const publicKey = PublicKey.fromBase58(publicKeyBase58);
  console.log('getWalletAccount using key', publicKey.toBase58(), publicKey);

  // now check if the account exists in the selected net
  console.log('getWalletAccount checking if account exists...');
  const res = await fetchAccount({ publicKey: publicKey });

  const accountExists = res.error == null;
  console.log('getWalletAccount accountExists=', accountExists);

  auroWallet$.set({
    connected: true,
    accountExists: accountExists,
    publicKey: publicKey.toBase58(),
    sender: publicKey
  }) ;

  return true;
}


export async function payForCredentialClaim(fee: number, uid?: string) {
  try {
    const mina = window!.mina;
    if (mina === null) return {
      success: false,
      error: "MINA wallet not available !"
    }

    const publicKey = PublicKey.fromBase58(SOCIALCAP_CONTRACT_ID);
    const zkApp = new SocialcapContract(publicKey);

    // now we make payment
    let sender  = get(auroWallet$).sender;
    const txn = await Mina.transaction(
      { sender: sender, fee: CLAIM_TX_FEE },
      () => {
      zkApp.deposit(UInt64.from(fee*1e9));
    });
    await txn.prove();

    // loged user will pay with Wallet
    const pendingTxn = await mina.sendTransaction({
      transaction: txn.toJSON(),
      feePayer: {
        fee: CLAIM_TX_FEE,
        memo: `Payment for Credential Claim`,
      },
    });

    console.log(
      `Transaction at https://berkeley.minaexplorer.com/transaction/${pendingTxn?.hash}`
      +`\n... waiting for transaction to be included...`
    );

    // if you want to inspect the transaction, you can print it out:
    console.log(txn.toPretty());
    
    return {
      success: true,
      pendingTxn: pendingTxn
    }
  } catch (err: any) {
    // You may want to show the error message in your UI to the user if the transaction fails.
    console.log("payForCredential Error=", err.message);
    return {
      success: false,
      error: err.message
    }
  }
}


export async function payForVoting(task: any, vote: string) {
  try {
    const mina = window!.mina;
    if (mina === null) return {
      success: false,
      error: "MINA wallet not available !"
    }
    let sender  = get(auroWallet$).sender;

    // the VotingContract instance linked to this claim 
    let claim = task.claim;
    const publicKey = PublicKey.fromBase58(claim.accountId);
    const zkApp = new VotingContract(publicKey);

    // wait for account to be available
    const result = await fetchAccount({ publicKey: publicKey });
    console.log(`Account exists ? `, (result?.account !== undefined));
    console.log("zkappInstancePublicKey(s) assertEqual ? ",
      (claim.accountId === result?.account?.publicKey?.toBase58())
    );
 
    // assert we have the right claim and instance
    let cuid = zkApp.claimUid.get().toString();
    if (cuid !== UID.toField(claim.uid).toString())
      throw "Asserting cliam and instance failede ! Not the same claim !"; 
    //console.log(publicKey.toBase58(), cuid, claim.uid, claim.accountId);

    // transform the Vote
    const val: Field = vote === "Y" ? Field(1) : (vote === "N" ? Field(-1) : Field(0));

    // the Nullifier used for avoid double votes
    let nullifier = await getNullifier({
      claimUid: claim.uid,
      senderAccountId: sender.toBase58()
    }) as NullifierProxy;

    // now we send the vote
    const txn = await Mina.transaction(
      { sender: sender, fee: CLAIM_TX_FEE },
      () => {
        zkApp.confirmTaskDone(val, nullifier)
    });
    await txn.prove();

    // loged user will pay with Wallet
    const pendingTxn = await mina.sendTransaction({
      transaction: txn.toJSON(),
      feePayer: {
        fee: CLAIM_TX_FEE,
        memo: `Confirm vote`,
      },
    });

    console.log(
      `Transaction at https://berkeley.minaexplorer.com/transaction/${pendingTxn?.hash}`
      +`\n... waiting for transaction to be included...`
    );

    // if you want to inspect the transaction, you can print it out:
    console.log(txn.toPretty());

    // we need to report the task as completed and update the Nullifier
    // when the transaction is finally included
    await submitTask({
      uid: task.uid,
      claimUid: claim.uid,
      senderAccountId: sender.toBase58(),
      state: DONE,
      txn: pendingTxn
    });
    
    return {
      success: true,
      pendingTxn: pendingTxn
    }
  } catch (err: any) {
    // You may want to show the error message in your UI to the user if the transaction fails.
    console.log("payForVoting Error=", err.message);
    return {
      success: false,
      error: err.message
    }
  }
}

/*
export async function getWalletAccount(): Promise<
  [boolean, PublicKey | null, boolean]
> {
  // check if we have a MINA wallet
  console.log("getWalletAccount");
  const mina = window!.mina;
  if (mina == null) {
    // it ends here !
    return [false, null, false];
  }
  console.log("getWalletAccount hasWallet=", true);

  // if we are here => we already have a MINA wallet
  // now get the current selected account in Auro wallet
  const publicKeyBase58 = (await mina.requestAccounts())[0];
  const publicKey = PublicKey.fromBase58(publicKeyBase58);
  console.log("getWalletAccount using key", publicKey.toBase58(), publicKey);

  // now check if the account exists in the selected net
  console.log("getWalletAccount checking if account exists...");
  const res = await fetchAccount({
    publicKey: publicKey,
  });

  const accountExists = res.error == null;
  console.log("getWalletAccount accountExists=", accountExists);

  return [true, publicKey, accountExists];
}

export async function updateAdd() {
  try {
    const txFee = 0.1; // 100_000_000;

    const zkappPublicKey = PublicKey.fromBase58(BERKELEY_ZKAPP_ADDRESS);

    const zkAppInstance = new Add(zkappPublicKey);

    const tx = await Mina.transaction(() => {
      zkAppInstance.update();
    });

    await tx.prove();

    // loged user will pay with Wallet
    const { hash } = await window!.mina.sendTransaction({
      transaction: tx.toJSON(),
      feePayer: {
        fee: txFee,
        memo: "zk",
      },
    });

    // if you want to inspect the transaction, you can print it out:
    console.log(tx.toPretty());

    console.log("Sent!", hash);
    return hash;
  } catch (err: any) {
    // You may want to show the error message in your UI to the user if the transaction fails.
    console.log("updateAdd Error=", err.message);
  }
}
*/