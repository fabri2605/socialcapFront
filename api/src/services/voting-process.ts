/**
 * Implements the voting process
 * - Create zkApp instance for this Claim
 * - Select validators using master plan
 * - Update NUllifier using electors
 * - Assign tasks to validators and send mails ...
 * - ... wait for votes ...
 */
import { Field, PublicKey, PrivateKey } from "snarkyjs";
import { UID, VotingInstance, ClaimsVotingFactory } from "@socialcap/contracts";
import { VOTING, CLAIMED } from "@socialcap/contracts";
import { getValidators, getAuditors } from "../dbs/members-helpers.js";
import { getEntity, updateEntity } from "../dbs/any-entity-helpers.js"
import { strategyElectorsSelection } from "./voting-strategy.js";

export {
  startClaimVotingProcess
}


async function startClaimVotingProcess(params: any) {

  let claim = await getEntity("claim", params.uid);
  if (claim.state !== CLAIMED)
    return;

  let plan = await getEntity("plan", claim.planUid);

  let deployed: VotingInstance = await ClaimsVotingFactory.deploy(
    UID.toField(params.uid), 
    Field(plan.requiredVotes),
    Field(plan.requiredPositives),
    PublicKey.fromBase58(process.env.DEPLOYER_ID as string),
    PrivateKey.fromBase58(process.env.DEPLOYER_ID as string),
  );

  // once deployed we need ths accountId of this new instance
  params.accountId = deployed.address.toBase58();
  params.state = VOTING; 
  
  let electors = await selectElectors(claim, plan);
  
  /*
  let assignments = await assignTaskToElectors(claim, electors); 
  
  let nullifier = await getEntity("nullifier", "1"); // only one nullifier
  nullifier = await  addToNullifier(nullifier, claim, electors) ;

  await updateEntity("nullifier", "1", nullifier);
  */
}


async function selectElectors(claim: any, plan: any) {
  let validators = await getValidators(claim.communityUid);

  let auditors = await getAuditors(claim.communityUid);

  let selected = strategyElectorsSelection(
    validators,
    auditors,
    plan
  )

  return selected;
}
