const express = require('express');
const getHours = require('../controllers/getHours')
const verifyToken = require('../middleware/authMiddleware')
const workingHoursRoute = express.Router();
const Avg_hours=require('../controllers/avgHoursPerMonth');
const calculateTotalHoursOnRange = require('../controllers/totalHours');

workingHoursRoute.post('/:user/:id', verifyToken.authMid,  getHours);
workingHoursRoute.post('info/:id', verifyToken.authMid, getHours);
workingHoursRoute.get('/:user/:id', verifyToken.authMid, getHours);



workingHoursRoute.get('/:id', verifyToken.authMid, Avg_hours); 
workingHoursRoute.post('/totalHours/:id', verifyToken.authMid, calculateTotalHoursOnRange);


module.exports = workingHoursRoute