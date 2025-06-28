import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFeedContext } from "../../../User/context/FeedContext";

const ChatListingComponent = ({ user = null, onChatRowClick = () => {} }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [messages, setAllMessages] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [otherUser, setOtherUser] = useState({});

  useEffect(() => {
    const getAllChats = async () => {
      try {
        if (!user.id) {
          return;
        }
        const response = await axios.get(`/chatroom/chatByUser/${user.id}`);
        setChatRooms(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllChats();

    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:4000/users/users/${user.id}`
      );
      setLoggedInUser(response.data);
    };

    fetchData();
    const fetchAllMessages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/message/messages"
        );
        setAllMessages(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllMessages();
  }, [user.id]);

  // useEffect(() => { -- TO RETHINK THIS 
  //   if (showMessageList) {
  //     setIsCollapsed(false);
  //     setShowMessageList(true);
  //   } else {  
  //     setIsCollapsed(true);
  //     setShowMessageList(false);
  //   }

  // }, [showMessageList]);

  const findMessageById = (messageId) => {
    const message = messages.find((message) => message.id == messageId);
    return message;
  };

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleChatListing = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleChatRowClick = (chatRoomId) => {
    onChatRowClick(chatRoomId, otherUser);
  };

  return (
    <div
      className={`w-72 fixed bottom-0 right-0 mr-5 ${
        isCollapsed ? "h-12" : "rounded-t-md"
      }`}
      style={{
        border: "1px solid #D3D3D3",
        backgroundColor: "white",
        height: isCollapsed ? "auto" : "80vh",
      }}
    >
      <div
        className="header h-12 flex justify-items-center items-center"
        style={{ borderBottom: "1px solid #D3D3D3" }}
      >
        <img
          className="ml-2 h-8 w-8 mr-2"
          src={user.imageProfile}
          style={{ borderRadius: "50%", objectFit: "cover" }}
          alt="profili"
        />
        <p className="font-semibold items-center mb-1">Messaging</p>
        <svg
          className="artdeco-button__icon ml-auto mr-5"
          role="button"
          onClick={toggleChatListing}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          data-supported-dps="16x16"
          data-test-icon={
            isCollapsed ? "chevron-up-small" : "chevron-down-small"
          }
        >
          <path
            d={
              isCollapsed
                ? "M1 9l7-4.61L15 9V6.61L8 1 1 6.61z"
                : "M1 5l7 4.61L15 5v2.39L8 12 1 7.39z"
            }
          ></path>
        </svg>
      </div>
      {isCollapsed ? null : (
        <>
          <div
            className="h-14 flex justify-center items-center"
            style={{ position: "relative" }}
          >
            <input
              className="w-64 h-8 p-1 pl-6"
              type="text"
              style={{ backgroundColor: "#e6f2ff" }}
              placeholder="Search messages"
            ></input>
            <span className="absolute left-5 top-1/2 transform -translate-y-1/2  pt-0.5">
              <svg
                className="h-4 w-4"
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14C7.02 14 5 11.98 5 9.5S7.02 5 9.5 5 14 7.02 14 9.5 11.98 14 9.5 14z" />
              </svg>
            </span>
          </div>
          <div className="list h-96 flex-grow overflow-y-auto">
            {chatRooms.map((chatroom, index) => {
              const otherUserImage =
                user.id === chatroom.user1.id
                  ? chatroom.user2.imageProfile
                  : chatroom.user1.imageProfile;
              const lastMessageId =
                chatroom.messages[chatroom.messages.length - 1];
              const lastMessage = findMessageById(lastMessageId);
              const lastMessageUser = lastMessage?.user;
              const lastMessageUserName =
                lastMessageUser?.id == loggedInUser.id
                  ? "You"
                  : lastMessageUser?.name;
              return (
                <div
                  key={chatroom.id}
                  onClick={() => handleChatRowClick(chatroom.id)}
                  className="p-2 oneProfile h-16 flex justify-items-center items-center "
                  style={{
                    border: "1px solid #D3D3D3",
                    borderBottom: "0px",
                    borderLeft: "0px",
                  }}
                >
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={otherUserImage}
                    alt=""
                  />
                  <div className="">
                    <p className="name ml-1">
                      {chatroom.user1.id === user.id
                        ? chatroom.user2.name
                        : chatroom.user1.name}{" "}
                      {chatroom.user1.id === user.id
                        ? chatroom.user2.lastname
                        : chatroom.user1.lastname}
                    </p>
                    {lastMessageUser && (
                      <p className="description ml-1 text-xs">{`${lastMessageUserName}: ${
                        lastMessage ? lastMessage.description : "ol"
                      }`}</p>
                    )}
                  </div>

                  <div className="date mx-auto">
                    <p className="text-sm">Jan 21</p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ChatListingComponent;
