import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import Colors from "../constants/Colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { signup } from "../store/action/auth";
import { TouchableOpacity } from "react-native-gesture-handler";

const SignUp = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleReduxSubmit = async (value, reset) => {
    if (value.password !== value.confirmPassword) {
      Alert.alert("Wrong input!", "Your Password are not Matching", [
        { text: "Okay" },
      ]);
    } else {
      setIsLoading(true);
      try {
        await dispatch(signup(value.email, value.password));
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        confirmPassword: "",
      }}
      onSubmit={(values, { resetForm }) => {
        handleReduxSubmit(values);
      }}
      validationSchema={yup.object().shape({
        email: yup.string().email().required("Provide Your Email"),
        password: yup.string().min(4).required("Provide Your Password"),
        confirmPassword: yup
          .string()
          .min(4)
          .required("Provide Your Confirm Password"),
      })}
    >
      {({ values, handleChange, errors, touched, handleSubmit }) => (
        <KeyboardAwareScrollView style={{ marginTop: 20 }}>
          <View style={styles.screen}>
            <Text>
              Fill in the Required detailsand click Proceed. Fields marked * are
              Mandatory
            </Text>

            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="Email ID"
                keyboardType="email-address"
                value={values.email || ""}
                style={styles.textInput}
                onChangeText={handleChange("email")}
                autoCapitalize="none"
              ></TextInput>
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <TextInput
                placeholder="Password"
                keyboardType="default"
                value={values.password || ""}
                secureTextEntry
                style={styles.textInput}
                onChangeText={handleChange("password")}
              ></TextInput>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              <TextInput
                placeholder="Confirm Password"
                style={styles.textInput}
                value={values.confirmPassword || ""}
                keyboardType="default"
                onChangeText={handleChange("confirmPassword")}
                secureTextEntry
              ></TextInput>
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}
            </View>

            <Text style={{ color: "#A4A4A4" }}>
              By creating Account you are automatically accepting all the
              <Text
                style={{
                  color: Colors.primary,
                  textDecorationLine: "underline",
                }}
              >
                {" "}
                Terms & Conditions
              </Text>{" "}
              related to Momento
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleSubmit}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.buttonStyle}>Sign Up</Text>
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
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: "center",
  },
  textInputContainer: {
    paddingTop: 20,
    paddingBottom: 20,
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
  textContainer: {
    marginBottom: 10,
  },
  errorText: {
    fontSize: 12,
    color: "#FF0D10",
    textAlign: "center",
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: "Create Account",
  };
};

export default SignUp;
