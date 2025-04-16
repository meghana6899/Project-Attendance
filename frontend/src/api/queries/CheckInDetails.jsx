import React from 'react';
import axios from 'axios'

async function CheckInDetails() {
    const id = localStorage.getItem('id')
    const role = localStorage.getItem('role');
    const user = role === "admin" || "employee" ? "employee" : "student"
    const response = await axios.get(`http://localhost:3000/api/details/${user}/${id}`)
    console.log("Entered axios", response.data)
    return response.data
}

export default CheckInDetails

