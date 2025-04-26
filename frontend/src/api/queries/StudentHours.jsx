import React from 'react';
import axios from 'axios'

const AllStudents = async () => {
    const response = await axios.get(`http://localhost:3000/api/details/students`);

    return response.data

}

export default AllStudents;

