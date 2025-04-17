import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Root from "./pages/Root";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AdminHome from "./pages/AdminHome";
import StudentDashboard from "./pages/StudentDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import DashboardRedirect from "./components/DashboardRedirect"; 


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      {
        element: <ProtectedRoutes />,
        children: [
          { path: "/dashboard", element: <DashboardRedirect /> }, 
          { path: "/admin-dashboard", element: <AdminHome /> },
          { path: "/employee-dashboard", element: <EmployeeDashboard /> },
          { path: "/student-dashboard", element: <StudentDashboard /> },
          
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
