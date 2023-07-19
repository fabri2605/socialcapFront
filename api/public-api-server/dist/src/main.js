"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
// import Fastify from 'fastify';
const global_1 = require("./global");
const jwt_1 = __importDefault(require("@fastify/jwt"));
const routes_1 = __importDefault(require("@fastify/routes"));
const cors_1 = __importDefault(require("@fastify/cors"));
const helper_routes_1 = __importDefault(require("./routes/helper-routes"));
const query_routes_1 = __importDefault(require("./routes/query-routes"));
const mutation_routes_1 = __importDefault(require("./routes/mutation-routes"));
// setup JWT plugin
global_1.fastify.register(jwt_1.default, { secret: "MYYYYsupersecret" });
// show all routes on server startup (just for debug)
global_1.fastify.register(routes_1.default);
global_1.fastify.register(helper_routes_1.default).register(query_routes_1.default).register(mutation_routes_1.default);
// register CORS
global_1.fastify.register(cors_1.default, {
    origin: "*",
    methods: ["POST"],
});
/**
 * Run the server!
 */
global_1.fastify.listen({ port: 3080 }, (err, address) => {
    if (err) {
        global_1.logger.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
    console.log(global_1.fastify.routes);
    // we need the Db to be ready before we can do this
    global_1.merkleStorage.startup();
});
