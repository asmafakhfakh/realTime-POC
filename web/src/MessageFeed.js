import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { getMessages, getOldMessages } from "./store/actions/messageActions";
import config from './config'

const MessageFeed = () => {
  const messages = useSelector(state => state.messageReducer.messages);
  const dispatch = useDispatch()
  const [chatMessage, setChatMessage] = useState('');
  var socket = io(config.URL);
  useEffect(() => {
    dispatch(getOldMessages())
    dispatch(getMessages())
  },
    []
  );
  let submitChatMessage = async (e) => {
    e.preventDefault()
    await socket.emit('chat message', { content: chatMessage, sender: "user client" });
    setChatMessage('');
  }
  let handleChange = (e) => {
    e.preventDefault()
    setChatMessage(e.target.value)
  }
  return (
    <form onSubmit={(e) => submitChatMessage(e)}>
      <input type="text" value={chatMessage} onChange={(e) => handleChange(e)} style={{ borderWidth: 3 }} />
      {messages && messages.map((message, i) => (
        <p key={i} style={{ height: 50, borderWidth: 0.5, top: 100 }}>{message.content}</p>
      ))
      }
    </form>
  );
};
export default MessageFeed;