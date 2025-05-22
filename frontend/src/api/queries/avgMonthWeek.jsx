import React from 'react'
import axios from 'axios'

const avgMonth = async (id) => {
    const monthlyAvg = await axios.get(`/api/avg/monthly/${id}`);
    return monthlyAvg.data;
}

export const weekPerDay = async (id) => {
    const weeklyAvg = await axios.get(`/api/avg/weekavg/${id}`);
    return weeklyAvg.data;
}

export default avgMonth