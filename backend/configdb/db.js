const mysql = require('mysql2');

// const connection = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'Deva_9603',
//     database: 'attendanceschema'
// })
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'bamr@2704',
    database: 'attendance_management_db'
})

module.exports = connection.promise();