import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";  // Updated from 'react-router'
import { AdminContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AdminContext);  // Get user from context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();  // Call logout from context to update state
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light justify-content-end px-3">
      <div className="d-flex justify-content-end w-100">
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {/* Show Register and Login links if user is not logged in */}
            {!user.isLoggedIn && (
              <>
                <li className="nav-item active">
                  <NavLink className="nav-link" to="/signup">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              </>
            )}

            {/* Show Dashboard and Logout links if user is logged in */}
            {user.isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to={
                      user.role === "admin"
                        ? "/admin-dashboard"
                        : user.role === "student"
                        ? "/student-dashboard"
                        : "/employee-dashboard"
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login" onClick={handleLogout}>
                    Logout
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
