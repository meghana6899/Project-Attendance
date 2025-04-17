import React from 'react';
import AllEmployees from '../api/queries/AllEmployees';
import { useEffect, useState } from 'react';

function EmployeesTable() {
  const [data, setData] = useState([])
  var response;
  useEffect(() => {
    const fetchdetails = async () => {
      console.log('Fetch')
      try {
        response = await AllEmployees();
        console.log(response);
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
  console.log(data);
  console.log('here is the event target');
  const handleClick=(e)=>{
    const row=e.target.closest('tr');
    console.log(row);
    console.log(row.rowIndex-1);

        const rowIndex = row.rowIndex - 1;
        <Card value={data[rowIndex]}/>


    
    
  }; 



  const renderedData = data.map(({ emp_id,first_name,last_name,email,role,join_date }, index) => {
    return (
      <tr key={index} className='px-5 py-5'>
        
        <td className='py-3 px-3'><input type="text" value={emp_id} disabled/></td>
        <td className='py-3 px-3'><input type="text" value={first_name} disabled/></td>
        <td className='py-3 px-3'><input type="text" value={last_name} disabled /></td>
        <td className='py-3 px-3'><input type="text" value={email} disabled /></td>
        <td className='py-3 px-3'><input type="text" value={role}  disabled/></td>
        <td className='py-3 px-3'><input type="text" value={join_date.split('T')[0]} disabled/></td>
        <td className='py-3 px-3 d-flex justify-content-center '><div><input type="button"  value='delete'/>
        <input type="button" value='edit ' />
        </div></td>
      </tr>

    )
  });
  return (
    <table className='table text-center w-auto mx-auto' onClick={handleClick}>
      <thead className='table-light' >
        <tr  >
          <th className='py-3 px-3' scope='col' >emp_id</th>
          <th className='py-3 px-3' scope='col' >first_name</th>
          <th className='py-3 px-3' scope='col'>Last_name</th>
          
          <th className='py-3 px-3' scope='col' >email</th>
          <th className='py-3 px-3' scope='col'>role</th>
          <th className='py-3 px-3'>JoinedDate</th>
          <th className='py-3 px-3'> Edit/Delete</th>
        </tr>
      </thead>
      <tbody>
      {renderedData.length > 0 ? (
        renderedData
      ) : (
        <tr>
          <td colSpan="6" className="py-3 px-5 text-center">
            Loading...
          </td>
        </tr>
      )}
      </tbody>

    </table>
  )
}

export default EmployeesTable;
