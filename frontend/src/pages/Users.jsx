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
        <div className="d-flex gap-3  mx-4">
          <button
            className={` btn-switch ${e === 'employees' ? 'active' : ''}`}
            onClick={() => { setE('employees'); setAccept(false) }}
          >
            👨‍💼 Employees
          </button>

          <button
            style={{
              cursor: 'pointer'
            }
            }
            className={`btn-switch ${e === 'students' ? 'active' : ''}`}
            onClick={() => { setE('students'); setAccept(false) }}
          >
            🎓 Students
          </button>
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