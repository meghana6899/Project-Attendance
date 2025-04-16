import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAdmin } from '../context/AuthContext';

const ProtectedRoutes = () => {
  const { user } = useAdmin();

  // Optional: show loading screen or skeleton if needed
  if (!user) return null;

  return user.isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
