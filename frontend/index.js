/**
 * @format
 */
if(__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import React from 'react';
import { Provider } from 'react-redux';
import Store from "./src/store/Store";

export default function Main() {
  return (
    <Provider store={Store}>
      <App />
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
