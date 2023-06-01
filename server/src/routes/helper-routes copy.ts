/**
 * Implement some basic helper routes
 */
import { FastifyInstance } from "fastify";

async function helperRoutes(fastify: FastifyInstance, options: Object) {

  fastify.get('/', async (request, reply) => {
    return JSON.stringify({
      routes: [
        { title:"Root, show all available routes", 
          verb: "GET", endpoint: "/"},
        { title:"Get info about the API status", 
          verb: "GET", endpoint: "/api/info"},
        { title:"Query some API resource using given method and params", 
          verb: "GET", endpoint: "/api/query/:method", 
          query:"params={...}"},
        { title:"Mutate some API resource using given method and params", 
          verb: "POST", endpoint: "/api/mutation/:method", body:"params={...}"},
      ]
    }, null, 4);
  })
  
  fastify.get('/api/info', async (request, reply) => {
    return { 
      health: 'API v1 running'
    }
  })
}

export default helperRoutes;
