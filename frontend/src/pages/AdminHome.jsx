import React, { useState } from 'react';
import EmployeesTable from '../components/EmployeesTable';
import StudentsTable from '../components/StudentsTable';
import ReportCards from '../components/ReportCards';

const AdminHome = () => {
  const [emp, setEmp] = useState(false);
  const [stu, setStu] = useState(false);
  const [admin, setAdmin] = useState(true);

  const handleSelect = (type) => {
    setEmp(type === 'emp');
    setStu(type === 'stu');
    setAdmin(type === 'admin');
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
      
      {/* Sidebar */}
      <div
        className="text-dark d-flex flex-column shadow-sm"
        style={{
          width: '250px',
          minHeight: '100vh',
          background: '#ffffff',
          borderRight: '1px solid #f0f0f0'
        }}
      >
      
    

        {/* Navigation */}
        <ul className="nav flex-column px-3 pt-4 fs-6">
          <li
            className={`nav-item mb-3 py-2 px-3 rounded ${
              admin ? 'bg-light fw-semibold text-primary' : 'text-dark'
            }`}
            onClick={() => handleSelect('admin')}
            style={{ cursor: 'pointer', transition: '0.3s' }}
          >
            {admin ? '⚙️ ' : ''} Admin
          </li>
          <li
            className={`nav-item mb-3 py-2 px-3 rounded ${
              emp ? 'bg-light fw-semibold text-primary' : 'text-dark'
            }`}
            onClick={() => handleSelect('emp')}
            style={{ cursor: 'pointer', transition: '0.3s' }}
          >
            {emp ? '👨‍💼 ' : ''} Employees
          </li>
          <li
            className={`nav-item mb-3 py-2 px-3 rounded ${
              stu ? 'bg-light fw-semibold text-primary' : 'text-dark'
            }`}
            onClick={() => handleSelect('stu')}
            style={{ cursor: 'pointer', transition: '0.3s' }}
          >
            {stu ? '🎓 ' : ''} Students
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        {admin && <h1>Welcome to admin panel</h1>}
        {emp && <EmployeesTable />}
        {stu && <StudentsTable />}
      </div>
    </div>
  );
};

export default AdminHome;
