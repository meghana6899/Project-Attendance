const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware.js');
const authorizeRoles = require('../middleware/roleMiddleware.js');

//Only admin can access
router.get('/admin',verifyToken.authMid, authorizeRoles("admin"), (req, res) => {
    res.json({
        success: true,
        msg: "Welcome to Admin Page"
    })
});

router.get('/employee',verifyToken.authMid, authorizeRoles("employee", "admin"),(req, res) => {
    res.json({
        success:true,
        msg: "Welcome to Employee Page" 
    })
})

router.get('/student', verifyToken.authMid, authorizeRoles("admin", "student"), (req, res) => {
    res.json({
        success: true,
        msg: "Welcome to Student Page"
    })
})




module.exports = router

