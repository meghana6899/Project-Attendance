const pool=require('../configdb/db')
const updateUser = async (table, user_id, id, first_name, last_name, role,email) => {
  
    const query = `UPDATE ${table}
      SET ${user_id}=?,first_name = ?, last_name = ?, role = ?,email = ?
      WHERE ${user_id} = ?;`;
    const [row] = await pool.execute(query, [id,first_name, last_name, role,email, id]);
    return row;
  };
  module.exports=updateUser