const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { generateToken } = require('./jwtController');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

// GET request to retrieve list of active Clients
exports.getClientsList = async (req, res) => {
  console.log('requested');
  const users = await prisma.User.findMany();
  res.status(200).send(users);
};

// GET single client
exports.getSIngleClient = async (req, res) => {
  const singleClient = await prisma.User.findUnique({
    where: {
      id: req.body.user,
    },
  });
  res.status(200).json({ data: singleClient });
};

// Client registration

exports.registerNewClient = async (req, res) => {
  // Checking if client with requested credentials exists
  const clientCheck = await prisma.User.findMany({
    where: {
      OR: [{ name: req.body.name }, { email: req.body.email }],
    },
  });

  if (clientCheck.length > 0) {
    return res.status(409).json({ message: 'User with this credentials already exists' });
  }

  // If first condition passed, hashing password and saving into a database

  // Password hash
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Generate token for new client

  const token = generateToken({ password: hashedPassword });
  // Create user object

  const newClient = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    token: token,
  };
  console.log(newClient);

  // DB request for creating user
  try {
    const createdUser = await prisma.User.create({ data: newClient });

    res.status(201).json({ message: 'User created successfully', user: createdUser });
  } catch (err) {

    res.status(500).json({ message: 'Failed to create a new user' });
  }
};
