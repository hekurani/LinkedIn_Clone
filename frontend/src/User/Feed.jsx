import React from 'react'
import UserFeedComponent from '../Components/User/UserFeedComponent';
import AddPostComponent from '../Components/User/AddPostComponent';
import PostComponent from '../Components/User/PostComponent';
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