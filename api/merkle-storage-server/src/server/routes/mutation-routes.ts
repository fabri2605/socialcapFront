/**
 * Implement Mutation router
 */
// import { i18n as _ } from "~/i18n/messages";
import { FastifyInstance } from "fastify";
import { logger } from "../../core/global.js"
import { hasError, UNKNOWN_ERROR } from "../../core/responses.js";
import mutationHandlers from './mutation-handlers.js';

/**
 * A plugin that provide encapsulated routes 
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function mutationRoutes(
  fastify: FastifyInstance, 
  options: object
) {
   fastify.post('/api/mutation/:method', async (request, reply) => {
    // get the RPC method from the Url path
    const method = (request.params as any).method;
    
    // extract call "params" from POST payload
    const body = (request.body as any);
    let params = {}; 
    try { 
      params = body.params;
    }
    catch (err) { 
      params = {}; 
    }
  
    // check if requested 'method' is valid
    const handler = (mutationHandlers as any)[method];
    if (!handler)
      return hasError.MethodNotSupported(`Method ${method} not supported`);

    // check if we need to be authorized for callling this procedure
    const needsAuthorized = handler['authorize'];
    if (needsAuthorized) {
      logger.info(`Handler ${method} needs authorization`);
    }

    // call the registered 'method' with given 'params'
    // $TODO: BEGIN Transaction here
    try {
      const callFn = handler['fn'];
      const response = await callFn(params, fastify);
      (response.error) 
        ? reply.code(response.error.code).send(response)
        : reply.send(response)
      // $TODO: COMMIT TRANSACTION or AUTOCOMMIT ? 
    }
    catch (err) {
      // $TODO: ROLLBACK TRANSACTION
      reply
        .code(UNKNOWN_ERROR)
        .send(hasError.Unknown(
          `Unknown error in ${method} params=${JSON.stringify(params)} error=${err}`
        ));
    }
  })
}

export default mutationRoutes;
