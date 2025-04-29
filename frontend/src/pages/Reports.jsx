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
        <div className="w-100">
          {e === 'employees' && <EmployeeReport />}
          {e === 'students' && <StudentReport />}
        </div>

      </div>


    </>

  );
};

export default Reports;
