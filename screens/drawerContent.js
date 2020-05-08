import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
const DrawerContent = (props) => {
  const userName = props.userIdentity.split("@")[0];
  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.drawerView}>
        <Image source={require("../assets/img.png")} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{userName}</Text>
          <Text style={styles.emailAddress}>{props.userIdentity}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerView: {
    margin: 20,
    paddingLeft: 20,
    paddingBottom: 50,
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
  emailAddress: {
    fontSize: 12,
    paddingTop: 5,
    color: "#A4A4A4",
    fontWeight: "bold",
  },
});

export default DrawerContent;
