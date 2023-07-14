import { Mina, PrivateKey, PublicKey, Field } from 'snarkyjs';
import { randomInt } from 'crypto';
import { ClaimInstance, ClaimsFactory } from "./claims-factory.js";
import { rollupClaims } from "./claims-roller.js";

let 
  deployerAccount: PublicKey,
  deployerKey: PrivateKey,
  senderAccount: PublicKey,
  senderKey: PrivateKey;

// set instance
const Local = Mina.LocalBlockchain({ proofsEnabled: true });
Mina.setActiveInstance(Local);

// get some accounts
({ privateKey: deployerKey, publicKey: deployerAccount } = Local.testAccounts[0]);
({ privateKey: senderKey, publicKey: senderAccount } = Local.testAccounts[1]);
console.log("deployer Addr=", deployerAccount);
console.log("sender Addr=", senderAccount);

// first compile it
await ClaimsFactory.compile();

// now deploy  ONE
let zkapp1 = await ClaimsFactory.deploy(
  Field(randomInt(1000)), Field(5), Field(3), 
  deployerAccount, deployerKey
);

// now deploy TWO
let zkapp2 = await ClaimsFactory.deploy(
  Field(randomInt(1000)), Field(15), Field(9), 
  deployerAccount, deployerKey
);

// now deploy THREE
let zkapp3 = await ClaimsFactory.deploy(
  Field(randomInt(1000)), Field(100), Field(51), 
  deployerAccount, deployerKey
);

// run the rollups forever ...
// activate every minute
let isRolling = false;
setInterval(async () => {
  if (!isRolling) {
    isRolling = true;
    await rollupClaims(
      [zkapp1, zkapp2, zkapp3],
      // we should think about who will be the payer here, maybe a special 
      // Socialcap account for this funded on demand ?
      senderAccount, senderKey 
    )
    isRolling = false;
  }
}, (60*1000*1));  

