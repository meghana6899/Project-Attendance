import axios from 'axios';
import React from 'react'

const reportsAPi = async () => {
    const response = await axios.get(`http://localhost:3000/api/details/reports/users/employee`)
    return response.data;
}

export const reportsAPistd = async () => {
    const response = await axios.get(`http://localhost:3000/api/details/reports/users/student`)
    return response.data;
}

export default reportsAPi
