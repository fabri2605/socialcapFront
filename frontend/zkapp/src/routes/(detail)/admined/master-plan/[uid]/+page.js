
import { error } from '@sveltejs/kit';
import { getPlan } from "@apis/queries";

function patchEvidence(evidence) {
  let items = (evidence || []).map((t) => {
    t.id = t.id || (crypto.randomUUID().replaceAll('-',''))
    return t;
  })
  return items;
}

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    if (params.uid !== "") {
        let obj = await getPlan(params.uid);
        obj.evidence = patchEvidence(obj.evidence);
        return JSON.parse(JSON.stringify(obj));
    }

    throw error(404, 'Not found');
}