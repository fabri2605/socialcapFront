"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const routes_1 = __importDefault(require("@fastify/routes"));
const fastify = (0, fastify_1.default)({
    logger: true
});
fastify.register(routes_1.default);
fastify.get('/', async (request, reply) => {
    return {
        endpoints: [
            "GET /api/info",
            "GET /api/query/:method ?params={...}",
            "POST /api/mutation/:method body={params:{...}}"
        ],
        routes: []
    };
});
fastify.get('/info', async (request, reply) => {
    return {
        health: 'running'
    };
});
/**
 * Run the server!
 */
fastify.listen({ port: 3080 }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
    console.log(fastify.routes);
});
