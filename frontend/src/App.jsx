import { createBrowserRouter,RouterProvider } from "react-router";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Root from "./pages/Root";



function App() {
  const router=createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [ 
        {
        path:'/login',
        element:<Login />,
      },
      {
        path:'/signup',
        element:<Signup />,
      },
      {
        path:'*',
        element:< Login />
      },]

    }
   
  ])
  return (<>
 

  <RouterProvider router={router}/>
 
  </>);
}

export default App
