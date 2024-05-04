import React, { useEffect, useState } from "react";
import UserFeedComponent from "../Components/User/Feed/UserFeedComponent";
import AddPostComponent from "../Components/User/Feed/AddPostComponent";
import PostComponent from "../Components/User/Feed/PostComponent";
import ChatPage from "../Components/User/Chat/ChatComponent";
import "./Feed.css";
import ChatListingComponent from "../Components/User/Chat/ChatListingComponent";
import getMe from "../utilities/user/getMe";

const Feed = () => {
  const [user, setUser] = useState({});
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatRoomId, setChatRoomId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = await getMe();
      setUser(user);
    };

    fetchData();
  }, []);

  const handleOpenChatPage = (chatRoomId) => {
    setIsChatOpen(true);
    setChatRoomId(chatRoomId);
  };

  const handleCloseChatPage = () => {
    setIsChatOpen(false);
  };

  return (
    <div className="feed-container">
      <UserFeedComponent user={user} />
      <div style={{ marginLeft: "calc(50vw - 520px)" }}>
        <AddPostComponent user={user} />
        <PostComponent user={user} />
        <ChatListingComponent user={user} onChatRowClick={handleOpenChatPage} />
        {isChatOpen && (
          <ChatPage
            user={user}
            onCloseChat={handleCloseChatPage}
            chatRoomId={chatRoomId}
          />
        )}
      </div>
    </div>
  );
};

export default Feed;
