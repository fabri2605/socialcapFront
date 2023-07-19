"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryEmptySet = void 0;
const results_1 = require("~/routes/results");
/**
 * Gets an empty set, just for testing purposes.
 * @param params Object
 * @returns QueryResult
 */
async function queryEmptySet(params) {
    return (0, results_1.formatQueryResult)([]);
}
exports.queryEmptySet = queryEmptySet;
