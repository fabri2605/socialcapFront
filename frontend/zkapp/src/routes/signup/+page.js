import { error } from '@sveltejs/kit';
import { API_CONFIG } from "@apis/config";

/** @type {import('./$types').PageLoad} */
export async function load({ params, route, url }) {
    if (true) return API_CONFIG;
}
