"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMutationResult = exports.formatQueryResult = void 0;
;
;
function formatQueryResult(data, total, start, limit) {
    const count = (data || []).length;
    return {
        data: {
            start: start || 0,
            limit: limit || 1000,
            total: total || count,
            count: count,
            data: data || []
        },
        error: null
    };
}
exports.formatQueryResult = formatQueryResult;
function formatMutationResult(data) {
    const count = (data || []).length;
    return {
        data: data || {},
        error: null
    };
}
exports.formatMutationResult = formatMutationResult;
