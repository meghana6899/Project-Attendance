const mysql = require('mysql2/promise');

const createTables = async () => {
  try {
    // Step 1: Connect without specifying a DB to create it
    const rootPool = await mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'Deva_9603',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // Create the database
    await rootPool.query('CREATE DATABASE IF NOT EXISTS attendance_management_system');
    console.log("Database created or already exists.");

    // Close the first pool
    await rootPool.end();

    // Step 2: Create a new pool that *uses* the new database
    const pool = await mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'Deva_9603',
      database: 'attendance_management_system',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    // 1. Employees table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS employees (
        emp_id VARCHAR(10) PRIMARY KEY,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(255),
        join_date DATE,
        role VARCHAR(50),
        first_login TINYINT NULL DEFAULT 1,
        disabled TINYINT NULL  DEFAULT 1 
      )
    `);

    // 2. Students table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS students (
         stu_id VARCHAR(10) PRIMARY KEY,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(255),
        join_date Date,
        role VARCHAR(50),
        first_login TINYINT NULL DEFAULT 1,
        disabled TINYINT NULL DEFAULT 1
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