import React from 'react'
import { NavLink,Link } from 'react-router'

function Navbar() {
  const role=localStorage.getItem('role');
  const isLoggedIn=localStorage.getItem('loggedIn');
  const handlelogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('role') 

  }

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light  justify-content-end px-3">
      <div className="d-flex justify-content-end w-100">
        
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">

            {isLoggedIn !=='true' && <>
              <li className="nav-item active">
              <NavLink className="nav-link" to="/signup">Register</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>
            </>
            }
            {isLoggedIn ==='true' && role==='admin' ? <>
              <li className="nav-item">
              <NavLink className="nav-link" to="/" onClick={handlelogout}>Logout</NavLink>
            </li></>}








            <li className="nav-item">
            <NavLink
                className="nav-link"
                to={
                  role === 'admin' ? '/admin-dashboard' 
                  : role === 'student' ? '/student-dashboard' 
                  : '/employee-dashboard'
                  }> 
                Dashboard 
            </NavLink>

            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/" onClick={handlelogout}>Logout</NavLink>
            </li>
            
            
          </ul>
        </div>
      </div>
    </nav>
  </>
  
  )
}

export default Navbar