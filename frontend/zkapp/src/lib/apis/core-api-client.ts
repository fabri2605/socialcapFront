import axios from 'axios';
import type { AnyResponse } from "./responses";
import { ErrorCode } from "./responses";

export { CoreAPIClient };

class CoreAPIClient {
  API = {
    protocol: "http",
    host: "",
    port: 3080, // or maybe 3038
    baseUrl: "",
    authorization: "",
    apiKey: "",
  };

  constructor(params?: { 
    host: string, 
    port: number, 
    authorization: string,
    protocol?: string
  }) {
    this.API.protocol = params?.protocol || this.API.protocol;
    this.API.host = params?.host || "localhost";
    this.API.port = (params?.port || 3080);
    this.API.baseUrl = `${this.API.protocol}://${this.API.host}:${this.API.port}/api`;
    this.authorize(params?.authorization || "");    
    this.API.baseUrl = `${this.API.protocol}://${this.API.host}:${this.API.port}/api`;
    this.authorize(params?.authorization || "");
  }

  /**
   * Connect to the host and set all the API options for using them
   * for future requests made with Axios.
   * @param host
   * @param port
   * @param apiKey
   */
  static async connect(host?: string, port?: number, apiKey?: string) {
    let t = new CoreAPIClient();
    t.API.host = host || "localhost";
    t.API.port = port || 3080;
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
    this.API.authorization = `Bearer ${jwttoken}`;
  }

  /**
   * Get the API server and Db status
   */
  async status(params?: { metrics: boolean }): Promise<AnyResponse> {
    try {
      const url = `${this.API.baseUrl}/status`;
      const query = params?.metrics ? `?metrics` : "";
      const response = await axios.get(url + query);
      return {
        data: response.data,
        error: null,
      };
    } catch (err: any) {
      return {
        data: null,
        error: {
          code: ErrorCode.TIMEOUT,
          message: err.toString(),
          source: "Network error or no internet connection",
        },
      };
    }
  }

  /**
   * Query request
   * @param params object
   * @returns any | IsError
   */
  async query(method: string, params: object): Promise<AnyResponse> {
    try {
      const url = `${this.API.baseUrl}/query/${method}`;
      const query = `?params=${JSON.stringify(params)}`;
      const headers = {
        headers: {
          Authorization: this.API.authorization,
        },
      };
      const response = await axios.get(url + query, {
        ...headers,
      });
      return {
        data: response.data.data,
        error: null,
      };
    } catch (err: any) {
      return {
        data: null,
        error: {
          code: ErrorCode.TIMEOUT,
          message: err.toString(),
          source: "Network error or no internet connection",
        },
      };
    }
  }

  /**
   * Mutate data
   * @param params object
   * @returns any | IsError
   * */
  async mutate(method: string, params: any): Promise<AnyResponse> {
    try {
      const url = `${this.API.baseUrl}/mutation/${method}`;
      const payload = {
        params: params || {},
      };
      const headers = {
        headers: {
          Authorization: this.API.authorization,
        },
      };
      const response = await axios.post(url, payload, {
        ...headers,
      });
      return {
        data: response.data.data,
        error: null,
      };
    } catch (err: any) {
      if (err.response && err.response.data.error) {
        err.message = err.response.data.error.message;
        err.code = err.response.data.error.code;
      }
      return {
        data: null,
        error: {
          code: err.code || ErrorCode.TIMEOUT,
          message: err.message || err.toString(),
          source: "Network error or no internet connection",
        },
      };
    }
  }
}
