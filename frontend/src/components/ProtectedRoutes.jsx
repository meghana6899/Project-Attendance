import React from 'react'
import { Navigate, Outlet } from 'react-router';

const ProtectedRoutes = () => {
    const isLoggedin=localStorage.getItem('loggedIn');


  return (
   
   isLoggedin==='true'?<Outlet />:<Navigate to='/login'/>

  )
}

export default ProtectedRoutes