import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase/Firebase';

const auth = getAuth(app);

const ProtectedRoute = ({ children }) => {
  const user = auth.currentUser;

  if (!user) {
    return <Navigate to="/admin" />;
  }

  return children;
};

export default ProtectedRoute;
