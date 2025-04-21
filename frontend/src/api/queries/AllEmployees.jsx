import React from 'react';
import axios from 'axios'

const AllEmployees = async () => {
    const response = await axios.get(`http://localhost:3000/api/details/employees`);
    console.log("Entered axios", response.data)
    return response.data

}

export default AllEmployees

