import React from 'react';
import AllEmployees from '../api/queries/AllEmployees';
import { reportsAPistd } from '../api/queries/reportsAPi';
import { useEffect, useState } from 'react';
import { useAdmin } from '../context/AuthContext';
import ReportCards from './ReportCards';


function StudentsTable() {
  const [data, setData] = useState(null);
  const [users, setUsers] = useState({ average_checkout_time: "", avergae_checkin_time: "", avg_active_hours: "", avg_break_hours: "", avg_total_hours: "" })
  const { setEmployee, employee, setShowcard, showcard } = useAdmin();


  var response;
  var response2;
  useEffect(() => {
    const fetchdetails = async () => {
      console.log('Fetch')
      try {
        response = await reportsAPistd();
        console.log(response);
        setData(response.data)



      } catch (err) {
        console.log(err)
      }
    }
    fetchdetails()
  }, [employee])
  console.log("Data", data);
  console.log('here is the event target');
  const handleClick = (e) => {
    const row = e.target.closest('tr');
    if (!row || row.rowIndex === 0) return;
    console.log(row);
    console.log(row.rowIndex - 1);
    const rowIndex = row.rowIndex - 1;
    console.log(data.avgTh[rowIndex],'here is hte data studnetsds')
    setEmployee(data.avgTh[rowIndex]);
    console.log(employee,'ghere is hte emokojaosef');
    
    setShowcard(true)

  };




  const renderedData = data?.avgTh?.length > 0
    ? data.avgTh.map((item, i) => (
      <tr key={i} className='px-5 py-5 border'>
        <td className='py-3 px-3 border'>{item.stu_id}</td>
        <td className='py-3 px-3 border'>{item.full_name}</td>
        <td className='py-3 px-3 border'>{data?.avglt?.[i]?.average_checkin_time || '-'}</td>
        <td className='py-3 px-3 border'>{data?.avgLoT?.[i]?.average_checkout_time || '-'}</td>
        <td className='py-3 px-3 border'>{item.avg_active_hours}</td>
        <td className='py-3 px-3 border'>{item.avg_break_hours}</td>
        <td className='py-3 px-3 border'>{item.avg_total_hours}</td>
      </tr>
    ))
    : (
      <tr>
        <td colSpan="7" className="py-3 px-5 text-muted text-center">Loading or No Data</td>
      </tr>
    );









  return (<>
    <div className="container d-flex justify-content-center my-5">
      <div className="table-responsive" style={{ width: "100%" }}>
        <table
          className="table table-borderless table-hover text-center align-middle shadow-sm"
          onClick={handleClick}
          style={{
            borderRadius: "1rem",
            overflow: "hidden",
            backgroundColor: "#f9f9f9",
          }}
        >
          <thead className='table-light'
            style={{
              backgroundColor: "#343a40",
              color: "white",
              fontSize: "1rem",
            }}
          >
            <tr>
              <th className='border p-3'>Std ID</th>
              <th className='border p-3'>Name</th>
              <th className='border p-3'>Average Login Time</th>
              <th className='border p-3'>Average Logout Time</th>
              <th className='border p-3'>Average Active Hours</th>
              <th className='border p-3'>Average Break Hours</th>
              <th className='border p-3'>Average Total Hours</th>
            </tr>
          </thead>
          <tbody>

            {renderedData}
          </tbody>
        </table>


        {showcard && (
          <div
            className="modal-overlay"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1050,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
             <div style={{width:'85vw'}}>
            <ReportCards />
            </div>
          </div>
        )}
      </div>
    </div>
  </>
  )
}

export default StudentsTable;

