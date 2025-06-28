import React, { useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSideBar from "./AdminSideBar";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Companies from "../pages/Companies";

const AdminDashboard = () => {
  const [page, setPage] = useState("dashboard");
  return (
    <>
      <AdminHeader />
      <div className="flex">
        <AdminSideBar setPage={setPage} />
        {page === "dashboard" && <Dashboard />}
        {page === "users" && <Users />}
        {page === "companies" && <Companies />}
      </div>
    </>
  );
};

export default AdminDashboard;
