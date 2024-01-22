import React from 'react'
import ProfileInfo from '../Components/User/Profile/ProfileInfo';
import ChatPage from '../Components/User/Chat/ChatComponent';
import ChatListingComponent from '../Components/User/Chat/ChatListingComponent';
const Profile = () => {
  return (
    <div>
   <ProfileInfo/>
   <ChatPage/>
   <ChatListingComponent/>
    </div>
  )
}

export default Profile