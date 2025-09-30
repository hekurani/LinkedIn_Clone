import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/LinkedIn-logo.png";

import MeMenu from "../../Components/MeMenu";

const AdminHeader = () => {
  const menuRef = useRef(null);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowSettingsMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className=" p-3 bg-gray-800">
      <div className="flex justify-between items-center">
        <img
          className="logo"
          width={120}
          height={120}
          src={logo}
          alt="LinkedIn"
        />

        <MeMenu
          showSettingsMenu={showSettingsMenu}
          setShowSettingsMenu={setShowSettingsMenu}
          menuRef={menuRef}
          showText={true}
          fromAdmin={true}
        />
      </div>
    </div>
  );
};

export default AdminHeader;
