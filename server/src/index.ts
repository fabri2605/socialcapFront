import Fastify from 'fastify';
import fastifyRoutes from '@fastify/routes';
import helperRoutes from './routes/helper-routes copy';
import queryRoutes from './routes/query-routes';
import mutationRoutes from './routes/mutation-routes';

const fastify = Fastify({
  logger: true
})

// show all routes on server startup (just for debug)
fastify.register(fastifyRoutes);

fastify
  .register(helperRoutes)
  .register(queryRoutes)
  .register(mutationRoutes);

/**
 * Run the server!
 */
fastify.listen({ port: 3080 }, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`);
  console.log(fastify.routes);
})
