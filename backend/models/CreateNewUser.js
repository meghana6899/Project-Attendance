const pool=require('../configdb/db')
const CreateNewUser=async(table, column,user_id,first_name,last_name, email,role,date)=>{
    console.log(table, column,user_id,first_name,last_name, email,role,date)
    const query = `INSERT INTO ${table} (\`${column}\`, first_name,last_name,email, role,join_date) VALUES (?, ?, ?,?,?,?)`;
    console.log('await is here')
    const [row]=await pool.execute(query,[user_id,first_name,last_name,email,role,date]);
    console.log('await is end')
    return row;
}

module.exports=CreateNewUser