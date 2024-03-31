import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { faEllipsis, faImage, faLink, faVideo, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

let socket;

function ChatPage({user,onCloseChat,chatRoomId }) {
  console.log("Chat ID ID:", chatRoomId);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(true);//me handle chat open/close
  const messagesEndRef = useRef(null);//mesazhi i fundit

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:4000/chatroom/allMessages/${chatRoomId}`);
      const apiMessages = response.data;
      setMessages(apiMessages);
    };
  
    if (chatRoomId) {
      fetchData();
  
      socket = io('http://localhost:8001');
      socket.on('message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        scrollToBottom();
      });
  
      return () => {
        socket.disconnect();
      };
    }
  }, [chatRoomId]);

  useEffect(() => {
    //scroll ne fund masi bohet enter new message
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Scroll ne fund kur hapet faqja
    scrollToBottom();
  }, []);

  const handleMessageSubmit = async () => {
    if (input) {
      const messageData = {
        description: input,
        user: {
          id: user.id, 
          name: user.name,
          lastname: user.lastname, 
          imageProfile: user.imageProfile, 
        },
      };
  
      socket.emit('message', messageData);
  
      await axios.post('http://localhost:4000/message/sendMessage', {
        userId: `${user.id}`, 
        chatId: 1, 
        message: input,
      });
      setInput('');
      scrollToBottom();
    }
  };
  

  const handleToggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) {
      scrollToBottom();
    } else {
      onCloseChat(); // This will close the chat when clicking on the "X" button
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });//me bo scroll to newest message ne formen smooth
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {//nese e type enter me dergu message
      e.preventDefault();
      handleMessageSubmit();
    }
  };

  return (
    <div className={`h-96 w-80  rounded-t-md fixed bottom-0 right-40 mr-40 ${isChatOpen ? '' : 'hidden'}`} style={{ borderTop: '1px solid grey', borderLeft: '1px solid grey',backgroundColor:'white', borderRight: '1px solid grey' }}>
      <div className='header flex justify-items-center items-center' style={{ borderBottom: '1px solid black' }}>
        <img src={user.imageProfile} className='ml-2 h-8 w-8' alt='profili' style={{borderRadius:'50%',objectFit:'cover'}}/>
        <div className='ml-4 mr-3'>
          <p className='font-semibold'>Ferat Gashi</p>
          <p className='text-xs'>Available on mobile</p>
        </div>
        <span className='ml-auto'>
          <FontAwesomeIcon className='mr-3' icon={faEllipsis} />
          <FontAwesomeIcon className='mr-3' icon={faVideo} />
          <FontAwesomeIcon className='mr-4' icon={faXmark} onClick={handleToggleChat} />
        </span>
      </div>

      <div className='max-h-56 w-80 overflow-y-auto pb-5 pl-2 mb-1 h-96' style={{ borderBottom: '1px solid grey' }} >
       
        <ul style={{ wordWrap: 'break-word' }}>
          {messages.map((message, index) => (
            <div className='flex mb-5'>
            
        <img src={message.user.imageProfile} className='ml-2  mt-2 h-10 w-10' alt='profili' style={{borderRadius:'50%',objectFit:'cover'}}/>
        <div className='ml-2'>
          <p className='font-semibold'>{message.user.name} {message.user.lastname}</p>
        <li className='w-52 ' key={index}>{message.description}</li>
        </div>
            
            </div>
          ))}
        </ul>
        <div ref={messagesEndRef}></div>
      </div>
      <div className='h-12  w-72 ml-2 mt-1 p-1.5 mt-2 rounded-md' style={{ backgroundColor: '#f5f5ef' }}>
        <input
          style={{ border: 'none', backgroundColor: '#f5f5ef', outline: 'none' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type='text'
          placeholder='Write a message...'
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className=' h-13 mt-4 flex justify-center items-center' >
        <FontAwesomeIcon className='ml-3'icon={faImage} />
        <FontAwesomeIcon className='ml-3' icon={faLink} />
        <svg id="gif-small" className='h-5 w-5 ml-3' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"  role="none" data-supported-dps="16x16" fill="currentColor">
          <path d="M12 6v1h2v2h-2v3h-2V4h5v2h-3zm-5 6h2V4H7v8zM1 6v4c0 1.1.9 2 2 2 .39 0 .74-.01 1.63-.74L5 12h1V8H4v2H3V6h3V4H3c-1.1 0-2 .9-2 2z"></path>
        </svg>

        <div className='ml-auto '>
          <button className=' rounded-full font-semibold text-white pl-3 pr-3  mt-1 pb-1 mr-3' style={{ backgroundColor: '#0a66c2', outline: 'none' }} onClick={handleMessageSubmit}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
