const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create the professional
  const professional = await prisma.professional.create({
    data: {
      id: '1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      avatar: 'https://example.com/avatar.jpg',
      bio: 'I am a professional with a diverse set of skills',
      title: 'Web Developer',
      token: 'ajshdbakjbdLJHBLUYbwlkJWLJ@#',
      skills: {
        create: [
          { name: 'Web Development' },
          { name: 'Mobile App Development' },
          { name: 'Database Design' },
        ],
      },
    },
    include: {
      skills: true,
    },
  });

  console.log(`Created professional with ID ${professional.id}`);
  console.log(`Skills: ${JSON.stringify(professional.skills)}`);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
