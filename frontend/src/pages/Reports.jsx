import React, { useState } from 'react';
import EmployeeReport from '../components/EmployeeReport';
import StudentReport from '../components/StudentReport';

import '../CSS/styles.css';

const Reports = () => {
  const [e, setE] = useState('employees');

  
  return (
    <div className="d-flex" style={{ minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
      {/* Sidebar */}
      <div
        className="text-dark d-flex flex-column shadow-sm"
        style={{
          width: '250px',
          minHeight: '100vh',
          background: '#ffffff',
          borderRight: '1px solid #f0f0f0',
        }}
      >
      

        {/* Side Navigation */}
        <ul className="nav flex-column px-3 pt-4 fs-6">
          <li
            className={`nav-item mb-3 py-2 px-2 rounded ${
              e === 'employees' ? 'bg-light fw-semibold text-primary' : 'text-dark'
            }`}
            onClick={() => setE('employees')}
            style={{ cursor: 'pointer', transition: '0.3s' }}
          >
            👨‍💼 Employee Report
          </li>
          <li
            className={`nav-item mb-3 py-2 px-3 rounded ${
              e === 'students' ? 'bg-light fw-semibold text-primary' : 'text-dark'
            }`}
            onClick={() => setE('students')}
            style={{ cursor: 'pointer', transition: '0.3s' }}
          >
            🎓 Student Report
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4" id="report-container">
   
        {e === 'employees' && <EmployeeReport />}
        {e === 'students' && <StudentReport />}
      </div>
    </div>
  );
};

export default Reports;
