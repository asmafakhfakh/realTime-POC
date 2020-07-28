import { combineReducers } from 'redux';
import messageReducer from './messageReducer';
import authUserReducer from './authUserReducer';

const rootReducer = combineReducers({
     messageReducer,
     authUserReducer,
});
export default rootReducer;