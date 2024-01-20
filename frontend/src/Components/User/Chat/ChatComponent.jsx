import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

let socket;

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:4000/chatroom/allMessages/1');// per testim kem qu id 1
      const apiMessages = response.data;
      setMessages(apiMessages);
    };

    fetchData();

    socket = io('http://localhost:8001'); 
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, { description: message }]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleMessageSubmit = async () => {
    if (input) {
      socket.emit('message', input);

      await axios.post('http://localhost:4000/message/sendMessage', {
        userId: 1,//id per testim
        chatId: 1,//id per testim
        message: input,
      });
      setInput('');
    }
  };

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.description}</li>
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
