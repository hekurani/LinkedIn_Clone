import React, { useEffect, useState } from "react";
import { getFriends } from "../../utilities/friends/getFriends";
import defaultImage from "../../assets/default.png";
import { io } from "socket.io-client";
import getMe from "../../utilities/user/getMe";
import axiosInstance from "../../axios/axios.tsx";

const socket = io("http://localhost:8003");
const ConnectionComponent = () => {
  const [friends, setFriends] = useState([]);

  const getAllFriends = async () => {
    const data = await getFriends();
    const user = await getMe();
    setFriends(data);
    await axiosInstance.patch(`users/users/${user.id}`,{countUnseenConnections:0} )
  };

  useEffect(() => {
    getAllFriends();
    
    socket.on("newestFriend", (newRequest) => {
      getAllFriends();
    });

    return () => {
      socket.off("newestFriend");
    };
  }, []);

  return (
    <div
    style={{
      border: "1px solid #d3d3d3 ",
      maxWidth: "880px",
      borderRadius: "7px",
    }}
      className="mt-12 mx-auto h-auto"
    >
      <div className="header nr-connections">
        {friends.length > 0 ? (
          <p className="text-2xl m-5">{friends.length} Connections</p>
        ) : (
          <div className="title">
            <p className="m-5">No Active Connections</p>
            <p className="text-sm m-5">Start by connecting with others!</p>
          </div>
        )}
      </div>
      {friends.length > 0 && (
        <div className="searchAndFilter flex m-3">
          <div className="search flex">
            <p className="mr-2">Sort by:</p>
            <p className="font-semibold text-stone-500">First Name</p>
          </div>
          <div className="searchbar ml-auto mr-5">
            <input
              type="text"
              className="p-1 pl-2 w-64 h-8"
              placeholder="Search by name"
            />
          </div>
        </div>
      )}

      {friends.map((friend) => {

        return (
          <div key={friend.id} className="connections flex mb-3">
            <div className="ml-3">
              <img
                className="w-16 h-16 rounded-full"
                src={friend.imageProfile || defaultImage}
                alt=""
              />
            </div>
            <div className="m-2">
              <p className="font-semibold text-xl">
                {friend.name} {friend.lastname}
              </p>
              <p className="description font-lg">Student at UBT-University</p>
            </div>
            <div className="ml-auto mr-5 flex items-center">
              <button className="text-blue-500 text-lg font-semibold">
                Message
              </button>
              <p className="w-5 ml-3 h-5 text-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  id="overflow-web-ios-medium"
                  aria-hidden="true"
                  role="none"
                  data-supported-dps="24x24"
                  fill="currentColor"
                >
                  <path d="M14 12a2 2 0 11-2-2 2 2 0 012 2zM4 10a2 2 0 102 2 2 2 0 00-2-2zm16 0a2 2 0 102 2 2 2 0 00-2-2z"></path>
                </svg>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ConnectionComponent;
