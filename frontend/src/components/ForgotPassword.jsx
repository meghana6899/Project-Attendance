import React from 'react'
import { useAdmin } from '../context/AuthContext';


function ForgotPassword() {
    const { setFirstLogin, firstLogin } = useAdmin
    const handleSubmit = async (event) => {
        event.preventDefault();
        localStorage.getItem('email')

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

                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            name="password"
                            className={`form-control `}
                            placeholder="Password"

                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" >Submit</button>
                </form>
            </div>

        </div >
    )
}



export default ForgotPassword
