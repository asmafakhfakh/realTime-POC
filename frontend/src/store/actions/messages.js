
import io from "socket.io-client";
import {ADD_NEW_MESSAGE} from '../constants'


export const chatMessages = (payload) => {
    return {
        type : ADD_NEW_MESSAGE,
        payload
    }
}
export const getMessages = () =>{
    var socket = io("http://127.0.0.1:3010");
return dispatch => {
        socket.on("chat message", msg => {
            dispatch(chatMessages(msg.content))
        })
      
    }

}
