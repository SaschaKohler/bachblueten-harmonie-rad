import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute = () => {
  const { user } = useAuth();
  console.log("Protected Route", user);

  if (!user) {
    console.log("Protected Route - Redirecting to auth");
    return <Navigate to="/auth" replace />;
  }

  console.log("Protected Route - Rendering Outlet");
  return <Outlet />;
};

export default ProtectedRoute;
