import React from 'react';
import CheckInDetails from '../components/CheckInTable';
import Calendar from '../components/Calendar';
import DashboardEmployee from '../components/DashboardEmployee';
import { useAdmin } from '../context/AuthContext';

import { useContext } from 'react';



const EmployeeDashboard = () => {


  return (
    <>
      <DashboardEmployee />
      <Calendar />
      <CheckInDetails />

    </>

  )
}

export default EmployeeDashboard