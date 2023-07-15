import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
]

const merkle_map_data = [{
  id: 1,
  name: "Maruco_1",
  root: "0",
  size: 0,
  height: 256,
},
{
  name: "Maruco_2",
  root: "0",
  size: 3,
  height: 256,
  id: 2
},
{
  name: "Maruco_3",
  root: "0",
  size: 0,
  height: 256,
  id: 3
}
];

const merkle_map_leaf_data = [{
  uid: "ffdf4a17-a35b-4703-be8e-8b16bdf54e91",
  key: "340112523895721626410879996467678105233",
  hash: "4578195092967266717504634214083983441340587705529266918892238724554861292777",
  data: {
    "uid": "ffdf4a17-a35b-4703-be8e-8b16bdf54e91",
    "full_name": "ALgo Maruco Juan Zamudio",
    "alias": "perejilitos"
  },
  merkleMapId: 2,
  index: 1
},
{
  uid: "ffdf4a17-a35b-4703-be8e-8b16bdf54e92",
  key: "340112523895721626410879996467678105234",
  hash: "26575424586128581280122741449851494995013418775738608032659809016507720628425",
  data: {
    "uid": "ffdf4a17-a35b-4703-be8e-8b16bdf54e92",
    "full_name": "ALgo Maruco Juan Zamudio",
    "alias": "perejilitos"
  },
  merkleMapId: 2,
  index: 2
},
{
  uid: "ffdf4a17-a35b-4703-be8e-8b16bdf54e99",
  key: "340112523895721626410879996467678105241",
  hash: "226178515836470912236669090814881880259920054395371128048298664965505726045",
  data: {
    "uid": "ffdf4a17-a35b-4703-be8e-8b16bdf54e99",
    "full_name": "ALgo Maruco Juan Zamudio",
    "alias": "perejilitos"
  },
  merkleMapId: 2,
  index: 0
}
]


/// MAIN RUN ///

async function main() {
  for (let j=0; j < users.length; j++) {
    const u = users[j];
    let uu = await prisma.person.upsert({
      where: { email: u.email },
      update: {},
      create: u
    });
    console.log(uu);
  }
  
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
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
