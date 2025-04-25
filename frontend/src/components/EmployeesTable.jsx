import React from 'react';
import AllEmployees from '../api/queries/AllEmployees';
import { useEffect, useState } from 'react';
import { useAdmin } from '../context/AuthContext';
import Card from './Card';
import AddCard from './AddCard';
import DeleteUser from '../api/queries/DeleteUser';

function EmployeesTable() {
  const [data, setData] = useState([]);


  const { setEmployee, employee, setShowcard, showcard, add, accept, setAccept, setAdd, setRadio } = useAdmin();
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
  setRadio(true);



  var response;
  useEffect(() => {
    const fetchdetails = async () => {
      console.log('Fetch')
      try {
        response = await AllEmployees();

        console.log(response);
        if (Array.isArray(response)) {
          setData(response)
        } else if (typeof response === 'object') {
          console.log("Its an object")
        } else {
          setData([response])
        }

      } catch (err) {
        console.log(err)
      }
    }
    fetchdetails()
  }, [employee, add])
  console.log(data);
  console.log('here is the event target');

  const handleClick = (e) => {
    const row = e.target.closest('tr');
    if (!row || row.rowIndex === 0) return;
    console.log(row);
    console.log(row.rowIndex - 1);
    const rowIndex = row.rowIndex - 1;
    console.log(data[rowIndex])
    setEmployee(data[rowIndex]);
    setShowcard(true)
  };




  const renderedData = data.map(({ emp_id, first_name, last_name, email, role, join_date }, index) => {
    return (
      <tr key={index} className='px-5 py-5'>

        <td className='py-3 px-3'>{emp_id}</td>
        <td className='py-3 px-3'>{first_name}</td>
        <td className='py-3 px-3'>{last_name}</td>
        <td className='py-3 px-3'>{email}</td>
        <td className='py-3 px-3'>{role}  </td>
        <td className='py-3 px-3'>{join_date ? join_date.split('T')[0] : ""}</td>


      </tr>

    )
  });

  const handleAdd = () => {
    if (add) {
      setAdd(false);
    } else {
      setAdd(true);
    }

  }


  return (<><div className="text-end  mx-5">
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
          <thead
            style={{
              backgroundColor: "#343a40",
              color: "white",
              fontSize: "1rem",
            }}
          >
            <tr>
              <th>Emp ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined Date</th>
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
              className="p-4 rounded-4 "
              style={{
                width: "50%",
                maxWidth: "600px",
                minWidth: "300px",
              }}
            >
              <Card />
            </div>
          </div>
        )}
      </div>
    </div>
  </>
  )
}

export default EmployeesTable;
