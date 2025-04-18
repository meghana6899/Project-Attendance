const express = require('express');
const employeeRoute = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const roleAuthorize = require('../middleware/roleMiddleware');
const calculateAvgHours = require('../controllers/workingHours');
const calculateAvgHoursOnRange = require('../controllers/getAvgHours')
const {AllEmployees,AllStudents}=require('../controllers/personalDetails');

employeeRoute.get('/:user/:id', calculateAvgHours )
employeeRoute.post('/avgHours/:user/:id', calculateAvgHoursOnRange )

module.exports = employeeRoute