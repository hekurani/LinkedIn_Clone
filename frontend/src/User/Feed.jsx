import React from 'react'
import UserFeedComponent from '../Components/User/Feed/UserFeedComponent';
import AddPostComponent from '../Components/User/Feed/AddPostComponent';
import PostComponent from '../Components/User/Feed/PostComponent';
import ChatPage from '../Components/User/Chat/ChatComponent';
import './Feed.css';
import ChatListingComponent from '../Components/User/Chat/ChatListingComponent';
const Feed = () => {
  return (
    <div className='feed-container'>
        <UserFeedComponent/> {/* user feed componenta ne pjesen majtas */}
        <div>
        <AddPostComponent/>
        <PostComponent/>
        <ChatListingComponent/>
        <ChatPage/>
        </div>
      
    </div>
  )
}

export default Feed