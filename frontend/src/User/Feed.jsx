import React from 'react'
import UserFeedComponent from '../Components/User/UserFeedComponent';
import PostComponent from '../Components/User/PostComponent';
import './Feed.css';
const Feed = () => {
  return (
    <div className='feed-container'>
        <UserFeedComponent/> {/* user feed componenta ne pjesen majtas */}
        <PostComponent/>
    </div>
  )
}

export default Feed