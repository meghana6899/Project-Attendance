

import React from 'react'
import axios from 'axios'

async function avgWorkHours(startDate, endDate) {


    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token')
    var users;
    if (user.role === 'admin' || user.role === 'employee') {
        users = 'employee'
    }
    else {
        users = 'student'
    }
    const response = await axios.post(`http://localhost:3000/api/details/avgHours/${users}/${user.id}`, {
        startDate,
        endDate
    }, {
        headers: {
            'Content-Type': 'application/json',
            authorization: `${localStorage.getItem('token')}`,
        }
    })

    return response.data;
}

export default avgWorkHours
