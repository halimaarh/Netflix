import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Search = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const TMDB_API_KEY = "f55dd2e477072e110c23bb7e6898129b";
      const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`;

      setLoading(true);
      try {
        const response = await fetch(apiUrl);
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const result = await response.json();
        setMovies(result.results || []);
        setError(null);
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to fetch movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  const fetchMovies = async () => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    const TMDB_API_KEY = "f55dd2e477072e110c23bb7e6898129b";
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}`;

    setLoading(true);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const result = await response.json();
      setMovies(result.results || []);
      setError(null);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to fetch movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔙 Back + Search Bar */}
      <View style={styles.searchHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Search movies..."
            placeholderTextColor="gray"
            value={query}
            onChangeText={(text) => {
              setQuery(text);
              if (text.trim() === "") setMovies([]);
            }}
            onSubmitEditing={fetchMovies}
          />
        </View>
      </View>

      {/* 🔴 Error */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* ⏳ Loading */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#ffffff"
          style={styles.loadingIndicator}
        />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.movieContainer}
              onPress={() =>
                navigation.navigate("MovieDetail", { movieId: item.id })
              }
            >
              {item.poster_path && (
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                  style={styles.poster}
                />
              )}
              <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
    padding: 16,
  },
  searchHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 8,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: "white",
  },
  listContainer: {
    paddingBottom: 20,
  },
  movieContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  poster: {
    width: 60,
    height: 90,
    borderRadius: 4,
    marginRight: 16,
  },
  title: {
    color: "white",
    fontSize: 16,
    flex: 1,
  },
  errorText: {
    color: "red",
    marginBottom: 16,
  },
  loadingIndicator: {
    marginVertical: 20,
  },
});

export default Search;
