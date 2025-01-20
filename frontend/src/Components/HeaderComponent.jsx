import React, { useEffect, useState } from "react";
import "./Header.css";
import logo from "../assets/logoHeader.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUserPlus,
  faBriefcase,
  faCommentDots,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import profile from "../assets/profile.png";
import { io } from "socket.io-client";
import getMe from "../utilities/user/getMe";
import { getToken } from "../utilities/getToken";
import { exludedPaths } from "./lib/helpers";
const socket = io("http://localhost:8003");

const HeaderComponent = () => {
  const [isVisibleBussinesPart, setVisibleBussinesPart] = useState(false);

  const [countConnections, setCountConnections] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  console.log({searchTerm})
  const connectionBadge = async () => {
    const data = await getMe();
    setCountConnections(data?.countUnseenConnections);
  };
  const location = useLocation();
  const token = getToken();
  useEffect(() => {
    if (!token) return;
  }, [token]);

  useEffect(() => {
    connectionBadge();

    socket.on("newFriendRequest", (userId, newCount) => {
      connectionBadge();
    });

    return () => {
      socket.off("newFriendRequest");
    };
  }, []);
  const handleResize = () => {
    if (window.innerWidth <= 1272) {
      setVisibleBussinesPart(false);
    } else {
      setVisibleBussinesPart(true);
    }
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  if (exludedPaths.some((path) => location.pathname.includes(path)))
    return null;
  return (
    <div
      className="h-16 grid grid-cols-12 items-center lg:pr-3 md:pr-40 sm:pr-[440px] xmd:pr-[400px]"
      style={{ boxShadow: "0 2px 4px 0 rgba(0,0,0,0.1)" }}
    >
      <div className="logo-search col-span-4 lg:col-span-5 flex justify-center items-center">
        <div className="logo flex justify-end items-center pr-2">
          <img
            src={logo}
            width={30}
            height={20}
            alt="nul"
            className="hidden lg:block"
          />
        </div>
        <div className="search flex justify-start items-center">
          <select
            type="text"
            style={{ backgroundColor: "#e6f2ff" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target?.value || "")}
            className="bg-current w-52 mt-1 border pl-2 h-8 rounded-sm hidden lg:block"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="navigation col-span-8 lg:col-span-5 flex justify-start items-center ">
        <Link to="/" className="text-center mx-5">
          <FontAwesomeIcon icon={faHouse} className="icon" />
          <span className="text-sm block hidden lg:block">Home</span>
        </Link>
        <Link to="/connections" className="text-center mx-5">
          <FontAwesomeIcon icon={faUserPlus} className="icon" />
          {countConnections > 0 && (
            <p className="notification-badge">{countConnections}</p>
          )}
          <span className="text-sm  hidden w-full lg:block">My Network</span>
        </Link>
        <Link to="/jobs" className="text-center mx-5">
          <FontAwesomeIcon icon={faBriefcase} className="icon" />
          <span className="text-sm block hidden lg:block">Jobs</span>
        </Link>
        <Link to="/messages" className="text-center mx-5">
          <FontAwesomeIcon icon={faCommentDots} className="icon" />
          <span className="text-sm block hidden lg:block">Messaging</span>
        </Link>
        <Link to="/notifications" className="text-center mx-5">
          <FontAwesomeIcon icon={faBell} className="icon" />
          <span className="text-sm block hidden lg:block">Notifications</span>
        </Link>
        <Link to="/profile" className="text-center mx-5">
          <img
            src={profile}
            width={20}
            height={18}
            alt="profile"
            className="mr-1 hidden lg:block"
          />
          <span className="text-sm block hidden lg:block">Me</span>
        </Link>
      </div>
      {isVisibleBussinesPart && (
        <div className="business col-span-4 lg:col-span-2 flex justify-center items-center hidden lg:flex">
          <p className="mx-4">For Business</p>
          <p className="mx-4">Try Premium for free</p>
        </div>
      )}
    </div>
  );
};

export default HeaderComponent;
