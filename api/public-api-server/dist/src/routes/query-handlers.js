"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const empty_set_1 = require("~/controllers/empty-set");
const queryHandlers = {
    'get_empty_set': { fn: empty_set_1.queryEmptySet, authorize: false }
};
exports.default = queryHandlers;
