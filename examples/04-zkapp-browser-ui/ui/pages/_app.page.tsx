import '../styles/globals.css';
import {
  useEffect,
  useState
} from 'react';
import './reactCOIServiceWorker';

import ZkappWorkerClient from './zkappWorkerClient';

import {
  PublicKey,
  Field
} from 'snarkyjs';

let transactionFee = 0.1;

export default function App() {
  let [state, setState] = useState({
    zkappWorkerClient: null as null | ZkappWorkerClient,
    hasWallet: null as null | boolean,
    hasBeenSetup: false,
    accountExists: false,
    currentNum: null as null | Field,
    publicKey: null as null | PublicKey,
    zkappPublicKey: null as null | PublicKey,
    creatingTransaction: false,
  });

  // -------------------------------------------------------
  // Do Setup

  async function getWorkerClient(): Promise <ZkappWorkerClient> {
    // this is a worker client so we can interact with the zkappWorker
    // which really implements the contract methods defined in ./contracts
    console.log('getWorkerClient');
    const workerClient = new ZkappWorkerClient();

    // load Snarkyjs
    console.log('getWorkerClient Loading SnarkyJS...');
    await workerClient.loadSnarkyJS();

    // we will be using Berkeley 
    await workerClient.setActiveInstanceToBerkeley();
    console.log('getWorkerClient use Berkeley');
    console.log('getWorkerClient done');

    // load and compile the contract
    console.log('getWorkerClient loading zkApp contract');
    await workerClient.loadContract();
    console.log('getWorkerClient compiling zkApp contract');
    await workerClient.compileContract();
    console.log('getWorkerClient zkApp compiled');

    return workerClient
  }


  async function initZkapp(
    zkappWorkerClient: ZkappWorkerClient
  ): Promise<PublicKey> {
    // this is the fixed Public key of this zkApp
    console.log('initZkapp');
    const zkappPublicKeyBase58 = 'B62qohp4zipB5jHp2r8tZyCX1j65H37aQjn4vh9uyHskn3jfnSxbeRu';
    const zkappPublicKey = PublicKey.fromBase58(zkappPublicKeyBase58);
    console.log('initZkapp zkappPublickKey=', zkappPublicKeyBase58);

    // init the instance
    await zkappWorkerClient.initZkappInstance(zkappPublicKey);

    // get the zkappAccount   
    console.log('initZkapp fetch zkApp account ...');
    const result = await zkappWorkerClient.fetchAccount({
      publicKey: zkappPublicKey
    });
    console.log(`initZkapp fetchAccount(${zkappPublicKeyBase58}) result=`, result);
    console.log('initZkapp done'); 

    return zkappPublicKey;
  }


  async function getWalletAccount(
    zkappWorkerClient: ZkappWorkerClient
  ): Promise <[boolean, PublicKey, boolean]> {
    // check if we have a MINA wallet
    console.log("getWalletAccount");
    const mina = (window as any).mina;
    if (mina == null) {
      // no MINA wallet! install it
      setState({
        ...state,
        hasWallet: false
      });
      // it ends here !
      return [false, null, false];
    }
    console.log('getWalletAccount hasWallet=', true);

    // if we are here => we already have a MINA wallet
    // now get the current selected account in Auro wallet
    console.log('getWalletAccount mina.requestAccounts');
    const publicKeyBase58: string = (await mina.requestAccounts())[0];
    const publicKey = PublicKey.fromBase58(publicKeyBase58);
    console.log('getWalletAccount publicKeyBase58', publicKeyBase58);
    console.log('getWalletAccount using key', publicKey.toBase58());

    // now check if the account exists in the selected net
    console.log('getWalletAccount checking if account exists...');
    const res = await zkappWorkerClient.fetchAccount({
      publicKey: publicKey!,
    });

    const accountExists = res.error == null;
    console.log('getWalletAccount accountExists=', accountExists);

    return [true, publicKey, accountExists];
  }


  useEffect(() => {
    (async () => {
      if (!state.hasBeenSetup) {

        // this is the worker client so we can interact with the zkappWorker
        // which really implements the contract methods defined in ./contracts
        const zkappWorkerClient = await getWorkerClient();
        
        // now init the zkApp instance
        const zkappPublicKey = await initZkapp(
          zkappWorkerClient
        );

        // now check that we have a wallet and and account
        const [hasWallet, signerPublicKey, accountExists] = await getWalletAccount(
          zkappWorkerClient
        );
        if (!hasWallet) return; // no wallet => we end it here !

        // query the zkappAccount state
        console.log('getting zkApp state...');
        const currentNum = await zkappWorkerClient.getNum();
        console.log('current state:', currentNum.toString());

        // not MINA related, this is just setting the React state
        setState({
          ...state,
          zkappWorkerClient,
          hasWallet: true,
          hasBeenSetup: true,
          publicKey: signerPublicKey,
          zkappPublicKey,
          accountExists,
          currentNum,
        });
      }
    })();
  }, []);

  // -------------------------------------------------------
  // Wait for account to exist, if it didn't

  useEffect(() => {
    (async () => {
      if (state.hasBeenSetup && !state.accountExists) {
        for (;;) {
          console.log('checking if account exists...');
          const res = await state.zkappWorkerClient!.fetchAccount({
            publicKey: state.publicKey!,
          });
          const accountExists = res.error == null;
          if (accountExists) {
            break;
          }
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
        setState({
          ...state,
          accountExists: true
        });
      }
    })();
  }, [state.hasBeenSetup]);

  // -------------------------------------------------------
  // Send a transaction

  const onSendTransaction = async () => {
    setState({
      ...state,
      creatingTransaction: true
    });
    console.log('sending a transaction...');

    await state.zkappWorkerClient!.fetchAccount({
      publicKey: state.publicKey!,
    });

    await state.zkappWorkerClient!.createUpdateTransaction();

    console.log('creating proof...');
    await state.zkappWorkerClient!.proveUpdateTransaction();

    console.log('getting Transaction JSON...');
    const transactionJSON = await state.zkappWorkerClient!.getTransactionJSON();

    console.log('requesting send transaction...');
    const {
      hash
    } = await (window as any).mina.sendTransaction({
      transaction: transactionJSON,
      feePayer: {
        fee: transactionFee,
        memo: '',
      },
    });

    console.log(
      'See transaction at https://berkeley.minaexplorer.com/transaction/' + hash
    );

    setState({
      ...state,
      creatingTransaction: false
    });
  };

  // -------------------------------------------------------
  // Refresh the current state

  const onRefreshCurrentNum = async () => {
    console.log('getting zkApp state...');
    await state.zkappWorkerClient!.fetchAccount({
      publicKey: state.zkappPublicKey!,
    });
    const currentNum = await state.zkappWorkerClient!.getNum();
    console.log('current state:', currentNum.toString());

    setState({
      ...state,
      currentNum
    });
  };

  // -------------------------------------------------------
  // Create UI elements

  let hasWallet;
  if (state.hasWallet != null && !state.hasWallet) {
    const auroLink = 'https://www.aurowallet.com/';
    const auroLinkElem = ( <
      a href = {
        auroLink
      }
      target = "_blank"
      rel = "noreferrer" > {
        ' '
      }
      [Link] {
        ' '
      } <
      /a>
    );
    hasWallet = ( <
      div > {
        ' '
      }
      Could not find a wallet.Install Auro wallet here: {
        auroLinkElem
      } <
      /div>
    );
  }

  let setupText = state.hasBeenSetup ?
    'SnarkyJS Ready' :
    'Setting up SnarkyJS...';
  let setup = ( <
    div > {
      ' '
    } {
      setupText
    } {
      hasWallet
    } <
    /div>
  );

  let accountDoesNotExist;
  if (state.hasBeenSetup && !state.accountExists) {
    const faucetLink =
      'https://faucet.minaprotocol.com/?address=' + state.publicKey!.toBase58();
    accountDoesNotExist = ( <
      div >
      Account does not exist.Please visit the faucet to fund this account <
      a href = {
        faucetLink
      }
      target = "_blank"
      rel = "noreferrer" > {
        ' '
      }
      [Link] {
        ' '
      } <
      /a> < /
      div >
    );
  }

  let mainContent;
  if (state.hasBeenSetup && state.accountExists) {
    mainContent = ( <
      div >
      <
      button onClick = {
        onSendTransaction
      }
      disabled = {
        state.creatingTransaction
      } > {
        ' '
      }
      Send Transaction {
        ' '
      } <
      /button> <
      div > Current Number in zkApp: {
        state.currentNum!.toString()
      } < /div> <
      button onClick = {
        onRefreshCurrentNum
      } > Get Latest State < /button> < /
      div >
    );
  }

  return ( <
    div > {
      setup
    } {
      accountDoesNotExist
    } {
      mainContent
    } <
    /div>
  );
}