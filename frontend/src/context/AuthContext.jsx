import { createContext, useState, useEffect, useContext, useCallback } from "react";

// Create context with default values to prevent null
const defaultContextValue = {
  user: { role: '', isLoggedIn: false, id: '' },
  setUser: () => { },
  login: () => { },
  logout: () => { },
  date: '',
  setDate: () => { },
  checkIn: '',
  setCheckIn: () => { },
  checkOut: '',
  setCheckOut: () => { },
  startDate: '',
  setStartDate: () => { },
  endDate: '',
  setEndDate: () => { },
  activeHours: '',
  setActiveHours: () => { },
  breakHours: '',
  setBreakHours: () => { },
  totalHours: '',
  setTotalHours: () => { },

};

export const AdminContext = createContext(defaultContextValue);
const dateInput = new Date().getDate();
const monthInput = new Date().getMonth() + 1;
const yearInput = new Date().getFullYear()

export const AdminProvider = ({ children }) => {
  const [isCheckedIn, setIsCheckedIn] = useState(true)
  const [user, setUser] = useState({ role: '', isLoggedIn: false });
  const [date, setDate] = useState(
    `${yearInput}-${String(monthInput).padStart(2, '0')}-${String(dateInput).padStart(2, '0')}`
  );


  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [avgactiveHours, setAvgActiveHours] = useState("");
  const [avgbreakHours, setAvgBreakHours] = useState('')
  const [avgtotalHours, setAvgTotalHours] = useState('')

  // Check for existing user data in localStorage on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser({ ...userData, isLoggedIn: true });
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        // Clear invalid data
        localStorage.removeItem("user");
      }
    }

  }, []);

  const login = useCallback((userData) => {
    setUser({ ...userData, isLoggedIn: true });
  }, []);


  const logout = () => {
    setUser({ role: '', isLoggedIn: false });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AdminContext.Provider value={{ user, setUser, login, logout, date, setDate, checkIn, setCheckIn, checkOut, setCheckOut, setEndDate, setStartDate, endDate, startDate, avgactiveHours, avgbreakHours, avgtotalHours, setAvgActiveHours, setAvgBreakHours, setAvgTotalHours, isCheckedIn, setIsCheckedIn }}>
      {children}
    </AdminContext.Provider>
  );
};







export const useAdmin = () => useContext(AdminContext);