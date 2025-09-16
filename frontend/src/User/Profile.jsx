import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderComponent from "../Components/HeaderComponent";
import ChatPage from "../Components/User/Chat/ChatComponent";
import ChatListingComponent from "../Components/User/Chat/ChatListingComponent";
import ProfileLoggedUserInfo from "../Components/User/Profile/ProfileLoggedUser";
import FriendsProfile from "../Components/User/Profile/ProfileSearchingUser";
import SkillsSection from "../Components/User/Profile/SkillsSection";
import getMe from "../utilities/user/getMe";
import getUser from "../utilities/user/getUser";

const Profile = () => {
  const [loggedUser, setLoggedUser] = useState({});
  const [foreignUser, setForeignUser] = useState({});
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatRoomId, setChatRoomId] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchLoggedUser = async () => {
      const userData = await getMe();
      setLoggedUser(userData);
    };

    const fetchForeignUser = async () => {
      const userData = await getUser(userId);
      setForeignUser(userData);
    };

    fetchLoggedUser();
    fetchForeignUser();
  }, [userId]);

  const handleOpenChatPage = (chatRoomId) => {
    setIsChatOpen(true);
    setChatRoomId(chatRoomId);
  };

  const handleCloseChatPage = () => {
    setIsChatOpen(false);
    setChatRoomId(null);
  };

  return (
    <div className="bg-[#f4f2ee] w-full min-h-screen">
      <HeaderComponent />
      <div className="flex flex-col items-center justify-center w-full">
        {userId == loggedUser.id ? (
          <ProfileLoggedUserInfo user={loggedUser} />
        ) : (
          <FriendsProfile foreignUser={foreignUser} user={loggedUser} />
        )}
        <SkillsSection user={loggedUser} />

        <ChatListingComponent
          user={loggedUser}
          onChatRowClick={handleOpenChatPage}
        />

        {isChatOpen && (
          <ChatPage
            user={loggedUser}
            onCloseChat={handleCloseChatPage}
            chatRoomId={chatRoomId}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
