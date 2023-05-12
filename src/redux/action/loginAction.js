import * as actionTypes from '../constants';

export const loginSuccess = (user) => (dispatch) => {
    dispatch({ type: actionTypes.GET_LOGIN_SUCCESS, payload: user });
}