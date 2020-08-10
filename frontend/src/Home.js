/**
 * @format
 * @flow strict-local
 */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, ScrollView } from 'react-native';
import Axios from 'axios';
import config from '../config'
import AsyncStorage from '@react-native-community/async-storage';
import { signOut } from './store/actions/authUserActions'

const Home = ({ navigation }) => {
    const dispatch = useDispatch()
    const authUser = useSelector(state => state.authUserReducer.authUser);
    const [usersList, setusersList] = useState([]);

    const logout = async () => {
        alert('signout')
        try {
            await AsyncStorage.getAllKeys()
                .then(keys => AsyncStorage.multiRemove(keys))
                .then(() => dispatch(signOut()))
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
        };
    };

    handleSubmit = () => {
        logout()
    };

    useEffect(() => {
        Axios.get(`${config.URL}/allusers`)
            .then(res => {
                setusersList(res.data)
            })
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    authUser && authUser.username && <Text style={{ padding: 10 }}>{`connected user: ${authUser.username}`}</Text>
                }
                <Button color="#841584" title={'signout'} onPress={() => handleSubmit()} />
                <Text style={styles.title}> Group conversations </Text>
                <Button
                    title="Community Chat"
                    onPress={() => navigation.navigate('MessageFeed', { type: "community" })}
                />
                <View style={styles.separator} />
                <Text style={styles.title}> Private conversations </Text>
                {
                    usersList && authUser && usersList.filter(el => el._id !== authUser.userid).map((userEl, i) => (
                        <View key={i}>
                            <Button
                                title={userEl.username}
                                onPress={() => navigation.navigate('MessageFeed', { type: "private", correspondant: userEl })}
                            />
                            <View style={styles.separator} />
                        </View>
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
    },
    title: {
        // textAlign: 'center',
        marginVertical: 8,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});

export default Home;