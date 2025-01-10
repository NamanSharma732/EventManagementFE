import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { isLoggedIn, userData } from "../Redux/auth/authSlice"; 

const PrivateRoute = ({ children, requiredRole }) => {
  const loggedIn = useSelector(isLoggedIn);
  const user = useSelector(userData); 

  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />; 
  }

  return children;
};

export default PrivateRoute;
