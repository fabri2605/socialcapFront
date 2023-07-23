/**
 * This defines some Singleton instances used everywhere.
 * @MAZito - 2023-05-24 - initial
 */
import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import { OffchainMerkleStorage } from "./dbs/index.js";
import { Pool } from 'node-postgres';

const fastify = Fastify({
  logger: true
})

const prisma = new PrismaClient({
  // log: ['query', 'info', 'warn', 'error'],
});

const logger = fastify.log;

const merkleStorage = OffchainMerkleStorage ;

const pgPool = new Pool({
  // connectionString: "postgresql://postgres:vilka1212@localhost:5432/socialcapdev?schema=public",
  // port: 5432
  user: 'postgres',
  host: 'localhost',
  database: 'socialcapdev',
  password: 'vilka1212',
  port: 5432,
})

export {
  fastify, 
  logger, 
  prisma,
  pgPool,
  merkleStorage
}
