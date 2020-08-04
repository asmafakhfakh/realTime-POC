import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { getMessages, getOldMessages } from "./store/actions/messageActions";
import { authenticateUser } from './store/actions/authUserActions';
import config from './config';

const MessageFeed = () => {
  const messages = useSelector(state => state.messageReducer.messages);
  const authUser = useSelector(state => state.authUserReducer.authUser);
  const dispatch = useDispatch()
  const [chatMessage, setChatMessage] = useState('');
  var socket = io(config.URL);
  useEffect(() => {
    dispatch(getOldMessages());
    dispatch(authenticateUser())
    dispatch(getMessages());
  },
    []
  );
  let submitChatMessage = async (e) => {
    e.preventDefault()
    await socket.emit('chat message', { content: chatMessage, sender: authUser.username });
    setChatMessage('');
  };
  let handleChange = (e) => {
    e.preventDefault()
    setChatMessage(e.target.value)
  };

  return (
    <form onSubmit={(e) => submitChatMessage(e)}>
      <input type="text" value={chatMessage} onChange={(e) => handleChange(e)} style={{ borderWidth: 3 }} />
      {messages && messages.map((message, i) => (
        <div key={i} style={{ backgroundColor: "lightblue" }}>
          <p style={{ borderWidth: 0.5, top: 100 }}>{message.content}</p>
          <p style={{ color: "#FF5733" }}>{message.sender}</p>
        </div>
      ))
      }
    </form>
  );
};
export default MessageFeed;