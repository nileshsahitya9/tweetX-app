import React from "react";
import ReduxThunk from "redux-thunk";
import authReducer from "./store/reducer/auth";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import AppNavigator from "./navigation/appNavigator";
import postsReducer from "./store/reducer/post";
import followingsReducer from "./store/reducer/following";
import followersReducer from "./store/reducer/follower";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  followings: followingsReducer,
  followers: followersReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
