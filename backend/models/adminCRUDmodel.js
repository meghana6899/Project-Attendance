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
    try {
        const [data] = await db.query(`UPDATE ${table} SET ${updateCol} = ? where employee_id = ?`, [updateValue, id]);
        callback(null, data)
    } catch (error) {
        callback(error, null)
    }
    

}

const deleteaUser = async(id,table,  callback) => {
    try {
        const [data] = await db.query(`DELETE FROM ${table} WHERE employee_id = ?`, [id])
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