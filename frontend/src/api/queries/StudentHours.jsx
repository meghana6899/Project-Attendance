import React from 'react';
import axios from 'axios'

const AllStudents = async () => {
    const response = await axios.get(`/api/details/students`);

    return response.data

}

export default AllStudents;

