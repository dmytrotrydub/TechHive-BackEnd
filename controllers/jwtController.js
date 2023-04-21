const { sign, verify } = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv');

exports.generateToken = (user) => {
  const payload = { userPassword: user.password };
  const token = sign(payload, process.env.SECRET);
  return token;
};
