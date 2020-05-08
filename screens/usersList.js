import React, { useEffect, useState } from "react";
import {
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  View,
  StyleSheet,
  Text,
} from "react-native";

import UserListItem from "../components/userListItem";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import { addFollowingUser } from "../store/action/following";

import * as authActions from "../store/action/auth";
const Users = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isItemLoading, setIsItemLoading] = useState(false);
  const [userData, setUserData] = useState("");
  const [isFlag, setFlag] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchUserData();
  }, [isFlag]);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      let res = await dispatch(authActions.fetchRegisteredUser());
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

  if (userData.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No Users Found</Text>
      </View>
    );
  }

  const handleStartFollowing = async (name, followerid) => {
    try {
      let res = await dispatch(addFollowingUser(name, followerid));
      if (res) {
        setFlag(!isFlag);
      }
    } catch (err) {
      Alert.alert("OOPS!", "Something Went Wrong Try after some time", [
        { text: "Okay" },
      ]);
    }
  };

  const handleSwitchScreen = (id, name, enable, date) => {
    props.navigation.navigate("AnotherUserProfile", {
      userId: id,
      userName: name,
      userEnable: enable,
      userDate: date,
    });
  };

  const onRefresh = async () => {
    setIsItemLoading(true);
    try {
      let res = await dispatch(authActions.fetchRegisteredUser());
      if (res) {
        setUserData(res);
        setIsItemLoading(false);
      }
    } catch (err) {
      setIsItemLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ paddingTop: 20 }}>
      <FlatList
        data={userData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(itemData) => (
          <UserListItem
            name={itemData.item.userEmail}
            userId={itemData.item.userId}
            following={itemData.item.enable}
            onSelect={() =>
              handleStartFollowing(
                itemData.item.userEmail,
                itemData.item.userId
              )
            }
            onSelectScreen={() => {
              handleSwitchScreen(
                itemData.item.userId,
                itemData.item.userEmail,
                itemData.item.enable,
                itemData.item.userRegisterationDate
              );
            }}
          />
        )}
        onRefresh={onRefresh}
        refreshing={isItemLoading}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: "Users List",
  };
};

export default Users;
