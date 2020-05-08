import { ADD_POST, SET_POSTS } from "../action/posts";
import Post from "../../models/post";

const initialState = {
  posts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        posts: action.posts,
      };
    case ADD_POST:
      const newPost = new Post(
        action.postData.id,
        action.postData.userPost,
        action.postData.userName,
        action.postData.date
      );
      return {
        ...state,
        posts: state.posts.concat(newPost),
      };
  }

  return state;
};
