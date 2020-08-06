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
        case 'STORE_TOKEN':
            return{
                ...state,
                reduxToken: action.payload
            };
        case 'SIGN_OUT':
            return {
                reduxToken: null,
                authUser:null
            }
        default: return state;
    };
};