import React, { useEffect, useState } from 'react';
import MessageFeed from './src/MessageFeed';
import SignIn from './src/SignIn';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  const [userToken, setuserToken] = useState('');

  const readData = async () => {
    var tok = await AsyncStorage.getItem('token')
    if (tok !== null) {
      setuserToken(tok)
    }
  };
  useEffect(() => {
    readData();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {console.log('userToken', userToken),
          userToken ?
            <Stack.Screen name='MessageFeed' component={MessageFeed} />
            :
            <Stack.Screen name='SignIn' component={SignIn} />
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;