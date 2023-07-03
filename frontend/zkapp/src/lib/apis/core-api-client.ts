import axios, { AxiosResponse } from 'axios';
import type { AnyResponse } from "./responses";
import { ErrorCode } from "./responses";

export { CoreAPIClient };

class CoreAPIClient {
  API = {
    host: "",
    port: 3081, // or maybe 3038
    baseUrl: "",
    apiKey: "",
    authorization: "",
  };

  /**
   * Connect to the host and set all the API options for using them 
   * for future requests made with Axios.
   * @param host 
   * @param port 
   * @param apiKey 
   */
  static async connect(host?: string, port?: number, apiKey ? : string) {
    let t = new CoreAPIClient();
    t.API.host = host || "localhost";
    t.API.port = port || 3081;
    t.API.apiKey = apiKey || "NULL";
    t.API.baseUrl = `http://${host}:${port}/api`;
    if (apiKey) t.authorize(apiKey);
    return t;
  }

  /**
   * Sets the Authorization token needed for GET and POST authorized calls
   * @param jwttoken 
   */
  authorize(jwttoken: string) {
    this.API.authorization = jwttoken;
  }

  /**
   * Get the API server and Db status
   */
  async status(
    params ? : {
      metrics: boolean
    }
  ): Promise < AnyResponse > {
    try {
      const url = `${this.API.baseUrl}/status`;
      const query = params?.metrics ? `?metrics` : "";
      const response: AxiosResponse = await axios.get(url + query);
      return {
        data: response.data,
        error: null
      };
    } catch (err: any) {
      return {
        data: null,
        error: {
          code: ErrorCode.TIMEOUT,
          message: err.toString(),
          source: "Network error or no internet connection"
        }
      };
    }
  }

  /** 
   * Query request 
   * @param params object
   * @returns any | IsError
   */
  async query(
    method: string,
    params: object
  ): Promise < AnyResponse > {
    try {
      const url = `${this.API.baseUrl}/query/${method}`;
      const query = `?params=${JSON.stringify(params)}`;
      const headers = {
        headers: {
          'Authorization': this.API.authorization
        }
      }
      const response: AxiosResponse = await axios.get(url + query, {
        ...headers
      });
      return {
        data: response.data,
        error: null
      };
    } catch (err: any) {
      return {
        data: null,
        error: {
          code: ErrorCode.TIMEOUT,
          message: err.toString(),
          source: "Network error or no internet connection"
        }
      };
    }
  }

  /**
   * Mutate data
   * @param params object
   * @returns any | IsError
   * */
  async mutate(method: string, params: any): Promise < AnyResponse > {
    try {
      const url = `${this.API.baseUrl}/mutation/${method}`;
      const payload = {
        "params": params || {}
      };
      const headers = {
        headers: {
          'Authorization': this.API.authorization
        }
      }
      const response: AxiosResponse = await axios.post(url, payload, {
        ...headers
      });
      return {
        data: response.data,
        error: null
      };
    } catch (err: any) {
      return {
        data: null,
        error: {
          code: ErrorCode.TIMEOUT,
          message: err.toString(),
          source: "Network error or no internet connection"
        }
      };
    }
  }
}