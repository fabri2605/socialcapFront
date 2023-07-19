"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.merkleStorage = exports.prisma = exports.logger = exports.fastify = void 0;
/**
 * This defines some Singleton instances used everywhere.
 * @MAZito - 2023-05-24 - initial
 */
const fastify_1 = __importDefault(require("fastify"));
const client_1 = require("@prisma/client");
const offchain_merkle_storage_1 = require("./dbs/merkle/offchain-merkle-storage");
const fastify = (0, fastify_1.default)({
    logger: true
});
exports.fastify = fastify;
const prisma = new client_1.PrismaClient({
// log: ['query', 'info', 'warn', 'error'],
});
exports.prisma = prisma;
const logger = fastify.log;
exports.logger = logger;
const merkleStorage = offchain_merkle_storage_1.OffchainMerkleStorage;
exports.merkleStorage = merkleStorage;
