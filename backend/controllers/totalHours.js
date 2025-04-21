    const { totalWorkingHoursForRange } = require('../models/AvgHoursPerRange')
    const express = require('express');

    const calculateTotalHoursOnRange = async (req, res) => {
        try {
          console.log("entered Controller");
          const { id } = req.params;
          const { startDate, endDate } = req.body;
          console.log("Inputs:", id, startDate, endDate);
      
          let table, column;
          if (id.startsWith('E')) {
            table = 'emp_hours';
            column = 'emp_id';
          } else {
            table = 'stu_hours';
            column = 'stu_id';
          }
      
          const activeHours = await totalWorkingHoursForRange(table, startDate, endDate, id, column, 'active_hours');
          const breakHours = await totalWorkingHoursForRange(table, startDate, endDate, id, column, 'break_hours');
          const totalHours = await totalWorkingHoursForRange(table, startDate, endDate, id, column, 'total_hours');
      
          console.log("Final Values:", activeHours, breakHours, totalHours);
          res.send({ activeHours, breakHours, totalHours });
          console.log("ended controller");
      
        } catch (err) {
          console.error(err);
          res.status(500).send({ error: "Error in calculating total hours" });
        }
      };
      
    module.exports = calculateTotalHoursOnRange