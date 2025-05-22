import React from 'react';
import axios from 'axios'

const AllEmployees = async () => {

    let token = localStorage.getItem('token')
    const response = await axios.get(`/api/details/employees`, {
        headers: {
            authorization: `Bearer ${token}`

        }
    });
    console.log('all employees',response.data)

    return response.data

}

export default AllEmployees

