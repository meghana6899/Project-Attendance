import { BrowserRouter as Router , Routes, Route } from "react-router";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";


function App() {
  return (<>
  <Router>
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/:role/dashboard" element={<Dashboard />}></Route>
    </Routes>
  </Router>
  </>);
}

export default App
