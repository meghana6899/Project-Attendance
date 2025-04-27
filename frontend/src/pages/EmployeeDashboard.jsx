// import React from 'react';
// import CheckInDetails from '../components/CheckInTable';
// import Calendar from '../components/Calendar';
// import DoughnutChart from '../components/DoughnutChart';
// import LineChart from '../components/LineChart';
// import { useAdmin } from '../context/AuthContext';
// import CustomInput from '../components/CustomInput';
// import Resetpopup from '../components/resetpopup';





// const EmployeeDashboard = () => {
//   const { flag } = useAdmin();


//   return (
//     <div className='container d-flex flex-column my-5'>
//       <div className='modal-overlay'>{flag && <Resetpopup />}</div>
//       <LineChart />
//       <div className='d-flex my-5 '>
//         <DoughnutChart />
//         <Calendar />
//       </div>
//       <CustomInput />
//       {/* <Calendar /> */}
//       <CheckInDetails />

//     </div >

//   )
// }

// export default EmployeeDashboard

import React from 'react';
import CheckInDetails from '../components/CheckInTable';
import Calendar from '../components/Calendar';
import DoughnutChart from '../components/DoughnutChart';
import LineChart from '../components/LineChart';
import { useAdmin } from '../context/AuthContext';
import CustomInput from '../components/CustomInput';
import Resetpopup from '../components/resetpopup';
import "../CSS/Dashboard.css"

const EmployeeDashboard = () => {
  const { flag } = useAdmin();

  return (
    <div className="container dashboard-container py-5">
      {/* Modal Overlay */}
      {flag && <div className="modal-overlay"><Resetpopup /></div>}

      {/* Line Chart */}
      <div className="mb-5 bg-white">
        <LineChart />
      </div>

      {/* Doughnut Chart and Calendar */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card cont h-100 shadow-sm p-3">
            <DoughnutChart />
            <div className="mt-3">
              <CustomInput />
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card cont h-100 shadow-sm p-3">
            <Calendar />
          </div>
        </div>
      </div>





      {/* Check-in Table */}
      <div className="card cont shadow-sm p-3">
        <CheckInDetails />
      </div>
    </div>
  );
}

export default EmployeeDashboard;
