import { hasResult } from "../../core/responses.js";

/**
 * Gets an empty set, just for testing purposes.
 * @param params Object
 * @returns QueryResult
 */
export async function queryEmptySet(params: object) { 
  return hasResult([]);
}

