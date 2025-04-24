import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const ResetPassword = () => {
    const [resetToken, setResetToken] = useState('')
    const location = useLocation();
    const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
    const [errors, setErrors] = useState({});
    const Navigate = useNavigate()
    const handleChange = (e) => {
        console.log(e.target.value)
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    }
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        if (token) {
            setResetToken(token);
        } else {
            console.log("Token not found in URL")
        }
    }, [location.search]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here

        if (formData.password !== formData.confirmPassword) {
            setErrors({ ...errors, confirmPassword: "Passwords do not match" });
            return;
        }
        try {

            const response = await axios.post(`http://localhost:3000/api/resetpassword`, { token: resetToken, password: formData.password });
            console.log(response)
            if (response.data.success) {
                console.log("Password reset successfully")
                // Redirect to login or show success message
                const resset = await axios.post(`http://localhost:3000/api/auth/reset-flag`, {
                    email: response.data.email,

                });

                Navigate('/login')
            } else {
                setErrors({ ...errors, password: response.data.message });
            }
        } catch (error) {
            console.error("Error resetting password:", error);
            setErrors({ ...errors, password: "An error occurred. Please try again." });
        }


    }
    return (
        <div className='container d-flex justify-content-center align-items-center vh-70 vw-100 my-5'>
            <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
                <h3 className='text-secondary'>Reset Password</h3>
                <form onSubmit={handleSubmit} >
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">New Password</label>
                        <input
                            type="password"
                            name="password"
                            className={`form-control `}
                            placeholder="Password"
                            onChange={handleChange}
                            value={formData.password} />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className={`form-control `}
                            placeholder="Password"
                            onChange={handleChange}
                            value={formData.confirmPassword}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" >Submit</button>
                </form>
            </div>

        </div >
    )
}

export default ResetPassword