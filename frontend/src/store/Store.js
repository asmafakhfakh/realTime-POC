
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const middleware = [thunk];
const Store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);
export default Store;