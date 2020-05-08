import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";

import { ProfileNavigator } from "../navigation/profileTabNavigator";
import { Fragment } from "react";
import { useSelector } from "react-redux";
const Profile = (props) => {
  const userEmail = useSelector((state) => state.auth.userEmail).split("@")[0];
  const posts = useSelector((state) => state.posts.posts);
  const followings = useSelector((state) => state.followings.followings);
  const followers = useSelector((state) => state.followers.followers);
  return (
    <Fragment>
      <View style={{ backgroundColor: "white" }}>
        <View style={styles.drawerView}>
          <Image source={require("../assets/img.png")} style={styles.image} />
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{userEmail}</Text>
            <Text style={styles.joiningDate}>Joined on 04 May 2020</Text>
          </View>
        </View>
      </View>
      <ProfileNavigator
        post={posts.length}
        following={followings.length}
        follower={followers.length}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  drawerView: {
    paddingLeft: 20,
    marginVertical: 10,
    width: "100%",
    maxWidth: 350,
    flexDirection: "row",
  },
  image: {
    width: 60,
    height: 60,
    alignItems: "flex-end",
    borderRadius: 100,
  },
  infoContainer: {
    marginLeft: 15,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    color: "black",
    fontSize: 18,
  },
  joiningDate: {
    fontSize: 12,
    paddingTop: 5,
    color: "#A4A4A4",
    fontWeight: "bold",
  },
});
export const screenOptions = (navData) => {
  return {
    headerTitle: "You",
  };
};

export default Profile;
