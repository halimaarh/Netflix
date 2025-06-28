import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome5";

const AppSettings = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const notifications = await AsyncStorage.getItem(
          "notificationsEnabled"
        );
        const darkMode = await AsyncStorage.getItem("darkModeEnabled");

        if (notifications !== null) {
          setNotificationsEnabled(JSON.parse(notifications));
        }
        if (darkMode !== null) {
          setDarkModeEnabled(JSON.parse(darkMode));
        }
      } catch (error) {
        console.error("Failed to load settings", error);
      }
    };

    loadSettings();
  }, []);

  const handleToggle = async (key, valueSetter, value) => {
    try {
      valueSetter(value);
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Failed to save setting", error);
      Alert.alert("Error", "Failed to update setting.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>App Settings</Text>
        <View style={{ width: 20 }} />
      </View>

      {/* Settings List */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={(val) =>
            handleToggle("notificationsEnabled", setNotificationsEnabled, val)
          }
          trackColor={{ false: "#767577", true: "#e50914" }}
          thumbColor={notificationsEnabled ? "#fff" : "#fff"}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Enable Dark Mode</Text>
        <Switch
          value={darkModeEnabled}
          onValueChange={(val) =>
            handleToggle("darkModeEnabled", setDarkModeEnabled, val)
          }
          trackColor={{ false: "#767577", true: "#e50914" }}
          thumbColor={darkModeEnabled ? "#fff" : "#fff"}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  settingItem: {
    backgroundColor: "#1c1c1c",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default AppSettings;
