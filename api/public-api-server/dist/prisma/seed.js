"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/// DATA ///
const users = [{
        uid: "ec3c6e254d0b42debd939d9a7bd7cacc",
        email: "leomanzanal@gmail.com",
        fullName: "Manza",
        state: "PENDING",
        accountId: "",
    },
    {
        uid: "ec3c6e254d0b42debd939d9a7bd7dddd",
        email: "mazito.v2@gmail.com",
        fullName: "MA Zito",
        state: "PENDING",
        accountId: "",
    },
];
const merkle_map_data = [
    {
        id: 1,
        name: "persons",
        root: "0",
        size: 0,
        height: 256,
    },
    {
        id: 2,
        name: "communities",
        root: "0",
        size: 0,
        height: 256,
    },
    {
        id: 3,
        name: "members",
        root: "0",
        size: 0,
        height: 256,
    },
    {
        id: 4,
        name: "plans",
        root: "0",
        size: 0,
        height: 256,
    },
    {
        id: 5,
        name: "claims",
        root: "0",
        size: 0,
        height: 256,
    },
    {
        id: 6,
        name: "tasks",
        root: "0",
        size: 0,
        height: 256,
    },
    {
        id: 7,
        name: "credentials",
        root: "0",
        size: 0,
        height: 256,
    },
    {
        id: 8,
        name: "nullifier",
        root: "0",
        size: 0,
        height: 256,
    },
];
const merkle_map_leaf_data = [];
/// MAIN RUN ///
async function main() {
    for (let j = 0; j < users.length; j++) {
        const u = users[j];
        let uu = await prisma.person.upsert({
            where: { email: u.email },
            update: {},
            create: u
        });
        console.log(uu);
    }
    for (let j = 0; j < merkle_map_data.length; j++) {
        const map = merkle_map_data[j];
        const mm = await prisma.merkleMap.upsert({
            where: { id: map.id },
            update: {},
            create: {
                id: map.id,
                name: map.name,
                root: BigInt(map.root),
                height: map.height,
                size: map.size,
            },
        });
        console.log(mm);
    }
    for (let j = 0; j < merkle_map_leaf_data.length; j++) {
        const leaf = merkle_map_leaf_data[j];
        const mml = await prisma.merkleMapLeaf.upsert({
            where: { uid: leaf.uid },
            update: {},
            create: {
                uid: leaf.uid,
                mapId: leaf.merkleMapId,
                index: leaf.index,
                key: leaf.key,
                hash: leaf.hash,
                data: JSON.stringify(leaf.data),
            },
        });
        console.log(mml);
    }
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
