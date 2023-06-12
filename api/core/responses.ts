/**
 * API result and error responses definitions and helpers
 * used to return a correct result or an error response.
 * @created - MAZito - 2023-0
 */
export { 
  IsError,
  ResultOrError,
  UNKNOWN_ERROR,
  hasResult,
  hasError,
  isError,
  setLogger
}

//import { logger } from "./global.js";
let logger = console;

const
  UNKNOWN_ERROR = 500

  // **What are you talking about?**
  , PARSE_ERROR = 400
  , BAD_REQUEST = 400
  , NOT_FOUND = 404
  , METHOD_NOT_SUPPORTED = 405
  , CONFLICT = 409
  , PRECONDITION_FAILED = 412
  , PAYLOAD_TOO_LARGE = 413

  // **Who are you? Not for you ...**
   , UNAUTHORIZED = 401
  , FORBIDDEN = 403

  // **Uppps ! I have shamely failed ...** 
  , TIMEOUT = 408
  , INTERNAL_SERVER_ERROR = 500
  , BAD_GATEWAY = 503
;

type IsError = {
  code: number, 
  message: string
}

interface ResultOrError {
  result: any | null,
  error: any | null 
}

function hasResult(
  data: any,
): ResultOrError {
  return {
    result: data,
    error: null
  }
}

const isError = (rs: ResultOrError) => (rs.error !== null);

const hasError = { 
  Unknown: (m: string) =>  formatError(UNKNOWN_ERROR, m)
  , Parse: (m: string) =>  formatError(PARSE_ERROR, m)
  , BadRequest: (m: string) =>  formatError(BAD_REQUEST, m)
  , MissingParams: (m: string) =>  formatError(BAD_REQUEST, m)
  , NotFound: (m: string) =>  formatError(NOT_FOUND, m)
  , MethodNotSupported: (m: string) =>  formatError(METHOD_NOT_SUPPORTED, m)
  , Conflict: (m: string) =>  formatError(CONFLICT, m)
  , PreconditionFailed: (m: string) =>  formatError(PRECONDITION_FAILED, m)
  , PayloadTooLarge: (m: string) =>  formatError(PAYLOAD_TOO_LARGE, m)
  , UnauthorizedError : (m: string) =>  formatError(UNAUTHORIZED, m)
  , ForbiddenError : (m: string) =>  formatError(FORBIDDEN, m)
  , Timeout: (m: string) =>  formatError(TIMEOUT, m)
  , InternalServer: (m: string) =>  formatError(INTERNAL_SERVER_ERROR, m)
  , DatabaseEngine: (m: string) =>  formatError(BAD_GATEWAY, m)
  , FromAxios: (e: any) => formatError(e.code, e.message),
}

function setLogger(to: any) {
  logger = to || console;
}

function formatError(
  code: number, 
  message: string
): ResultOrError {
  // All errors are logged to the Fastify.logger
  logger.error(`Error ${code}: ${message}`);
  return {
    result: null,
    error: {
      code: code, 
      message: (message || '').toString()
    }
  }
}
