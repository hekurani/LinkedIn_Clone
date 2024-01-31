import React,{useEffect,useState} from 'react'
import UserFeedComponent from '../Components/User/Feed/UserFeedComponent';
import AddPostComponent from '../Components/User/Feed/AddPostComponent';
import PostComponent from '../Components/User/Feed/PostComponent';
import ChatPage from '../Components/User/Chat/ChatComponent';
import './Feed.css';
import ChatListingComponent from '../Components/User/Chat/ChatListingComponent';
import axios from 'axios';
const Feed = () => {
const [user,setUser] = useState([])

  useEffect(()=> {
    const fetchData  = async() => {
        const resposne = await axios.get("http://localhost:4000/users/users/1")
          setUser(resposne.data)
      }
 

      fetchData();
  },[])
  return (
    <div className='feed-container'>
        <UserFeedComponent user={user}/> {/* user feed componenta ne pjesen majtas */}
        <div>

          <AddPostComponent user={user}/> {/* Pjesa qe e bene add nje post */}
        <PostComponent user={user}/> {/* pjesa e posteve */}


        <ChatListingComponent user={user}/> {/* lista me chatroom */}
        <ChatPage user={user}/> {/* CHatRoom componenta */}
        </div>
      
    </div>
  )
}

export default Feed