"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinaService = void 0;
const snarkyjs_1 = require("snarkyjs");
const TX_FEE = 100000000;
let sender = {
    accountId: snarkyjs_1.PublicKey.fromBase58("B62qpffbtmeU3L2xt2k6X4WPP54uA4fSkkqsV99ZD39Y8nJ8N6eRgUa"),
    key: null
};
class MinaService {
    static async updatePersonsRootOrRaise(provable, map, witness, updatedMerkle) {
        // try {
        //   let tx = await Mina.transaction(
        //     { sender: sender.accountId, fee: TX_FEE }, () => {
        //       // socialcapContract.updatePerson(
        //       //   provable as ProvablePerson,
        //       //   map, 
        //       //   witness,
        //       //   updatedMerkle
        //       // );}
        //     }
        //   );
        //   await tx.prove();
        //   tx.sign([senderKey]);
        //   let pendingTx = await tx.send();
        // }
        // catch (err: any) {
        //   revert();
        // }
    }
    static async updateCommunitiesRootOrRaise(provable, map, witness, updatedMerkle) {
    }
}
exports.MinaService = MinaService;
