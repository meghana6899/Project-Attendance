import React, { useState, useEffect } from 'react'
import { useAdmin } from '../context/AuthContext'
import axios from 'axios';
import CheckInTable from '../components/CheckInTable';

function checkIncheckOut() {

    const { setIsCheckedIn, isCheckedIn } = useAdmin()
    const { login } = useAdmin();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const [toaster, setToaster] = useState(false);
    let toast;

    const handleChange = (e) => {
        console.log(e.target.value)
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
        setMessage('');
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.username) {
            newErrors.username = "Id is required";
        } else if (!/^(E00\d+|S00\d+)$/.test(formData.username)) {
            newErrors.username = "Id is invalid";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)

        if (!validate()) return;


        try {
            const response = await axios.post('http://localhost:3000/api/checkin', {
                user_id: formData.username,
                password: formData.password
            })
            if (response) {
                toast = `<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
              <img src="..." class="rounded mr-2" alt="...">
              <strong class="mr-auto">Bootstrap</strong>
              <small>11 mins ago</small>
              <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="toast-body">
              Hello, world! This is a toast message.
            </div>
          </div>`
                setToaster(true)
            }
            console.log("Response", response)


        } catch (error) {

            console.log("Catch", error.response?.data || error.message)
            setMessage(error?.response?.data?.msg)
            setFormData({ ...formData, password: "" })

        }

    };

    return (
        <>
            {toaster && <div>{toast}</div>}

            <div div className="d-flex justify-content-center vh-90 m-5" >
                <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
                    <h3 className="text-center mb-4">Check In</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Your ID</label>
                            <input
                                type="text"
                                name="username"
                                className={`form-control ${errors.username ? "is-invalid" : ""}`}
                                placeholder="Enter Id"
                                value={formData.username}
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

                        <input type="submit" className="btn btn-primary w-100" value="Submit" />
                    </form>

                    {message && <p className="text-center mt-3 text-danger">{message}</p>}

                </div>
            </div>
        </>
    );
}




export default checkIncheckOut
