import * as actionType from "../constants";

const initialState = {
  isLoggedIn: false,
  user: null
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_LOGIN_SUCCESS:
      return { isLoggedIn: true, user: action.payload };

    case actionType.GET_LOGOUT_USER:
      return { isLoggedIn: false, user: null };

    default:
      return state;
  }
};

