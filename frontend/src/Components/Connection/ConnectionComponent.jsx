import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import defaultImage from "../../assets/default.png";
import axiosInstance from "../../axios/axios.tsx";
import { getFriends } from "../../utilities/friends/getFriends";
import getMe from "../../utilities/user/getMe";

const socket = io("http://localhost:8003");

const ConnectionComponent = () => {
  const [friends, setFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
  const [loading, setLoading] = useState(true);

  const inputRef = useRef(null);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const getAllFriends = async (search) => {
    try {
      setLoading(true);
      const data = await getFriends(search);
      const user = await getMe();
      setFriends(data);

      await axiosInstance.patch(`users/users/${user.id}`, {
        countUnseenConnections: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllFriends(debouncedSearch);

    socket.on("newestFriend", () => {
      getAllFriends(debouncedSearch);
    });

    return () => socket.off("newestFriend");
  }, [debouncedSearch]);

  return (
    <div
      style={{
        border: "1px solid #d3d3d3",
        maxWidth: "880px",
        borderRadius: "7px",
      }}
      className="mt-12 mx-auto h-auto bg-white"
    >
      <p className="text-xl m-5">
        {friends.length > 0
          ? `${friends.length} Connections`
          : "No Connections"}
      </p>
      <div className="searchbar ml-5 mr-3 mb-5">
        <input
          ref={inputRef}
          autoFocus
          type="text"
          className="border border-solid rounded-md p-1 pl-2 hover:outline max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name"
        />
      </div>
      <p className="text-sm m-5 whitespace-nowrap">
        {friends.length === 0 && searchTerm ? (
          <>
            <p className="text-[16px] w-full whitespace-nowrap">
              No connections found for the search term:{" "}
              <span className="font-bold">{searchTerm}</span>
            </p>
          </>
        ) : (
          <p className="text-[16px]">Start by connecting with others!</p>
        )}
      </p>
      {loading ? (
        <div className="p-5 space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-3 animate-pulse">
              <div className="w-12 h-12 bg-gray-200 rounded-full" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        friends.map((friend) => (
          <div
            key={friend.id}
            className="connections flex mb-3 border-t border-gray-300 first:border-t-0 mt-3"
          >
            <img
              className="w-12 h-12 m-2 rounded-full"
              src={friend.imageProfile || defaultImage}
              alt=""
            />
            <div className="m-2 mt-2">
              <p className="font-[400] text-xl">
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
        ))
      )}
    </div>
  );
};

export default ConnectionComponent;
