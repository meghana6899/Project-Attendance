const { getAvgBreakHoursOnRange } = require('../models/AvgHoursPerRange')
const express = require('express');


const calculateAvgHoursOnRange = async (req, res) => {
    console.log("entrerd Controller")
    const id = req.params.id;
    console.log(id) //Change after testing
    const { startDate, endDate } = req.body;
    if (id.startsWith('E')) {
        table = 'emp_hours',
            column = 'emp_id'
    } else {
        table = 'stu_hours',
            column = 'stu_id'
    }
    const [activeHoursRows] = await getAvgBreakHoursOnRange(table, id, startDate, column, endDate, "active_hours");
    const [breakHoursRows] = await getAvgBreakHoursOnRange(table, id, startDate, column, endDate, "break_hours");
    const [totalHoursRow] = await getAvgBreakHoursOnRange(table, id, startDate, column, endDate, "total_hours")
    console.log(activeHoursRows, breakHoursRows, totalHoursRow)
    res.send({activehours: activeHoursRows["avg_active_hours"], breakhours: breakHoursRows["avg_break_hours"] , totalhours: totalHoursRow["avg_total_hours"] })
}

module.exports = calculateAvgHoursOnRange