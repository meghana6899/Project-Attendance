const express = require('express');
const employeeRoute = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const roleAuthorize = require('../middleware/roleMiddleware');
const calculateAvgHours = require('../controllers/workingHours')

employeeRoute.get('/:user/:id', calculateAvgHours )

module.exports = employeeRoute