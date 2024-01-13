// src/ChatComponent.js
import React, { useState, useEffect } from 'react';

import io from 'socket.io-client';

const socket = io("http://localhost:4000", {
    transports: ["websocket"],
  withCredentials: true,
});


const ChatComponent = () => {
  const [messageInput, setMessageInput] = useState('');



  const sendMessage = async (e) => {
    e.preventDefault();

      // Emit 'newMessage' event
      
      socket.emit('message', messageInput);

      setMessageInput('');
    
  };

  return (
    <div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type your message here"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatComponent;
