
import AvgHours from "../api/queries/AvgHours";
import { useState, useEffect } from "react";
import { useAdmin } from "../context/AuthContext";
import updateDetails from "../api/queries/updateDetails";
import DeleteUser from "../api/queries/DeleteUser";




const Card = () => {
  const [data, setData] = useState();
  // const [id,setId]=useState();
  const [userDelete, setuserDelete] = useState(false);

  const { employee, setEmployee, setShowcard, setAccept } = useAdmin();
  const [save, setSave] = useState(false);
  const user_id = employee && 'stu_id' in employee ? 'stu_id' : 'emp_id';
  const userValue = employee?.[user_id];

  const [edit, setEdit] = useState({ first_name: true, last_name: true, email: true, role: true });
  const [editData, setEditData] = useState({ user_id: '', first_name: '', last_name: '', email: '', role: '' });
  useEffect(() => {
    if (employee) {
      setEditData({
        user_id: userValue || '',
        first_name: employee.first_name || '',
        last_name: employee.last_name || '',
        role: employee.role || '',
        email: employee.email || ''
      });
    }
  }, [employee, userValue]);


  useEffect(() => {
    const fetchdetails = async () => {
      if (!userValue) return;


      try {
        const response = await AvgHours(userValue);

        setData(response)



      } catch (err) {
        console.log(err)
      }
    }
    fetchdetails()
  }, [userValue, employee])


  const handleChange = (e, field) => {
    setEditData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    setSave(true);
  };



  // const handleEdit=()=>{
  //   setEdit(false);
  //   setSave(true);
  // }

  const handleDelete = async () => {
    setShowcard(false)
    setAccept(true);
  }



  const handleSave = async () => {
    const response = await updateDetails(userValue, editData);

    if (response.status === 200) {

      setEmployee((prev) => ({
        ...prev,
        first_name: editData.first_name,
        last_name: editData.last_name,
        role: editData.role,
        email: editData.email,
      }));
      setEdit(true);
      setShowcard(false);
    }


  }




  return (<div className="card shadow-lg border-0 rounded-4 p-3 mx-auto" style={{ maxWidth: "600px" }}>

    <div
      className="card-header text-white text-center rounded-3"
      style={{
        background: 'linear-gradient(135deg, #4A00E0, #8E2DE2)',
        border: 'none',
      }}
    >
      <h5 className="mb-0 fw-bold">Candidate Information</h5>
    </div>

    <div className="card-body">
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          <strong>ID:</strong>
          <input
            type="text"
            value={edit ? userValue || "" : editData.user_id}
            disabled
            onChange={(e) => handleChange(e, 'user_id')}
            className="form-control form-control-sm w-50"
          />
        </li>

        <li className="list-group-item d-flex justify-content-between align-items-center">
          <strong>First Name:</strong>
          {edit.first_name ? (
            <p
              className="form-control form-control-sm w-50 mb-0"
              onDoubleClick={() =>
                setEdit((prev) => ({ ...prev, first_name: false }))
              }
              style={{ cursor: "pointer" }}
            >
              {employee?.first_name || ""}
            </p>
          ) : (
            <input style={{ 'border': 'none', 'outline': 'none' }}
              type="text"
              value={editData.first_name}
              onChange={(e) => handleChange(e, "first_name")}
              onBlur={() =>
                setEdit((prev) => ({ ...prev, first_name: true }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setEdit((prev) => ({ ...prev, first_name: true }));
                }
              }}
              className="form-control form-control-sm w-50"
              autoFocus
            />
          )}
        </li>


        <li className="list-group-item d-flex justify-content-between align-items-center">
          <strong>Last Name:</strong>
          {edit.last_name ? (
            <p
              className="form-control form-control-sm w-50 mb-0"
              onDoubleClick={() =>
                setEdit((prev) => ({ ...prev, last_name: false }))
              }
              style={{ cursor: "pointer" }}
            >
              {employee?.last_name || ""}
            </p>
          ) : (
            <input
              type="text"
              value={editData.last_name}
              onChange={(e) => handleChange(e, "last_name")}
              onBlur={() =>
                setEdit((prev) => ({ ...prev, last_name: true }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setEdit((prev) => ({ ...prev, last_name: true }));
                }
              }}
              className="form-control form-control-sm w-50"
              autoFocus
            />
          )}
        </li>

        <li className="list-group-item d-flex justify-content-between align-items-center">
          <strong>Email :</strong>
          {edit.email ? (
            <p
              className="form-control form-control-sm w-50 mb-0"
              onDoubleClick={() =>
                setEdit((prev) => ({ ...prev, email: false }))
              }
              style={{ cursor: "pointer" }}
            >
              {employee?.email || ""}
            </p>
          ) : (
            <input
              type="text"
              value={editData.email}
              onChange={(e) => handleChange(e, "email")}
              onBlur={() =>
                setEdit((prev) => ({ ...prev, email: true }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setEdit((prev) => ({ ...prev, email: true }));
                }
              }}
              className="form-control form-control-sm w-50"
              autoFocus
            />
          )}
        </li>

        <li className="list-group-item d-flex justify-content-between align-items-center">
          <strong>Role :</strong>
          {edit.role ? (
            <p
              className="form-control form-control-sm w-50 mb-0"
              onDoubleClick={() =>
                setEdit((prev) => ({ ...prev, role: false }))
              }
              style={{ cursor: "pointer" }}
            >
              {employee?.role || ""}
            </p>
          ) : (
            <input
              type="text"
              value={editData.role}
              onChange={(e) => handleChange(e, "role")}
              onBlur={() =>
                setEdit((prev) => ({ ...prev, role: true }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setEdit((prev) => ({ ...prev, role: true }));
                }
              }}
              className="form-control form-control-sm w-50"
              autoFocus
            />
          )}
        </li>


        <li className="list-group-item d-flex justify-content-between">
          <strong>Joining Date:</strong>
          <span>{employee?.join_date?.split("T")[0]}</span>
        </li>

        <li className="list-group-item d-flex justify-content-between">
          <strong>Total Working Hours:</strong>
          <span>{data?.total || "00:00:00"}</span>
        </li>

        <li className="list-group-item d-flex justify-content-between">
          <strong>Active Working Hours:</strong>
          <span>{data?.active || "00:00:00"}</span>
        </li>

        <li className="list-group-item d-flex justify-content-between">
          <strong>Total Break Hours:</strong>
          <span>{data?.breakk || "00:00:00"}</span>
        </li>
      </ul>

      <div className="d-flex flex-wrap justify-content-end gap-2 mt-4">
        {/* {!save && (
          <button
            className="btn btn-outline-primary"
            id="edit"
            onClick={handleEdit}
          >
            Edit
          </button>
        )} */}
        {save && (
          <button
            className="btn btn-outline-success"
            id="save"
            onClick={handleSave}
          >
            Save
          </button>
        )}
        <button
          className="btn btn-outline-danger"
          id="delete"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className="btn btn-outline-secondary"
          id="close"
          onClick={() => {
            setShowcard(false);
            setEdit(true);
          }}
        >
          Close
        </button>
      </div>
    </div>
  </div>





  )
}

export default Card