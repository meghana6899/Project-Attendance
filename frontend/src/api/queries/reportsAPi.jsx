import axios from 'axios';
import React from 'react'

const reportsAPi = async () => {
    const response = await axios.get(`/api/details/reports/users/employee`)
    return response.data;
}

export const reportsAPistd = async () => {
    const response = await axios.get(`/api/details/reports/users/student`)
    return response.data;
}

export default reportsAPi
