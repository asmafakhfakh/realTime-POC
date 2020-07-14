
import { MESSAGES } from '../constants'


const Initial_State = {
    messages:[],
}


export default function (state = Initial_State, action) {
    switch (action.type) {
        // payload = new msg
        case MESSAGES:
            // console.log('pay', action.payload)
        return {...state,messages:[...state.messages,action.payload]};
        default: return state;

    }
}