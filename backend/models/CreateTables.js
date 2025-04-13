const pool = require('../configdb/db'); // your MySQL config

const createTables = async () => {
  try {
    // 1. Employees table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS employees (
        emp_id VARCHAR(10) PRIMARY KEY,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        email VARCHAR(100),
        password VARCHAR(255),
        join_date DATE,
        role VARCHAR(50)
      )
    `);

    // 2. Students table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS students (
         stu_id VARCHAR(10) PRIMARY KEY,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        email VARCHAR(100),
        password VARCHAR(255),
        join_date Date,
        role VARCHAR(50)
      )
    `);

    // 3. Employee Attendance
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS attendance_emp (
        id INT AUTO_INCREMENT PRIMARY KEY,
        emp_id VARCHAR(10),
        checkin TIME,
        checkout TIME,
        date DATE,
        FOREIGN KEY (emp_id) REFERENCES employees(emp_id)
      )
    `);

    // 4. Student Attendance
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS attendance_stu (
        id INT AUTO_INCREMENT PRIMARY KEY,
        stu_id VARCHAR(10),
        checkin TIME,
        checkout TIME,
        date DATE,
        FOREIGN KEY (stu_id) REFERENCES students(stu_id)
      )
    `);

    // 5. Employee Working Hours
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS emp_hours (
        emp_id VARCHAR(10),
        date DATE,
        total_hours TIME,
        active_hours TIME,
        break_hours TIME,
        PRIMARY KEY (emp_id, date),
        FOREIGN KEY (emp_id) REFERENCES employees(emp_id)
      )
    `);

    // 6. Student Working Hours
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS stu_hours (
        stu_id VARCHAR(10),
        date DATE,
        total_hours TIME,
        active_hours TIME,
        break_hours TIME,
        PRIMARY KEY (stu_id, date),
        FOREIGN KEY (stu_id) REFERENCES students(stu_id)
      )
    `);

    console.log("Tables created successfully.");
    process.exit();
  } catch (err) {
    console.error("Error creating tables:", err);
    process.exit(1);
  }
};

createTables();