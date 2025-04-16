import React from 'react';
import axios from 'axios'

async function CheckInDetails() {
    const id = "E002";
    const response = await axios.get(`http://localhost:3000/api/details/employee/${id}`)
    console.log("Entered axios", response.data)
    return response.data
}

export default CheckInDetails

