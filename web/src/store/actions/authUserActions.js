import config from '../../config';
import { AUTHENTICATE_USER } from '../constants';
import jwt from 'jsonwebtoken';
import cookies from 'browser-cookies';

export const authenticateUser = () => {
    return dispatch => {
        let user = jwt.verify(cookies.get('token'), config.SECRET_KEY);
        dispatch({
            type: AUTHENTICATE_USER,
            payload: user
        });
    };
};