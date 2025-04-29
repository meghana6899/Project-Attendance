import React from 'react'
import { useState } from 'react';
import EmployeesTable from '../components/EmployeesTable';
import StudentsTable from '../components/StudentsTable';
import '../CSS/Users.css'
import { useAdmin } from '../context/AuthContext';

const Users = () => {
  const [e, setE] = useState('employees');
  const { setAccept } = useAdmin();



  return (
    <>
      <div className="container d-flex flex-column align-items-end p-4">

        {/* Button Group */}
        <div className="d-flex gap-3 mb-4" >
        <input type='button'
          className={`btn-switch ${e === 'employees' ? 'active' : ''}`}
          onClick={() => setE('employees')}
          value='👨‍💼 Employees'
        />
          
     
    
         <input type='button'
          className={`btn-switch ${e === 'students' ? 'active' : ''}`}
          onClick={() => setE('students')}
          value='🎓 Students '
       />
          
        
      </div>

        {/* Table Section */}
        <div className="w-100" style={{ 'marginTop': '-40px' }}>
          {e === 'employees' && <EmployeesTable />}
          {e === 'students' && <StudentsTable />}
        </div>

      </div>


    </>
  );
}




export default Users