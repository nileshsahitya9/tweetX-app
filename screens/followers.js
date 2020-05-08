import React, { useEffect, useState } from "react";
import {
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  View,
  StyleSheet,
  Text,
} from "react-native";
import FollowerListItem from "../components/followerListItem";

import Colors from "../constants/Colors";

import * as followersActions from "../store/action/follower";
import { addFollowingUser } from "../store/action/following";
import { useSelector, useDispatch } from "react-redux";
const Followers = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const followers = useSelector((state) => state.followers.followers);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(followersActions.fetchFollower()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (followers.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Sorry No Data to show....</Text>
      </View>
    );
  }

  const handleStartFollowing = async (name, followerid) => {
    try {
      let res = await dispatch(addFollowingUser(name, followerid));
      if (res) {
        await dispatch(followersActions.fetchFollower());
      }
    } catch (err) {
      Alert.alert("OOPS!", "Something Went Wrong Try after some time", [
        { text: "Okay" },
      ]);
    }
  };

  return (
    <SafeAreaView>
      <View style={{ marginTop: 20 }}>
        <FlatList
          data={followers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(itemData) => (
            <FollowerListItem
              name={itemData.item.followerName}
              enable={itemData.item.enable}
              onSelect={() =>
                handleStartFollowing(
                  itemData.item.followerName,
                  itemData.item.id
                )
              }
            />
          )}
        />
      </View>
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

export default Followers;
