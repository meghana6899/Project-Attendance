import React from 'react'
import Doughnut from './Doughnut';
import { useAdmin } from '../context/AuthContext';
import CustomizeDates from './CustomizeDates';
import CustomInput from './CustomInput';
import DashboardAdmin from './Doughnut';

const ReportCards = () => {
  const { setShowcard, setStartDate, setEndDate, setDate, date, startDate, endDate,  setEmployee, setAvgActiveHours, setAvgBreakHours, setAvgTotalHours } = useAdmin();
  const handleClose = async () => {
    setStartDate('');
    setEndDate('');
    setDate(`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`)
    console.log(date, "date")
    console.log(startDate, "startdate")
    console.log(endDate, "enddate")
    setAvgActiveHours('');
    setAvgBreakHours('');
    setAvgTotalHours('');


    setShowcard(false);
    setEmployee(null);


  };


  return (
    <div className="report-cards-container">
      <div className="d-flex justify-content-center align-items-center flex-column mt-4 my-3 gap-3">
        <CustomizeDates />
        {/* <CustomInput /> */}
        {/* <Doughnut key={employee?.stu_id || employee?.emp_id} /> */}
        <DashboardAdmin />
      </div>

      <div className="d-flex justify-content-end align-items-center mt-3 mx-4">
        <button
          className="btn btn-outline-danger"
          id="delete"
          onClick={handleClose}

        >
          Close
        </button>
      </div>



    </div>
  )
}

export default ReportCards