
export type { AnyError, AnyResponse };
export { ErrorCode };

type AnyResponse = {
  data: any | null
  error: any | null
}

type AnyError = {
  code: number,
  message: string,
  source: string
}

const ErrorCode = {
  UNKNOWN_ERROR: 500

  // **What are you talking about?**
  , PARSE_ERROR: 400
  , BAD_REQUEST: 400
  , NOT_FOUND: 404
  , METHOD_NOT_SUPPORTED: 405
  , CONFLICT: 409
  , PRECONDITION_FAILED: 412
  , PAYLOAD_TOO_LARGE: 413

  // **Who are you? Not for you ...**
   , UNAUTHORIZED: 401
  , FORBIDDEN: 403

  // **Uppps ! I have shamely failed ...** 
  , TIMEOUT: 408
  , INTERNAL_SERVER_ERROR: 500
  , BAD_GATEWAY: 503

  // Additional Errors
};
