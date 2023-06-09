/**
 * Implement Query router
 */
// import { i18n as _ } from "~/i18n/messages";
import { FastifyInstance } from "fastify";
import { logger } from "../../core/global.js"
import { hasError, UNKNOWN_ERROR } from "../../core/responses.js";
import queryHandlers from "./query-handlers.js";

/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function queryRoutes(
  fastify: FastifyInstance, 
  options: object
) {
   fastify.get('/api/query/:method', async (request, reply) => {
    // get the RPC method from the Url path
    const method = (request.params as any).method;
    
    // extract call "params" from queryString "?params=JSON.stringified(...)"
    const query = (request.query as any);
    let params = {}; 
    try { 
      params = JSON.parse(query.params); }
    catch (err) { 
      params = {}; 
    }
  
    // check if requested 'method' is valid
    const handler = (queryHandlers as any)[method];
    if (!handler)
      return hasError.MethodNotSupported(`Method ${method} not supported`);

    // check if we need to be authorized for callling this procedure
    const needsAuthorized = handler['authorize'];
    if (needsAuthorized) {
      logger.info(`Handler ${method} needs authorization`)
    }

    // call the registered 'method' with given 'params'
    try {
      const callFn = handler['fn'];
      return await callFn(params);
    }
    catch (err) {
      reply
        .code(UNKNOWN_ERROR)
        .send(hasError.Unknown(
          `Unknown error in ${method} params=${JSON.stringify(params)} error=${err}`
        ));
    }
  })
}

export default queryRoutes;
