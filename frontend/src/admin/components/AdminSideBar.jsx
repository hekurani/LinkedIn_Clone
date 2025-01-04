import React from "react";

const AdminSideBar = ({ setPage }) => {
  return (
    <div className="border-t border-sky-100">
      <div className="flex flex-col items-center  h-screen w-64 bg-gray-800 border-b border-gray-700">
        <div
          onClick={() => setPage("dashboard")}
          className="flex items-center justify-center h-16 w-full border-b border-gray-700"
        >
          <h1 className="text-white text-2xl">Dashboard</h1>
        </div>
        <div
          onClick={() => setPage("users")}
          className="flex items-center justify-center h-16 w-full border-b border-gray-700"
        >
          <h1 className="text-white text-2xl">Users</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
