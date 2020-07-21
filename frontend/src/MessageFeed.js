/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { getMessages, getOldMessages } from "./store/actions/messages";
import config from '../config';


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
  submitChatMessage = async () => {
    await socket.emit('chat message', { content: chatMessage, sender: "user client" });
    setChatMessage('');
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={{ height: 40, borderWidth: 3, top: 100 }}
        autoCorrect={false}
        value={chatMessage.content}
        onSubmitEditing={() => submitChatMessage()}
        onChangeText={(text) => setChatMessage(text)}
      />
      {messages && messages.map(message => (
        <Text key={Math.random()} style={{ height: 50, borderWidth: 0.5, top: 100 }}>{message.content}</Text>
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