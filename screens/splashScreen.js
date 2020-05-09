import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Colors from "../constants/Colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SplashScreen = (props) => {
  const switchToSignInScreen = () => {
    props.navigation.navigate("Sign In");
  };
  const switchToSignUpScreen = () => {
    props.navigation.navigate("Sign Up");
  };
  return (
    <KeyboardAwareScrollView>
      <View style={styles.screen}>
        <Image source={require("../assets/icon.png")} style={styles.image} />
        <View>
          <Text style={styles.title}>TweetX</Text>
        </View>
        <View>
          <Text style={styles.titleDescription}>
            TweetX is a Social App that lets you Share your moments with friends
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonStyle} onPress={switchToSignInScreen}>
            Sign In
          </Text>
        </View>
        <View style={styles.additionalText}>
          <Text
            style={styles.nestedAdditionalText}
            onPress={switchToSignUpScreen}
          >
            Create New Account
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingLeft: 40,
    paddingTop: 40,
    paddingRight: 40,
    justifyContent: "center",
    backgroundColor: "white",
    paddingBottom: 40,
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    marginTop: 15,
  },
  buttonStyle: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  additionalText: {
    marginTop: 40,
  },
  nestedAdditionalText: {
    color: Colors.primary,
    fontSize: 15,
  },
  title: {
    fontSize: 40,
    marginBottom: 20,
    color: Colors.primary,
    fontWeight: "bold",
  },
  titleDescription: {
    textAlign: "center",
    color: "#A4A4A4",
    marginBottom: 30,
  },
  image: {
    marginBottom: 5,
  },
});

export default SplashScreen;
