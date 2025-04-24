const pool=require('../configdb/db')
const CreateNewUser=async(table, column,user_id,first_name,last_name, email,role,hashedPassword,date)=>{
    console.log(table, column,user_id,first_name,last_name, email,role,date)
    const result=await pool.query(`SELECT * FROM ${table} WHERE email = ?`, [email]);
    console.log('result',result[0])

    if(result[0].length > 1) {
        console.log('Email already exists')
        return { message: 'Email already exists' };
    }

    const query = `INSERT INTO ${table} (\`${column}\`, first_name,last_name,email, role,password,join_date) VALUES (?, ?, ?,?,?,?,?)`;
    console.log('await is here')
    const [row]=await pool.execute(query,[user_id,first_name,last_name,email,role,hashedPassword,date]);
    console.log('await is end')
    return row;
}

module.exports=CreateNewUser