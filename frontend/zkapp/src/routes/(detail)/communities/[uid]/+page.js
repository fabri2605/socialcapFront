
import { error } from '@sveltejs/kit';

const obj = {
  uid: "",
  avatar: "",
  accountId: "B62034...567893",
  fullName: "This is Credential Land",
  description: "This is an extraneous and awesome community where you will increase your Social Capital !",
  state: "APPROVED", 
  createdUTC: "2021-01-01",
  updatedUTC: "2023-05-06",
  approvedUTC: "2021-02-06",
  admins: [], // an array or Person UIDs
  validators: [], // an array or Person UIDs
  auditors: [], // an array or Person UIDs
  plans:  [
    { uid: "c1", title: "Best dev in town", description: "Developers skill demonstrated fro ZK Knowledge building..."},
    { uid: "c1", title: "Freindly support", description: "Helped others achieve their goals"}
  ], // an array or ClaimPlan UIDs
  count: 236
}

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    if (params.uid !== "") {
        obj.uid = params.uid;
        return obj;
    }

    throw error(404, 'Not found');
}