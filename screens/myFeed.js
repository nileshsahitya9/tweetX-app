import React, { useEffect, useState } from "react";
import {
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  View,
  StyleSheet,
} from "react-native";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import HeaderButton from "../components/customHeaderButton";

import { fetchFollowUserPost } from "../store/action/posts";
import { Feather } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import MyFeedItem from "../components/myFeedItem";
const MyFeed = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isItemLoading, setIsItemLoading] = useState(false);
  const [userData, setUserData] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    fetchUserData();
  }, [dispatch]);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      let res = await dispatch(fetchFollowUserPost());
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

  const handlePostScreen = () => {
    props.navigation.navigate("post");
  };
  const onRefresh = async () => {
    setIsItemLoading(true);
    try {
      let res = await dispatch(fetchFollowUserPost());
      if (res) {
        setUserData(res);
        setIsItemLoading(false);
      }
    } catch (err) {
      setIsItemLoading(false);
    }
  };

  if (userData.length === 0) {
  }
  return (
    <SafeAreaView style={styles.mainContainer}>
      {userData.length !== 0 ? (
        <FlatList
          data={userData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(itemData) => (
            <MyFeedItem
              name={itemData.item.userName}
              duration={itemData.item.readableDate}
              post_description={itemData.item.userPost}
            />
          )}
          onRefresh={() => onRefresh}
          refreshing={isItemLoading}
        />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isItemLoading} onRefresh={onRefresh} />
          }
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>OOPS!! No Posts found</Text>
        </ScrollView>
      )}
      <TouchableOpacity
        style={styles.TouchableOpacityStyle}
        onPress={handlePostScreen}
      >
        <Feather name="edit" size={23} style={styles.icon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "My Feed",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 25,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "white",
    height: 25,
  },
  TouchableOpacityStyle: {
    backgroundColor: Colors.primary,
    position: "absolute",
    height: 50,
    borderRadius: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 10,
    bottom: 30,
  },
});

export default MyFeed;
