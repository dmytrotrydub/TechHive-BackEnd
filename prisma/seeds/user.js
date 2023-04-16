const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
console.log(prisma);

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
];

async function seed() {
  for (user of users) {
    await prisma.user.create({
      data: user,
    });
  }
}

prisma
  .$connect()
  .then(() => seed())
  .catch((err) => console.error(err))
  .finally(async () => {
    await prisma.$disconnect();
  });
