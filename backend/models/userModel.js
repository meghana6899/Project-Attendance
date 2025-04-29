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

const setResetPassword = async(email,  callback) => {
    console.log("model", email)
    //if(id.startsWith('E'))
    try {
        const [response] = await db.execute(`UPDATE employees SET first_login = 0 WHERE email = ?`, [email])
        const [responsestd] = await db.execute(`UPDATE students SET first_login = 0 WHERE email = ?`, [email])
       
    let rows = response? response: responsestd;
    console.log(rows)
    callback(null, rows)
    } catch (error) {
        console.log(error)
       callback(error, null) 
    }
    
}

const findUserById=async(table,user_id,id)=>{

    const query=`select * from ${table} where ${user_id}=?`;
    const [row]=db.execute(query,[id])
}

const candidateDisable=async(table,user_id,id)=>{
    const query=`UPDATE ${table}
SET disabled = 0
WHERE ${user_id}=?;`
const [rows]=await db.execute(query,[id]);
console.log("Rows", rows)
return rows;


}
const candidateEnable=async(table,user_id,id)=>{
    const query=`UPDATE ${table}
SET disabled = 1
WHERE ${user_id}=?;`
const [rows]=await db.execute(query,[id]);
console.log("Rows", rows)
return rows;


}

  


module.exports = {findUser,findUserById, setResetPassword,candidateDisable,candidateEnable};