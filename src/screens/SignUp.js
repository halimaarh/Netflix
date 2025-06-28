import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons"; // Import icon
import mybackground from "../images/mynetback.jpg";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Function to save email and password to AsyncStorage
  const saveCredentials = async () => {
    if (!email || !password || !confirmPassword) {
      alert("Please fill out all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await AsyncStorage.setItem("userEmail", email);
      await AsyncStorage.setItem("userPassword", password);
      Alert.alert("Sign up successful!", "Your account has been created.");
      navigation.navigate("ProfileSelection");
    } catch (error) {
      console.log("Error saving credentials:", error);
      Alert.alert("Error", "An error occurred while creating your account.");
    }
  };

  return (
    <ImageBackground
      source={mybackground}
      style={styles.image}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Back Arrow */}
        <View style={styles.arrowContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Slides")}>
            <Ionicons name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.intro}>Ready to watch?</Text>
        <Text style={styles.subtitle}>Create your new account</Text>

        <TextInput
          style={styles.textInputStyle}
          placeholder="Enter Email Address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder="Enter Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.buttonParent} onPress={saveCredentials}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 20,
  },
  arrowContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  intro: {
    textAlign: "left",
    color: "#fff",
    marginBottom: 10,
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "left",
    color: "#fff",
    marginBottom: 50,
    marginLeft: 10,
  },
  textInputStyle: {
    alignSelf: "center",
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: "#adadad",
    fontSize: 20,
    height: 60,
    width: "95%",
    borderRadius: 10,
  },
  buttonParent: {
    marginTop: 70,
    width: "95%",
    backgroundColor: "#E50914",
    padding: 15,
    borderRadius: 10,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "#ffffff",
    textAlign: "center",
  },
});
