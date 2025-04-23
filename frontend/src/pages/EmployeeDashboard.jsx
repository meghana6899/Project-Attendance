import React from 'react';
import CheckInDetails from '../components/CheckInTable';
import Calendar from '../components/Calendar';
import DoughnutChart from '../components/DoughnutChart';
import { useAdmin } from '../context/AuthContext';
import CustomInput from '../components/CustomInput';
import Resetpopup from '../components/resetpopup';




const EmployeeDashboard = () => {
  const { flag } = useAdmin();


  return (
    <div className='container d-flex flex-column my-5'>
      <div className='modal-overlay'>{flag && <Resetpopup />}</div>
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