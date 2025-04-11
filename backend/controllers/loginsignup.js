const pool = require('../configdb/db');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  const { emp_name, email, password } = req.body;
  const join_date = new Date().toLocaleDateString();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [rows] = await pool.execute('SELECT password FROM employees WHERE email = ?', [email]);

    if (!rows.length) {
      return res.status(404).json({
        success: false,
        message: "Email not found. Ask admin to register you first.",
      });
    }

    if (rows[0].password) {
      return res.status(409).json({
        success: false,
        message: "User already signed up. Please log in.",
      });
    }

    const [result] = await pool.execute(
      `UPDATE employees SET emp_name = ?, password = ?, join_date = ? WHERE email = ?`,
      [emp_name, hashedPassword, join_date, email]
    );

    res.status(200).json({
      success: true,
      message: "Signup completed successfully.",
    });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({
      success: false,
      message: "Database error during signup.",
    });
  }
};

module.exports = { createUser };
