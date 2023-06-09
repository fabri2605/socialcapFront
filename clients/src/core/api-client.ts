import axios, { AxiosResponse } from 'axios';
import { IsError, hasError } from "./errors.js";

export { CoreApiClient };

class CoreApiClient {
  API = {
    host: "",
    port: 3081,
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
  async connect(host: string, port: number, apiKey?: string) {
    this.API.host = host || "localhost";
    this.API.port = port || 3081;
    this.API.apiKey = apiKey || "NULL";
    this.API.baseUrl = `http://${host}:${port}/api`;
    if (apiKey) setAuthorization(apiKey);
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
  async status(params?: {metrics: boolean}): Promise<any | IsError> {
    try {
      const url = `${this.API.baseUrl}/status`;
      const query = params?.metrics ? `?metrics` : "";
      const response: AxiosResponse = await axios.get(url+query);
      return response.data;
    } catch (error: any) {
      return hasError.Unknown(error.message);
    }
  }

  /** 
   * Query request 
   * @param params object
   * @returns any | IsError
   */
  async query(method: string, params: object): Promise<any | IsError> {
    try {
      const url = `${this.API.baseUrl}/query/${method}`;
      const query = `?params=${JSON.stringify(params)}`;
      const headers = {headers: {
        'Authorization': this.API.authorization
      }}
      const response: AxiosResponse = await axios.get(url+query, {...headers});
      return response.data.result;
    } catch (error: any) {
      return hasError.Unknown(error.message);
    }
  }

  /**
   * Mutate data
   * @param params object
   * @returns any | IsError
   * */
  async mutate(method: string, params: any): Promise<any | IsError> {
    try {
      const url = `${this.API.baseUrl}/mutation/${method}`;
      const payload = {"params": params || {}};
      const headers = {headers: {
        'Authorization': this.API.authorization
      }}
      const response: AxiosResponse = await axios.post(url, payload, {...headers});
      return response.data.result;
    } catch (error: any) {
      return hasError.Unknown(error.message);
    }
  }
}
