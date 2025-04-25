import React from 'react';
import CheckInDetails from '../api/queries/CheckInDetails';
import { useEffect, useState } from 'react';
import { useAdmin } from '../context/AuthContext';
import CheckinDetailsRange from '../api/queries/CheckinDetailsRange';

import axios from 'axios';






function Checkinuser() {
    const token = localStorage.getItem('token');
  const { checkIn, checkOut, setCheckIn, setCheckOut, isCheckedIn, startDate, endDate,employee } = useAdmin();
  const [data, setData] = useState([])


  useEffect(() => {
    const fetchdetails = async () => {
      //console.log('Fetch')
      try {
        const user_id = employee.emp_id || employee.stu_id;
        let table;
        if(employee.emp_id){
          table='employee' ;

        }
        else{
          table='students';
        }
        if (startDate && endDate) {
            console.log("Inside the if condition")
          

            const response = await axios.post(`http://localhost:3000/api/details/${table}/${user_id}`,{
                startDate,
                endDate
            }, {
              headers: {
                authorization: token,
              }
            })

          console.log("Response from range", response.data)
          if (Array.isArray(response.data)) {
            setData(response.data)
          } else if (typeof response.data === 'object') {
            console.log("Its an object")
          } else {
            setData([response.data])
          }
          return;
        }
        console.log('came out sideof the if condition',employee)
        // if('emp_id' in employee){
        //     console.log("Inside the if condition")
        //     employee.user_id = employee.emp_id
        // }else{
        //     console.log("Inside the else condition")
        //     employee.user_id = employee.stu_id  
        // }   

        const response = await axios.get(`http://localhost:3000/api/details/${employee.role}/${user_id}`, { // Updated to use employee.user_id
            headers: {
                authorization: token,
            }
        })
        console.log(response.data,'jere is hte repsojse')
        if (Array.isArray(response.data)) {
          setData(response.data)
        } else if (typeof response.data === 'object') {
          console.log("Its an object")
        } else {
          setData([response.data])
        }

      } catch (err) {
        console.log(err)
      }
    }
    fetchdetails()
  }, [checkIn, checkOut, isCheckedIn,startDate,endDate,employee])
  //console.log(data)


  //console.log(response)
  const renderedData = data.map(({ checkin, checkout, date }, index) => {
    // setCheckIn(checkin)
    // setCheckOut(checkout)
    const zdate = new Date(date);
    const newDate = zdate.toLocaleString("en-GB", { timeZone: "Asia/Kolkata" })
    return (
      <tr key={index} className='px-5 py-5'>
        <td className='py-3 px-5'>{newDate.split(',')[0]}</td>
        <td className='py-3 px-5'>{checkin}</td>
        <td className='py-3 px-5'>{checkout}</td>
      </tr>

    )
  })
  return (
    <table className='table text-center w-auto mx-auto my-5 bg-info'>
      <thead className='table-light' >
        <tr  >
          <th className='py-3 px-5'>Date</th>
          <th className='py-3 px-5' scope='col' >Check In</th>
          <th className='py-3 px-5' scope='col'>Check Out</th>
        </tr>
      </thead>
      <tbody>
  {renderedData.length > 0 ? (
    renderedData
  ) : (
    <tr>
      <td colSpan="3" className="py-3 px-5">Loading...</td>
    </tr>
  )}
</tbody>


    </table>
  )
}



export default Checkinuser;
