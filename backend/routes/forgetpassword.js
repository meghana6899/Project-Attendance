const express = require("express");
const forgetrouter = express.Router();
const {forgetPassword,resetpassword} = require('../controllers/authController');
const { verify } = require("jsonwebtoken");

forgetrouter.post('/forgetpassword', forgetPassword);
forgetrouter.post('/resetpassword', resetpassword);

module.exports = forgetrouter;