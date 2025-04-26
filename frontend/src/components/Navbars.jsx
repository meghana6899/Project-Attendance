import { useContext } from "react";
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from "react-router-dom";  // Updated from 'react-router'
import { AdminContext } from "../context/AuthContext";
import '../CSS/Users.css'


function Navbars() {
  const { user, logout, firstLogin } = useContext(AdminContext);  // Get user from context
  const navigate = useNavigate();


  const handleLogout = () => {
    logout();  // Call logout from context to update state
    navigate("/login");
  };

  return (
    <nav className="bg-white py-3">
    <Container className="d-flex justify-content-end align-items-center gap-4">
      
      {/* Logged In */}
      {user.isLoggedIn && (
        <>
          <NavLink
            to={
              user.role === "admin"
                ? "/admin-dashboard"
                : user.role === "student"
                ? "/student-dashboard"
                : "/employee-dashboard"
            }
            className="nav-link-custom"
          >
            Dashboard
          </NavLink>

          {user.role === "admin" && (
            <NavLink to="/reports" className="nav-link-custom">
              Reports
            </NavLink>
          )}

          {user.role === "admin" && (
            <NavLink to="/users" className="nav-link-custom">
              Users
            </NavLink>
          )}

          <NavLink to="/login" className="nav-link-custom" onClick={handleLogout}>
            Logout
          </NavLink>
        </>
      )}
      
    </Container>

    
    </nav>
  );
}

export default Navbars;
