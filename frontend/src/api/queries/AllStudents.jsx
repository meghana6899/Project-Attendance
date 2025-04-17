import React from 'react';
import axios from 'axios'

const AllStudents = async() => {
    const response = await axios.get(`http://localhost:3000/api/details/students`);
    console.log("Entered axios", response.data)
    return response.data

}

export default AllStudents;

