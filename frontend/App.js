import React, { useEffect, useState } from 'react';
import MessageFeed from './src/MessageFeed';
import SignIn from './src/SignIn';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { authenticateUser } from './src/store/actions/authUserActions';
import { useDispatch, useSelector } from "react-redux";

const Stack = createStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  const authUser = useSelector(state => state.authUserReducer.authUser);


  const [token, setToken] = useState('');
  console.log('token', token);

  const [intialRoute, setintialRoute] = useState('');


  const readData = async () => {
    var tok = await AsyncStorage.getItem('token')
    if (tok !== null) {
      console.log("token from asyncstorage", tok);
      setToken(tok);
      dispatch(authenticateUser(tok))
    }
  };
  useEffect(() => {
    console.log('useEffectApp')
    readData();
  if(token == '')
  setintialRoute('SignIn') 
  else
  setintialRoute('MessageFeed') 
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={intialRoute }>
        <Stack.Screen name='SignIn' component={SignIn} />
        <Stack.Screen name='MessageFeed' component={MessageFeed} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;