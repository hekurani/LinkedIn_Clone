// src/components/ProtectedRoutes.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../utilities/getToken";

const ProtectedRoutes = ({ role }) => {
  const payload = getToken();
  if (!payload || !payload?.roles.find((el) => el.role === role)) {
    return <Navigate to="/Login" />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
