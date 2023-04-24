const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { generateToken } = require('./jwtController');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

// Registering new professional
exports.registerNewProfessional = async (req, res) => {
  // Checking if professional with requested credentials exists
  const professionalCheck = await prisma.professional.findMany({
    where: {
      OR: [{ name: req.body.name }, { email: req.body.email }],
    },
  });

  if (professionalCheck.length > 0) {
    return res.status(409).json({ message: 'User with this credentials already exists' });
  }

  // If professional check passed , hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Generate token for new client
  const token = generateToken({ password: hashedPassword });

  // Creating professional object
  const newProfessional = {
    name: req.body.name,
    title: req.body.title,
    email: req.body.email,
    password: hashedPassword,
    token: token,
    bio: req.body.bio,
    avatar: req.body.avatar,
    skills: {
      create: req.body.skills.map((skillName) => ({
        name: skillName,
      })),
    },
  };

  console.log(newProfessional);

  // saving user into db
  try {
    const createdProfessional = await prisma.Professional.create({ data: newProfessional });
    console.log(`Professional created ${newProfessional} `);
    res.status(201).json({ message: 'User created successfully', user: newProfessional });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to create a new user' });
  }
};
