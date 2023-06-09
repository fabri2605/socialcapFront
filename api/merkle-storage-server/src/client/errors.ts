/**
 * Error capture to avoid using exceptions to trap errors.
 * 
 */
/*
  Usage:

  ~~~
  import { IsError, hasError, isError } from "./errors";

  function doSomething(): SomeResult | IsError {
    //...
    return hasError.NotFound("...error message ...")
  }

  let res = doSomething();

  if (isError(res)) {
    // ... do something with the error here
  }
  ~~~
*/

export { IsError, hasError, isError };

class IsError {
  code: number;
  message: string;

  constructor(code: number, message: string) {
      this.code = code;
      this.message = message;
      console.log(`IsError code=${code} ${message}`)
  }
}

const isError = (r: any): boolean => (r instanceof IsError);

const hasError = {
  BadRequest: (m: string) => new IsError(BAD_REQUEST,m),
  Unknown: (m: string) => new IsError(UNKNOWN_ERROR,m)
}

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
