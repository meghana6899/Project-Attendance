const pool = require('../configdb/db');
// const {totalWorkingHoursForOneDay,
//     totalActiveHoursOnOneDay,
//     upDateTotalWorkingHours,
//     upDateTotalActiveWorkingHours, 
//     totalBreakHoursOnOneDay,upDateTotalBreakHours}=require('./workingHours.js');

const {totalActiveHoursOnOneDay, totalWorkingHoursForOneDay, totalBreakHoursOnOneDay} = require('../models/HoursPerDay');
const {upDateTotalActiveWorkingHours, upDateTotalBreakHours, upDateTotalWorkingHours} = require('../models/updateHoursModel')
const checkin = async (req, res) => {
    const currentTime = new Date().toTimeString().split(' ')[0]; // HH:MM:SS
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const { user_id, table } = req.body;

    if (!user_id || !table) {
        return res.status(400).json({ success: false, message: "Missing user_id or table name" });
    }

    console.log(`User  ID: ${user_id}, Table: ${table}, Current Time: ${currentTime}, Current Date: ${currentDate}`);

    if (table === 'attendance_emp') {
        try {
            const [rows] = await pool.execute(
                `SELECT * FROM attendance_emp WHERE emp_id = ? AND date = ? ORDER BY date DESC, id DESC LIMIT 1`,
                [user_id, currentDate]
            );

            const record = rows[0];
            console.log("Fetched employee record:", record);

            if (!record || (record.checkin !== null && record.checkout !== null)) {
                console.log("Inserting new checkin for employee...");
                await pool.execute(
                    `INSERT INTO attendance_emp (emp_id, checkin, date) VALUES (?, ?, ?)`,
                    [user_id, currentTime, currentDate]
                );
                return res.status(201).json({
                    success: true,
                    message: "Checkin time of employee is updated",
                });
            } else if (record.checkin !== null && record.checkout === null) {
                const date=record.date;
                console.log("Updating checkout for employee...");
                await pool.execute(
                    `UPDATE attendance_emp
    SET checkout = ?
    WHERE emp_id = ?
      AND checkout IS NULL
    ORDER BY checkin DESC , id DESC,date DESC
    LIMIT 1`,
                    [currentTime, user_id]
                );
                
                

                
               const [d] = await totalWorkingHoursForOneDay("attendance_emp",currentDate, user_id,'emp_id');
               console.log('herre is the erroir',d);
                await upDateTotalWorkingHours('emp_hours', user_id, 'emp_id',currentDate, d.total_hours);
                const [x]=await totalActiveHoursOnOneDay('attendance_emp','emp_id', currentDate, user_id);
                await upDateTotalActiveWorkingHours('emp_hours',user_id,'emp_id',currentDate,x.active_hours);
                const [breakData] = await totalBreakHoursOnOneDay('attendance_emp', 'emp_id', currentDate, user_id);
                await upDateTotalBreakHours('emp_hours',user_id,'emp_id',currentDate,breakData.break_hours);

            //     console.log(d);
                return res.status(201).json({
                    success: true,
                    message: "Checkout time of employee is updated",
                });
            }
        } catch (err) {
            console.error("Error in employee checkin:", err);
            return res.status(500).json({
                success: false,
                message: "Something went wrong while processing employee attendance",
            });
        }
    } else {
        // For students
        try {
            const [rows] = await pool.execute(
                `SELECT * FROM attendance_stu WHERE stu_id = ? AND date = ? ORDER BY date DESC, id DESC LIMIT 1`,
                [user_id, currentDate]
            );

            const record = rows[0];
            console.log("Fetched student record:", record);

            if (!record || (record.checkin !== null && record.checkout !== null)) {
                console.log("Inserting new checkin for student...");
                await pool.execute(
                    `INSERT INTO attendance_stu (stu_id, checkin, date) VALUES (?, ?, ?)`,
                    [user_id, currentTime, currentDate]
                );
                return res.status(201).json({
                    success: true,
                    message: "Checkin time of student is updated",
                });
            } else if (record.checkin !== null && record.checkout === null) {
                console.log("Updating checkout for student...");
                const date=record.date;
                await pool.execute(
                    `UPDATE attendance_stu
    SET checkout = ?
    WHERE stu_id = ?
      AND checkout IS NULL
    ORDER BY checkin DESC , id DESC,date desc
    LIMIT 1`,
                    [currentTime, user_id]
                );
                const [total] = await totalWorkingHoursForOneDay("attendance_stu",currentDate, user_id,'stu_id');
                await upDateTotalWorkingHours('stu_hours', user_id, 'stu_id',currentDate, total.total_hours);
                const [active]=await totalActiveHoursOnOneDay('attendance_stu','stu_id', currentDate, user_id);
                await upDateTotalActiveWorkingHours('stu_hours',user_id,'stu_id',currentDate,active.active_hours);
               const[b]= await totalBreakHoursOnOneDay('attendance_stu',currentDate,user_id,'stu_id');
               await upDateTotalBreakHours('stu_hours',user_id,'stu_id',currentDate,b.break_hours);

                return res.status(201).json({
                    success: true,
                    message: "Checkout time of student is updated",
                });
            }
        } catch (err) {
            console.error("Error in student checkin:", err);
            return res.status(500).json({
                success: false,
                message: "Something went wrong while processing student attendance",
            });
        }
    }
};

module.exports = {
    checkin,
};















































