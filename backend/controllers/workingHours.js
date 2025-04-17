// const pool = require('../configdb/db');

// //TOTAL WORKING HOURS OF ONE DAY

// const totalWorkingHoursForOneDay = async (table, date, user_id,column) => {
//     const query = `
//       SELECT ${column}, date, TIMEDIFF(MAX(checkout), MIN(checkin)) AS total_hours
//       FROM ${table}
//       WHERE date = ? AND ${column} = ?
//       GROUP BY ${column}, date
//     `;
//     const [rows] = await pool.execute(query, [date, user_id]);

//     return rows;
//   };

//   //TOTAL ACTIVE HOURS OF ONE DAY

//   const totalActiveHoursOnOneDay = async (table, column, date, user_id) => {
//     const query = `
//       SELECT ${column}, date, SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(checkout, checkin)))) AS active_hours
//       FROM ${table}
//       WHERE date = ? AND ${column} = ?
//       GROUP BY ${column}, date
//     `;
  
//     const [rows] = await pool.execute(query, [date , user_id]);
    
//     return rows; // This contains total_active_time
//   };
  
//  // TOTAL BREAK HOURS OF ONE DAY

//  const totalBreakHoursOnOneDay = async (table, column, date, user_id) => {
//     console.log('Start calculating break time...');
  
//     const [working_hours] = await totalWorkingHoursForOneDay(table, date, user_id, column);
//     const [active_hours] = await totalActiveHoursOnOneDay(table, column, date, user_id);
  
//     const total_working_hours = working_hours?.total_hours;
//     const total_active_hours = active_hours?.active_hours;
//     console.log(total_active_hours)
  
//     if (!total_working_hours || !total_active_hours) {
//       console.log("Missing working or active hours");
//       return null;
//     }
  
//     const [data] = await pool.execute(`
//       SELECT TIMEDIFF(?, ?) AS break_hours
//     `, [total_working_hours, total_active_hours]);
   
  
//     return data;
//      // { break_hours: '00:30:00' }
//   };
  


// //total working hours functiuon start
//   //total working hours of an employee on particular range of dates

//   const totalWorkingHoursForRange = async (table, startDate,endDate, user_id,column,tablecolumn) => {
//     const query = `select SUM(${tablecolumn})as total_hours from ${table} WHERE  date BETWEEN ? AND ? AND ${column} = ? GROUP BY ${column} `;
//     const [data]=await pool.execute(query,[startDate,endDate,user_id])
//     return data;
//   };
  
// //average functions start

//       //Average BREAK/active/total hours of an employee/student
//     const getAvgBreakHoursOnRange = async (table, user_id, startDate,column, endDate,tablecolumn) => {
//         const query = `
//           SELECT ${column}, SEC_TO_TIME(AVG(TIME_TO_SEC(${tablecolumn}))) AS avg_break_hours
//           FROM ${table}
//           WHERE ${column} = ? AND date BETWEEN ? AND ?
//           GROUP BY ${column}
//         `;
//         const [rows] = await pool.execute(query, [user_id, startDate, endDate]);
//         return rows; // avg_working_hours
//       };
  
// //avg function end

// //updating function start

//       //UPDATING THE TOTALWORKING HOURS OF AN EMPLOYEE IN DB

//       const upDateTotalWorkingHours = async (table, user_id, column,date, total_hours) => {
//         const query = `
//           INSERT INTO ${table} (${column}, date, total_hours)
//           VALUES (?, ?, ?)
//           ON DUPLICATE KEY UPDATE    
//             total_hours = VALUES(total_hours)
//         `;
      
//         await pool.execute(query, [user_id, date, total_hours]);

//       };
//        //UPDATING THE TOTALACTIVE WORKING  HOURS OF AN EMPLOYEE IN DB
//       const upDateTotalActiveWorkingHours = async (table, user_id, column,date, active_hours) => {
//         const query = `
//           INSERT INTO ${table} (${column}, date, active_hours)
//           VALUES (?, ?, ?)
//           ON DUPLICATE KEY UPDATE    
//             active_hours = VALUES(active_hours)
//         `;
      
//         await pool.execute(query, [user_id, date, active_hours]);

//       };
//       //UPDATING THE TOTALACTIVE WORKING  HOURS OF AN EMPLOYEE IN DB
      
//       const upDateTotalBreakHours = async (table, user_id, column,date, break_hours) => {
//         const query = `
//           INSERT INTO ${table} (${column}, date, break_hours)
//           VALUES (?, ?, ?)
//           ON DUPLICATE KEY UPDATE    
//             break_hours = VALUES(break_hours)
//         `;
      
//         await pool.execute(query, [user_id, date, break_hours]);

//       };
  


// module.exports={
//     totalWorkingHoursForOneDay,
//     totalActiveHoursOnOneDay,
//     upDateTotalWorkingHours,
//     upDateTotalActiveWorkingHours,
//     upDateTotalBreakHours,
//     totalBreakHoursOnOneDay,
//     totalWorkingHoursForRange,
//     getAvgBreakHoursOnRange
// }


// const totalWorkingHoursForOneDay = require('../models/totalBreajkHoursperDayModel')

// async function totalWorkingHours = (req, res) => {
//   const {}
//   const response = await totalWorkingHoursForOneDay
// }



const express = require('express');
const {totalActiveHoursOnOneDay: activeHours, totlaBreakHoursOnOndeDay: breakHours, totalWorkingHoursForOneDay: workingHours, allInfo} = require('../models/HoursPerDay')



const calculateAvgHours = async(req, res) => {
  console.log("entered Controller")
  console.log(req.params)
  const user_id = req.params.id
  const role = req.params.user
  let table;
  if(role === "admin" || role === "employee"){
    table = "attendance_emp"
  }else{
    table = "attendance_stu"
  }
  const column = user_id.startsWith('E')? "emp_id" : "std_id";
  console.log(table, column, user_id)
  // const table = user_id.startsWith('E')? "attendance_emp" : "attendance_stu"
  const date = new Date().toISOString().split('T')[0];
  const activity = await allInfo(table, column, date, user_id) 
  //const activeHours = await activeHours(table, column, date, user_id);
  //const totalHours = await breakHours()
  console.log(activity)
  res.send(activity)
}

const calculateWeekAvgHours = async(req, res) => {
  console.log("entered Controller")
  const user_id = req.params.id
  const column = user_id.startsWith('E')? "emp_id" : "std_id";
  const table = user_id.startsWith('E')? "attendance_emp" : "attendance_stu"
  const date = new Date().toISOString().split('T')[0];
  console.log(date)
 
  //const activeHours = await activeHours(table, column, date, user_id);
  //const totalHours = await breakHours()
  res.send(activity)
}
module.exports =
  calculateAvgHours;
  
