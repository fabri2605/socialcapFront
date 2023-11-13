import { fetchAccount, Mina, PublicKey } from "o1js";
import { MINABerkeley, auroWallet$ } from "./stores";

export async function connectWallet() {
  // check if we have a MINA wallet
  console.log("getWalletAccount");

  const mina = window!.mina;
  if (mina == null) {
    // it ends here !
    return false;
  }
  console.log('getWalletAccount hasWallet=', true);

  Mina.setActiveInstance(Mina.Network(MINABerkeley));

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
    sender: publicKey,
    api: window.mina
  }) ;

  return true;
}
