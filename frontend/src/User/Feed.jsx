import React from 'react'
import UserFeedComponent from '../Components/User/Feed/UserFeedComponent';
import AddPostComponent from '../Components/User/Feed/AddPostComponent';
import PostComponent from '../Components/User/Feed/PostComponent';
import './Feed.css';
const Feed = () => {
  return (
    <div className='feed-container'>
        <UserFeedComponent/> {/* user feed componenta ne pjesen majtas */}
        <div>
        <AddPostComponent/>
        <PostComponent/>
        </div>
      
    </div>
  )
}

export default Feed