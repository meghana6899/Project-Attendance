const express = require('express');
const getHours = require('../controllers/getHours')
const workingHoursRoute = express.Router();

workingHoursRoute.post('/:user/:id', getHours);

module.exports = workingHoursRoute