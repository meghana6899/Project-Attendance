import React from 'react';
import AllEmployees from '../api/queries/AllEmployees';
import { reportsAPistd } from '../api/queries/reportsAPi';
import { useEffect, useState } from 'react';
import { useAdmin } from '../context/AuthContext';
import ReportCards from './ReportCards';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { IoSearchOutline } from 'react-icons/io5';


function StudentsTable() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState('')
  const [allData, setAllData] = useState([])


  const [users, setUsers] = useState({ average_checkout_time: "", avergae_checkin_time: "", avg_active_hours: "", avg_break_hours: "", avg_total_hours: "" })
  const { setEmployee, employee, setShowcard, showcard } = useAdmin();



  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data?.avgTh?.slice(firstIndex, lastIndex) || [];
  const npage = Math.ceil(data?.avgTh?.length / recordsPerPage);
  const nextPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1)
    }
  }
  const prePage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1)
    }

  }


  var response;
  var response2;
  useEffect(() => {
    const fetchdetails = async () => {

      try {
        response = await reportsAPistd();
        console.log(response.data)
        setData(response.data)
        setAllData(response.data)



      } catch (err) {
        console.log(err)
      }
    }
    fetchdetails()
  }, [employee])

  const handleClick = (e) => {
    const row = e.target.closest('tr');

    if (!row || row.rowIndex === 0) return;


    const rowIndex = row.rowIndex - 1;

    setEmployee(data.avgTh[rowIndex]);


    setShowcard(true)

  };


  const handleChange = (e) => {
    const input = e.target.value.toLowerCase();
    setValue(input);

    if (!input) {
      // Reset to original data
      setData(allData);
      setCurrentPage(1);
      return;
    }

    // Filter avgTh and find matching indexes
    const filteredTh = allData?.avgTh?.filter(emp =>
      emp.full_name.toLowerCase().startsWith(input) || emp.full_name.toLowerCase().includes(input)
    );

    // Get corresponding indexes of filtered avgTh
    const indexes = filteredTh.map(emp => allData.avgTh.indexOf(emp));

    // Map indexes to filter avglt and avgLoT
    const filteredLt = indexes.map(i => allData.avglt?.[i] || {});
    const filteredLoT = indexes.map(i => allData.avgLoT?.[i] || {});

    // Construct the new filtered object
    const filteredData = {
      avgTh: filteredTh,
      avglt: filteredLt,
      avgLoT: filteredLoT
    };

    setData(filteredData);
    setCurrentPage(1);
  };





  const renderedData = records.length > 0
    ? records.map((item, i) => (
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
    <div className='d-flex justify-content-start align-items-center' style={{marginTop:'-65px', width:'500px'}}>
    <form className='form w-100 d-flex text-center bg-white align-items-center justify-content-center border  rounded p-1'  >

{/* <IoSearchOutline className='align-items-center justify-content-center text-secondary' /> */}
<input className='text-secondary border-0 px-1 form-control w-100' value={value} onChange={handleChange} placeholder={`🔍Search Employee`} />
</form>
      

    </div>
    <div className="container d-flex justify-content-center my-4">
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
            <div style={{ width: '85vw' }}>
              <ReportCards />
            </div>
          </div>
        )}
      </div>
    </div>
    <nav>
      <ul className='d-flex text-center'>
        <li className={`page-item list-group-item ${currentPage == 1 ? 'disabled text-secondary' : 'text-black'}`}>
          <a href='#' className='page-link' onClick={prePage}><SlArrowLeft /></a>
        </li>
        <li className='page-item mx-2 my-auto list-group-item text-center align-items-center'>
          {currentPage}/{npage}
        </li>
        <li className={`page-item list-group-item ${currentPage == npage ? 'disabled text-secondary' : 'text-black'}`}>
          <a href='#' className='page-link' onClick={nextPage}><SlArrowRight /></a>
        </li>

      </ul>
    </nav>
  </>

  )
}

export default StudentsTable;

