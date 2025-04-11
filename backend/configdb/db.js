const mysql = require('mysql2');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Deva_9603',
    database: 'attendanceschema'
})

module.exports = connection.promise();