import { SET_FOLLOWERS } from "../action/follower";

const initialState = {
  followers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FOLLOWERS:
      return {
        followers: action.followers,
      };
  }

  return state;
};
