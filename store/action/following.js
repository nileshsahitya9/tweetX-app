export const ADD_FOLLOWING = "ADD_FOLLOWING";
export const SET_FOLLOWINGS = "SET_FOLLOWINGS";

import Following from "../../models/following";

import { followerUser } from "./follower";

export const fetchUserFollowings = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://tweetx-24e5b.firebaseio.com/social/following/${userId}.json`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedUsers = [];
      for (const key in resData) {
        loadedUsers.push(
          new Following(
            resData[key].userFollowingId,
            resData[key].userFollowingName
          )
        );
      }

      dispatch({ type: SET_FOLLOWINGS, followings: loadedUsers });
      return loadedUsers;
    } catch (err) {
      throw new Error(err);
    }
  };
};

export const addFollowingUser = (name, followingId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const userName = getState().auth.userEmail;
    const response = await fetch(
      `https://tweetx-24e5b.firebaseio.com/social/following/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userFollowingName: name,
          userFollowingId: followingId,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    dispatch(followerUser(userName, followingId));
    const resData = await response.json();
    dispatch({
      type: ADD_FOLLOWING,
      followingData: {
        id: resData.name,
        userFollowingName: name,
      },
    });
    return resData;
  };
};
