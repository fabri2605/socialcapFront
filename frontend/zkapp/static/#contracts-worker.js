//import { isReady, Mina, PublicKey } from 'snarkyjs';

// export { ContractsWorker };

//import type { Add } from '../build/contracts/src/Add';
const CONTRACT_PATH = '/contracts/Add';

const state = {
    Add: null,
    zkapp: null,
    transaction: null,
};

window.ContractsWorker = {
  
    loadSnarkyJS: async (args) => {
        await isReady;
    },

    setActiveInstanceToBerkeley: async (args) => {
        const Berkeley = Mina.Network('https://proxy.berkeley.minaexplorer.com/graphql');
        Mina.setActiveInstance(Berkeley);
    },

    loadContract: async (args) => {
        const { Add } = await import(CONTRACT_PATH);
        state.Add = Add;
    },

    compileContract: async (args) => {
        await state.Add.compile();
    },

    fetchAccount: async (args) => {
        const publicKey = PublicKey.fromBase58(args.publicKey58);
        return await fetchAccount({ publicKey });
    },

    initZkappInstance: async (args) => {
        const publicKey = PublicKey.fromBase58(args.publicKey58);
        state.zkapp = new state.Add(publicKey);
    },

    getNum: async (args) => {
        const currentNum = await state.zkapp.num.get();
        return JSON.stringify(currentNum.toJSON());
    },

    createUpdateTransaction: async (args) => {
        const transaction = await Mina.transaction(() => {
            state.zkapp.update();
        });
        state.transaction = transaction;
    },

    proveUpdateTransaction: async (args) => {
        await state.transaction.prove();
    },

    getTransactionJSON: async (args) => {
        return state.transaction.toJSON();
    },
};
