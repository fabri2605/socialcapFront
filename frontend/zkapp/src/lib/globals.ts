import type { CoreAPIClient } from "@apis/core-api-client";
import { writable } from "svelte/store";

export { 
  apiClient,
  setApiClient,
  actionStatus 
};

// the global API client, established at startup
let apiClient: CoreAPIClient; 

function setApiClient(client: CoreAPIClient) {
  apiClient = client;
}

let actionStatus = writable({
  message: "",
  code: ""
})

actionStatus.set({
  code: "0",
  message: "Ok"
})
