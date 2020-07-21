
import io from "socket.io-client";
import axios from 'axios';
import { GET_OLD_MESSAGES, ADD_NEW_MESSAGE } from '../constants';
import config from '../../../config';


export const getMessages = () => {
    var socket = io(config.URL);
    return dispatch => {
        socket.on("chat message", msg => {
            dispatch({
                type: ADD_NEW_MESSAGE,
                payload: msg
            });
        });
    };
};
export const getOldMessages = () => {
    return dispatch =>
        axios.get(`${config.URL}/oldmessages/community`)
            .then(res => {
                dispatch({
                    type: GET_OLD_MESSAGES,
                    payload: res.data
                });
            })
            .catch(err => {
                console.log(err);
            });
};