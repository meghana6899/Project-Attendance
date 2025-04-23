const db = require('../configdb/db.js');

const findUser = async(username, callback) => {
    console.log(username)
    try {
            const queryemp = `SELECT * FROM employees WHERE email = ?`;
            const [rowsemp] = await db.query(queryemp, [username]);
            const querystu = `SELECT * FROM students where email = ? `
            const [rowsstd] = await db.query(querystu, [username])
            const rows = rowsemp ? rowsemp : rowsstd
            console.log("Rows:", rows)
            callback(null, rows[0])
    } catch (error) {
       // console.error(error);
    
        callback(error)
    }
  
    
}

const setResetPassword = async(email, callback) => {
    try {
        const [response] = await pool.query(`UPDATE employees SET first_login = 0 WHERE email = ?`, [email])
    const [responsestd] = await pool.query(`UPDATE students SET first_login = 0 WHERE email = ?`, [email])
    let rows = response? response: responsestd;
    callback(null, rows[0])
    } catch (error) {
       callback(error, null) 
    }
    
}

const findUserById=async(table,user_id,id)=>{

    const query=`select * from ${table} where ${user_id}=?`;
    const [row]=pool.execute(query,[id])
}

  


module.exports = {findUser,findUserById, setResetPassword};