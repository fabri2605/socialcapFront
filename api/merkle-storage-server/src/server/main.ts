// import Fastify from 'fastify';
import { fastify, logger } from "../core/global.js";
import fastifyRoutes from '@fastify/routes';
import { OffchainMerkleStorage } from "../storage/index.js";
import helperRoutes from './routes/helper-routes.js';
import queryRoutes from './routes/query-routes.js';
import mutationRoutes from './routes/mutation-routes.js';

// setup JWT plugin

// show all routes on server startup (just for debug)
fastify.register(fastifyRoutes);

fastify
  .register(helperRoutes)
  .register(queryRoutes)
  .register(mutationRoutes);

await OffchainMerkleStorage.startup();

/**
 * Run the server!
 */
fastify.listen({ port: 3081 }, (err, address) => {
  if (err) {
    logger.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`);
})

