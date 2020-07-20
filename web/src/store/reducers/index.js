import { createStore, combineReducers, applyMiddleware } from 'redux';
import messageReducer from './messageReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [thunk];

const rootReducer = combineReducers({
     messageReducer,
});
export default createStore(
     rootReducer,
     composeWithDevTools(applyMiddleware(...middleware))
);