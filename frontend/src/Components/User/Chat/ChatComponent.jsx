import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Marr  mesazhat prej  local storage
        const storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        setMessages(storedMessages);

       
        const response = await axios.get('http://localhost:4000/chatroom/allMessages/1');
        const apiMessages = response.data;
        setMessages(apiMessages);

        // inicializimi  WebSocket lidhjes
        socketRef.current = io('http://localhost:8001');

     
        socketRef.current.on('message', (newMessage) => {
       //kur kemi nje mesazh te ri

          // Update state and local storage  me mesazhin e ri 
          setMessages((prevMessages) => {
            const newMessages = [...prevMessages, newMessage];
            localStorage.setItem('chatMessages', JSON.stringify(newMessages));
            return newMessages;
          });
        });
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchData();

    return () => {
      // Disconnect WebSocket kur  component behet unmount
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const handleMessageSubmit = async () => {
    try {
      const inputy = input;// per shkak te delayit te ndrrimit te state - part1
      setInput('');//part2
      if (inputy && socketRef.current) {
        //emmit mesazhin e ri
        socketRef.current.emit('message', inputy);
  
        // Update state dhe local storage me mesazhin e ri 
        setMessages((prevMessages) => {
          const newMessage = { description: inputy }; // Assuming a basic structure for a new message
          const newMessages = [...prevMessages, newMessage];
          localStorage.setItem('chatMessages', JSON.stringify(newMessages));
          return newMessages;
        });
  
        // Send messazhin ne server per mu kriju messzhi i ri dhe mu rujt per chat room perkates
        await axios.post('http://localhost:4000/message/sendMessage', {
          userId: 1,//sa per testim me pas do behet dinamike
          chatId: 1,//sa per testim me pas do behet dinamike
          message: inputy,
        });
  
      
        
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.description}</li>//display i ben mesazhet
        ))}
      </ul>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Type a message"
      />
      <button onClick={handleMessageSubmit}>Send</button>
    </div>
  );
}

export default ChatPage;
