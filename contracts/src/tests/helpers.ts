import { Field } from "snarkyjs";
import { MerkleMapUpdate } from "../CommunitiesContract";

let tstart = 0;

export function startTest(testName: string) {
  console.log("\nBegin testing '"+testName+"' at=", (new Date()).toISOString());
  tstart = (new Date()).getTime();
}

export function assertTest(
  updated: MerkleMapUpdate,
  updatedRoot: Field,
) {
  console.log("MerkleMapUpdate=", JSON.stringify(updated, null, 2));
  console.log("updatedRoot=", updatedRoot.toString());
  console.log("assert updatedRoot eq .afterRoot is ", updatedRoot.equals(updated.afterRoot).toBoolean());
  let tend = (new Date()).getTime();
  console.log("Total time=", (tend - tstart)/1000, "secs")  ;
  console.log("Ended test at=", (new Date()).toISOString())
}
