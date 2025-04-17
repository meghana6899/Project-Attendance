const pool=require('../configdb/db');

const total_hours=async(table,user_id,id)=>{
    const query=`select SEC_TO_TIME(sum(TIME_TO_SEC(total_hours))) as total
    from ${table} where ${user_id}=? group by ${user_id} ,MONTH(date)`
    const [rows]=await pool.execute(query,[id]);
    if (!rows || rows.length === 0 || !rows[0].total) {
        return "00:00:00"; // default if no data
    }
    return rows[0].total
}
const active_hours=async(table,user_id,id)=>{
    console.log('enterd activehours')
    const query=`select SEC_TO_TIME(sum(TIME_TO_SEC(active_hours))) as active
    from ${table}  WHERE ${user_id} = ?
        AND MONTH(date) = MONTH(CURRENT_DATE())
        AND YEAR(date) = YEAR(CURRENT_DATE())`
    const [rows]=await pool.execute(query,[id]);
    if (!rows || rows.length === 0 || !rows[0].active) {
        return "00:00:00";
    }
    console.log('ened activehours')
    return rows[0].active
}
const break_hours=async(table,user_id,id)=>{
    const query=`select SEC_TO_TIME(sum(TIME_TO_SEC(break_hours))) as break
    from ${table} where ${user_id}=? group by ${user_id} ,MONTH(date);`
    const [rows]=await pool.execute(query,[id]);
    if (!rows || rows.length === 0 || !rows[0].break) {
        return "00:00:00"; // default if no data
    }
    console.log(rows[0].break);
    return rows[0].break
}

module.exports={
    total_hours,
    active_hours,
    break_hours
}
