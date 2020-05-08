import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Colors from "../constants/Colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../store/action/auth";

const SignIn = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleReduxSubmit = async (value) => {
    setIsLoading(true);
    try {
      await dispatch(login(value.email, value.password));
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const handleResetPassword = () => {
    Alert.alert("OOPS!", "This option is not Enable as of Now", [
      { text: "Okay" },
    ]);
  };
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values) => {
        handleReduxSubmit(values);
      }}
      validationSchema={yup.object().shape({
        email: yup.string().email().required("Provide Your Email"),
        password: yup.string().required("Provide Your Password"),
      })}
    >
      {({ values, handleChange, errors, touched, handleSubmit }) => (
        <KeyboardAwareScrollView style={{ marginTop: 40 }}>
          <View style={styles.screen}>
            <Text>
              Type in your Email ID and Password you choose for Momento and
              click Go to Feed
            </Text>
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="Email ID"
                keyboardType="email-address"
                value={values.email}
                onChangeText={handleChange("email")}
                style={styles.textInput}
                autoCapitalize="none"
              ></TextInput>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <TextInput
                placeholder="Password"
                style={styles.textInput}
                keyboardType="default"
                value={values.password}
                secureTextEntry
                onChangeText={handleChange("password")}
              ></TextInput>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleSubmit}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <View>
                  <Text style={styles.buttonStyle}>Sign In</Text>
                </View>
              )}
            </TouchableOpacity>
            <View style={styles.additionalText}>
              <Text
                style={styles.nestedAdditionalText}
                onPress={handleResetPassword}
              >
                Can't Sign In? Reset Password
              </Text>
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
    paddingLeft: 40,
    paddingRight: 40,
    justifyContent: "center",
    paddingBottom: 15,
    alignItems: "center",
  },
  textInputContainer: {
    paddingTop: 30,
    paddingBottom: 30,
    width: "100%",
  },
  textInput: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#CECECE",
    marginTop: 20,
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
  errorText: {
    fontSize: 12,
    color: "#FF0D10",
    textAlign: "center",
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: "Sign In",
  };
};

export default SignIn;
