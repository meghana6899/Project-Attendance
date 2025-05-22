import React from 'react'
import axios from 'axios';

const CheckinDetailsRange = async (startDate, endDate) => {

  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')

  const response = await axios.post(`/api/details/${user.role}/${user.id}`, {
    startDate,
    endDate
  }, {
    headers: {
      authorization: token,
    }
  })

  return response.data
}



export default CheckinDetailsRange
