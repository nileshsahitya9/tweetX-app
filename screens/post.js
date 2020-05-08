import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import { addUserPost } from "../store/action/posts";
import * as yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";

const Post = () => {
  const dispatch = useDispatch();
  const handlePostSubmit = async (values, reset) => {
    setIsLoading(true);
    try {
      await dispatch(addUserPost(values.postInput));
      setIsLoading(false);
      Alert.alert("Hurray", "Your Post is Published !", [{ text: "Okay" }]);
      reset();
    } catch (err) {
      setIsLoading(false);
      Alert.alert(
        "OOPS! Technical Error",
        "Post coludn't be Published try after some time",
        [{ text: "Okay" }]
      );
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  return (
    <Formik
      initialValues={{
        postInput: "",
      }}
      onSubmit={(values, { resetForm }) => {
        handlePostSubmit(values, resetForm);
      }}
      validationSchema={yup.object().shape({
        postInput: yup.string().required("Wrong Input!! Field Can't be Empty"),
      })}
    >
      {({ values, handleChange, errors, touched, handleSubmit }) => (
        <KeyboardAwareScrollView style={{ marginTop: 10 }}>
          <View style={styles.screen}>
            <View style={styles.postInputContainer}>
              <TextInput
                placeholder="Type Here...."
                multiline={true}
                numberOfLines={8}
                textAlignVertical="top"
                clearButtonMode="always"
                style={styles.postInputStyle}
                value={values.postInput}
                onChangeText={handleChange("postInput")}
              />
            </View>
            {touched.postInput && errors.postInput && (
              <Text style={styles.errorText}>{errors.postInput}</Text>
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleSubmit}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.buttonStyle}>Post</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 25,
    paddingBottom: 25,
  },
  postInputContainer: {
    borderWidth: 0.2,
    borderColor: "#A4A4A4",
  },
  postInputStyle: {
    paddingTop: 20,
    paddingLeft: 20,
  },
  buttonContainer: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    marginTop: 40,
  },
  buttonStyle: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorText: {
    fontSize: 12,
    color: "#FF0D10",
    textAlign: "center",
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: "Create New Post",
  };
};

export default Post;
