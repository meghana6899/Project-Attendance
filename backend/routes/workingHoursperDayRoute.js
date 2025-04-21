const express = require('express');
const getHours = require('../controllers/getHours')
const verifyToken = require('../middleware/authMiddleware')
const workingHoursRoute = express.Router();

workingHoursRoute.post('/:user/:id', verifyToken.authMid,  getHours);

module.exports = workingHoursRoute