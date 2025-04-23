import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AuthContext";
import axios from "axios";
import { jwtDecode } from 'jwt-decode'

function Login() {
 
  const { login, flag, setFlag } = useAdmin();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (isExpired) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login")
        return;
      }

      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        login(storedUser);
        redirectBasedOnRole(storedUser.role);
      }
    }
  }, [login]);

  const redirectBasedOnRole = (role) => {
    if (role === "admin") {
      navigate("/admin-dashboard");
    } else if (role === "employee") {
      navigate("/employee-dashboard");
    } else if (role === "student") {
      navigate("/student-dashboard");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setMessage("");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // if (!formData.role) {
    //   newErrors.role = "Select one";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email: formData.email,
        password: formData.password,

      });

      console.log(response.data.passwordreset, 'reponse is here');

      // console.log(response)

      if (response.data)
 


      if (response.data.success) {
        const userData = {
          role: response.data.role,
          isLoggedIn: true,
          id: response.data.id,
        

        };
        if(response.data.flag===0){
          setFlag(true);
        }
        else{
          setFlag(false);
        }




          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(userData));
          login(userData);
          redirectBasedOnRole(response.data.role);

          // setFirstLogin(response.data.passwordreset)




        }

    }


    catch (error) {

      if (error.response && !error.response.data.success) {
        setMessage(error.response.data.message || error.response.data.msg);
        console.log(error);
      } else {
        setMessage("User with  this email and password not found  ");
      }
      // setMessage(`${error.response.data.msg}`);
    }
  };
  // console.log(formData, 'here is form data')

  return (
    <div className="container d-flex justify-content-center align-items-center vh-70 vw-100 my-5">

      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Enter email"
              value={formData.email}
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


          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>

        {message && <p className="text-center mt-3 text-danger">{message}</p>}

      </div>
    </div>
  );
}

export default Login;
