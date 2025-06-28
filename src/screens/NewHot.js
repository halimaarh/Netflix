import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const NewHot = () => {
  const [movies, setMovies] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const TMDB_API_KEY = "f55dd2e477072e110c23bb7e6898129b";
        const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.date}>
        {new Date(item.release_date).toDateString()}
      </Text>
      <Image
        source={{
          uri: item.backdrop_path
            ? `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`
            : "https://via.placeholder.com/500x200?text=No+Image",
        }}
        style={styles.image}
      />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {item.overview || "No description available."}
        </Text>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.remindMeButton}>
            <Icon name="notifications" size={18} color="#fff" />
            <Text style={styles.remindMeText}>Remind Me</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.infoButton}
            onPress={() =>
              navigation.navigate("MovieDetail", { movieId: item.id })
            }
          >
            <Icon name="info" size={18} color="#fff" />
            <Text style={styles.infoText}>Info</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>New & Hot</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Search")}
          style={styles.searchButton}
        >
          <Icon name="search" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Movie List */}
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 30,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  searchButton: {
    padding: 8,
  },
  card: {
    marginBottom: 24,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#1e1e1e",
  },
  date: {
    color: "#aaa",
    fontSize: 14,
    padding: 8,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  details: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 16,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  remindMeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#444",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  remindMeText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
  },
  infoButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#444",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  infoText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
  },
});
export default NewHot;
