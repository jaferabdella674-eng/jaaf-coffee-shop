import React from 'react'
import { useAuth } from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
function ProtectedRouter({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
   
}

export default ProtectedRouter;