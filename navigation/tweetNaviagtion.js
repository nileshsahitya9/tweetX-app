import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  Platform,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons, SimpleLineIcons, AntDesign } from "@expo/vector-icons";
import DrawerContent from "../screens/drawerContent";
import SignIn, {
  screenOptions as signInScreenOptions,
} from "../screens/signInScreen";
import SignUp, {
  screenOptions as SignUpScreenOptions,
} from "../screens/signUpScreen";
import Post, { screenOptions as postScreenOptions } from "../screens/post";
import Users, {
  screenOptions as usersScreenOptions,
} from "../screens/usersList";
import AnotherUserProfile, {
  screenOptions as anotherUserScreenOptions,
} from "../screens/anotherUserProfile";
import MyFeed, { screenOptions as feedScreenOptions } from "../screens/myFeed";
import Colors from "../constants/Colors";
import Profile, {
  screenOptions as profileScreenOptions,
} from "../screens/profile";
import * as authActions from "../store/action/auth";
import SplashScreen from "../screens/splashScreen";
import { useDispatch, useSelector } from "react-redux";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: "white",
  },
  headerTitleAlign: "center",
  headerTitleStyle: {
    fontWeight: "100",
  },
  headerTintColor: Platform.OS === "android" ? "black" : "black",
  cardStyle: { backgroundColor: "white" },
};

const DrawerButtonStyle = {
  flexDirection: "row",
  paddingLeft: 18,
  paddingTop: 8,
};

const FeedStackNavigator = createStackNavigator();

export const FeedsNavigator = () => {
  return (
    <FeedStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <FeedStackNavigator.Screen
        name="Feed"
        component={MyFeed}
        options={feedScreenOptions}
      />
      <FeedStackNavigator.Screen
        name="post"
        component={Post}
        options={postScreenOptions}
      />
    </FeedStackNavigator.Navigator>
  );
};

const ProfileStackNavigator = createStackNavigator();

export const ProfilesNavigator = () => {
  return (
    <ProfileStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProfileStackNavigator.Screen
        name="profile"
        component={Profile}
        options={profileScreenOptions}
      />
    </ProfileStackNavigator.Navigator>
  );
};

const UserListStackNavigator = createStackNavigator();

export const UsersNavigator = () => {
  return (
    <UserListStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <UserListStackNavigator.Screen
        name="Users"
        component={Users}
        options={usersScreenOptions}
      />
      <UserListStackNavigator.Screen
        name="AnotherUserProfile"
        component={AnotherUserProfile}
        options={anotherUserScreenOptions}
      />
    </UserListStackNavigator.Navigator>
  );
};

const TweetDrawerNavigator = createDrawerNavigator();

export const TweetNavigator = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.userEmail);
  return (
    <TweetDrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerContent userIdentity={userEmail} />
              <DrawerItemList {...props} />
              <TouchableOpacity
                style={DrawerButtonStyle}
                onPress={() => dispatch(authActions.logout())}
              >
                <Text style={{ alignItems: "flex-end" }}>
                  <AntDesign name="logout" size={23} color={props.color} />
                </Text>
                <Text
                  style={{
                    paddingLeft: 28,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                >
                  Sign Out
                </Text>
              </TouchableOpacity>
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}
      initialRouteName={MyFeed}
    >
      <TweetDrawerNavigator.Screen
        name="My Feed"
        component={FeedsNavigator}
        options={{
          drawerIcon: (props) => (
            <SimpleLineIcons
              name={Platform.OS === "android" ? "feed" : "feed"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <TweetDrawerNavigator.Screen
        name="Profiles"
        component={ProfilesNavigator}
        options={{
          drawerIcon: (props) => (
            <SimpleLineIcons
              name={Platform.OS === "android" ? "user" : "user"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <TweetDrawerNavigator.Screen
        name="Users List"
        component={UsersNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={
                Platform.OS === "android"
                  ? "md-information-circle-outline"
                  : "md-information-circle-outline"
              }
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </TweetDrawerNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen name=" " component={SplashScreen} />
      <AuthStackNavigator.Screen
        name="Sign Up"
        component={SignUp}
        options={SignUpScreenOptions}
      />
      <AuthStackNavigator.Screen
        name="Sign In"
        component={SignIn}
        options={signInScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};
