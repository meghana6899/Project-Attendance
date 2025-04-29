import React, { useState } from 'react';
import EmployeeReport from '../components/EmployeeReport';
import StudentReport from '../components/StudentReport';

import '../CSS/styles.css';

const Reports = () => {
  const [e, setE] = useState('employees');



  return (

    <>
      <div className="container d-flex flex-column align-items-end p-4">

        {/* Button Group */}
        <div className="d-flex gap-3 mb-4">
          <button
            className={`btn-switch ${e === 'employees' ? 'active' : ''}`}
            onClick={() => setE('employees')}
          >
            👨‍💼 Employees
          </button>

          <button
            className={`btn-switch ${e === 'students' ? 'active' : ''}`}
            onClick={() => setE('students')}
          >
            🎓 Students
          </button>
        </div>

        {/* Table Section */}
        <div className="w-100">
          {e === 'employees' && <EmployeeReport />}
          {e === 'students' && <StudentReport />}
        </div>

      </div>


    </>

  );
};

export default Reports;
