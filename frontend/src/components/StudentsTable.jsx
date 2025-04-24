import React from 'react';
import AllStudents from '../api/queries/AllStudents';
import { useEffect, useState } from 'react';
import { useAdmin } from '../context/AuthContext';
import Card from './Card';
import AddCard from './AddCard';

function StudentsTable() {
  const [data, setData] = useState([]);
 




    const { employee, setEmployee,setShowcard,showcard ,add,setAdd,setRadio,radio} = useAdmin();
    setRadio(false);

  useEffect(() => {
    const fetchdetails = async () => {
      console.log('Fetch')
      try {
        const response = await AllStudents();
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
  }, [employee,add])
  console.log(data);
  const handleClick=(e)=>{
    const row=e.target.closest('tr');
    if (!row || row.rowIndex === 0) return;
    console.log(row);
    console.log(row.rowIndex-1);
    const rowIndex = row.rowIndex - 1;
    console.log(data[rowIndex])
    setEmployee(data[rowIndex]);
    setShowcard(true)
  };





  const renderedData = data.map(({ stu_id,first_name,last_name,email,role,join_date }, index) => {
    return (
      <tr key={index} className='px-5 py-5'>
        
        <td className='py-3 px-3'>{stu_id} </td>
        <td className='py-3 px-3'>{first_name} </td>
        <td className='py-3 px-3'>{last_name}  </td>
        <td className='py-3 px-3'>{email}</td>
        <td className='py-3 px-3'>{role}</td>
        <td className='py-3 px-3'>{join_date ? join_date.split('T')[0] : ""} </td>
       
      </tr>

    )
  });
  const handleAdd=()=>{
    if(add){
      setAdd(false)
    }
    else{
      setAdd(true)
    }
  }

  return (<>
    {/* ADD Button */}
    <div className="text-end mx-5   ">
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
              <th>Stu ID</th>
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
              className=" p-4 rounded-4"
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
  
    
  );
}

export default StudentsTable;
