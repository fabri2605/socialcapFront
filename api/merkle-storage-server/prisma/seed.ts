/**
 * Some dummy data inserted for using in tests
 */
import { merkle_map_data } from './merkle_map.js';
import { merkle_map_leaf_data } from './merkle_map_leaf.js';

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  for (let j=0; j < merkle_map_data.length; j++) {
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
    })
    console.log(mm)
  }

  for (let j=0; j < merkle_map_leaf_data.length; j++) {
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
    })
    console.log(mml)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
