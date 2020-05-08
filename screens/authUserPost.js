import React, { useEffect, useState } from "react";
import {
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
} from "react-native";

import * as postsActions from "../store/action/posts";

import AuthUserPostItem from "../components/authUserPostItem";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../constants/Colors";

const AuthUserPost = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const posts = useSelector((state) => state.posts.posts);
  const userEmail = useSelector((state) => state.auth.userEmail).split("@")[0];
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(postsActions.fetchUserPosts(userId)).then(() => {
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

  if (posts.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No Posts found, Start adding Some Posts</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ marginTop: 10 }}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(itemData) => (
          <AuthUserPostItem
            post={itemData.item.userPost}
            date={itemData.item.readableDate}
            userEmail={userEmail}
          />
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

export default AuthUserPost;
