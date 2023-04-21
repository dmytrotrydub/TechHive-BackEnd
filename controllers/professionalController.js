const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { generateToken } = require('./jwtController');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');



// Registering new professional