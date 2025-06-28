import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { fetchMoviesByCategory } from "../data/Api";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
import NewHot from "./NewHot";
import MyNetflix from "./MyNetflix";

const Home = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");

  useFocusEffect(
    useCallback(() => {
      const loadUserName = async () => {
        try {
          const profile = await AsyncStorage.getItem("profile");
          if (profile) {
            const parsedProfile = JSON.parse(profile);
            setUserName(parsedProfile.name);
          } else {
            setUserName("Guest");
          }
        } catch (e) {
          console.error("Failed to load profile", e);
          setUserName("Guest");
        }
      };

      loadUserName();
    }, [])
  );

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const categoryIds = [28, 35, 18, 27]; // Action, Comedy, Drama, Horror
        const formattedCategories = await fetchMoviesByCategory(categoryIds);
        setCategories(formattedCategories);
        setError(null);
      } catch (error) {
        setError("Failed to fetch movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  const handleMoviePress = (movieId) => {
    navigation.navigate("MovieDetails", { movieId });
  };

  const renderMovie = ({ item }) => (
    <Pressable
      onPress={() => handleMoviePress(item.id)}
      style={styles.movieContainer}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.moviePoster}
      />
    </Pressable>
  );

  const renderCategory = (category, index) => (
    <View style={styles.categoryContainer} key={`category-${index}`}>
      <Text style={styles.categoryTitle}>{category.title}</Text>
      <FlatList
        horizontal
        data={category.data}
        renderItem={renderMovie}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>{`Welcome, ${userName}`}</Text>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => navigation.navigate("Download")}>
            <MaterialIcons
              name="download"
              size={24}
              color="white"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Icon
              name="search-outline"
              size={24}
              color="white"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.featuredContainer}>
        <ImageBackground
          source={{
            uri: "https://asianimg.pro/cover/drunken-romance-1730735170.png",
          }}
          style={styles.featuredImage}
        >
          <View style={styles.featuredOverlay} />
          <Text style={styles.featuredTitle}>BREWING LOVE</Text>
          <Text style={styles.featuredSubtitle}>Romance • Comedy • Drama</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Icon name="play" size={16} color="#000" />
              <Text style={styles.buttonText}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Icon name="add" size={16} color="#000" />
              <Text style={styles.buttonText}>My List</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      {categories.map((category, index) => renderCategory(category, index))}
    </ScrollView>
  );
};

export default function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Homepage") {
            return <Icon name="home-outline" size={size} color={color} />;
          } else if (route.name === "New & Hot") {
            return (
              <MaterialCommunityIcons
                name="play-box-multiple-outline"
                size={size}
                color={color}
              />
            );
          } else if (route.name === "My Netflix") {
            return <Icon name="person-outline" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: "#3498db",
        tabBarInactiveTintColor: "white",
        tabBarStyle: { backgroundColor: "#000" },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Homepage" component={Home} />
      <Tab.Screen name="New & Hot" component={NewHot} />
      <Tab.Screen name="My Netflix" component={MyNetflix} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
    paddingHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#141414",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 30,
  },
  icons: {
    marginTop: 30,
    flexDirection: "row",
  },
  icon: {
    marginLeft: 16,
  },
  featuredContainer: {
    alignItems: "center",
    marginBottom: 24,
    position: "relative",
  },
  featuredImage: {
    width: "100%",
    height: 380,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  featuredOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: 10,
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    position: "absolute",
    bottom: 80,
    left: 20,
  },
  featuredSubtitle: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    position: "absolute",
    bottom: 60,
    left: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    position: "absolute",
    bottom: 20,
    left: 0,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    marginLeft: 5,
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  movieContainer: {
    marginRight: 8,
  },
  moviePoster: {
    width: 120,
    height: 180,
    borderRadius: 6,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});
