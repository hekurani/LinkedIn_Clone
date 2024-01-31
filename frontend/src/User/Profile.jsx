import React ,{useState,useEffect} from 'react'
import ProfileInfo from '../Components/User/Profile/ProfileInfo';
import ChatPage from '../Components/User/Chat/ChatComponent';
import ChatListingComponent from '../Components/User/Chat/ChatListingComponent';
import axios  from 'axios';
const Profile = () => {
  const [user,setUser] = useState([])

  useEffect(()=> {
    const fetchData  = async() => {
        const resposne = await axios.get("http://localhost:4000/users/users/1")
          setUser(resposne.data)
      }
 

      fetchData();
  },[])
  return (
    <div>
   <ProfileInfo user={user}/>
   <ChatPage user={user}/>
   <ChatListingComponent user={user}/>
    </div>
  )
}

export default Profile