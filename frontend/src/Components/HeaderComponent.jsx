import {
  faBell,
  faBriefcase,
  faCommentDots,
  faHouse,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import AsyncSelect from "react-select/async";
import { io } from "socket.io-client";
import defaultImage from "../assets/default.png";
import logo from "../assets/logoHeader.png";
import CommingSoon from "../Components/NotFound/CommingSoon";
import { useFeedContext } from "../User/context/FeedContext";
import { getToken } from "../utilities/getToken";
import getAllUsers from "../utilities/user/getAllUsers";
import getMe from "../utilities/user/getMe";
import "./Header.css";
import MeMenu from "./MeMenu";
import ChatPage from "./User/Chat/ChatComponent";
import ChatListingComponent from "./User/Chat/ChatListingComponent";

const socket = io("http://localhost:8003");
const HeaderComponent = () => {
  const [showSearch, setShowSearch] = useState(window.innerWidth >= 1310);
  const connectionBadge = async () => {
    const data = await getMe();
    setCountConnections(data?.countUnseenConnections);
  };
  const token = getToken();

  const [countConnections, setCountConnections] = useState(0);
  const navigate = useNavigate();
  const selectRef = useRef(null);
  const [showText, setShowText] = useState(window.innerWidth >= 1050);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showCommingSoonConfirm, setShowCommingSoonConfirm] = useState(false);
  const [collapsedChatListing, setCollapsedChatListing] = useState(true);
  const [chatRoomId, setChatRoomId] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [user, setUser] = useState({});
  const [otherUser, setOtherUser] = useState({});
  const [openChatListing, setOpenChatListing] = useState(null);

  const { setShowMessageList } = useFeedContext();
  const menuRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = await getMe();
      setUser(user);
    };
    fetchData();
  }, []);

  useEffect(() => {
    connectionBadge();

    socket.on("newFriendRequest", (userId, newCount) => {
      connectionBadge();
    });

    return () => {
      socket.off("newFriendRequest");
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1310) {
        setShowSearch(true);
      } else {
        setShowSearch(false);
      }

      if (window.innerWidth >= 1050) {
        setShowText(true);
      } else {
        setShowText(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const handleOpenChatPage = (chatRoomId, chatListingOtherUser) => {
    setOtherUser(chatListingOtherUser);
    setIsChatOpen(true);
    setChatRoomId(chatRoomId);
  };

  const loadOptions = async (inputValue) => {
    try {
      const res = await getAllUsers({ search: inputValue });
      return res?.users.map((item) => ({
        label: `${item?.name} ${" "} ${item?.lastname}`,
        value: item?.id,
        image: item?.imageProfile || defaultImage,
      }));
    } catch (error) {
      console.error("Error fetching search results:", error);
      return [];
    }
  };

  const customMenuList = (props) => {
    return <div className="w-full">{props.children}</div>;
  };

  const CustomIndicatorsContainer = () => {
    return null;
  };

  const customOption = (props) => {
    const { data, innerRef, innerProps } = props;
    return (
      <div
        ref={innerRef}
        {...innerProps}
        className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-[8px]"
        onClick={() => {
          if (selectRef.current) {
            selectRef.current.blur();
          }
          navigate(`/${data?.value}/profile`);
        }}
      >
        <span className="cursor-pointer">{data?.label}</span>

        {data?.image && (
          <img
            src={data?.image}
            alt="profile"
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              marginRight: 10,
            }}
          />
        )}
      </div>
    );
  };

  if (!token || !["admin", "jobseeker"].includes(token?.role)) {
    navigate("/login");
    return;
  }

  return (
    <div
      className={`h-[53px] w-full bg-white sticky top-0 min-w-[600px] border border-solid border-[#D3D3D3] ${
        showSearch ? "grid grid-cols-2" : "flex items-center justify-center"
      }`}
      style={{
        zIndex: 9998,
      }}
    >
      {showSearch && (
        <div className="flex items-center gap-3 justify-center w-full">
          <img src={logo} width={34} height={34} alt="null" />

          <div className="search mr-5">
            <AsyncSelect
              ref={selectRef}
              cacheOptions
              loadOptions={loadOptions}
              placeholder={
                <div className="flex items-center gap-2">
                  <IoSearch />
                  Search
                </div>
              }
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor: "white",
                  width: "280px",
                  borderRadius: "20px",
                }),
                placeholder: (base) => ({
                  ...base,
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "8px",
                  color: "#666",
                  fontSize: "16px",
                }),
                menu: (base) => ({
                  ...base,
                  width: "280px",
                  borderRadius: "8px",
                  marginTop: "4px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                }),

                dropdownIndicator: (base) => ({
                  ...base,
                  display: "none",
                }),
                indicatorSeparator: (base) => ({
                  ...base,
                  display: "none",
                }),
                input: (base) => ({
                  ...base,
                  margin: 0,
                  padding: 0,
                  color: "#333",
                }),
              }}
              className="w-52"
              components={{
                Option: customOption,
                MenuList: customMenuList,
                IndicatorsContainer: CustomIndicatorsContainer,
              }}
            />
          </div>
        </div>
      )}

      <div className="navigation flex  ml-3 justify-start items-center ">
        <div
          onClick={() => navigate("/")}
          className="flex-col flex text-center mx-5 cursor-pointer"
        >
          <FontAwesomeIcon icon={faHouse} className="icon" />
          {showText && <span className="text-sm">Home</span>}
        </div>
        <div
          onClick={() => navigate("/connections")}
          className="flex-col relative flex text-center mx-5 cursor-pointer"
        >
          <FontAwesomeIcon icon={faUserPlus} className="icon" />
          {countConnections > 0 && (
            <span
              className="
                        absolute -top-1 right-6
                        flex items-center justify-center
                        h-4 min-w-4 px-1
                        rounded-full bg-red-600 text-white
                        text-[10px] font-semibold leading-none
                        z-20
    "
            >
              {countConnections > 99 ? "99+" : countConnections}
            </span>
          )}
          {showText && (
            <span className="text-sm  w-full whitespace-nowrap cursor-pointer ">
              My Network
            </span>
          )}
        </div>
        <div
          onClick={() => navigate("/jobs")}
          className="flex-col flex text-center mx-5 cursor-pointer"
        >
          <FontAwesomeIcon icon={faBriefcase} className="icon" />
          {showText && <span className="text-sm">Jobs</span>}
        </div>
        <div
          onClick={() => setCollapsedChatListing(false)}
          className="flex-col flex text-center mx-5 cursor-pointer"
        >
          <FontAwesomeIcon
            icon={faCommentDots}
            onClick={() => setShowMessageList(true)}
            className="icon"
          />
          {showText && <span className="text-sm">Messaging</span>}
        </div>
        <div
          className="flex-col flex text-center mx-5 cursor-pointer"
          onClick={() => setShowCommingSoonConfirm(true)}
        >
          <FontAwesomeIcon icon={faBell} className="icon" />
          {showText && <span className="text-sm">Notifications</span>}
        </div>
        <MeMenu
          menuRef={menuRef}
          showText={showText}
          showSettingsMenu={showSettingsMenu}
          setShowSettingsMenu={setShowSettingsMenu}
        />

        {isChatOpen && (
          <ChatPage
            user={user}
            otherUser={otherUser}
            onCloseChat={() => setIsChatOpen(false)}
            chatRoomId={chatRoomId}
            setShowCommingSoonConfirm={setShowCommingSoonConfirm}
          />
        )}

        <ChatListingComponent
          user={user}
          onChatRowClick={handleOpenChatPage}
          collapsed={collapsedChatListing}
          setCollapsedChatListing={setCollapsedChatListing}
        />
        <CommingSoon
          isOpen={showCommingSoonConfirm}
          setIsOpen={setShowCommingSoonConfirm}
        />
      </div>
    </div>
  );
};
export default HeaderComponent;
