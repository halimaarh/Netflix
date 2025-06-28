import React from "react";
import { View, Image, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import mylogo from "../images/logo.png";

const HeaderTitle = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Image source={mylogo} style={styles.logo} />
      </View>
      <View style={styles.headerLinksContainer}>
        <View style={styles.linkContainer}>
          <Pressable onPress={() => navigation.navigate("Privacy")}>
            <Text style={styles.headerLinkText}>Privacy</Text>
          </Pressable>
        </View>
        <View style={styles.linkContainer}>
          <Pressable onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.headerLinkText}>Sign In</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "#000", // Make sure it matches screen bg
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    width: 90, // ✅ Increased width
    height: 60, // ✅ Increased height
    resizeMode: "contain",
    marginRight: 50,
  },
  headerLinksContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkContainer: {
    marginLeft: 15,
  },
  headerLinkText: {
    color: "#fff", // Visible on dark background
    fontSize: 16,
    fontWeight: "500",
  },
});

export default HeaderTitle;
