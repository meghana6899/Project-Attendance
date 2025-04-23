const express = require("express");
const forgetrouter = express.Router();
const {forgetPassword,resetpassword} = require('../controllers/authController');

forgetrouter.post('/forgetpassword', forgetPassword);
forgetrouter.post('/resetpassword', resetpassword);

module.exports = forgetrouter;