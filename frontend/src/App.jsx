import { createBrowserRouter,RouterProvider } from "react-router";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";



function App() {
  const router=createBrowserRouter([
    {path:'/login',
      element:<Login />,
      children:{
        
      }
    },
    {
      path:'/signup',
      element:<Signup />,
    },
    {
      path:'*',
      element:< Login />
    },
  ])
  return (<>
 

  <RouterProvider router={router}/>
 
  </>);
}

export default App
