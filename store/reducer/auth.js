import { AUTHENTICATE, LOGOUT } from "../action/auth";

const initialState = {
  token: null,
  userId: null,
  userEmail: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        userEmail: action.userEmail,
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
