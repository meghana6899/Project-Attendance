import React from 'react';
import axios from 'axios'

const AllEmployees = async() => {
    const token = localStorage.getItem('token');
    console.log("Token", token)
    const response = await axios.get(`http://localhost:3000/api/details/employees`,{
        headers: {  
            authorization: `Bearer ${token}`,
        }
    });
    console.log("Entered axios", response.data)
    return response.data

}

export default AllEmployees

