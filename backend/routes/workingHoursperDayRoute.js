const express = require('express');
const getHours = require('../controllers/getHours')
const verifyToken = require('../middleware/authMiddleware')
const workingHoursRoute = express.Router();
const Avg_hours=require('../controllers/avgHoursPerMonth');

workingHoursRoute.post('/:user/:id', verifyToken.authMid,  getHours);
workingHoursRoute.post('info/:id', getHours);



workingHoursRoute.get('/:id',Avg_hours); 


module.exports = workingHoursRoute