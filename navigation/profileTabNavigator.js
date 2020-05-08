import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AuthUserPost from "../screens/authUserPost";
import Follower from "../screens/followers";
import Following from "../screens/following";
import Colors from "../constants/Colors";

const ProfileTabNavigator = createMaterialTopTabNavigator();

export const ProfileNavigator = (props) => {
  const post = props.post.toString() + " POSTS";
  const following = props.following.toString() + " FOLLOWINGS";
  const follower = props.follower.toString() + "  FOLLOWERS";
  return (
    <ProfileTabNavigator.Navigator
      tabBarOptions={{
        style: { width: "100%" },
        indicatorStyle: { backgroundColor: Colors.primary },
        activeTintColor: Colors.primary,
        inactiveTintColor: "black",
      }}
    >
      <ProfileTabNavigator.Screen name={post} component={AuthUserPost} />
      <ProfileTabNavigator.Screen name={follower} component={Follower} />
      <ProfileTabNavigator.Screen name={following} component={Following} />
    </ProfileTabNavigator.Navigator>
  );
};
