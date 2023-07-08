
import { error } from '@sveltejs/kit';
import { 
  getMasterPlan
} from "@apis/clients";

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    if (params.uid !== "") {
        let obj = await getMasterPlan(params.uid);
        obj.uid = params.uid;
        return JSON.parse(JSON.stringify(obj));
    }

    throw error(404, 'Not found');
}