const pool=require('../configdb/db');

const monthlyAvgHours=async(table,column,user_id)=>{
    const query=`SELECT 
  ${column},
  DATE_FORMAT(date, '%Y-%m') AS month,
  
  SEC_TO_TIME(AVG(TIME_TO_SEC(total_hours))) AS avg_total_hours,
  SEC_TO_TIME(AVG(TIME_TO_SEC(active_hours))) AS avg_active_hours,
  SEC_TO_TIME(AVG(TIME_TO_SEC(break_hours))) AS avg_break_hours

FROM ${table}
where ${column}=?
GROUP BY ${column}, DATE_FORMAT(date, '%Y-%m')
ORDER BY ${column}, month;

	`
    const [rows]=await pool.execute(query,[user_id]);
    return rows

};

const EveryWeekAvg = async(table, column, id, currentDate, prevCurrentDate) => {
    const query = `
   SELECT 
  SEC_TO_TIME(AVG(TIME_TO_SEC(total_hours))) AS avgweek_total_hours,
  SEC_TO_TIME(AVG(TIME_TO_SEC(active_hours))) AS avgweek_active_hours,
  SEC_TO_TIME(AVG(TIME_TO_SEC(break_hours))) AS avgweek_break_hours
FROM ${table}
WHERE ${column} = ? 
  AND date BETWEEN ? AND ?;


    `;
  
    
      const [response]=await pool.execute(query, [id, prevCurrentDate, currentDate]);
      return response;
    }

  

module.exports={monthlyAvgHours,EveryWeekAvg};
