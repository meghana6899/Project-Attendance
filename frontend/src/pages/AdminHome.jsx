import React, { useState } from 'react';
import EmployeesTable from '../components/EmployeesTable';
import StudentsTable from '../components/StudentsTable';
import ReportCards from '../components/ReportCards';
import EmployeeDashboard from './EmployeeDashboard';

const AdminHome = () => {


  

  return (
    <div className="d-flex" style={{ minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>

    

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <EmployeeDashboard />
        
      </div>
    </div>
  );
};

export default AdminHome;
