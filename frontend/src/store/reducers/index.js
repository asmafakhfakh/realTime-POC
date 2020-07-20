import { combineReducers } from 'redux';
import messageReducer from './messageReducer'

const rootReducer = combineReducers({
     msg: messageReducer,
});
export default rootReducer