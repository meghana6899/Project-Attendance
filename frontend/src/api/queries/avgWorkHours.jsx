

import React from 'react'
import axios from 'axios'

async function avgWorkHours(startDate, endDate) {
    console.log("From axios", startDate, endDate)

    const user = JSON.parse(localStorage.getItem('user'));
    var users;
    if (user.role === 'admin' || user.role === 'employee') {
        users = 'employee'
    }
    else {
        users = 'student'
    }
    const response = await axios.post(`http://localhost:3000/api/details/avgHours/${user}/${user.id}`, {
        startDate,
        endDate
    })
    console.log("response", response.data)
    return response.data;
}

export default avgWorkHours
