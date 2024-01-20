import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

let socket;

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket = io('http://localhost:8001'); // replace with your server address
    socket.on('message', message => {
      setMessages(messages => [...messages, message]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleMessageSubmit = () => {
    if (input) {
      socket.emit('message', input);
      setInput('');
    }
  };

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        type="text"
        placeholder="Type a message"
      />
      <button onClick={handleMessageSubmit}>Send</button>
    </div>
  );
}

export default ChatPage;
