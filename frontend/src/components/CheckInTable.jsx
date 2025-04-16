import React from 'react';
import CheckInDetails from '../api/queries/CheckInDetails';
import { useEffect, useState } from 'react';

function CheckInTable() {
  const [data, setData] = useState([])
  var response;
  useEffect(() => {
    const fetchdetails = async () => {
      console.log('Fetch')
      try {
        response = await CheckInDetails();
        console.log(response)
        if (Array.isArray(response)) {
          setData(response)
        } else if (typeof response === 'object') {
          console.log("Its an object")
        } else {
          setData([response])
        }

      } catch (err) {
        console.log(err)
      }
    }
    fetchdetails()
  }, [])
  console.log(data)


  //console.log(response)
  const renderedData = data.map(({ checkin, checkout, date }, index) => {
    return (
      <tr key={index} className='px-5 py-5'>
        <td className='py-3 px-5'>{date.split('T')[0]}</td>
        <td className='py-3 px-5'>{checkin}</td>
        <td className='py-3 px-5'>{checkout}</td>
      </tr>

    )
  })
  return (
    <table className='table text-center w-auto mx-auto'>
      <thead className='table-light' >
        <tr  >
          <th className='py-3 px-5'>Date</th>
          <th className='py-3 px-5' scope='col' >Check In</th>
          <th className='py-3 px-5' scope='col'>Check Out</th>
        </tr>
      </thead>
      <tbody>
        {renderedData.length > 0 ? renderedData : <div>Loading...</div>}
      </tbody>

    </table>
  )
}

export default CheckInTable
