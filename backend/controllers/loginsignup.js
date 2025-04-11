const pool = require('../configdb/db');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  const {firstName,lastName, email, password,table} = req.body;
  const currentDate = new Date().toISOString().split('T')[0];
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [rows] = await pool.execute(`SELECT password FROM ${table} WHERE email = ?`, [email]);

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
    console.log('strattttt')
    const [result] = await pool.execute(
      `UPDATE ${table} SET firstName = ?, lastName=?,password = ?, join_date = ?  WHERE email = ?`,
      [firstName,lastName, hashedPassword, currentDate, email]
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
