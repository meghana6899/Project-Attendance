import React, { useState } from 'react';
import { NavLink,Link } from 'react-router';
import { useNavigate } from 'react-router';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' ,role:''});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate=useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.role) {
        newErrors.role = 'Select one ';
      }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      // Simulated API call
      const fakeResponse = {
        status: 200,
        data: {
          token: 'abc123',
          user: { name: 'John Doe', email: formData.email },
        },
      };

      if (fakeResponse.status === 200) {
        setMessage('Login successful!');
        console.log('Token:', fakeResponse.data.token);
        navigate(`/${formData.role}/dashboard`)
        
      }
    } catch (err) {
      setMessage('Login failed. Try again.',err);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email && 'is-invalid'}`}
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className={`form-control ${errors.password && 'is-invalid'}`}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <div className="mb-3">
        <label htmlFor="role" className="form-label">Login as</label>
        <select
          className="form-select"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="">Select role</option>
          <option value="admin">Admin</option>
          <option value="employees">Employee</option>
          <option value="students">Student</option>
        </select>
        {errors.role && <div className="text-danger">{errors.role}</div>}
      </div>


          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        {message && <p className="text-center mt-3">{message}</p>}
        <div className="text-center mb-4"> Create account ?  <NavLink to='/signup'>Signup</NavLink> </div>
        

      </div>
    </div>
  );
}

export default Login;
