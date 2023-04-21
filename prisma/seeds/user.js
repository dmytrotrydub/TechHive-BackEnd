const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com', password: '123', token: 'tasdhv234jbhsbd' },
  { id: 2, name: 'Bob', email: 'bob@example.com', password: 'sjdhasbda', token: 'asjhdkas4mahdb' },
  {
    id: 3,
    name: 'Charlie',
    email: 'charlie@example.com',
    password: 'as,cna;ld',
    token: 'asdhabs887312asdjh',
  },
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
