"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.raiseError = exports.UNKNOWN_ERROR = exports.Errors = void 0;
const global_1 = require("~/global");
const UNKNOWN_ERROR = 500
// **What are you talking about?**
, PARSE_ERROR = 400, BAD_REQUEST = 400, NOT_FOUND = 404, METHOD_NOT_SUPPORTED = 405, CONFLICT = 409, PRECONDITION_FAILED = 412, PAYLOAD_TOO_LARGE = 413
// **Who are you? Not for you ...**
, UNAUTHORIZED = 401, FORBIDDEN = 403
// **Uppps ! I have shamely failed ...** 
, TIMEOUT = 408, INTERNAL_SERVER_ERROR = 500, BAD_GATEWAY = 503;
exports.UNKNOWN_ERROR = UNKNOWN_ERROR;
function formatError(code, message) {
    // All errors are logged to the Fastify.logger
    global_1.logger.error(`Error ${code}: ${message}`);
    return {
        result: null,
        error: {
            code: code,
            message: (message || '').toString()
        }
    };
}
const Errors = {
    Unknown: (m) => formatError(UNKNOWN_ERROR, m),
    Parse: (m) => formatError(PARSE_ERROR, m),
    BadRequest: (m) => formatError(BAD_REQUEST, m),
    MissingParams: (m) => formatError(BAD_REQUEST, m),
    NotFound: (m) => formatError(NOT_FOUND, m),
    MethodNotSupported: (m) => formatError(METHOD_NOT_SUPPORTED, m),
    Conflict: (m) => formatError(CONFLICT, m),
    PreconditionFailed: (m) => formatError(PRECONDITION_FAILED, m),
    PayloadTooLarge: (m) => formatError(PAYLOAD_TOO_LARGE, m),
    UnauthorizedError: (m) => formatError(UNAUTHORIZED, m),
    ForbiddenError: (m) => formatError(FORBIDDEN, m),
    Timeout: (m) => formatError(TIMEOUT, m),
    InternalServer: (m) => formatError(INTERNAL_SERVER_ERROR, m),
    DatabaseEngine: (m) => formatError(BAD_GATEWAY, m)
};
exports.Errors = Errors;
const raiseError = (err) => {
    global_1.logger.error(`Raised error ${err}`);
    throw new Error(err);
};
exports.raiseError = raiseError;
