const express=require('express');

const {createUser}=require('../controllers/loginsignup');

const {checkin,checkout}=require('../controllers/checkinattend');

const { DataFilled,DataPresent,validateInfo}=require('../middleware/validate');

const { validatetable,CheckingUserPresentOrNot,DataCheck,validatePassword}=require('../middleware/checkin');

const sendMail=require('../controllers/sendmail');


const router=express.Router();



router.post('/signup',DataFilled,DataPresent,validateInfo,createUser);

router.post('/checkin',DataCheck,validatetable,CheckingUserPresentOrNot,validatePassword,checkin);
router.post('/checkout',DataCheck,validatetable,CheckingUserPresentOrNot,validatePassword,checkout);
router.get('/sendmail', sendMail);


module.exports=router;
