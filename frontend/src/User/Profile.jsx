import React, { useState, useEffect } from "react";
import ProfileLoggedUserInfo from "../Components/User/Profile/ProfileLoggedUser";
import FriendsProfile from "../Components/User/Profile/ProfileSearchingUser";
import ChatPage from "../Components/User/Chat/ChatComponent";
import ChatListingComponent from "../Components/User/Chat/ChatListingComponent";
import ProfileSection from "../Components/User/Profile/ProfileSection";
import { useParams } from "react-router-dom";
import getMe from "../utilities/user/getMe";
import getUser from "../utilities/user/getUser";

const Profile = () => {
  const [loggedUser, setLoggedUser] = useState({});
  const [foreignUser, setForeignUser] = useState({});
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

  return (
    <div>
      {userId == loggedUser.id ? (
        <ProfileLoggedUserInfo user={loggedUser} />
      ) : (
        <FriendsProfile user={foreignUser} />
      )}
      <ProfileSection user={loggedUser} />
      <ChatPage user={loggedUser} />
      <ChatListingComponent user={loggedUser} />
    </div>
  );
};

export default Profile;
