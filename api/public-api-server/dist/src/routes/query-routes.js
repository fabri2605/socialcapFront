"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("./errors");
const messages_1 = require("~/i18n/messages");
const query_handlers_1 = __importDefault(require("./query-handlers"));
/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function queryRoutes(fastify, options) {
    fastify.get('/api/query/:method', async (request, reply) => {
        // get the RPC method from the Url path
        const method = request.params.method;
        // extract call "params" from queryString "?params=JSON.stringified(...)"
        const query = request.query;
        let params = {};
        try {
            params = JSON.parse(query.params);
        }
        catch (err) {
            params = {};
        }
        // check if requested 'method' is valid
        const handler = query_handlers_1.default[method];
        if (!handler) {
            return errors_1.Errors.MethodNotSupported(messages_1.i18n.method_not_supported(method));
        }
        // check if we need to be authorized for callling this procedure
        const needsAuthorized = handler['authorize'];
        if (needsAuthorized) {
            fastify.log.info(`Handler ${method} needs authorization`);
        }
        // call the registered 'method' with given 'params'
        try {
            const callFn = handler['fn'];
            return await callFn(params);
        }
        catch (err) {
            reply.code(errors_1.UNKNOWN_ERROR).send(errors_1.Errors.Unknown(messages_1.i18n.unknown_error(method, `params=${JSON.stringify(params)}`)));
        }
    });
}
exports.default = queryRoutes;
