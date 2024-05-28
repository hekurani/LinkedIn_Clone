import React, { useEffect, useState } from "react";
import { getFriends } from "../../utilities/friends/getFriends";
import getMe from "../../utilities/user/getMe";
import defaultImage from "../../assets/default.png";
const getOtherUser = (loggedUserId, friend) => {
  return friend.sender.id === loggedUserId ? friend.receiver : friend.sender;
};

const ConnectionComponent = () => {
  const [friends, setFriends] = useState([]);
  const [id, setID] = useState();

  useEffect(() => {
    const getAllFriends = async () => {
      const data = await getFriends();
      setFriends(data);
    };

    const getLoggedUser = async () => {
      const data = await getMe();
      setID(data.id);
    };

    getLoggedUser();
    getAllFriends();
  }, []);

  return (
    <div
      style={{ border: "1px solid blue", maxWidth: "880px" }}
      className="mt-12 mx-auto h-auto"
    >
      <div className="header nr-connections">
        <p className="text-2xl m-5">{friends.length} Connections</p>
      </div>
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

      {friends.map((friend) => {
        const otherUser = getOtherUser(id, friend);

        return (
          <div key={friend.id} className="connections flex mb-3">
            <div className="ml-3">
              <img
                className="w-20 h-20 rounded-full"
                src={otherUser.imageProfile || defaultImage}
                alt=""
              />
            </div>
            <div className="m-2">
              <p className="font-semibold text-xl">
                {otherUser.name} {otherUser.lastname}
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
