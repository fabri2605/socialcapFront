"use strict";
var _a, _b;
exports.__esModule = true;
var snarkyjs_1 = require("snarkyjs");
var deploy_contract_js_1 = require("./deploy-contract.js");
var deployerAccount, deployerKey, senderAccount, senderKey;
// set instance
var Local = snarkyjs_1.Mina.LocalBlockchain({ proofsEnabled: true });
snarkyjs_1.Mina.setActiveInstance(Local);
// get some testing accounts
(_a = Local.testAccounts[0], deployerKey = _a.privateKey, deployerAccount = _a.publicKey);
(_b = Local.testAccounts[1], senderKey = _b.privateKey, senderAccount = _b.publicKey);
console.log("deployer Addr=", deployerAccount);
console.log("sender Addr=", senderAccount, senderKey);
var zkApp = await (0, deploy_contract_js_1.deployClaimContract)(deployerAccount, deployerKey);
console.log("zkApp=", zkApp);
