import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AuthContext";

const DashboardRedirect = () => {
  
    const { user } = useAdmin();
  const navigate = useNavigate();
 

  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin-dashboard");
    } else if (user?.role === "employee") {
      navigate("/employee-dashboard");
    } else if (user?.role === "student") {
      navigate("/student-dashboard");
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  return null;
  
}

export default DashboardRedirect