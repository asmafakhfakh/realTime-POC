import { AUTHENTICATE_USER } from '../constants'


const Initial_State = {
    authUser: {},
};

export default function (state = Initial_State, action) {
    switch (action.type) {
        case AUTHENTICATE_USER:
            return {
                ...state,
                authUser: action.payload
            };
        default: return state;
    };
};