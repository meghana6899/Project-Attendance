const pool=require('../configdb/db')
const deleteaUser = async (table, user_id, id) => {
  if(table==='employees'){
    await pool.execute('DELETE FROM attendance_emp WHERE emp_id = ?', [id]);
    await pool.execute('DELETE FROM emp_hours WHERE emp_id = ?', [id]);
    const query = `DELETE from ${table}  WHERE ${user_id} = ?;`;
  const [row] = await pool.execute(query, [id]);
  return row;
  }
  else{
    await pool.execute('DELETE FROM attendance_stu WHERE stu_id = ?', [id]);
    await pool.execute('DELETE FROM stu_hours WHERE stu_id = ?', [id]);
    const query = `DELETE from ${table}  WHERE ${user_id} = ?;`;
  const [row] = await pool.execute(query, [id]);
  return row;
  }
  
  };
  module.exports=deleteaUser;