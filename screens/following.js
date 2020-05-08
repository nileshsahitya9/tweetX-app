import React, { useEffect, useState } from "react";
import {
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
} from "react-native";

import * as followesActions from "../store/action/following";

import { useSelector, useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import FollowingListItem from "../components/followingListItem";

const Following = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const followings = useSelector((state) => state.followings.followings);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(followesActions.fetchUserFollowings()).then(() => {
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

  if (followings.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>You Haven't Followed Anyone</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ marginTop: 20 }}>
      <FlatList
        data={followings}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(itemData) => (
          <FollowingListItem followingName={itemData.item.followingName} />
        )}
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

export default Following;
