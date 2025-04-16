import React from 'react'
import axios from 'axios'

async function workHours(date) {
    const id = localStorage.getItem('id')
    const role = localStorage.getItem('role');
    const user = role === "admin" || "employee" ? "employee" : "student"
    const response = await axios.post(`http://localhost:3000/api/hours/${user}/${id}`, {
        date
    })
    console.log(response.data)
}

export default workHours
