/**
 * API result and error responses definitions and helpers
 * used to return a correct result or an error response.
 * @created - MAZito - 2023-0
 */
import { logger } from "~/global";
import { hasError, raiseError, UNKNOWN_ERROR } from "./errors.js";

export { 
  ResultOrError,
  hasResult,
  hasError,
  isError,
  isResult
}

interface ResultOrError {
  data: any,
  error: any,
}

function isError(response: ResultOrError) {
  return (response.error !== null && response.data === null);
}

function isResult(response: ResultOrError) {
  return (response.error === null && response.data !== null);
}

function hasResult(data: any): ResultOrError {
  return {
    data: data,
    error: null
  }
}
