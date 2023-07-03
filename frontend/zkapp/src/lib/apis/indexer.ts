/**
 * A generic client for the Indexer API
 * It allways returns Response with { data, error } where it is easy to test
 * for erro returns
 */
import { env } from "$env/static/private";
import type { AnyResponse } from "./responses";
import { CoreAPIClient } from "./core-api-client";

export { Indexer };

class Indexer {
  static client: CoreAPIClient | null = null;

  static async connect(
    host ? : string, port ? : number, apiKey ? : string): Promise < CoreAPIClient > {
    if (!Indexer.client)
      Indexer.client = await CoreAPIClient.connect(host, port, apiKey);
    return Indexer.client;
  }

  static async query(method: string, params: any): Promise < AnyResponse > {
    let client = await Indexer.connect(
      env.INDEXER_HOST, env.INDEXER_PORT, env.INDEXER_API_KEY
    );
    const rsp = await client.query(method, params);
    return rsp;
  }
}