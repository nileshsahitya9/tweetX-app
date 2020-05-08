export const ADD_POST = "ADD_POST";
export const SET_POSTS = "SET_POSTS";

import Post from "../../models/post";
import { fetchUserFollowings } from "../action/following";
export const fetchUserPosts = (postId) => {
  return async (dispatch, getState) => {
    const userId = !postId ? getState().auth.userId : postId;
    try {
      const response = await fetch(
        `https://tweetx-24e5b.firebaseio.com/posts/${userId}.json`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedPosts = [];
      for (const key in resData) {
        loadedPosts.push(
          new Post(
            userId,
            resData[key].post,
            resData[key].userName,
            new Date(resData[key].date)
          )
        );
      }

      dispatch({ type: SET_POSTS, posts: loadedPosts });
      return loadedPosts;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };
};

export const addUserPost = (userPost) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const userName = getState().auth.userEmail;
    const date = new Date();
    const response = await fetch(
      `https://tweetx-24e5b.firebaseio.com/posts/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post: userPost,
          userName: userName,
          date: date.toISOString(),
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const resData = await response.json();
    dispatch({
      type: ADD_POST,
      postData: {
        id: userId,
        userPost: userPost,
        userName: userName,
        date: date,
      },
    });
  };
};

export const fetchFollowUserPost = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `https://tweetx-24e5b.firebaseio.com/posts.json`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      let res = await dispatch(fetchUserFollowings());
      const resData = await response.json();
      const loadedPosts = [];
      for (const key in res) {
        for (const k in resData) {
          if (k === res[key].id) {
            for (const i in resData[k]) {
              loadedPosts.push(
                new Post(
                  k,
                  resData[k][i].post,
                  resData[k][i].userName,
                  new Date(resData[k][i].date)
                )
              );
            }
            break;
          }
        }
      }
      loadedPosts.sort((a, b) => b.date - a.date);
      return loadedPosts;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };
};
