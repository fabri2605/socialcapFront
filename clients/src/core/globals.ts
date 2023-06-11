import { CoreApiClient } from "./api-client.js";
import { setLogger } from "./responses.js";

export { 
  apiClient
}

const apiClient = new CoreApiClient();

// for clients we use the browser console for logging
setLogger(console); 
