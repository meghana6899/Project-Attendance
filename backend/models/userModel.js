const db = require('../configdb/db.js');

const findUser = async(username,role,  callback) => {
    //console.log(username, role)
    const roleactual = role == "employee"? "employees": "students"
    try {
            const query = `SELECT * FROM ${roleactual} WHERE email = ?`;
            const [rows] = await db.query(query, [username])
            //console.log("Rows:", rows[0])
            callback(null, rows[0])
    } catch (error) {
       // console.error(error);
        callback(error)
    }
  
    
}


module.exports = {findUser};