import { error } from '@sveltejs/kit';
import { API_CONFIG } from "@apis/config";

/** @type {import('./$types').PageLoad} */
export async function load({ params, route, url }) {
    if (params.slug !== "") {
      return {
        sessionKey: params.session,
        otp: "",
        message: "",
        api: API_CONFIG
      } 
    }
    throw error(404, 'Not found');
}
