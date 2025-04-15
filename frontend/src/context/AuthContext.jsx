import { createContext, useState, useEffect,useContext,useCallback } from "react";

// Create context with default values to prevent null
const defaultContextValue = {
  user: { role: '', isLoggedIn: false },
  setUser: () => {},
  login: () => {},
  logout: () => {},

};

export const AdminContext = createContext(defaultContextValue);

export const AdminProvider = ({ children }) => {
  const [user, setUser] = useState({ role: '', isLoggedIn: false });

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
    <AdminContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};
export const useAdmin = () => useContext(AdminContext);