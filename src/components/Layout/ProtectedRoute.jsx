import React from 'react';
import { Navigate } from 'react-router-dom';
import { getFromStorage } from '../../utils/localStorage';

const ProtectedRoute = ({ children }) => {
  const user = getFromStorage('currentUser');
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;