import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Root from "./pages/Root";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AdminHome from "./pages/AdminHome";
import StudentDashboard from "./pages/StudentDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

import DashboardRedirect from "./components/DashboardRedirect";
import CheckIncheckOut from "./pages/CheckIncheckOut";
import Reports from './pages/Reports';
import Reset from "./components/Reset";
import ResetPassword from "./components/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <><Root /><Navigate to="/login" /></>,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/forgetpassword", element: <Reset /> },
      { path: "/resetpassword", element: <ResetPassword /> },
      {
        element: <ProtectedRoutes />,
        children: [
          { path: "/dashboard", element: <DashboardRedirect /> },
          { path: "/admin-dashboard", element: <AdminHome /> },
          { path: "/employee-dashboard", element: <EmployeeDashboard /> },

          { path: "/student-dashboard", element: <EmployeeDashboard /> },


          { path: "/student-dashboard", element: <StudentDashboard /> },
<<<<<<< Updated upstream
          { path: "/reports", element: <Reports /> }

=======
          {path:"/reports",element:<Reports />},
          {path:"/resetpassword",element:<ResetPassword />},
          
>>>>>>> Stashed changes

        ],
      },


    ],

  },
  {
    path: "/checkIn",
    element: <CheckIncheckOut />
  }

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
