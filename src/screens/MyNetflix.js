import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native"; // ✅ MISSING import

const MyNetflix = ({ navigation }) => {
  const [profile, setProfile] = useState({});
  const [myList, setMyList] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [isSignOutModalVisible, setSignOutModalVisible] = useState(false);

  const drawerOptions = [
    {
      id: "1",
      name: "Manage Profile",
      icon: "user-cog",
      screen: "ManageProfiles",
    },
    { id: "2", name: "App Settings", icon: "cog", screen: "AppSettings" },
    { id: "3", name: "Account", icon: "user-circle", screen: null },
    { id: "4", name: "Sign Out", icon: "sign-out-alt", action: "signOut" },
    {
      id: "5",
      name: "Version 18.43.0 {40183}",
      icon: "info-circle",
      screen: null,
    },
  ];

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          const storedProfiles = await AsyncStorage.getItem("profile");
          const storedMyList = await AsyncStorage.getItem("myList");
          const storedDownloads = await AsyncStorage.getItem("downloads");

          if (storedProfiles) setProfile(JSON.parse(storedProfiles));
          if (storedMyList) setMyList(JSON.parse(storedMyList));
          if (storedDownloads) setDownloads(JSON.parse(storedDownloads));
        } catch (error) {
          console.error("Error loading data:", error);
        }
      };

      loadData();
    }, [])
  );

  const getRecentMovies = (movies) => movies.slice(-5).reverse();

  const renderMoviePreview = ({ item }) => (
    <View style={styles.previewCard}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.previewImage}
        resizeMode="cover"
      />
      <Text style={styles.previewTitle}>{item.title}</Text>
    </View>
  );

  const handleDrawerItemPress = (item) => {
    if (item.screen) {
      navigation.navigate(item.screen);
    } else if (item.action === "signOut") {
      setSignOutModalVisible(true);
    }
    setDrawerVisible(false);
  };

  const handleSignOut = async () => {
    try {
      await AsyncStorage.setItem("sessionUpdated", "true");
      await AsyncStorage.setItem("lastSignOutTime", new Date().toISOString());
      setSignOutModalVisible(false);
      navigation.navigate("Slides");
    } catch (error) {
      console.error("Error during sign out", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>My Netflix</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <Icon name="search" size={20} color="#fff" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setDrawerVisible(true)}>
              <Icon name="bars" size={20} color="#fff" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile */}
        <View style={styles.profileContainer}>
          {profile?.image ? (
            <Image
              source={{ uri: profile.image }}
              style={styles.profileImage}
            />
          ) : (
            <Icon name="user-circle" size={60} color="#fff" />
          )}
          <Text style={styles.profileName}>{profile?.name || "Guest"}</Text>
        </View>

        {/* My List */}
        <View style={styles.myListContainer}>
          <TouchableOpacity
            style={styles.sectionButton}
            onPress={() => navigation.navigate("MyList")}
          >
            <View style={styles.sectionHeader}>
              <Icon name="list" size={20} color="#3498db" />
              <Text style={styles.sectionText}>My List</Text>
            </View>
            <Icon name="chevron-right" size={16} color="#fff" />
          </TouchableOpacity>
          <FlatList
            data={getRecentMovies(myList)}
            renderItem={renderMoviePreview}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.previewList}
          />
        </View>

        {/* Downloads */}
        <View style={styles.downloadContainer}>
          <TouchableOpacity
            style={styles.sectionButton}
            onPress={() => navigation.navigate("Download")}
          >
            <View style={styles.sectionHeader}>
              <Icon name="download" size={20} color="#3498db" />
              <Text style={styles.sectionText}>Downloads</Text>
            </View>
            <Icon name="chevron-right" size={16} color="#fff" />
          </TouchableOpacity>
          <FlatList
            data={getRecentMovies(downloads)}
            renderItem={renderMoviePreview}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.previewList}
          />
        </View>

        {/* Notifications */}
        <View style={styles.notificationContainer}>
          <TouchableOpacity
            style={styles.sectionButton}
            onPress={() => navigation.navigate("Notifications")}
          >
            <View style={styles.sectionHeader}>
              <Icon name="bell" size={20} color="#3498db" />
              <Text style={styles.sectionText}>Notifications</Text>
            </View>
            <Icon name="chevron-right" size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Drawer Modal */}
        <Modal
          visible={isDrawerVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setDrawerVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.drawerContent}>
              <FlatList
                data={drawerOptions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.drawerItemContainer}>
                    <TouchableOpacity
                      style={styles.drawerItem}
                      onPress={() => handleDrawerItemPress(item)}
                      disabled={!item.screen && !item.action}
                    >
                      <Icon
                        name={item.icon}
                        size={20}
                        color="white"
                        style={styles.drawerIcon}
                      />
                      <Text style={styles.drawerText}>{item.name}</Text>
                    </TouchableOpacity>
                    {item.name === "Manage Profile" && (
                      <TouchableOpacity
                        onPress={() => setDrawerVisible(false)}
                        style={styles.closeButton}
                      >
                        <Icon name="times" size={20} color="#fff" />
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              />
            </View>
          </View>
        </Modal>

        {/* Sign Out Modal */}
        <Modal
          visible={isSignOutModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setSignOutModalVisible(false)}
        >
          <View style={styles.signOutModalContainer}>
            <View style={styles.signOutModalContent}>
              <Text style={styles.signOutText}>
                Are you sure you want to sign out?
              </Text>
              <View style={styles.signOutButtonContainer}>
                <TouchableOpacity
                  onPress={handleSignOut}
                  style={styles.signOutButtonConfirm}
                >
                  <Text style={styles.signOutButtonText}>Sign Out</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSignOutModalVisible(false)}
                  style={styles.signOutButtonCancel}
                >
                  <Text style={styles.signOutButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#141414",
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 15,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileName: {
    color: "#fff",
    fontSize: 18,
    marginTop: 10,
    fontWeight: "500",
  },
  sectionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#1c1c1c",
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  previewList: {
    marginTop: 10,
    paddingLeft: 20,
  },
  previewCard: {
    marginRight: 15,
    alignItems: "flex-start",
    width: 120,
  },
  previewImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
    backgroundColor: "#333",
  },
  previewTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 5,
  },
  downloadContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  notificationContainer: {
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  drawerContent: {
    backgroundColor: "#1e1e1e",
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  drawerItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  drawerIcon: {
    marginRight: 15,
  },
  drawerText: {
    color: "white",
    fontSize: 18,
    marginLeft: 15,
  },
  signOutModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  signOutModalContent: {
    width: "80%",
    backgroundColor: "#333",
    borderRadius: 10,
    borderColor: "rgba(229, 9, 20, 0.7)",
    borderWidth: 1,
    padding: 20,
    alignItems: "center",
  },
  signOutText: {
    color: "white",
    fontSize: 18,
    marginBottom: 20,
  },
  signOutButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  signOutButtonConfirm: {
    backgroundColor: "#e50914",
    padding: 10,
    borderRadius: 5,
  },
  signOutButtonCancel: {
    backgroundColor: "#555",
    padding: 10,
    borderRadius: 5,
  },
  signOutButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default MyNetflix;
