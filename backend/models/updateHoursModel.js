const pool = require('../configdb/db');

const upDateTotalWorkingHours = async (table, user_id, column,date, total_hours) => {
  const query = `
    INSERT INTO ${table} (${column}, date, total_hours)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE    
      total_hours = VALUES(total_hours)
  `;

  await pool.execute(query, [user_id, date, total_hours]);

};
 //UPDATING THE TOTALACTIVE WORKING  HOURS OF AN EMPLOYEE IN DB
const upDateTotalActiveWorkingHours = async (table, user_id, column,date, active_hours) => {
  const query = `
    INSERT INTO ${table} (${column}, date, active_hours)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE    
      active_hours = VALUES(active_hours)
  `;

  await pool.execute(query, [user_id, date, active_hours]);

};
//UPDATING THE TOTALACTIVE WORKING  HOURS OF AN EMPLOYEE IN DB

const upDateTotalBreakHours = async (table, user_id, column,date, break_hours) => {
  const query = `
    INSERT INTO ${table} (${column}, date, break_hours)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE    
      break_hours = VALUES(break_hours)
  `;

  await pool.execute(query, [user_id, date, break_hours]);

};
module.exports = {
    upDateTotalActiveWorkingHours,
    upDateTotalBreakHours,
    upDateTotalWorkingHours
}