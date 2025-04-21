import React from 'react';
import axios from 'axios'

const AllEmployees = async () => {
    let token = localStorage.getItem('token')
    const response = await axios.get(`http://localhost:3000/api/details/employees`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    console.log("Entered axios", response.data)
    return response.data

}

export default AllEmployees

