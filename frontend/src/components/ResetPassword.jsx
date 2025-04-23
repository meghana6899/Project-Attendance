import React, {  useEffect } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const ResetPassword = () => {
    const [resetToken, setResetToken] = useState('')
    const location=useLocation();
    const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
    const [errors, setErrors] = useState({});
    const handleChange=(e)=>{
        console.log(e.target.value)
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    }
    useEffect(()=>{
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        if(token) {
            setResetToken(token);
        }else {
            console.log("Token not found in URL")
        }
    }, [location.search]);
    const handleSubmit = async(e) => {
        e.preventDefault();
        // Handle form submission logic here

        if(formData.password !== formData.confirmPassword) {
            setErrors({ ...errors, confirmPassword: "Passwords do not match" });
            return;
        }
        try{

            const response = await axios.post(`http://localhost:3000/api/resetpassword`, { token: resetToken, password: formData.password });
            if(response.data.success) {
                console.log("Password reset successfully")
                // Redirect to login or show success message
            } else {
                setErrors({ ...errors, password: response.data.message });
            }
        } catch (error) {
            console.error("Error resetting password:", error);
            setErrors({ ...errors, password: "An error occurred. Please try again." });
        }


    }
  return (
    <div className='reset-password-container'>
        <form className='reset-password-form' onSubmit={handleSubmit}>
            <h1>Reset Password</h1>
            <input type="password" name="password" placeholder='Enter your new password' onChange={handleChange} value={formData.password}/>
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}  
            <input type="password" name="confirmPassword" placeholder='Confirm your new password' onChange={handleChange} value={formData.confirmPassword}/>
            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
            <button type="submit">Reset Password</button>
        </form>
    </div>
  )
}

export default ResetPassword