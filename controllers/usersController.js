const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getUsersList = async (req, res) => {
  console.log('requested');
  const users = await prisma.User.findMany();
  console.log(users);
};
