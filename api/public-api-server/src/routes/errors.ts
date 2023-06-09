import { logger } from "~/global";

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

function formatError(code: number, message: string) {
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

const Errors = { 
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
}

export {
  Errors,
  UNKNOWN_ERROR
};
