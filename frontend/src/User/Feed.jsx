import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../axios/axios.tsx";
import HeaderComponent from "../Components/HeaderComponent.jsx";
import ChatPage from "../Components/User/Chat/ChatComponent";
import ChatListingComponent from "../Components/User/Chat/ChatListingComponent";
import AddPostComponent from "../Components/User/Feed/AddPostComponent";
import PostComponent from "../Components/User/Feed/PostComponent";
import UserFeedComponent from "../Components/User/Feed/UserFeedComponent";
import getMe from "../utilities/user/getMe";

const Feed = () => {
  const [user, setUser] = useState({});
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatRoomId, setChatRoomId] = useState(null);
  const [isUserFeedVisible, setIsUserFeedVisible] = useState(true);
  const [allPosts, setAllPosts] = useState([]);
  const [otherUser, setOtherUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const user = await getMe();
      setUser(user);
    };
    const getAllPosts = async () => {
      const { data } = await axiosInstance.get("/posts");
      console.log(data);
      setAllPosts(data?.posts);
    };
    getAllPosts();
    fetchData();
  }, []);

  const handleOpenChatPage = (chatRoomId, chatListingOtherUser) => {
    setOtherUser(chatListingOtherUser);
    setIsChatOpen(true);
    setChatRoomId(chatRoomId);
  };

  const handleCloseChatPage = () => {
    setIsChatOpen(false);
  };

  const handleResize = () => {
    if (window.innerWidth <= 1042) {
      setIsUserFeedVisible(false);
    } else {
      setIsUserFeedVisible(true);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full h-full">
      <HeaderComponent />
      <div
        className={`flex w-full min-h-screen bg-[#f4f2ee] 
       ${isUserFeedVisible ? "lg:flex-row" : "flex-col"}`}
      >
        {isUserFeedVisible && (
          <UserFeedComponent
            user={user}
            setUser={setUser}
            setAllPosts={setAllPosts}
          />
        )}
        <div className="mx-auto">
          <AddPostComponent
            user={user}
            setAllPosts={setAllPosts}
            isUserFeedVisible={isUserFeedVisible}
          />
          <PostComponent
            user={user}
            allPosts={allPosts}
            setAllPosts={setAllPosts}
          />
          <ChatListingComponent
            user={user}
            onChatRowClick={handleOpenChatPage}
          />
          {isChatOpen && (
            <ChatPage
              user={user}
              otherUser={otherUser}
              // otherUser={otherUser}
              onCloseChat={handleCloseChatPage}
              chatRoomId={chatRoomId}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;
