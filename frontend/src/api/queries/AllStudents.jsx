import React from 'react';
import axios from 'axios'

const AllStudents = async () => {
    const response = await axios.get(`http://localhost:3000/api/details/students`, {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    });

    return response.data

}

export default AllStudents;

