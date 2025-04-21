const express = require('express');
const employeeRoute = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const roleAuthorize = require('../middleware/roleMiddleware');
const calculateAvgHours = require('../controllers/workingHours');
const calculateAvgHoursOnRange = require('../controllers/getAvgHours')
const {AllEmployees,AllStudents}=require('../controllers/personalDetails');

employeeRoute.get('/:user/:id', verifyToken.authMid, calculateAvgHours )
employeeRoute.post('/avgHours/:user/:id', verifyToken.authMid, calculateAvgHoursOnRange )

module.exports = employeeRoute