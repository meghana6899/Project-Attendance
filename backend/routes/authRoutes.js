const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const roleAuthorize = require('../middleware/roleMiddleware.js')

//console.log(typeof authController.login);

router.post('/login', authController.login);


module.exports = router;

