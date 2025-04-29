const mysql = require('mysql2');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Deva_9603',
    database: 'attendance_management_system',
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0,
})
    

module.exports = connection.promise();