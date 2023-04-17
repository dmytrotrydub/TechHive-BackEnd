require('dotenv').config({ path: './.env' });
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/', usersController.getUsersList);

module.exports = router;
