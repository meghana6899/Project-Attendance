const pool = require('../configdb/db')

const totalWorkingHoursForOneDay = async (table, date, user_id,column) => {
  console.log(column, user_id)
  const query = `
    SELECT ${column}, date, TIMEDIFF(MAX(checkout), MIN(checkin)) AS total_hours
    FROM ${table}
    WHERE date = ? AND ${column} = ?
    GROUP BY ${column}, date
  `;
  const [rows] = await pool.execute(query, [date, user_id]);

  return rows;
};

//TOTAL ACTIVE HOURS OF ONE DAY

const totalActiveHoursOnOneDay = async (table, column, date, user_id) => {
  console.log(table, column, date, user_id)
  const query = `
    SELECT ${column}, date, SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(checkout, checkin)))) AS active_hours
    FROM ${table}
    WHERE date = ? AND ${column} = ?
    GROUP BY ${column}, date
  `;

  const [rows] = await pool.execute(query, [date , user_id]);
  
  return rows; // This contains total_active_time
};

// TOTAL BREAK HOURS OF ONE DAY

const totalBreakHoursOnOneDay = async (table, date, user_id, column) => {
  console.log('Start calculating break time...');

  const [working_hours] = await totalWorkingHoursForOneDay(table, date, user_id, column);
  const [active_hours] = await totalActiveHoursOnOneDay(table, column, date, user_id);

  const total_working_hours = working_hours?.total_hours;
  const total_active_hours = active_hours?.active_hours;
  console.log(total_active_hours)

  if (!total_working_hours || !total_active_hours) {
    console.log("Missing working or active hours");
    return null;
  }

  const [data] = await pool.execute(`
    SELECT TIMEDIFF(?, ?) AS break_hours
  `, [total_working_hours, total_active_hours]);
 

  return data;
   // { break_hours: '00:30:00' }
};


const allInfo = async(table, column, date, user_id) => {
  console.log(column)
  const [rows] = await pool.execute(`SELECT checkin, checkout, date FROM ${table} where date = ? AND \`${column}\` = ?`, [date, user_id])
  console.log(rows)
  return rows
}
const getCheckInDetails = async(table, column, user_id, startDate, endDate) => {
  const [rows] = await pool.execute(`SELECT checkin, checkout, date FROM ${table} where \`${column}\` = ? and date between ? and ? order by date DESC` , [user_id, startDate, endDate])
  return rows
}






const getHoursperDay = async(table, column, user_id, date) => {
  console.log(table, column, user_id, date)
  const [rows] = await pool.execute(`SELECT active_hours, break_hours, total_hours from ${table} where ${column} = ? AND date = ? `, [user_id, date])
  return rows
}

module.exports = {
  totalActiveHoursOnOneDay,
  totalBreakHoursOnOneDay,
  totalWorkingHoursForOneDay,
  allInfo,
  getHoursperDay,
  getCheckInDetails,
}