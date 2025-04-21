import React from 'react'
import Doughnut from './Doughnut';
import { useAdmin } from '../context/AuthContext';
import CustomizeDates from './CustomizeDates';

const ReportCards = () => {
    const { setShowcard,setStartDate,setEndDate,setDate,date,startDate,endDate,employee ,setEmployee,setActiveHours,setBreakHours,setTotalHours} = useAdmin();
    const handleClose = async () => {
        setStartDate('');
        setEndDate('');
        setDate(`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`)
        console.log(date,"date")
        console.log(startDate,"startdate")
        console.log(endDate,"enddate")
        setActiveHours('');
        setBreakHours('');
        setTotalHours('');

     
        setShowcard(false);
        setEmployee(null);


    };
  

  return (
    <div>
        <CustomizeDates />
        <Doughnut key={employee?.stu_id || employee?.emp_id} />

        <button
          className="btn btn-outline-danger"
          id="delete"
          onClick={handleClose}
          
        >
          Close
        </button>
        
    </div>
  )
}

export default ReportCards