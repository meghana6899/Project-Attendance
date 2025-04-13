const mysql = require('mysql2');

// const connection = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'Deva_9603',
//     database: 'attendance_management_schema',
//     waitForConnections:true,
//     connectionLimit:10,
//     queueLimit:0,
// })
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'bamr@2704',
    database: 'attendance_management_schema',
    waitForConnections:true,
    connectionLimit:10, 
    queueLimit:0,
})

module.exports = connection.promise();