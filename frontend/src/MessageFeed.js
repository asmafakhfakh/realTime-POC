/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, ScrollView, Button } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { getMessages, getOldMessages } from "./store/actions/messageActions";
import { authenticateUser } from './store/actions/authUserActions';
import config from '../config';
import AsyncStorage from '@react-native-community/async-storage';

const MessageFeed = ({ navigation }) => {
  console.log('navigation', navigation);

  const messages = useSelector(state => state.messageReducer.messages);
  const authUser = useSelector(state => state.authUserReducer.authUser);
  const dispatch = useDispatch()
  const [chatMessage, setChatMessage] = useState('');
  var socket = io(config.URL);
  useEffect(() => {
    dispatch(authenticateUser())
    dispatch(getOldMessages())
    dispatch(getMessages())
  },
    []
  );
  submitChatMessage = async () => {
    await socket.emit('chat message', { content: chatMessage, sender: "user client" });
    setChatMessage('');
  }
  const logout = async () => {
    try {
      await AsyncStorage.getAllKeys()
        .then(keys => AsyncStorage.multiRemove(keys));
      navigation.navigate({ name: "SignIn" })
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  }
  handleSubmit = () => {
    // clearToken()
    logout()
    // removeItemValue()
  }
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      {/* <Text style={{padding: 10}}>{`connected user: ${authUser.username}`}</Text> */}
      <Button color="#841584" title={'signout'} onPress={() => handleSubmit()} />
      <TextInput
        style={styles.TextInput}
        autoCorrect={false}
        value={chatMessage.content}
        onSubmitEditing={() => submitChatMessage()}
        onChangeText={(text) => setChatMessage(text)}
      />
      <ScrollView contentContainerStyle={styles.ScrollView}>
        {messages && messages.map((message, i) => (
          <View key={i} style={styles.message}>
            <Text >{message.content}</Text>
            <Text style={{ color: "#797878" }}>{message.sender}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    top: 100
  },
  TextInput: {
    height: 40,
    borderWidth: 3,
    // top: 100,
    backgroundColor: '#F7B99D'
  },
  ScrollView: {
    height: "auto",
    paddingBottom: 100
  },
  message: {
    // height: 50,
    padding: 10,
    borderWidth: 0.5,
    // top: 100
  }
});
export default MessageFeed;