const express = require('express');
const employeeRoute = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const {calculateAvgHours,calculateCheckinOnRange} = require('../controllers/workingHours');
const calculateAvgHoursOnRange = require('../controllers/getAvgHours')
const {AllEmployees,AllStudents}=require('../controllers/personalDetails');
const {Update_user_info,Delete_user_info, Create_New_User}=require('../controllers/personalDetails');
const calculateTotalHoursOnRange = require('../controllers/totalHours');
const sendMail = require('../controllers/sendmail');
const {calculateAvg, calculateAvgstd} = require('../controllers/reportsController')

employeeRoute.get('/:user/:id', verifyToken.authMid,calculateAvgHours );
employeeRoute.post('/:user/:id', verifyToken.authMid, calculateCheckinOnRange );

employeeRoute.post('/avgHours/:user/:id', verifyToken.authMid,calculateAvgHoursOnRange );
employeeRoute.post('/avgHours/:id', verifyToken.authMid, calculateAvgHoursOnRange );


employeeRoute.get('/employee/:id',verifyToken.authMid, calculateAvgHours );

employeeRoute.get('/employees',verifyToken.authMid,AllEmployees);

employeeRoute.post('/:id',verifyToken.authMid,Update_user_info);

employeeRoute.delete('/:id',verifyToken.authMid,Delete_user_info);

employeeRoute.post('/create/newusers/user',verifyToken.authMid,Create_New_User,sendMail);

employeeRoute.post('/totalhours/:id', verifyToken.authMid, calculateTotalHoursOnRange );

employeeRoute.get('/reports/users/employee', calculateAvg)
employeeRoute.get('/reports/users/student', calculateAvgstd)



//student routes
employeeRoute.get('/students',verifyToken.authMid,AllStudents);
// employeeRoute.get('/student/:id')


module.exports = employeeRoute