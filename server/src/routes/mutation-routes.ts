/**
 * Implement Mutation router
 */
import { FastifyInstance } from "fastify";
import { StatusCode, formatError } from './errors'
import mutationHandlers from '../controllers/mutation-handlers';

/**
 * A plugin that provide encapsulated routes 
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function mutationRoutes(
  fastify: FastifyInstance, 
  options: Object
) {
   fastify.post('/api/query/:mutation', async (request, reply) => {
    // get the RPC method from the Url path
    const method = (request.params as any).method;
    
    // extract call "params" from POST payload
    let params = {}; 
    try { 
      params = (request.body as any);
    }
    catch (err) { 
      params = {}; 
    }
  
    // check if requested 'method' is valid
    const handler = (mutationHandlers as any)[method];
    if (!handler) {
      const msg = `Cannot recognize mutation procedure '${method}'`;
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

export default mutationRoutes;
