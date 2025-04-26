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


  return (
    <div className="report-cards-container position-relative d-flex flex-column flex-md-row p-4 gap-4 bg-light" style={{ height: '90vh', overflowY: 'auto' }}>

      {/* ❌ Top Right Close Button */}
      <button
        type="button"
        className="btn-close position-absolute"
        aria-label="Close"
        onClick={handleClose}
        style={{
          top: '20px',
          right: '20px',
          zIndex: 10
        }}
      ></button>

      {/* 📅 Left Column: Filters + Averages + Table */}
      <div className="flex-grow-1 d-flex flex-column align-items-center gap-4 my-5">

        {/* Date Filters */}
        <div className="card w-100 p-4 shadow-sm">
          <h5 className="text-center mb-3 text-primary">Filter By Date</h5>
          <CustomizeDates />
          <DropDown />
        </div>

        {/* Averages & Check-in Table */}
        <div className="card w-100 p-4 shadow-sm">
          <h5 className="text-center text-success mb-4">Average Hours Summary</h5>
          <div className="row text-center">
            <div className="col-md-4 mb-3">
              <h6>Active Hours</h6>
              <p className="text-info fs-5 fw-bold">{avgactiveHours}</p>
            </div>
            <div className="col-md-4 mb-3">
              <h6>Break Hours</h6>
              <p className="text-warning fs-5 fw-bold">{avgbreakHours}</p>
            </div>
            <div className="col-md-4 mb-3">
              <h6>Total Hours</h6>
              <p className="text-primary fs-5 fw-bold">{avgtotalHours}</p>
            </div>
          </div>

          <div className="mt-4 ">
            <Checkinuser />
          </div>
        </div>
      </div>

      {/* 📊 Right Column: Doughnut Chart + Fixed Close Button */}
      <div className="d-flex flex-column align-items-center justify-content-between my-5" style={{ minWidth: '450px' }}>
        <div className="row text-center bg-shadow py-3 my-2">
          <div className="col-md-4 mb-3">
            <h6>Active Hours</h6>
            <p className="text-info fs-5 fw-bold">{avgactiveHours}</p>
          </div>
          <div className="col-md-4 mb-3">
            <h6>Break Hours</h6>
            <p className="text-warning fs-5 fw-bold">{avgbreakHours}</p>
          </div>
          <div className="col-md-4 mb-3">
            <h6>Total Hours</h6>
            <p className="text-primary fs-5 fw-bold">{avgtotalHours}</p>
          </div>
        </div>
        <div className="card w-100 p-4 shadow-sm">
          {/* <h5 className="text-center text-dark mb-3">Visual Summary</h5> */}
          <Doughnut />
        </div>

        <button
          className="btn  text-white mt-4 bg-danger"
          style={{
            position: 'fixed',
            bottom: 45,
            right: 180,
            width: '130px',
          }}
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>

  )
}

export default ReportCards