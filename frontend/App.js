import React, { useEffect, useState } from 'react';
import MessageFeed from './src/MessageFeed';
import SignIn from './src/SignIn';
import Home from './src/Home'
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { authenticateUser } from './src/store/actions/authUserActions';
import { useDispatch, useSelector } from "react-redux";

const Stack = createStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  const authUserReducer = useSelector(state => state.authUserReducer);

  const storeToken = async () => {
    let userToken;
    try {
      userToken = await AsyncStorage.getItem('token');
      userToken && dispatch(authenticateUser(userToken));
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
          !authUserReducer.reduxToken ?
            <Stack.Screen name='SignIn' component={SignIn} />
            :
            <>
              <Stack.Screen name='Home' component={Home} />
              <Stack.Screen name='MessageFeed' component={MessageFeed} />
            </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;