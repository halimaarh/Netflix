import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons"; // 👁️ Import icon

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // 👁️ State for password visibility

  const getLoginDetails = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem("userEmail");
      const storedPassword = await AsyncStorage.getItem("userPassword");
      if (storedEmail !== null) setEmail(storedEmail);
      if (storedPassword !== null) setPassword(storedPassword);
    } catch (error) {
      console.log("Error retrieving login details:", error);
    }
  };

  useEffect(() => {
    getLoginDetails();
  }, []);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }

    try {
      const storedEmail = await AsyncStorage.getItem("userEmail");
      const storedPassword = await AsyncStorage.getItem("userPassword");

      if (storedEmail && storedPassword) {
        if (storedEmail === email && storedPassword === password) {
          await AsyncStorage.setItem("isLoggedIn", "true");
          Alert.alert("Success", "Login successful");
          navigation.navigate("ProfileSelection");
        } else {
          Alert.alert("Error", "Invalid email or password");
        }
      } else {
        Alert.alert("Error", "No stored credentials found.");
      }
    } catch (error) {
      console.log("Error retrieving login details:", error);
      Alert.alert("Error", "An error occurred during login.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity
        style={styles.arrowContainer}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.labelStyle}>Sign In</Text>
        <TextInput
          style={styles.textInputStyle}
          placeholder="Email or phone number"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={!passwordVisible}
          />
          <Pressable onPress={() => setPasswordVisible(!passwordVisible)}>
            <Icon
              name={passwordVisible ? "eye" : "eye-off"}
              size={24}
              color="#333"
              style={styles.eyeIcon}
            />
          </Pressable>
        </View>
        <TouchableOpacity style={styles.buttonParent} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>OR</Text>
        <TouchableOpacity style={styles.signInCode} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Use a Sign-In Code</Text>
        </TouchableOpacity>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        <Pressable onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.signUpText}>New to Netflix? Sign up now.</Text>
        </Pressable>
        <Text style={styles.recaptchaText}>
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
          Learn more.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  arrowContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  loginContainer: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  labelStyle: {
    fontSize: 28,
    color: "#ffffff",
    textAlign: "center",
    marginTop: 150,
  },
  textInputStyle: {
    marginTop: 20,
    paddingLeft: 10,
    backgroundColor: "#adadad",
    fontSize: 18,
    height: 50,
    width: "90%",
    borderRadius: 8,
    color: "#333333",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#adadad",
    borderRadius: 8,
    width: "90%",
    height: 50,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  passwordInput: {
    flex: 1,
    fontSize: 18,
    color: "#333",
  },
  eyeIcon: {
    paddingLeft: 10,
  },
  buttonParent: {
    marginTop: 30,
    width: "90%",
    backgroundColor: "#000",
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#333333",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
  },
  orText: {
    fontSize: 16,
    color: "#333333",
    textAlign: "center",
    marginVertical: 10,
  },
  signInCode: {
    width: "90%",
    backgroundColor: "#000",
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#333333",
    alignItems: "center",
  },
  forgotPasswordText: {
    color: "#333333",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  signUpText: {
    color: "#333333",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 5,
  },
  recaptchaText: {
    color: "#333333",
    textAlign: "center",
    fontSize: 14,
    marginTop: 15,
    paddingHorizontal: 20,
  },
});
