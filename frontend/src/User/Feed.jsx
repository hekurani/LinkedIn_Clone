import React, { useEffect, useRef, useState } from "react";
import UserFeedComponent from "../Components/User/Feed/UserFeedComponent";
import AddPostComponent from "../Components/User/Feed/AddPostComponent";
import PostComponent from "../Components/User/Feed/PostComponent";
import ChatPage from "../Components/User/Chat/ChatComponent";
import ChatListingComponent from "../Components/User/Chat/ChatListingComponent";
import getMe from "../utilities/user/getMe";
import axiosInstance from "../axios/axios.tsx";

const Feed = () => {
  const [user, setUser] = useState({});
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatRoomId, setChatRoomId] = useState(null);
  const [isUserFeedVisible, setIsUserFeedVisible] = useState(true);
  const [allPosts, setAllPosts] = useState([]);
  const [otherYser, setOtherUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const user = await getMe();
      setUser(user);
    };
    const getAllPosts = async () => {
      const { data } = await axiosInstance.get("/posts");
      console.log(data)
      setAllPosts(data?.posts);
    };
    getAllPosts();
    fetchData();
  }, []);

  const handleOpenChatPage = (chatRoomId) => {
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
    <div
      className={`flex w-full bg-[#f4f2ee] ${isUserFeedVisible ? "flex-row" : "flex-col"}`}
    >
      {isUserFeedVisible && <UserFeedComponent user={user} setUser={setUser} setAllPosts={setAllPosts} />}
      <div style={{ marginLeft: "calc(50vw - 520px)" }}>
        <AddPostComponent user={user} setAllPosts={setAllPosts} isUserFeedVisible={isUserFeedVisible} />
        <PostComponent user={user} allPosts={allPosts} setAllPosts={setAllPosts}/>
        <ChatListingComponent user={user} onChatRowClick={handleOpenChatPage} />
        {isChatOpen && (
          <ChatPage
            user={user}
            // otherUser={otherUser}
            onCloseChat={handleCloseChatPage}
            chatRoomId={chatRoomId}
          />
        )}
      </div>
    </div>
  );
};

export default Feed;
