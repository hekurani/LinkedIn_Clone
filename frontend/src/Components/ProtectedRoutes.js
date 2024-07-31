// src/components/ProtectedRoutes.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../utilities/getToken';

const ProtectedRoutes =  () => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/Login" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
