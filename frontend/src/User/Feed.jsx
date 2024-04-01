import React, { useEffect, useState } from 'react';
import UserFeedComponent from '../Components/User/Feed/UserFeedComponent';
import AddPostComponent from '../Components/User/Feed/AddPostComponent';
import PostComponent from '../Components/User/Feed/PostComponent';
import ChatPage from '../Components/User/Chat/ChatComponent';
import './Feed.css';
import ChatListingComponent from '../Components/User/Chat/ChatListingComponent';
import axios from 'axios';

const Feed = () => {
  const [user, setUser] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatRoomId, setChatRoomId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:4000/users/users/1")
      setUser(response.data)
    }

    fetchData();
  }, []);

  const handleOpenChatPage = (chatRoomId) => {
    console.log("Chat Room ID:", chatRoomId);
    setIsChatOpen(true);
    setChatRoomId(chatRoomId);
  };

  const handleCloseChatPage = () => {
    setIsChatOpen(false);
  };

  return (
    <div className='feed-container'>
      <UserFeedComponent user={user} />
      <div>
        <AddPostComponent user={user} />
        <PostComponent user={user} />
        <ChatListingComponent user={user} onChatRowClick={handleOpenChatPage} />
        {isChatOpen && <ChatPage user={user} onCloseChat={handleCloseChatPage} chatRoomId={chatRoomId}/>}
      </div>
    </div>
  );
}

export default Feed;