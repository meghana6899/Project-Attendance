import React, { useState, useEffect } from 'react'
import { useAdmin } from '../context/AuthContext'
import axios from 'axios';
import CheckInTable from '../components/CheckInTable';

function checkIncheckOut() {

    const { setIsCheckedIn, isCheckedIn } = useAdmin()
    const { login } = useAdmin();
    const [formData, setFormData] = useState({ email: "", password: "", role: "" });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = "Id is required";
        } else if (!/^(E00\d+|S00\d+)$/.test(formData.email)) {
            newErrors.email = "Id is invalid";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!formData.role) {
            newErrors.role = "Select one";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const response = await axios.post('http://localhost:3000/api/checkin', {
                user_id: formData.email,
                password: formData.password
            })
            setIsCheckedIn(!isCheckedIn)
            console.log(response)
        } catch (error) {
            console.log("Error", error)
        }

    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-70 m-5">
            <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
                <h3 className="text-center mb-4">Check In</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Your ID</label>
                        <input
                            type="text"
                            name="email"
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            placeholder="Enter Id"
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
                            className={`form-control ${errors.password ? "is-invalid" : ""}`}
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="role" className="form-label">Login as</label>
                        <select
                            className={`form-select ${errors.role ? "is-invalid" : ""}`}
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="">Select role</option>
                            <option value="employee">Employee</option>
                            <option value="student">Student</option>
                        </select>
                        {errors.role && <div className="invalid-feedback">{errors.role}</div>}
                    </div>

                    <input type="submit" className="btn btn-primary w-100" value="Submit" />
                </form>

                {message && <p className="text-center mt-3 text-danger">{message}</p>}

            </div>
        </div>
    );
}




export default checkIncheckOut
