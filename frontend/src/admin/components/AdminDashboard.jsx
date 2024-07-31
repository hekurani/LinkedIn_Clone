import React, { useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSideBar from "./AdminSideBar";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
const AdminDashboard = () => {
    const [page, setPage] = useState("dashboard");
  return (
    <>
      <AdminHeader />
      <div className="flex">
      <AdminSideBar  setPage={setPage}/>
      {page === "dashboard" && <Dashboard />}
      {page === "users" && <Users />}
      </div>
    </>
  );
};

export default AdminDashboard;
