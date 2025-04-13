const db = require('../configdb/db.js');

const findUser = async(username,role,  callback) => {
    console.log(username, role)
    const table = role == "employee"? "employees": "students"
    console.log(username, "in", table)
    try {
            const query = `SELECT * FROM ${table} WHERE email = ?`;
            const [rows] = await db.query(query, [username])
            console.log("Rows:", rows)
            callback(null, rows[0])
    } catch (error) {
       // console.error(error);
        callback(error)
    }
  
    
}


module.exports = {findUser};