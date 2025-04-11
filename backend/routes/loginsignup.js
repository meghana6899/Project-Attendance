const express=require('express');
const {createUser}=require('../controllers/loginsignup');
const { DataFilled,DataPresent,validateInfo}=require('../middleware/validate')
const router=express.Router();

router.post('/signup',DataFilled,DataPresent,validateInfo,createUser);


module.exports=router;
