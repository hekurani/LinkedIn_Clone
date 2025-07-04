import React, { useEffect, useRef, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import getMe from "../utilities/user/getMe";
import { getToken } from "../utilities/getToken";
import getAllUsers from "../utilities/user/getAllUsers";
import AsyncSelect from "react-select/async";
import MeMenu from "./MeMenu";
import { useFeedContext } from "../User/context/FeedContext";
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
    const { setShowMessageList } = useFeedContext();
    const menuRef = useRef(null);


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

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowSettingsMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const loadOptions = async (inputValue) => {
        try {
            const res = await getAllUsers({ search: inputValue });
            return res?.users.map((item) => ({
                label: `${item?.name} ${" "} ${item?.lastname}`,
                value: item?.id,
                image: item?.imageProfile,
            }));
        } catch (error) {
            console.error("Error fetching search results:", error);
            return [];
        }
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
                    navigate(`${data?.value}/profile`);
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
    
    if (!token || token?.role !== 'jobseeker') return null;

    return (
        <div className={`h-[53px] w-full bg-white mt-1 min-w-[600px] ${showSearch ? 'grid grid-cols-2 gap-32' : 'flex items-center justify-center'}`}>
            {showSearch && (
                <div className="flex items-center gap-3 justify-end w-full">
                    <img
                        src={logo}
                        width={34}
                        height={34}
                        alt="null"
                    />

                    <div className="search mr-5">
                        <AsyncSelect
                            ref={selectRef}
                            cacheOptions
                            loadOptions={loadOptions}
                            placeholder="Search"
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    backgroundColor: "#f4f2ee",
                                    height: "2rem",
                                }),
                            }}
                            className="w-52"
                            components={{ Option: customOption }}
                        />
                    </div>
                </div>
            )}

            <div className="navigation flex  justify-start ml-5 items-center ">
                <div onClick={() => navigate('/')} className="flex-col flex text-center mr-5">
                    <FontAwesomeIcon icon={faHouse} className="icon" />
                    {showText && (
                        <span className="text-sm">Home</span>
                    )}
                </div>
                <div onClick={() => navigate('/connections')} className="flex-col relative flex text-center mx-5">
                    <FontAwesomeIcon icon={faUserPlus} className="icon" />
                    {countConnections > 0 && (
                        <span className="
                        absolute -top-1 right-4
                        flex items-center justify-center
                        h-4 min-w-4 px-2
                        rounded-full bg-red-600 text-white
                        text-[10px] font-semibold leading-none
                        z-20
    ">
                            {countConnections > 99 ? '99+' : countConnections}
                        </span>
                    )}
                    {showText && (
                        <span className="text-sm  w-full whitespace-nowrap ">My Network</span>
                    )}

                </div>
                <div onClick={() => navigate('/jobs')} className="flex-col flex text-center mx-5">
                    <FontAwesomeIcon icon={faBriefcase} className="icon" />
                    {showText && (
                        <span className="text-sm">Jobs</span>
                    )}

                </div>
                <div onClick={() => navigate('/connections')} className="flex-col flex text-center mx-5">
                    <FontAwesomeIcon icon={faCommentDots} onClick={() => setShowMessageList(true)} className="icon" />
                    {showText && (
                        <span className="text-sm">Messaging</span>
                    )}

                </div>
                <div to="/" className="flex-col flex text-center mx-5">
                    <FontAwesomeIcon icon={faBell} className="icon" />
                    {showText && (
                        <span className="text-sm">Notifications</span>
                    )}

                </div>
                <MeMenu menuRef={menuRef} showText={showText} showSettingsMenu={showSettingsMenu} setShowSettingsMenu={setShowSettingsMenu} />
            </div>

        </div>
    )
}
export default HeaderComponent;