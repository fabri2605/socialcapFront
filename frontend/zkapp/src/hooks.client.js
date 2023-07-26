import { getCurrentSession } from '@models/current-session';
import { getCurrentUser } from '@models/current-user';
import { setApiClient } from '$lib/globals';
import { CoreAPIClient } from '@apis/core-api-client';

console.log("hook.client.js");

let isAuthenticated = getCurrentSession();
let user;

if (isAuthenticated) {
  let client = new CoreAPIClient(isAuthenticated);  
  setApiClient(client);
  
  user = await getCurrentUser();
}  
