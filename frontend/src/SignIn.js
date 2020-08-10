/**
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import config from '../config';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { authenticateUser } from './store/actions/authUserActions';
import { useDispatch, useSelector } from "react-redux";


const SignIn = () => {
    const dispatch = useDispatch();
    const [usernameInput, setusernameInput] = useState('');
    const [passwordInput, setpasswordInput] = useState('');

    const saveData = async (token) => {
        await AsyncStorage.setItem('token', token)
    }

    handleSubmit = () => {
        axios.post(`${config.URL}/signin`, { username: usernameInput, password: passwordInput })
            .then(res => {
                saveData(res.data);
                dispatch(authenticateUser(res.data));
                setusernameInput('');
                setpasswordInput('');
                alert('sigin')
            })
            .catch(err => {
                alert('sigin failed')
                console.log(err);
            });

    }

    return (
        <View style={styles.View}>
            <TextInput
                placeholder="username"
                style={styles.TextInput}
                value={usernameInput}
                autoCorrect={false}
                onChangeText={(text) => setusernameInput(text.toLowerCase())}
            />
            <TextInput
                placeholder="password"
                style={styles.TextInput}
                value={passwordInput}
                autoCorrect={false}
                onChangeText={(text) => setpasswordInput(text.toLowerCase())}
            />
            <Button color="#841584" title={'submit'} onPress={() => handleSubmit()} />
        </View>
    );
};
const styles = StyleSheet.create({
    View: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
    },
    TextInput: {
        height: 40,
        borderWidth: 3,
        backgroundColor: '#F7B99D'
    },
    submit: {
        paddingTop: 2000,
    }
});
export default SignIn;