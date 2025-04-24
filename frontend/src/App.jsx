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

import ResetPassword from "./components/ResetPassword";
import ConfirmMail from "./pages/ConfirmMail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <><Root /> </>,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      {path:"/resetpassword",element:<ResetPassword />},
      {path:"/confirmmail",element:<ConfirmMail />},
      
      {
        element: <ProtectedRoutes />,
        children: [
          { path: "/dashboard", element: <DashboardRedirect /> },
          { path: "/admin-dashboard", element: <AdminHome /> },
          { path: "/employee-dashboard", element: <EmployeeDashboard /> },
          { path: "/resetpassword", element: <ResetPassword /> },

          { path: "/student-dashboard", element: <EmployeeDashboard /> },


          { path: "/student-dashboard", element: <StudentDashboard /> },

          { path: "/reports", element: <Reports /> },

         
          


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
