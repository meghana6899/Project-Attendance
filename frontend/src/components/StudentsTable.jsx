import React from 'react';
import AllStudents from '../api/queries/AllStudents';
import { useEffect, useState } from 'react';
import { useAdmin } from '../context/AuthContext';
import Card from './Card';
import AddCard from './AddCard';
import DeleteUser from '../api/queries/DeleteUser';
import { SlArrowRight, SlArrowLeft } from 'react-icons/sl';
import { IoSearchOutline } from 'react-icons/io5';

function StudentsTable() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState('')
  const [allData, setAllData] = useState([])

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);

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

  const { employee, setEmployee, setShowcard, showcard, add, setAdd, setRadio, accept, setAccept } = useAdmin();
  setRadio(false);
  const user_id = employee && 'stu_id' in employee ? 'stu_id' : 'emp_id';
  const userValue = employee?.[user_id];


  const confirmDelete = async () => {
    console.log("Entered Cofim Delete")
    const response = await DeleteUser(userValue);
    console.log('Deletion is done');
    console.log(response);
    if (response.status === 200) {
      console.log('sucessss stroyyyyy');
      setEmployee({});
      setShowcard(false);

    };
    setAccept(false)
  }

  const noDelete = async () => {
    setAccept(false)
  }
  setRadio(false);

  const handleChange = (e) => {

    const input = e.target.value.toLowerCase();
    setValue(input);

    const filtered = allData.filter(emp =>
      emp.first_name.toLowerCase().startsWith(input) || emp.last_name.toLowerCase().startsWith(input)
    );
    setCurrentPage(1)
    setData(filtered);
  }



  const fetchdetails = async () => {

    try {
      const response = await AllStudents();

      if (Array.isArray(response)) {
        setAllData(response)
        setData(response)
      } else if (typeof response === 'object') {
        console.log("Its an object")
      } else {
        setAllData([response])
        setData([response])
      }

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchdetails()
  }, [employee, add])

  const handleClick = (e) => {
    const row = e.target.closest('tr');
    if (!row || row.rowIndex === 0) return;

    const rowIndex = row.rowIndex - 1;

    setEmployee(data[rowIndex]);
    setShowcard(true)
  };





  const renderedData = data.map(({ stu_id, first_name, last_name, email, role, join_date, disabled }, index) => {
    return (
      <tr key={index} className='px-5 py-5' style={{ cursor: 'pointer' }}>


        <td className={disabled === 0 ? 'bg-secondary text-white py-3 px-3 border' : 'bg-white py-3 px-3 border'}>{stu_id}</td>
        <td className={disabled === 0 ? 'bg-secondary text-white py-3 px-3 border' : 'bg-white py-3 px-3 border'}>{first_name}</td>
        <td className={disabled === 0 ? 'bg-secondary text-white py-3 px-3 border' : 'bg-white py-3 px-3 border'}>{last_name}</td>
        <td className={disabled === 0 ? 'bg-secondary text-white py-3 px-3 border' : 'bg-white py-3 px-3 border'}>{email}</td>
        <td className={disabled === 0 ? 'bg-secondary text-white py-3 px-3 border' : 'bg-white py-3 px-3 border'}>{role}  </td>
        <td className={disabled === 0 ? 'bg-secondary text-white py-3 px-3 border' : 'bg-white py-3 px-3 border'}>{join_date ? join_date.split('T')[0] : ""}</td>
      </tr>

    )
  });
  const handleAdd = () => {
    if (add) {
      setAdd(false)
    }
    else {
      setAdd(true)
    }
  }

  return (<>
    {/* ADD Button */}
    <div className="text-end  mx-5">
      {accept && <div className="shadow-lg mx-auto rounded p-3 border-0 text-start" style={{
        position: "fixed",
        top: "10%",
        left: "50%",
        transform: `translate(-50%, -50%)`,
        width: "35vw",
        height: "15vh",
        backgroundColor: "white",
        zIndex: 1050,
        // margin: "auto",
      }}>
        <h5>Are you sure you want to remove user {employee?.first_name}?</h5>
        <input type="button" onClick={confirmDelete} className="text-white bg-danger p-2 border rounded shadow m-2" value="Delete" />
        <input type="button" onClick={noDelete} className="text-white bg-secondary p-2 border rounded shadow m-2" value="Close" />
      </div>
      }

    </div>
    <div className="text-start mx-5   ">
      <input
        type="button"
        value="ADD"
        onClick={handleAdd}
        className="btn btn-outline-primary fw-semibold px-5 py-2 rounded-3"
        style={{ fontSize: "1.1rem" }}
      />
    </div>

    {/* AddCard Popup */}
    {add && (
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
        <div
        // className="bg-white p-4 rounded-4 shadow"
        // style={{
        //   width: "50%",
        //   maxWidth: "600px",
        //   minWidth: "300px",
        // }}
        >
          <AddCard closecard={() => setAdd(false)} />

        </div>
      </div>
    )}
    <form className='form m-3 w-25 d-flex text-center bg-white align-items-center border rounded p-1'  >

      {/* <IoSearchOutline className='align-items-center justify-content-center text-secondary' /> */}
      <input className='text-secondary border-0 px-1 form-control w-100' value={value} onChange={handleChange} placeholder={`🔍Search Student`} />
    </form>

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
              <th className='border p-3'>Stu ID</th>
              <th className='border p-3'>First Name</th>
              <th className='border p-3'>Last Name</th>
              <th className='border p-3'>Email</th>
              <th className='border p-3'>Role</th>
              <th className='border p-3'>Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {renderedData.length > 0 ? (
              renderedData
            ) : (
              <tr>
                <td colSpan="6" className="py-3 px-5 text-muted">
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Card Popup */}
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
            <div
              className=" p-4 rounded-4"
              style={{
                width: "50%",
                maxWidth: "600px",
                minWidth: "300px",
              }}
            >
              <Card refreshData={fetchdetails} />
            </div>
          </div>
        )}
      </div>
    </div>
    <nav className='text-center'>
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


  );
}

export default StudentsTable;
