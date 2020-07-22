import React from 'react';
// import './App.css';
import MessageFeed from './MessageFeed';
import SignIn from './SignIn'
var cookies = require('browser-cookies');

function App() {
  let tokenCookie = cookies.get('token');
  let handleSigOut=()=>{
    cookies.erase('token');
  }
  return (
    <div className="todo-app">
      {tokenCookie && <button onClick={handleSigOut}>sign out</button>}
      <h1>Chat app</h1>
      {tokenCookie ? <MessageFeed /> : <SignIn />}
    </div>
  );
}

export default App;
