

import React from 'react'
import axios from 'axios'

async function workHours(date) {
    const user = JSON.parse(localStorage.getItem('user'));
    var users;
    if (user.role === 'admin' || user.role === 'employee') {
        users = 'employee'
    }
    else {
        users = 'student'
    }
    const response = await axios.post(`http://localhost:3000/api/hours/${user}/${id}`, {
        date
    })
    console.log("response", response.data)
    return response.data;
}

export default workHours
