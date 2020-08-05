import config from '../../../config';
import { AUTHENTICATE_USER } from '../constants';
import jwt from "react-native-pure-jwt";

export const authenticateUser = (token) => {
    return dispatch => {
        jwt.decode(token, config.SECRET_KEY, {skipValidation: true})
            .then(decoded => {
                dispatch({
                    type: AUTHENTICATE_USER,
                    payload: decoded.payload
                })
            })
            .catch(err => console.log('error in jwt.decode', err))
    };
};