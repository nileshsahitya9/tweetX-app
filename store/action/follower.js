export const SET_FOLLOWERS = "SET_FOLLOWERS";

import Follower from "../../models/follower";
export const fetchFollower = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://tweetx-24e5b.firebaseio.com/social/follower/${userId}.json`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedUsers = [];
      const sortedUsers = [];
      if (resData) {
        for (const key in resData) {
          loadedUsers.push({
            followId: resData[key].userFollowerId,
            followName: resData[key].userFollowerName,
          });
        }
        const response = await fetch(
          `https://tweetx-24e5b.firebaseio.com/social/following/${userId}.json`
        );
        let res = await response.json();
        if (res) {
          for (const j in loadedUsers) {
            let enable = false;
            for (const key in res) {
              if (res[key].userFollowingId === loadedUsers[j].followId) {
                enable = true;
                break;
              }
            }
            sortedUsers.push(
              new Follower(
                loadedUsers[j].followId,
                loadedUsers[j].followName,
                enable
              )
            );
          }
        } else {
          for (const key in loadedUsers) {
            sortedUsers.push(
              new Follower(
                loadedUsers[key].followId,
                loadedUsers[key].followName,
                false
              )
            );
          }
        }
      }
      dispatch({ type: SET_FOLLOWERS, followers: sortedUsers });
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };
};

export const followerUser = (name, followerId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://tweetx-24e5b.firebaseio.com/social/follower/${followerId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userFollowerName: name,
          userFollowerId: userId,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
  };
};
