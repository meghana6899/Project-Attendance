const db = require('../configdb/db.js');

const getAllUsers = async(table, callback) => {
    console.log("Entered Model")
    try {
        const [data] = await db.query(`SELECT * FROM ${table}`);
        console.log(data)
        callback(null, data)
    } catch (error) {
        callback(error, null)
    }
    
}

const updateAUser = async(id,updateCol,updateValue,table, callback) => {
    let newId = (table == "employees")? "emp_id": "stu_id";
    try {
        const data = await db.query(`UPDATE ${table} SET ${updateCol} = ? where ${newId} = ?`, [updateValue, id]);
        console.log(data)
        callback(null, data)
    } catch (error) {
        callback(error, null)
    }
    

}

const deleteaUser = async(id,table,  callback) => {
    let newId = (table == "employees")? "emp_id": "stu_id";
    try {
        const data = await db.query(`DELETE FROM ${table} WHERE ${newId} = ?`, [id])
        callback(null, data)
    } catch (error) {
        callback(error, null)
    }
    
    
}

module.exports = {
    getAllUsers,
    updateAUser,
    deleteaUser
}