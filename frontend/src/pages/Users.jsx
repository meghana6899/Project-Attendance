import React from 'react'
import { useState } from 'react';
import EmployeesTable from '../components/EmployeesTable';
import StudentsTable from '../components/StudentsTable';

const Users = () => {
    const [e, setE] = useState('employees');
      
    
      
    
  return (
    <>
    <div className="container d-flex flex-column ">
      <div className="d-flex justify-content-center align-items-end flex-column" style={{marginRight: '20px'}}>
      <select name="reportType" id="reportType" style={{ width: '200px', marginTop: '20px' }} className="form-select" onChange={(e) => setE(e.target.value)}>
        <option value="employees"  onClick={() => setE('employees')}
            style={{ cursor: 'pointer', transition: '0.3s' }}>  👨‍💼 Employee Report</option>


        <option value="students"  onClick={() => setE('students')}
            style={{ cursor: 'pointer', transition: '0.3s' }} > 🎓 Student Report</option>
      </select>
      </div>

     <div >
     {e === 'employees' && <EmployeesTable />}
     {e === 'students' && <StudentsTable />}
     </div>
   
       
        </div>
        </>
    
   )
}

export default Users