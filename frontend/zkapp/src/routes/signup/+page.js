import { error } from '@sveltejs/kit';
import { API_CONFIG } from "@apis/config";

/** @type {import('./$types').PageLoad} */
export async function load({ params, route, url }) {
    console.log(API_CONFIG);
    if (true) return {
      message: "",
      api: API_CONFIG
    }
}
