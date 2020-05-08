import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";

const AnotherUserPostItem = (props) => {
  const { post, date, userEmail } = props;
  const userName = userEmail.split("@")[0];
  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.postView}>
        <Image source={require("../assets/img.png")} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{userName}</Text>
          <Text style={styles.duration}>{date}</Text>
          <Text style={styles.postDescription}>{post}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postView: {
    paddingVertical: 5,
    paddingTop: 20,
    paddingBottom: 15,
    paddingHorizontal: 15,
    width: "100%",
    maxWidth: 350,
    flexDirection: "row",
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
    width: "90%",
    textAlign: "justify",
    color: "#A4A4A4",
  },
  duration: {
    fontSize: 10,
    paddingTop: 4,
    color: "#A4A4A4",
    fontWeight: "bold",
  },
});

export default AnotherUserPostItem;
