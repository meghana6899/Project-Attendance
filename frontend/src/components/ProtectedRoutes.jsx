import React from 'react'
import { Navigate, Outlet } from 'react-router';

const ProtectedRoutes = () => {
  const isLoggedin = localStorage.getItem('loggedIn');
  const role = localStorage.getItem('role')


  return (

    isLoggedin === 'true' ? <Outlet /> : <Navigate to='/login' />
    // isLoggedin === 'true' ? <Navigate to={`/${role}-dashboard`} /> : <Navigate to='/login' />

  )
}

export default ProtectedRoutes