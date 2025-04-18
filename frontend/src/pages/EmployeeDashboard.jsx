import React from 'react';
import CheckInDetails from '../components/CheckInTable';
import Calendar from '../components/Calendar';
import DoughnutChart from '../components/DoughnutChart';
import { useAdmin } from '../context/AuthContext';
import CustomInput from '../components/CustomInput';


import { useContext } from 'react';



const EmployeeDashboard = () => {
  const { date } = useAdmin();

  return (
    <div className='container d-flex flex-column my-5'>
      {date}
      <div className='d-flex my-5 '>
        <DoughnutChart />
        <Calendar />
      </div>
      <CustomInput />
      {/* <Calendar /> */}
      <CheckInDetails />

    </div >

  )
}

export default EmployeeDashboard