import React, { useState } from 'react';
import config from './config';
import axios from 'axios';
import cookies from 'browser-cookies';


const SignIn = () => {
    const [usernameInput, setusernameInput] = useState('');
    const [passwordInput, setpasswordInput] = useState('');
    let submitSignin = (e) => {
        e.preventDefault()
        axios.post(`${config.URL}/signin`, { username:usernameInput, password:passwordInput })
            .then(res => {
                cookies.set('token', res.data);
            })
            .catch(err => {
                console.log(err);
            });
        setusernameInput('');
        setpasswordInput('');
    };
    return (
        <form onSubmit={(e) => submitSignin(e)} >
            <h3>Sign in</h3>
            <label>username</label>
            <input type="text" value={usernameInput} onChange={(e) => setusernameInput(e.target.value)} style={{ borderWidth: 3 }} />
            <label>password</label>
            <input type="text" value={passwordInput} onChange={(e) => setpasswordInput(e.target.value)} style={{ borderWidth: 3 }} />
            <input type="submit" value="send" />
        </form>
    );
};
export default SignIn;