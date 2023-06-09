const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.get('/', clientController.getClientsList);
router.post('/register', clientController.registerNewClient);


module.exports = router;
