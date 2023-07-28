import { SmartContract, state, State, method } from "snarkyjs";
import { Field, UInt64, AccountUpdate, PrivateKey, PublicKey } from "snarkyjs";

/**
 * This manages the Socialcapp account used to receive deposits and transfer
 * shares to communities and rewards to validators
 */
export class SocialcapContract extends SmartContract {
  // total received from deposits
  @state(Field) totalDeposits = State<Field>();

  // total payed to communities
  @state(Field) totalSharesPayed = State<Field>();

  // total paid to validators
  @state(Field) totalRewardsPayed = State<Field>();

  // this is the Account owner, only the owner can make payments
  @state(PublicKey) owner = State<PublicKey>();

  init() {
    // ensure that init() cannot be called again after the zkApp is set up
    // during the initial deployment.
    this.account.provedState.assertEquals(this.account.provedState.get());
    this.account.provedState.get().assertFalse();
    // now we do init
    super.init();
    this.totalDeposits.set(Field(0));
    this.totalSharesPayed.set(Field(0));
    this.totalRewardsPayed.set(Field(0));
    // set the owner, using the account who deployed 
    this.owner.set(this.sender);
  }

  @method onlyOwner(sender: PublicKey) {
    let owner = this.owner.getAndAssertEquals();
    owner.assertEquals(sender);
  }  

  @method changeOwnership(newOwner: PublicKey) {
    // only the owner can transfer ownership of this account
    this.onlyOwner(this.sender);

    // assert and change to newOwner
    let currentOwner = this.owner.get();
    this.owner.assertEquals(currentOwner);
    this.owner.set(newOwner);
  }  

  @method deposit(amount: UInt64) {
    // anyone can deposit ...
    let senderUpdate = AccountUpdate.create(this.sender);
    senderUpdate.requireSignature();
    senderUpdate.send({ to: this, amount });
    // 
    let total = this.totalDeposits.getAndAssertEquals();
    total = total.add(Field(amount.toBigInt()));
    this.totalDeposits.set(total);
  }

  @method transferShares(receiver: PublicKey, amount: UInt64) {
    // only owner can transfer !!!
    this.onlyOwner(this.sender);

    // do transfer
    let senderUpdate = AccountUpdate.create(this.sender);
    senderUpdate.requireSignature();
    senderUpdate.send({ to: receiver, amount });

    // update acumulators
    let total = this.totalSharesPayed.getAndAssertEquals();
    total = total.add(Field(amount.toBigInt()));
    this.totalSharesPayed.set(total);
  }

  @method transferRewards(to: PublicKey, amount: UInt64) {
    // only owner can transfer !!!
    this.onlyOwner(this.sender);

    let senderUpdate = AccountUpdate.create(this.sender);
    senderUpdate.requireSignature();
    senderUpdate.send({ to: this, amount });
    // 
    let total = this.totalRewardsPayed.getAndAssertEquals();
    total = total.add(Field(amount.toBigInt()));
    this.totalRewardsPayed.set(total);
  }
}
