import React from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const MyFeedItem = (props) => {
  const { name, duration, post_description } = props;
  const userName = name.split("@")[0];
  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.postsView}>
        <Image source={require("../assets/img.png")} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{userName}</Text>
          <Text style={styles.duration}>{duration}</Text>
          <Text style={styles.postDescription}>{post_description}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postsView: {
    shadowColor: "black",
    paddingVertical: 10,
    marginTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 15,
    width: "100%",
    flexDirection: "row",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  image: {
    width: 40,
    height: 40,
    alignItems: "flex-end",
    borderRadius: 100,
  },
  infoContainer: {
    marginLeft: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    color: "black",
    fontSize: 15,
  },
  postDescription: {
    paddingTop: 20,
    paddingRight: 50,
    textAlign: "justify",
    color: "#A4A4A4",
  },
  duration: {
    fontSize: 10,
    paddingTop: 2,
    color: "#A4A4A4",
    fontWeight: "bold",
  },
});

export default MyFeedItem;
