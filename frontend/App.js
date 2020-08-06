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
  const reduxToken = useSelector(state => state.authUserReducer.reduxToken);

  const storeToken = async () => {
    let userToken;
    try {
      userToken = await AsyncStorage.getItem('token');
      userToken && dispatch({ type: 'STORE_TOKEN', payload: userToken });
    } catch (e) {
      console.log(e);
    };
  };

  useEffect(() => {
    storeToken()
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          !reduxToken ?
            <Stack.Screen name='SignIn' component={SignIn} />
            :
            <Stack.Screen name='MessageFeed' component={MessageFeed} />
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;