import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";

const UserListItem = (props) => {
  const { name, following, onSelect, onSelectScreen } = props;
  const userName = name.split("@")[0];
  return (
    <ScrollView>
      <TouchableOpacity onPress={onSelectScreen}>
        <View style={styles.screen}>
          <Image source={require("../assets/img.png")} style={styles.image} />
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{userName}</Text>
          </View>
          {!following ? (
            <TouchableOpacity onPress={onSelect}>
              <View style={styles.enableButtonContainer}>
                <Text style={styles.enableButton}>FOLLOW</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.disableButtonContainer}>
              <Text style={styles.disableButton}>FOLLOWING</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexDirection: "row",
    width: "100%",
    marginLeft: 15,
    margin: 5,
  },
  image: {
    width: 40,
    height: 40,
    alignItems: "flex-end",
    borderRadius: 100,
  },
  infoContainer: {
    marginLeft: 10,
    width: "50%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    color: "black",
    fontSize: 15,
  },
  enableButtonContainer: {
    backgroundColor: Colors.primary,
    height: 30,
    width: 100,
    borderRadius: 4,
    justifyContent: "center",
    marginTop: 12,
  },
  enableButton: {
    color: "white",
    textAlign: "center",
    letterSpacing: 1,
    fontSize: 12,
    fontWeight: "bold",
  },
  disableButtonContainer: {
    height: 30,
    width: 100,
    borderRadius: 4,
    justifyContent: "center",
    marginTop: 12,
  },
  disableButton: {
    letterSpacing: 2,
    textAlign: "center",
    letterSpacing: 1,
    fontSize: 12,
    color: "#A4A4A4",
  },
});

export default UserListItem;
