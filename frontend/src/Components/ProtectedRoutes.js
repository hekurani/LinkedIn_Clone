// src/components/ProtectedRoutes.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../utilities/getToken";
import { clearTokens } from "../utilities/auth/clearTokens";

const ProtectedRoutes = ({ roles = [] }) => {
  const payload = getToken();
  if (!payload ||  !roles.includes(payload.role)) {
    clearTokens();
    return <Navigate to="/Login" />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
