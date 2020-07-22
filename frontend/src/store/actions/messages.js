
import io from "socket.io-client";
import {MESSAGES} from '../constants'


export const chatMessages = (payload) => {
    return {
        type : MESSAGES,
        payload
    }
}
export const getMessages = () =>{
    var socket = io("http://127.0.0.1:3000");
return dispatch => {
        socket.on("chat message", msg => {
            dispatch(chatMessages(msg))
        })
      
    }

}
