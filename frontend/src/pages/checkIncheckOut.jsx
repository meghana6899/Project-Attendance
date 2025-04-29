import React, { useState, useEffect } from 'react'
import { useAdmin } from '../context/AuthContext'
import axios from 'axios';
import CheckInTable from '../components/CheckInTable';
import '../CSS/toaster.css'

function CheckIncheckOut() {

    // const { setIsCheckedIn, isCheckedIn } = useAdmin()
    // const { login } = useAdmin();

    const [formData, setFormData] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const [toaster, setToaster] = useState(false);
    const [toast, setToast] = useState("")

    const handleChange = (e) => {

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


    const handleSubmit = async (type) => {
     

        setFormData({});
        if (!validate()) return;


        try {
            if(type==='checkin'){
            const response = await axios.post('http://localhost:3000/api/checkin', {
                user_id: formData.username,
                password: formData.password
            })
            console.log(response);
            console.log('aprtition beyabsjgkasg');
            if (response.data.success) {

                setFormData({ ...formData, password: "", username: "" })
                setToast("Checkin Successful")
                setToaster(true)
                setTimeout(() => {
                    setToaster(false)
                }, 1000)
            }
            else{

                
                setFormData({ ...formData, password: "", username: "" })
                setMessage('checkin is already Done')
            }
        }else if(type==='checkout'){
            const response = await axios.post('http://localhost:3000/api/checkout', {
                user_id: formData.username,
                password: formData.password
            })
            console.log(response.data.success);
            if (response.data.success) {

                setFormData({ ...formData, password: "", username: "" })
                setToast("Checkout Successful")
                setToaster(true)
                setTimeout(() => {
                    setToaster(false)
                }, 1000)
            }
            else{
                setFormData({ ...formData, password: "", username: "" })
                setMessage("Checkout is already Done")
            }
            

        }


        } catch (error) {


            console.log("Catch", error)
            setMessage(error.response?.data?.message || error.response?.data?.msg)
            setFormData({ ...formData, password: "" })
           

        }

    };
   


    return (
        <>
            <div className={`toast-message bg-success text-white ${toaster ? 'show' : ''}`}>
                {toast}
            </div>



            <div div className="d-flex justify-content-center vh-90 m-5" >
                <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
                    <h3 className="text-center mb-4">Check-In/Check-Out</h3>
                    
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
                        <div className='d-flex gap-3 mt-3'>
                        <input type="submit" className="btn btn-primary w-100" value="Checkin" onClick={()=>handleSubmit('checkin')}/>
                        <input type="submit" className="btn btn-danger w-100" value="Checkout" onClick={()=>handleSubmit('checkout')}/>
                        </div>

                       
                    

                    {message && <p className="text-center mt-3 text-danger">{message}</p>}

                </div>

            </div>
        </>
    );
}




export default CheckIncheckOut
