const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const professionals = [];

  for (let i = 0; i < 5; i++) {
    const email = `professional${i + 1}@example.com`;
    const password = 'password123';

    const professional = await prisma.professional.create({
      data: {
        name: `Professional ${i + 1}`,
        email: email,
        password: password,
        skills: {
          connectOrCreate: [
            {
              where: {
                name: 'Laravel',
              },
              create: {
                name: 'Laravel',
              },
            },
            {
              where: {
                name: 'React',
              },
              create: {
                name: 'React',
              },
            },
            {
              where: {
                name: 'Express',
              },
              create: {
                name: 'Express',
              },
            },
            {
              where: {
                name: 'Vue.js',
              },
              create: {
                name: 'Vue.js',
              },
            },
          ],
        },
        avatar: 'https://example.com/avatar.png',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo turpis vel diam euismod, vel mattis risus pulvinar.',
      },
      include: {
        skills: true,
      },
    });

    professionals.push(professional);
  }

  console.log('Created professionals:');
  console.log(professionals);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
