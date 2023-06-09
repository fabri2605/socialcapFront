import axios, { AxiosResponse } from 'axios';
import { IsError, hasError } from "./errors.js";

export { API };


let API = {
  host: "",
  port: 3081,
  baseUrl: "",
  apiKey: "",
  connect: connect,
  query: query,
  mutate: mutate
}


/**
 * Connect to the host and set all the API options for using them 
 * for future requests made with Axios.
 * @param host 
 * @param port 
 * @param apiKey 
 */
async function connect(host: string, port: number, apiKey?: string) {
  API.host = host || "localhost";
  API.port = port || 3081;
  API.apiKey = apiKey || "NULL";
  API.baseUrl = `http://${host}:${port}/api`;
}


/** 
 * Query request 
 * @param params object
 * @returns any | IsError
 */
async function query(method: string, params: object): Promise<any | IsError> {
  try {
    const url = `${API.baseUrl}/query/${method}`;
    const query = `?params=${JSON.stringify(params)}`;
    const response: AxiosResponse = await axios.get(url+query);
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
async function mutate(method: string, params: any): Promise<any | IsError> {
  try {
    const url = `${API.baseUrl}/mutation/${method}`;
    const payload = {"params": params || {}};
    const response: AxiosResponse = await axios.post(url, payload);
    return response.data.result;
  } catch (error: any) {
    return hasError.Unknown(error.message);
  }
}
