import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import defaultImage from "../../assets/default.png";
import { createChat } from "../../utilities/chat/getChat";
import {
  acceptRequest,
  cancelRequest,
  getRequestSendedToMe,
} from "../../utilities/friends/getFriends";

const socket = io("http://localhost:8002");
const Invitation = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRequestSendedToMe();
      setData(data);
    };
    fetchData();
    socket.on("newFriendRequest", (newRequest) => {
      setData((prevData) => [...prevData, newRequest]);
    });

    return () => {
      socket.off("newFriendRequest");
    };
  }, []);

  const cancelFriendRequest = async (id) => {
    await cancelRequest(id);
    const updatedData = await getRequestSendedToMe();
    setData(updatedData);
  };

  const acceptFriendRequest = async (id, senderId, receiverId) => {
    await acceptRequest(id);
    await createChat(receiverId, senderId);
    const updatedData = await getRequestSendedToMe();
    setData(updatedData);
  };

  return (
    <div
      style={{
        border: "1px solid #d3d3d3 ",
        maxWidth: "880px",
        borderRadius: "7px",
      }}
      className="mx-auto p-5 bg-white"
    >
      {!!data && data.length > 0 ? (
        <div className="header flex items-center mb-3">
          <p className="mr-auto m-1">Invitations</p>
          <p className="m-3 font-semibold"> {`See all ${data.length}`}</p>
        </div>
      ) : (
        <div className="header flex items-center mb-3">
          <p className="mr-auto m-1">No pending invitations</p>
        </div>
      )}
      <div className="content">
        {data.map((request) => (
          <div
            key={request.id}
            className="invitation-item flex items-center justify-between mb-4 p-2 border-t"
          >
            <Link
              to={`/${request.sender.id}/profile`}
              className="flex items-center"
            >
              <img
                src={request.sender.imageProfile || defaultImage}
                alt={`${request.sender.name}`}
                className="w-12 h-12 rounded-full mr-3"
              />
              <p className="font-semibold">
                {request.sender.name} {request.sender.lastname}
              </p>
            </Link>
            <div className="flex items-center">
              <button
                onClick={() => cancelFriendRequest(request.id)}
                className="mr-3"
              >
                Ignore
              </button>
              <button
                onClick={() =>
                  acceptFriendRequest(
                    request.id,
                    request.sender.id,
                    request.receiver.id
                  )
                }
                style={{
                  color: "#0a66c2",
                  border: "1px solid #0a66c2",
                  borderRadius: "10px",
                }}
                className="h-10 w-20 font-semibold"
              >
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Invitation;
