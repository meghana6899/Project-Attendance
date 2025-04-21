const express = require('express');
const getHours = require('../controllers/getHours')
const workingHoursRoute = express.Router();
const Avg_hours=require('../controllers/avgHoursPerMonth');

workingHoursRoute.post('/:user/:id', getHours);
workingHoursRoute.post('info/:id', getHours);



workingHoursRoute.get('/:id',Avg_hours); 


module.exports = workingHoursRoute