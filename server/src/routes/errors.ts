
const StatusCode = {
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
}


function formatError(code: number, message: string) {
  return {
    result: null,
    error: {
      code: code, 
      message: (message || '').toString()
    }
  }
}

export { StatusCode, formatError } ;
