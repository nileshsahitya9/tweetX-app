import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { fetchUserPosts } from "../store/action/posts";
import { useDispatch } from "react-redux";
import { addFollowingUser } from "../store/action/following";
import Colors from "../constants/Colors";
import AnotherUserPostItem from "../components/anotherUserPostItem";
import { fetchRegisteredUser } from "../store/action/auth";
import moment from "moment";

const AnotherUserProfile = (props) => {
  const { userId, userName, userDate, userEnable } = props.route.params;

  const date = moment(userDate).format("DD MMM YY");
  const [isLoading, setIsLoading] = useState(false);
  const [isUserEnable, setIsUserEnable] = useState(userEnable);
  const [isItemLoading, setIsItemLoading] = useState(false);
  const [userData, setUserData] = useState("");
  const userIdentity = userName.split("@")[0];
  const dispatch = useDispatch();
  useEffect(() => {
    fetchUserData();
  }, [dispatch]);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      let res = await dispatch(fetchUserPosts(userId));
      if (res) {
        setUserData(res);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const handleUserFollow = async () => {
    try {
      setIsItemLoading(true);

      const res = dispatch(addFollowingUser(userName, userId));
      if (res) {
        await dispatch(fetchRegisteredUser());
        setIsItemLoading(false);
        setIsUserEnable(!isUserEnable);
      }
    } catch (err) {
      setIsItemLoading(false);
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Image source={require("../assets/img.png")} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{userIdentity}</Text>
          <Text style={styles.userDate}>Joined On {date}</Text>
        </View>
        {!isUserEnable ? (
          <TouchableOpacity onPress={handleUserFollow}>
            <View style={styles.enableButtonContainer}>
              {isItemLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <View>
                  <Text style={styles.enableButton}>FOLLOW</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.disableButtonContainer}>
            <Text style={styles.disableButton}>FOLLOWING</Text>
          </View>
        )}
      </View>
      <View
        style={{
          borderBottomColor: "grey",
          borderBottomWidth: 0.4,
          paddingTop: 20,
        }}
      >
        <Text style={{ textAlign: "center", paddingBottom: 10, fontSize: 15 }}>
          {" "}
          Posts{" "}
        </Text>
      </View>
      {userData.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text>No Posts found</Text>
        </View>
      ) : (
        <FlatList
          data={userData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(itemData) => (
            <AnotherUserPostItem
              post={itemData.item.userPost}
              date={itemData.item.readableDate}
              userEmail={itemData.item.userName}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexDirection: "row",
    width: "100%",
    marginLeft: 15,
    paddingTop: 20,
    margin: 5,
    maxWidth: 350,
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  userDate: {
    fontSize: 12,
    paddingTop: 5,
    color: "#A4A4A4",
    fontWeight: "bold",
  },
});

export const screenOptions = (navData) => {
  const title = navData.route.params.userName.split("@")[0];
  return {
    headerTitle: title,
  };
};

export default AnotherUserProfile;
