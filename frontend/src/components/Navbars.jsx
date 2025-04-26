import { useContext } from "react";
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from "react-router-dom";  // Updated from 'react-router'
import { AdminContext } from "../context/AuthContext";


function Navbars() {
  const { user, logout, firstLogin } = useContext(AdminContext);  // Get user from context
  const navigate = useNavigate();


  const handleLogout = () => {
    logout();  // Call logout from context to update state
    navigate("/login");
  };

  return (
    <Navbar expand="lg" bg="white" className="px-0">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/login" className="fw-bold">

        </Navbar.Brand>

        {/* Toggle for small screens */}
        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar" className="justify-content-end">
          <Nav className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-2 ">
            {/* Not Logged In */}
            {/* {!user.isLoggedIn && (
            <>
              <Nav.Link as={NavLink} to="/signup">
                Register
              </Nav.Link> */}
            {/* <Nav.Link as={NavLink} to="/login">
                Login
              </Nav.Link>
            </>
          )} */}

            {/* Logged In */}
            {user.isLoggedIn && (
              <>
                <Nav.Link
                  as={NavLink}
                  to={
                    user.role === "admin"
                      ? "/admin-dashboard"
                      : user.role === "student"
                        ? "/student-dashboard"
                        : "/employee-dashboard"
                  }
                >
                  Dashboard
                </Nav.Link>

                {user.role === "admin" && (
                  <Nav.Link as={NavLink} to="/reports">
                    Reports
                  </Nav.Link>

                )}
                {user.role === "admin" && (
                  <Nav.Link as={NavLink} to="/Users">
                    Users
                  </Nav.Link>
                )}
                {/* {false && (
                  <Nav.Link as={NavLink} to="/reset-password">Reset Password</Nav.Link>
                )} */}

                <Nav.Link as={NavLink} to="/login" onClick={handleLogout}>
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;
