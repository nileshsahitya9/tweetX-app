import { ADD_FOLLOWING, SET_FOLLOWINGS } from "../action/following";

import Following from "../../models/following";

const initialState = {
  followings: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FOLLOWINGS:
      return {
        followings: action.followings,
      };
    case ADD_FOLLOWING:
      const newFollowing = new Following(
        action.followingData.id,
        action.followingData.userFollowingName
      );
      return {
        ...state,
        followings: state.followings.concat(newFollowing),
      };
  }

  return state;
};
