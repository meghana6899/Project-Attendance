import React from 'react'
import Doughnut from './Doughnut';
import { useAdmin } from '../context/AuthContext';
import CustomizeDates from './CustomizeDates';
import DashboardAdmin from './Doughnut';
import CheckInTable from './CheckInTable';
import DropDown from './DropDown';
import Checkinuser from './Checkinuser';
import { useEffect } from 'react';

const ReportCards = () => {
  const { setShowcard, setStartDate, setEndDate, setDate, date, startDate, endDate, setEmployee,
    setAvgActiveHours, setAvgBreakHours, setAvgTotalHours, avgactiveHours, avgbreakHours, avgtotalHours, setdashBoard, dashBoard } = useAdmin();
  console.log(date, "date in report card");
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    setDate(`${year}-${month}-${day}`);
    setdashBoard(true)
  }, []);


  const handleClose = async () => {
    setStartDate(null);
    setEndDate(null);
    setDate(`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`)

    setAvgActiveHours('');
    setAvgBreakHours('');
    setAvgTotalHours('');


    setShowcard(false);
    setEmployee({});


  };


  return (<>
    {/* Main Popup Content */}
    <div
      className="report-cards-container position-relative d-flex flex-column flex-md-row gap-4 p-4 bg-light"
      style={{ height: '90vh', overflowY: 'auto' }}
    >
      {/* ❌ Top Right Close Button */}
      <button
        type="button"
        className="btn-close position-absolute"
        aria-label="Close"
        onClick={handleClose}
        style={{
          top: '20px',
          right: '20px',
          zIndex: 10,
        }}
      ></button>
  
      {/* 📅 Left Column: Filters + Averages + Table */}
      <div className="flex-grow-1 d-flex flex-column align-items-center gap-4" style={{ minWidth: '300px' }}>
        
        {/* Filter Card (Moved inside) */}
        <div className="card w-100 p-4 shadow-sm d-flex flex-column align-items-center" style={{ width: '1000px' }}>
  <h5 className="text-center mb-4 text-primary">Filter By Date</h5>

  {/* 👉 This is the correct row flex container */}
  <div className="d-flex w-100 align-items-center justify-content-evenly ">
    {/* CustomizeDates on the left */}
    <div className="">
    <DropDown />
   
    </div>

    {/* DropDown on the right */}
    <div>
     
      <CustomizeDates />  
    </div>
  </div>
</div>

  
        {/* Average Hours Card */}
        <div className="card w-100 p-4 shadow-sm">
          <h5 className="text-center text-success ">Average Hours Summary</h5>
  
          {/* Averages Row */}
          {/* <div className="row text-center">
            <div className="col-md-4 mb-3">
              <h6 className="text-muted">Active Hours</h6>
              <p className="text-info fs-4 fw-bold">{avgactiveHours}</p>
            </div>
            <div className="col-md-4 mb-3">
              <h6 className="text-muted">Break Hours</h6>
              <p className="text-warning fs-4 fw-bold">{avgbreakHours}</p>
            </div>
            <div className="col-md-4 mb-3">
              <h6 className="text-muted">Total Hours</h6>
              <p className="text-primary fs-4 fw-bold">{avgtotalHours}</p>
            </div>
          </div> */}
  
          {/* Checkin Table */}
          <div className="">
            <Checkinuser />
          </div>
        </div>
      </div>
  
      {/* 📊 Right Column: Doughnut Chart + Close Button */}
      <div className="d-flex flex-column align-items-center gap-4 my-5" style={{ minWidth: '450px' }}>
      <div className="row text-center">
            <div className="col-md-4 mb-3">
              <h6 className="text-muted">Active Hours</h6>
              <p className="text-info fs-4 fw-bold">{avgactiveHours}</p>
            </div>
            <div className="col-md-4 mb-3">
              <h6 className="text-muted">Break Hours</h6>
              <p className="text-warning fs-4 fw-bold">{avgbreakHours}</p>
            </div>
            <div className="col-md-4 mb-3">
              <h6 className="text-muted">Total Hours</h6>
              <p className="text-primary fs-4 fw-bold">{avgtotalHours}</p>
            </div>
          </div>
        
        {/* Doughnut Chart Card */}
        <div className="card w-100 p-4 shadow-sm ">
          <Doughnut />
        </div>
  
        {/* Fixed Close Button */}
        <button
          className="btn btn-danger text-white fw-bold rounded-pill shadow"
          style={{
            position: 'fixed',
            bottom: '45px',
            right: '180px',
            width: '130px',
          }}
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  </>
  
  

  )
}

export default ReportCards