import React from 'react';
import axios from 'axios'

async function CheckInDetails() {
    const user = JSON.parse(localStorage.getItem('user'))

    const response = await axios.get(`http://localhost:3000/api/details/${user.role}/${user.id}`)
    console.log("Entered axios", response.data)
    return response.data
}

export default CheckInDetails

