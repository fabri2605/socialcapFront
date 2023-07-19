"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isResult = exports.isError = exports.raiseError = exports.hasError = exports.hasResult = void 0;
const errors_1 = require("./errors");
Object.defineProperty(exports, "hasError", { enumerable: true, get: function () { return errors_1.hasError; } });
Object.defineProperty(exports, "raiseError", { enumerable: true, get: function () { return errors_1.raiseError; } });
function isError(response) {
    return (response.error !== null && response.data === null);
}
exports.isError = isError;
function isResult(response) {
    return (response.error === null && response.data !== null);
}
exports.isResult = isResult;
function hasResult(data) {
    return {
        data: data,
        error: null
    };
}
exports.hasResult = hasResult;
