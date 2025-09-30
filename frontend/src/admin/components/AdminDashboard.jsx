import React, { useState } from "react";
import Companies from "../pages/Companies";
import Users from "../pages/Users";
import AdminHeader from "./AdminHeader";
import AdminSideBar from "./AdminSideBar";

const AdminDashboard = () => {
  const [page, setPage] = useState("users");
  return (
    <>
      <AdminHeader />
      <div className="flex">
        <AdminSideBar setPage={setPage} />
        {page === "users" && <Users />}
        {page === "companies" && <Companies />}
      </div>
    </>
  );
};

export default AdminDashboard;
