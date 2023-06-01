/**
 * Implement Query router
 */
import { FastifyInstance } from "fastify";
import { StatusCode, formatError } from './errors'
import queryHandlers from "../controllers/query-handlers";

/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function queryRoutes(
  fastify: FastifyInstance, 
  options: Object
) {
   fastify.get('/api/query/:method', async (request, reply) => {
    // get the RPC method from the Url path
    const method = (request.params as any).method;
    
    // extract call "params" from queryString "?params=JSON.stringified(...)"
    const query = (request.query as any);
    let params = {}; 
    try { 
      params = JSON.parse(query.params || '{}'); }
    catch (err) { 
      params = {}; 
    }
  
    // check if requested 'method' is valid
    const handler = (queryHandlers as any)[method];
    if (!handler) {
      const msg = `Cannot recognize query procedure '${method}'`;
      fastify.log.error(msg);
      return formatError(StatusCode.METHOD_NOT_SUPPORTED, msg);
    }

    // check if we need to be authorized for callling this procedure
    const needsAuthorized = handler['authorize'];
    if (needsAuthorized) {
      fastify.log.info(`Handler ${method} needs authorization`)
    }

    // call the registered 'method' with given 'params'
    try {
      const callFn = handler['fn'];
      return await callFn(params);
    }
    catch (err) {
      const msg = `Unknown error in ${method} params=${JSON.stringify(params)}`;
      fastify.log.error(msg);
      return formatError(StatusCode.UNKNOWN_ERROR, msg);
    }
  })
}

export default queryRoutes;
