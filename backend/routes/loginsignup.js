const express=require('express');

const {createUser}=require('../controllers/loginsignup');

const {checkin}=require('../controllers/checkinattend');

const { DataFilled,DataPresent,validateInfo}=require('../middleware/validate');

const { validatetable,CheckingUserPresentOrNot,DataCheck,validatePassword}=require('../middleware/checkin');


const router=express.Router();



router.post('/signup',DataFilled,DataPresent,validateInfo,createUser);

router.post('/checkin',DataCheck,validatetable,CheckingUserPresentOrNot,validatePassword,checkin)

module.exports=router;
