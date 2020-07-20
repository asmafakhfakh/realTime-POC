
import { ADD_NEW_MESSAGE } from '../constants'


const Initial_State = {
    messages: [],
}


export default function (state = Initial_State, action) {
    switch (action.type) {
        case ADD_NEW_MESSAGE:
            return { ...state, messages: [...state.messages, action.payload] };
        default: return state;

    }
}