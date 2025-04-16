import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Root from "./pages/Root";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AdminHome from "./pages/AdminHome";
import StudentDashboard from "./pages/StudentDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

function App() {
  const role = localStorage.getItem("role");

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          element: <ProtectedRoutes />,
          children: [
            ...(role === "admin"
              ? [
                {
                  path: "/admin-dashboard",
                  element: <AdminHome />,
                },
                {
                  path: "/students-report", // if needed change this 
                  element: <StudentDashboard />
                },
                {
                  path: "*",
                  element: <Navigate to="/admin-dashboard" />,
                },
              ]
              : role === "student"
                ? [
                  {
                    path: "/student-dashboard",
                    element: <StudentDashboard />,
                  },
                  {
                    path: "*",
                    element: <Navigate to="/student-dashboard" />,
                  },
                ]
                : role === "employee"
                  ? [
                    {
                      path: "/employee-dashboard",
                      element: <EmployeeDashboard />
                    },
                    {
                      path: "*",
                      element: <Navigate to="/employee-dashboard" />,
                    },
                  ]
                  : [
                    {
                      path: "*",
                      element: <Navigate to="/login" />,
                    },

                  ]),
          ],
        },
      ],
    },
    {
      path: "*",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;


