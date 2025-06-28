import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome5";

const Notifications = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const storedList = await AsyncStorage.getItem("myList");
        const storedDownloads = await AsyncStorage.getItem("downloads");

        const myList = storedList ? JSON.parse(storedList) : [];
        const downloads = storedDownloads ? JSON.parse(storedDownloads) : [];

        const combined = [
          ...myList.map((movie) => ({
            id: `myList-${movie.id}`,
            type: "My List",
            title: movie.title,
          })),
          ...downloads.map((movie) => ({
            id: `download-${movie.id}`,
            type: "Download",
            title: movie.title,
          })),
        ];

        // Most recent first
        setNotifications(combined.reverse());
      } catch (error) {
        console.error("Error loading notifications:", error);
      }
    };

    loadNotifications();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Icon
        name={item.type === "Download" ? "download" : "plus"}
        size={18}
        color="#3498db"
        style={styles.icon}
      />
      <Text style={styles.notificationText}>
        <Text style={{ fontWeight: "bold" }}>{item.title}</Text> was added to{" "}
        <Text style={{ fontStyle: "italic" }}>{item.type}</Text>
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifications</Text>
      </View>
      {notifications.length === 0 ? (
        <Text style={styles.emptyText}>No notifications yet.</Text>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}
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
    marginTop: 20,
    marginBottom: 30,
    gap: 120,
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#1c1c1c",
    padding: 10,
    borderRadius: 8,
  },
  icon: {
    color: "red",
    marginRight: 10,
  },
  notificationText: {
    color: "#fff",
    fontSize: 16,
  },
  emptyText: {
    color: "#999",
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },
});

export default Notifications;
