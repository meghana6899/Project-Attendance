const express = require('express');
const adminRouter = express.Router();
const {getUser, updateUser, deleteUser} = require('../controllers/adminCRUDcontroller.js')
const verifyToken = require('../middleware/authMiddleware.js')

adminRouter.get('/:users',verifyToken.authMid, getUser)
adminRouter.post('/:user/:id', verifyToken.authMid,  updateUser)
adminRouter.delete('/:user/:id', verifyToken.authMid,deleteUser )

module.exports = adminRouter;