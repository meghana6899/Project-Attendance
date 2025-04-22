const pool = require('../configdb/db.js')
const totalWorkingHoursForRange = async (table, startDate, endDate, user_id, column, tablecolumn) => {
  console.log("Entered model");

  const query = `
    SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(${tablecolumn}))) AS total
    FROM ${table}
    WHERE date BETWEEN ? AND ? AND ${column} = ?
    GROUP BY ${column}
  `;
  console.log(query, "query from model");
  console.log(startDate, endDate, user_id, "params from model");

  const [data] = await pool.execute(query, [startDate, endDate, user_id]);
  console.log(data, "data from model");

  if (data.length === 0 || !data[0].total) {
    return '00:00:00'; // fallback
  }

  return data[0].total;
};




//average functions start

    //Average BREAK/active/total hours of an employee/student
  const getAvgBreakHoursOnRange = async (table, user_id, startDate,column, endDate,tablecolumn) => {
    console.log("Entered model")
      const query = `
        SELECT ${column}, SEC_TO_TIME(AVG(TIME_TO_SEC(${tablecolumn}))) AS avg_${tablecolumn}
        FROM ${table}
        WHERE ${column} = ? AND date BETWEEN ? AND ?
        GROUP BY ${column}
      `;
      const [rows] = await pool.execute(query, [user_id, startDate, endDate]);
      console.log(rows, "rows from model")  
      return rows; // avg_working_hours
    };
  

module.exports = {
    totalWorkingHoursForRange,
    getAvgBreakHoursOnRange
}