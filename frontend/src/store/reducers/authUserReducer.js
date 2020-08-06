import { AUTHENTICATE_USER, SIGN_OUT } from '../constants'


const Initial_State = {
    authUser: {},
};

export default function (state = Initial_State, action) {
    switch (action.type) {
        case AUTHENTICATE_USER:
            return {
                ...state,
                reduxToken: action.payload.token,
                authUser: action.payload.decoded
            };
        case SIGN_OUT:
            return {
                reduxToken: null,
                authUser: null
            }
        default:
            return state;
    };
};