"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Implement some basic helper routes
 */
const global_1 = require("~/global");
async function helperRoutes() {
    global_1.fastify.get('/', async (request, reply) => {
        return JSON.stringify({
            routes: [
                { title: "Root, show all available routes",
                    verb: "GET", endpoint: "/" },
                { title: "Get the API status (running, version, ...)",
                    verb: "GET", endpoint: "/api/status" },
                { title: "Query some API resource using given method and params",
                    verb: "GET", endpoint: "/api/query/:method",
                    query: "params={...}" },
                { title: "Mutate some API resource using given method and params",
                    verb: "POST", endpoint: "/api/mutation/:method", body: "params={...}" },
            ]
        }, null, 4);
    });
    global_1.fastify.get('/api/status', async (request, reply) => {
        let isConnected = false;
        let version = null;
        let metrics = null;
        const wantMetrics = 'metrics' in request.query;
        try {
            const pg = await global_1.prisma.$queryRaw `SELECT version() as version`;
            metrics = await global_1.prisma.$metrics.json();
            isConnected = !!pg;
            version = pg[0].version;
        }
        catch (err) {
            isConnected = false;
        }
        return {
            health: 'running',
            version: '0.1',
            db: {
                connected: isConnected,
                engine: version || 'NO_ENGINE',
                metrics: (wantMetrics && metrics) ? metrics : 'NO_METRICS'
            }
        };
    });
}
exports.default = helperRoutes;
