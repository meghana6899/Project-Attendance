

import React from 'react'
import axios from 'axios'

async function workHours(date) {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token')
    var users;
    if (user.role === 'admin' || user.role === 'employee') {
        users = 'employee'
    }
    else {
        users = 'student'
    }
    const response = await axios.post(`http://localhost:3000/api/hours/${users}/${user.id}`, {
        date,
    }, {
        headers: {
            authorization: token
        }
    }

    )
    console.log("response", response.data)
    return response.data;
}

export default workHours
