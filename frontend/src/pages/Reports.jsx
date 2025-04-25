import React, { useState } from 'react';
import EmployeeReport from '../components/EmployeeReport';
import StudentReport from '../components/StudentReport';

import '../CSS/styles.css';

const Reports = () => {
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
     {e === 'employees' && <EmployeeReport />}
     {e === 'students' && <StudentReport />}
     </div>
   
       
        </div>
        </>
    
  );
};

export default Reports;
