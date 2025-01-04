import React from "react";
import logo from "../../assets/LinkedIn-logo.png";
import profile from "../../assets/profile.png";
const AdminHeader = () => {
  return (
    <div className="flex justify-center items-center p-3 bg-gray-800">
      <div className="mr-auto">
        <img
          className="logo"
          width={120}
          height={120}
          src={logo}
          alt="LinkedIn"
        />
      </div>
      <div className="ml-auto">
        <img src={profile} width={40} height={40} alt="" />
      </div>
    </div>
  );
};

export default AdminHeader;
