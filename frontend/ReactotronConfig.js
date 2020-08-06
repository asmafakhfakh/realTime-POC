import Reactotron, { asyncStorage } from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';

Reactotron
    .setAsyncStorageHandler(AsyncStorage)
    .configure()
    .use(asyncStorage()) // <--- here we go!
    .connect()