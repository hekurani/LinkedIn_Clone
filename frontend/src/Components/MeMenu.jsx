import {
  faCaretDown,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { BsFillClipboard2DataFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import defaultProfile from "../assets/default.png";
import { clearTokens } from "../utilities/auth/clearTokens";
import { getToken } from "../utilities/getToken";
import getMe from "../utilities/user/getMe";

const MeMenu = ({
  showText = false,
  setShowSettingsMenu = () => {},
  showSettingsMenu = false,
  menuRef = null,
  fromAdmin = false,
}) => {
  const token = getToken();
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const user = await getMe();
      setUser(user);
    };
    fetchData();
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex flex-col items-center mx-5">
        <img
          src={user.imageProfile ? user.imageProfile : defaultProfile}
          width={fromAdmin ? 30 : 20}
          style={{ objectFit: "cover" }}
          height={fromAdmin ? 30 : 18}
          alt="profile"
          className="mr-1 rounded-full cursor-pointer"
        />
        {showText && (
          <div className="flex justify-center items-center gap-1">
            <p
              className={`cursor-pointer text-sm ${
                fromAdmin ? "text-white" : "text-black"
              }`}
            >
              Me
              <FontAwesomeIcon
                icon={faCaretDown}
                className="ml-1"
                color={fromAdmin ? "white" : "black"}
                style={{ fontSize: "14px" }}
                onClick={() => setShowSettingsMenu(!showSettingsMenu)}
              />
            </p>
          </div>
        )}
      </div>
      {showSettingsMenu && (
        <div className="absolute right-0 mt-2 w-60 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
          <div className="px-4 py-2 flex items-center">
            <img
              src={user.imageProfile ? user.imageProfile : defaultProfile}
              alt="profile"
              className="mr-1 w-12 h-12 !rounded-full object-cover"
            />
            <div className="flex flex-col ml-2 text-md text-gray-700">
              <p className="whitespace-nowrap font-bold">
                {user?.name} {user?.lastname}{" "}
              </p>
              <p className="whitespace-nowrap text-sm">
                {user?.profession?.name}{" "}
              </p>
            </div>
          </div>
          {token?.role === "jobseeker" && (
            <div className="flex justify-center mb-1">
              <button
                style={{
                  borderColor: "#0a66c2",
                  border: "1px solid #0a66c2",
                  width: "85%",
                }}
                className="h-8 font-semibold text-white rounded-full px-5"
              >
                <span
                  className="text-[#0a66c2]"
                  onClick={() => {
                    setShowSettingsMenu(false);
                    navigate(`/${user.id}/profile`);
                  }}
                >
                  View Profile
                </span>
              </button>
            </div>
          )}

          {token?.role === "jobseeker" && (
            <div>
              <Link
                to="/job-applications"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <BsFillClipboard2DataFill className="mr-3 w-4" />
                <p className="text-md font-500">Job Applications</p>
              </Link>
            </div>
          )}
          {token?.role === "jobseeker" && (
            <div>
              <Link
                to="/settings"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faGear} className="mr-3 w-4" />
                <p className="text-md font-500">Settings</p>
              </Link>
            </div>
          )}
          <div className="border-t border-gray-200 my-1"></div>
          <button
            onClick={() => {
              navigate("/Login");
              clearTokens();
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faRightFromBracket} className="mr-3 w-4" />
            <p className="text-md font-500">Sign Out</p>
          </button>
        </div>
      )}
    </div>
  );
};
export default MeMenu;
