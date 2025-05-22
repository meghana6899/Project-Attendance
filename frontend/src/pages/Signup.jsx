import React, { useState } from 'react';
import axios from 'axios';
import { NavLink,Link } from 'react-router';  
import { useNavigate } from 'react-router';


function Signup() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate=useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    const { first_name, last_name, email, password, confirmPassword } = formData;

    if (!first_name) newErrors.firstName = 'First name is required';
    if (!last_name) newErrors.lastName = 'Last name is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!validate()) return;

   
    try{
        console.log("Sending formData:", formData);

        const response=await axios.post('/api/signup',formData);
        console.log(response);
        setMessage('Signup successful!');


        navigate('/login');


    }catch(err){
      if (err.response) {
        const { status, data } = err.response;
  
        if (status === 409) {
          setMessage(data.message || 'User already exists. Please log in.');
          console.log('USER ALREADY SIGNED UP');
        } else if (status === 404) {
          setMessage(data.message || 'Email not found. Please contact admin.');
          console.log('EMAIL NOT FOUND');
        } else {
          setMessage(data.message || 'Something went wrong. Please try again.');
          console.log('UNHANDLED ERROR:', data.message);
        }
  
      } 
    }
  
  };

  return (
    <>
    <div className="container d-flex justify-content-center align-items-center vh-70">
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '380px'  }}>
        <h3 className="text-center mb-3">Signup</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-1">
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="first_name"
              className={`form-control ${errors.first_name && 'is-invalid'}`}
              value={formData.first_name}
              onChange={handleChange}
            />
            {errors.first_name && <div className="invalid-feedback">{errors.first_name}</div>}
          </div>

          <div className="mb-1">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="last_name"
              className={`form-control ${errors.last_name && 'is-invalid'}`}
              value={formData.last_name}
              onChange={handleChange}
            />
            {errors.last_name && <div className="invalid-feedback">{errors.last_name}</div>}
          </div>

          <div className="mb-1">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email && 'is-invalid'}`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-1">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className={`form-control ${errors.password && 'is-invalid'}`}
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <div className="mb-2">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className={`form-control ${errors.confirmPassword && 'is-invalid'}`}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>
        
        {message && <p className="text-center text-warning mt-3">{message}</p>}
        <div className="text-center mb-4"> Already have an account?  <Link to='/login'>Login</Link> </div>
      </div>
    </div>
    </>
   
  );
}

export default Signup;
