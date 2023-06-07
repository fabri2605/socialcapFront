import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const maz = await prisma.person.upsert({
    where: { email: 'mazito.v2@gmail.com' },
    update: {},
    create: {
      email: 'mazito.v2@gmail.com',
      accountId: "0",
      fullName: 'Mario Z',
      state: 'PENDING'
    },
  })
  console.log({ maz })

  const scap1 = await prisma.community.upsert({
    where: { email: 'mazito.v2@gmail.com' },
    update: {},
    create: {
      accountId: "0",
      fullName: 'Socialcap Team',
      state: 'PENDING'
    },
  })
  console.log({ maz })
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
