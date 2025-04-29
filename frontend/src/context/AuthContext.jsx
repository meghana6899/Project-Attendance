

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
  employee: {},
  setEmployee: () => { },
  showcard: {},
  setShowcard: () => { },
  flag: false,
  setFlag: () => { },
  email: '',
  setEmail: () => { },
  radio: false,
  setRadio: () => { },
  isCheckedIn: true,
  setIsCheckedIn: () => { },
  apply: true,
  setApply: () => { },
};

export const AdminContext = createContext(defaultContextValue);

export const AdminProvider = ({ children }) => {
  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const [accept, setAccept] = useState(false);
  const [user, setUser] = useState({ role: '', isLoggedIn: false, id: '' });
  const dateInput = new Date().getDate();
  const monthInput = new Date().getMonth() + 1;
  const yearInput = new Date().getFullYear();
  const [date, setDate] = useState(
    `${yearInput}-${String(monthInput).padStart(2, '0')}-${String(dateInput).padStart(2, '0')}`
  );

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [avgactiveHours, setAvgActiveHours] = useState('00:00:00');
  const [avgbreakHours, setAvgBreakHours] = useState('00:00:00');
  const [avgtotalHours, setAvgTotalHours] = useState('00:00:00');
  const [employee, setEmployee] = useState({});
  const [showcard, setShowcard] = useState(false);
  const [add, setAdd] = useState(false);
  const [flag, setFlag] = useState(false);
  const [email, setEmail] = useState('');
  const [radio, setRadio] = useState(false);
  const [apply, setApply] = useState(true);
  const [dashBoard, setdashBoard] = useState(false);
  const [selection, setSelection] = useState('');
  const [selectLine, setSelectLine] = useState('')
  const [activeHours, setActiveHours] = useState("00:00:00")
  const [breakHours, setBreakHours] = useState('00:00:00')
  const [totalHours, setTotalHours] = useState('00:00:00');
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser({ ...userData, isLoggedIn: true });
      } catch (error) {
        console.error("Error parsing stored user data:", error);
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
    <AdminContext.Provider value={{
      user, setUser, login, logout, date, setDate, checkIn, setCheckIn, checkOut, setCheckOut,
      setEndDate, setStartDate, endDate, startDate, avgactiveHours, avgbreakHours, avgtotalHours,
      setAvgActiveHours, setAvgBreakHours, setAvgTotalHours, isCheckedIn, setIsCheckedIn, employee, apply, setApply,
      setEmployee, showcard, setShowcard, add, setAdd, activeHours, setActiveHours, breakHours,
      setBreakHours, accept, setAccept, dashBoard, setdashBoard, selection, setSelection,
      totalHours, setTotalHours, flag, setFlag, email, setEmail, radio, setRadio, selectLine, setSelectLine
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
