import React from 'react';
// import './App.css';
import MessageFeed from './MessageFeed';
import SignIn from './SignIn';
import { useSelector } from "react-redux";
var cookies = require('browser-cookies');

function App() {
  const authUser = useSelector(state => state.authUserReducer.authUser);
  let tokenCookie = cookies.get('token');
  let handleSigOut=()=>{
    cookies.erase('token');
  }
  return (
    <div className="todo-app">
      <h1>Chat app</h1>
      {tokenCookie && <button onClick={handleSigOut}>{`Sign Out (${authUser.username})`}</button>}
      {tokenCookie ? <MessageFeed /> : <SignIn />}
    </div>
  );
}

export default App;
