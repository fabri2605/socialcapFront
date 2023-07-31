/**
 * Implements the voting process
 * - Create zkApp instance for this Claim
 * - Select validators using master plan
 * - Update NUllifier using electors
 * - Assign tasks to validators and send mails ...
 * - ... wait for votes ...
 */
import { Field, PublicKey, PrivateKey, Mina } from "snarkyjs";
import { UID, VotingInstance, ClaimsVotingFactory } from "@socialcap/contracts";
import { VOTING, CLAIMED } from "@socialcap/contracts";
import { logger } from "../global.js";
import { getValidators, getAuditors } from "../dbs/members-helpers.js";
import { getEntity, updateEntity } from "../dbs/any-entity-helpers.js"
import { setMinaNetwork } from "./mina-service.js";
import { ClaimPlanStrategy, strategyElectorsSelection } from "./voting-strategy.js";
import { assignTaskToElectors } from "./voting-assignments.js";

export {
  startClaimVotingProcess
}


async function startClaimVotingProcess(params: any) {
  try {
    let claim = await getEntity("claim", params.uid);
    if (claim.state !== CLAIMED)
      return;
  
    let plan = await getEntity("plan", claim.planUid);
    let strategy = JSON.parse(plan.strategy);
  
    // MUST be do it before deploying ...
    setMinaNetwork();
    /*
    let deployed: VotingInstance = await ClaimsVotingFactory.deploy(
      UID.toField(params.uid), 
      Field(strategy.minVotes),
      Field(strategy.minPositives),
      PublicKey.fromBase58(process.env.DEPLOYER_ID as string),
      PrivateKey.fromBase58(process.env.DEPLOYER_KEY as string),
    );
  
    // once deployed we need the accountId of this new instance
    params.accountId = deployed.address.toBase58();
    params.state = VOTING; 
    claim = await updateEntity("claim", params.uid, params);
    */
  
    // get validators and auditors set  
    let validators = await getValidators(claim.communityUid);
    let auditors = await getAuditors(claim.communityUid);
  
    // now select the electors using the strategy binded to this plan
    let electors = strategyElectorsSelection(
      validators,
      auditors,
      strategy
    );
  
    // we can now assign the task to each one
    let assignments = await assignTaskToElectors(claim, electors); 
  
    // now prepare the Nullifier to avoid invalid/double voting 
    let nullifier = await getEntity("nullifier", "1"); // only one nullifier
    //nullifier = await  addToNullifier(nullifier, claim, electors) ;
    await updateEntity("nullifier", "1", nullifier);
  }
  catch (err: any) {
    logger.error("Could not startClaimVotingProcess err="+err.toString());
  }
}
