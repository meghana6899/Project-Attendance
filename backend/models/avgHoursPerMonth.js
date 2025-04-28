const pool = require('../configdb/db');

// Total Hours (across all data for user)
const total_hours = async (table, user_id, id) => {
    const query = `
        SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(total_hours))) AS total
        FROM ${table}
        WHERE ${user_id} = ?
    `;
    const [rows] = await pool.execute(query, [id]);
    if (!rows || rows.length === 0 || !rows[0].total) {
        return "00:00:00";
    }
    return rows[0].total;
};

// Active Hours (for current month only)
const active_hours = async (table, user_id, id) => {
    const query = `
        SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(active_hours))) AS active
        FROM ${table}
        WHERE ${user_id} = ?
        AND MONTH(date) = MONTH(CURRENT_DATE())
        AND YEAR(date) = YEAR(CURRENT_DATE())
    `;
    const [rows] = await pool.execute(query, [id]);
    if (!rows || rows.length === 0 || !rows[0].active) {
        return "00:00:00";
    }
    return rows[0].active;
};

// Break Hours (across all data for user)
const break_hours = async (table, user_id, id) => {
    const query = `
        SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(break_hours))) AS break
        FROM ${table}
        WHERE ${user_id} = ?
    `;
    const [rows] = await pool.execute(query, [id]);
    if (!rows || rows.length === 0 || !rows[0].break) {
        return "00:00:00";
    }
    return rows[0].break;
};


  


module.exports={
    total_hours,
    active_hours,
    break_hours,
    
}
