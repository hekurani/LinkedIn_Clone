import React, { useEffect, useState } from "react";
import logo from "../../assets/LinkedIn-logo.png";
import profile from "../../assets/profile.png";

import getMe from "../../utilities/user/getMe";

const AdminHeader = () => {
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const admin = await getMe();
      setAdmin(admin);
    }
    fetchData();
  }, []);

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
        <img src={admin.imageProfile || profile} width={40} height={40} alt="" className="rounded-full mr-5"/>
      </div>
    </div>
  );
};

export default AdminHeader;
