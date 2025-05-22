import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAdmin } from '../context/AuthContext';
import '../CSS/styles.css';

const AddCard = ({ closecard }) => {
  const [candidate, setCandidate] = useState({
    user_id: '', email: '', role: '', first_name: '', last_name: '', password: 'Grad@123'
  });
  const [errors, setErrors] = useState({});
  const { setAdd, radio } = useAdmin();

  const modalRef = useRef(null);

  const handleChange = (e) => {
    setCandidate({ ...candidate, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {

      e.preventDefault();
      const response = await axios.post("/api/details/create/newusers/user", {
        user_id: candidate.user_id,
        email: candidate.email,
        role: candidate.role,
        first_name: candidate.first_name,
        last_name: candidate.last_name,
        password: candidate.password,
      }, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });

      if (response.status === 200) {
        setAdd(false);

      }
    } catch (err) {
      console.log(err.response.data.message);
      const errMessage = err.response.data.message || err.response.data.msg || err.response.data.error;
      setErrors({ ...errors, message: errMessage });
      console.log('got an error');
      console.log(err);
    }
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closecard();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closecard]);

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 1050 }}>
      <div ref={modalRef} className="bg-white p-4 rounded-4 shadow-lg position-relative" style={{ maxWidth: '500px', width: '90%' }}>

        {/* Close button */}
        <button
          type="button"
          className="btn-close position-absolute top-0 end-0 m-3"
          aria-label="Close"
          onClick={closecard}
        ></button>

        <div className="card-body">
          <form onSubmit={handleSubmit} id="candidateForm" className="p-4 rounded ">
            <div className="mb-3">
              <input
                type="text"
                id="user_id"
                name="user_id"
                placeholder="Enter New ID"
                value={candidate.user_id}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                id="first_name"
                name="first_name"
                placeholder="Enter First Name"
                value={candidate.first_name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                id="last_name"
                name="last_name"
                placeholder="Enter Last Name"
                value={candidate.last_name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email ID"
                value={candidate.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-4">
              {!radio && <div className="form-check form-check-inline">
                <input
                  type="radio"
                  id="student"
                  name="role"
                  value="student"
                  onChange={handleChange}
                  checked={candidate.role === 'student'}
                  className="form-check-input"
                  required
                />
                <label htmlFor="student" className="form-check-label">Student</label>
              </div>}
              {radio && <div className="form-check form-check-inline">
                <input
                  type="radio"
                  id="admin"
                  name="role"
                  value="admin"
                  onChange={handleChange}
                  checked={candidate.role === 'admin'}
                  className="form-check-input"
                  required
                />
                <label htmlFor="admin" className="form-check-label">Admin</label>
              </div>}
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  id="employee"
                  name="role"
                  value="employee"
                  onChange={handleChange}
                  checked={candidate.role === 'employee'}
                  className="form-check-input"
                  required
                />
                <label htmlFor="employee" className="form-check-label">Employee</label>
              </div>
            </div>

            <div className="text-end">
              <div><div className='text-danger text-start'>{errors.message}</div></div>
              <button type="submit" className="btn btn-primary">
                Add Candidate
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCard;
