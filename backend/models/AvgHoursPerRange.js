const pool = require('../configdb/db.js')

const totalWorkingHoursForRange = async (table, startDate,endDate, user_id,column,tablecolumn) => {
  const query = `select SUM(${tablecolumn})as total_hours from ${table} WHERE  date BETWEEN ? AND ? AND ${column} = ? GROUP BY ${column} `;
  const [data]=await pool.execute(query,[startDate,endDate,user_id])
  return data;
};

//average functions start

    //Average BREAK/active/total hours of an employee/student
  const getAvgBreakHoursOnRange = async (table, user_id, startDate,column, endDate,tablecolumn) => {
      const query = `
        SELECT ${column}, SEC_TO_TIME(AVG(TIME_TO_SEC(${tablecolumn}))) AS avg_break_hours
        FROM ${table}
        WHERE ${column} = ? AND date BETWEEN ? AND ?
        GROUP BY ${column}
      `;
      const [rows] = await pool.execute(query, [user_id, startDate, endDate]);
      return rows; // avg_working_hours
    };
  

module.exports = {
    totalWorkingHoursForRange,
    getAvgBreakHoursOnRange
}