/**
 * Implement some basic helper routes
 */
import { fastify, logger, prisma } from '~/global';

async function helperRoutes() {

  fastify.get('/', async (request, reply) => {
    return JSON.stringify({
      routes: [
        { title:"Root, show all available routes", 
          verb: "GET", endpoint: "/"},
        { title:"Get the API status (running, version, ...)", 
          verb: "GET", endpoint: "/api/status"},
        { title:"Query some API resource using given method and params", 
          verb: "GET", endpoint: "/api/query/:method", 
          query:"params={...}"},
        { title:"Mutate some API resource using given method and params", 
          verb: "POST", endpoint: "/api/mutation/:method", body:"params={...}"},
      ]
    }, null, 4);
  })
  
  fastify.get('/api/status', async (request, reply) => {
    return { 
      health: 'running',
      version: '0.1',
      db: {
        engine: 'None',
        connected: true
      }
    }
  })
}

export default helperRoutes;
