import { GET_OLD_MESSAGES, ADD_NEW_MESSAGE } from '../constants'


const Initial_State = {
    messages: [],
}


export default function (state = Initial_State, action) {
    switch (action.type) {
        case GET_OLD_MESSAGES:
            return {
                ...state,
                messages: action.payload
            };
        case ADD_NEW_MESSAGE:
            return {
                ...state,
                messages: state.messages.concat(action.payload)
            };
        default: return state;
    }
}