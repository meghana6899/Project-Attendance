const db = require('../configdb/db.js');


const avgLoginTime = async() => {

    try {
        console.log("Entered try")
        const [response] =await  db.execute(`SELECT 
        
        DATE_FORMAT(SEC_TO_TIME(AVG(TIME_TO_SEC(first_checkin))), '%h:%i:%s %p') AS average_checkin_time
    FROM (
        SELECT 
            emp_id,
            DATE(checkin) AS log_date,
            MIN(TIME(checkin)) AS first_checkin
        FROM attendance_emp
        WHERE DATE(checkin) BETWEEN CURDATE() - INTERVAL 30 DAY AND NOW()
        GROUP BY emp_id, DATE(checkin)
    ) AS daily_first_checkins
    GROUP BY emp_id;
    `);
    console.log(response)
    return response
    } catch (error) {
       console.log("Login", error)
       return error
    }
}

const avgLogoutTime = async() => {
    let user_id, table;
    try {
        const [response] = await db.execute(`SELECT 
        DATE_FORMAT(SEC_TO_TIME(AVG(TIME_TO_SEC(first_checkout))), '%h:%i:%s %p') AS average_checkout_time
    FROM (
        SELECT 
        emp_id,
            DATE(checkout) AS log_date,
            MAX(TIME(checkout)) AS first_checkout
        FROM attendance_emp
      WHERE DATE(checkout) BETWEEN CURDATE() - INTERVAL 30 DAY AND NOW()
        GROUP BY emp_id, DATE(checkout)
    ) AS daily_first_checkouts
    GROUP BY emp_id`);
    console.log(response)
      return response
    } catch (error) {
        console.log("Logout",error);
        return error
    }
}


const avgWorkingHours = async() => {
   
    try {
        const [response] = await db.execute(`
        SELECT 
    h.emp_id,
    CONCAT(e.first_name, ' ', e.last_name) AS full_name,
    CONCAT(
        FLOOR(AVG(TIME_TO_SEC(h.total_hours)) / 3600), ' hours ', 
        LPAD(FLOOR((AVG(TIME_TO_SEC(h.total_hours)) % 3600) / 60), 2, '0'), ' minutes'
    ) AS avg_total_hours,
    CONCAT(
        FLOOR(AVG(TIME_TO_SEC(h.active_hours)) / 3600), ' hours ', 
        LPAD(FLOOR((AVG(TIME_TO_SEC(h.active_hours)) % 3600) / 60), 2, '0'), ' minutes'
    ) AS avg_active_hours,
    CONCAT(
        FLOOR(AVG(TIME_TO_SEC(h.break_hours)) / 3600), ' hours ', 
        LPAD(FLOOR((AVG(TIME_TO_SEC(h.break_hours)) % 3600) / 60), 2, '0'), ' minutes'
    ) AS avg_break_hours
FROM emp_hours h
JOIN employees e ON h.emp_id = e.emp_id
WHERE h.date BETWEEN CURDATE() - INTERVAL 30 DAY AND CURDATE()
GROUP BY h.emp_id, e.first_name, e.last_name
`);
    console.log(response)
    return response;
        
    } catch (error) {
        console.log("Working", error)
        return error
    }
}

const avgLoginTimestd = async() => {

    try {
        console.log("Entered try")
        const [response] =await  db.execute(`SELECT 
        
        DATE_FORMAT(SEC_TO_TIME(AVG(TIME_TO_SEC(first_checkin))), '%h:%i:%s %p') AS average_checkin_time
    FROM (
        SELECT 
            stu_id,
            DATE(checkin) AS log_date,
            MIN(TIME(checkin)) AS first_checkin
        FROM attendance_stu
        WHERE DATE(checkin) BETWEEN CURDATE() - INTERVAL 30 DAY AND NOW()
        GROUP BY stu_id, DATE(checkin)
    ) AS daily_first_checkins
    GROUP BY stu_id;
    `);
    console.log(response)
    return response
    } catch (error) {
       console.log("Login", error)
       return error
    }
}

const avgLogoutTimestd = async() => {
    let user_id, table;
    try {
        const [response] = await db.execute(`SELECT 
        DATE_FORMAT(SEC_TO_TIME(AVG(TIME_TO_SEC(first_checkout))), '%h:%i:%s %p') AS average_checkout_time
    FROM (
        SELECT 
        stu_id,
            DATE(checkout) AS log_date,
            MAX(TIME(checkout)) AS first_checkout
        FROM attendance_stu
      WHERE DATE(checkout) BETWEEN CURDATE() - INTERVAL 30 DAY AND NOW()
        GROUP BY stu_id, DATE(checkout)
    ) AS daily_first_checkout;`);
    console.log(response)
      return response
    } catch (error) {
        console.log("Logout",error);
        return error
    }
}


const avgWorkingHoursstd = async() => {
   
    try {
        const [response] = await db.execute(`
        SELECT 
    h.stu_id,
    CONCAT(e.first_name, ' ', e.last_name) AS full_name,
    CONCAT(
        FLOOR(AVG(TIME_TO_SEC(h.total_hours)) / 3600), ' hours ', 
        LPAD(FLOOR((AVG(TIME_TO_SEC(h.total_hours)) % 3600) / 60), 2, '0'), ' minutes'
    ) AS avg_total_hours,
    CONCAT(
        FLOOR(AVG(TIME_TO_SEC(h.active_hours)) / 3600), ' hours ', 
        LPAD(FLOOR((AVG(TIME_TO_SEC(h.active_hours)) % 3600) / 60), 2, '0'), ' minutes'
    ) AS avg_active_hours,
    CONCAT(
        FLOOR(AVG(TIME_TO_SEC(h.break_hours)) / 3600), ' hours ', 
        LPAD(FLOOR((AVG(TIME_TO_SEC(h.break_hours)) % 3600) / 60), 2, '0'), ' minutes'
    ) AS avg_break_hours
FROM stu_hours h
JOIN students e ON h.stu_id = e.stu_id
WHERE h.date BETWEEN CURDATE() - INTERVAL 30 DAY AND CURDATE()
GROUP BY h.stu_id, e.first_name, e.last_name
`);
    console.log(response)
    return response;
        
    } catch (error) {
        console.log("Working", error)
        return error
    }
}


module.exports = {
    avgLoginTime,
    avgLogoutTime, 
    avgWorkingHours,
    avgLoginTimestd,
    avgLogoutTimestd,
    avgWorkingHoursstd
}




