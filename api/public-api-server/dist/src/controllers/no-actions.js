"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noActions = void 0;
const results_1 = require("~/routes/results");
/**
 * Call with no actions, just for testing purposes.
 * @param params Object
 * @returns MutationResult
 */
async function noActions(params) {
    return (0, results_1.formatMutationResult)({});
}
exports.noActions = noActions;
