/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet
} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { getMessages } from "./store/actions/messages";
const MessageFeed = (props) => {
  const messages = useSelector(state => state.msg.messages);
  console.log('messages123', messages);
  const dispatch = useDispatch()
  const [chatMessage, setChatMessage] = useState("");
  // const [chatMessages, setChatMessages] = useState([]);
  var socket = io("http://127.0.0.1:3000");
  useEffect(() => {
    dispatch(getMessages())
  }
    ,
    []
  );
  submitChatMessage = async () => {
    await socket.emit('chat message', chatMessage);
    // get message
    setChatMessage('');
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={{ height: 40, borderWidth: 3, top: 100 }}
        autoCorrect={false}
        value={chatMessage}
        onSubmitEditing={() => submitChatMessage()}
        onChangeText={chatMessage => {
          setChatMessage(chatMessage);
        }}
      />
      {messages && messages.map(message => (
        <Text key={Math.random()} style={{ height: 50, borderWidth: 0.5, top: 100 }}>{message}</Text>
      ))
      }
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 400,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
export default MessageFeed;