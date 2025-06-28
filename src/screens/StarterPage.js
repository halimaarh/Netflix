import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // ✅ FIXED: import added

const StarterPage = () => {
  const [isConnected, setIsConnected] = useState(null);
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  const slideAnim = useRef(
    [...Array(7)].map(() => new Animated.Value(200))
  ).current;
  const navigation = useNavigation();

  // ✅ FIXED: run slide animation on mount
  useEffect(() => {
    slideInText();
  }, []);

  // ✅ Check credentials after animation
  useEffect(() => {
    if (animationComplete) {
      checkStoredCredentials();
    }
  }, [animationComplete]);

  const slideInText = () => {
    const animations = slideAnim.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
        delay: index * 100,
      })
    );
    Animated.stagger(100, animations).start(() => setAnimationComplete(true));
  };

  const checkConnection = async () => {
    setIsCheckingConnection(true);
    const state = await NetInfo.fetch();

    setTimeout(() => {
      setIsConnected(state.isConnected);
      setIsCheckingConnection(false);

      if (state.isConnected) {
        navigation.navigate("Slides");
      }
    }, 2000);
  };

  const checkStoredCredentials = async () => {
    try {
      const email = await AsyncStorage.getItem("userEmail");
      const password = await AsyncStorage.getItem("userPassword");

      if (email && password) {
        navigation.replace("ProfileSelection");
      } else {
        checkConnection();
      }
    } catch (error) {
      console.error("Error checking credentials:", error);
      checkConnection();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        {["N", "E", "T", "F", "L", "I", "X"].map((letter, index) => (
          <Animated.Text
            key={index}
            style={[
              styles.letter,
              { transform: [{ translateX: slideAnim[index] }] },
            ]}
          >
            {letter}
          </Animated.Text>
        ))}
      </View>

      {animationComplete &&
        (isCheckingConnection ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="red" />
            <Text style={styles.loadingText}>Checking network status...</Text>
          </View>
        ) : isConnected === false ? (
          <View style={styles.loaderContainer}>
            <Text style={styles.noConnectionText}>No Internet Connection</Text>
            <TouchableOpacity style={styles.button} onPress={checkConnection}>
              <Text style={styles.buttonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : null)}
    </SafeAreaView>
  );
};

export default StarterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#141414",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  letter: {
    fontSize: 60,
    color: "red",
    fontWeight: "bold",
    marginHorizontal: 5,
  },
  loaderContainer: {
    marginTop: 20,
    alignItems: "center",
    padding: 10,
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
  },
  noConnectionText: {
    color: "#fff",
    fontSize: 18,
  },
  button: {
    marginTop: 10,
    width: 100,
    backgroundColor: "red",
    padding: 15,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 15,
    color: "#ffffff",
    textAlign: "center",
  },
});
