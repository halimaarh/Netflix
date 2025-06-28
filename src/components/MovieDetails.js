import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useMyList } from "../context/MyListContext";
import { useDownload } from "../context/DownloadContext"; // Import download context
import { fetchMovieDetails } from "../data/Api";

const MovieDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { movieId } = route.params;
  const { myList, addToMyList } = useMyList();
  const { addDownload } = useDownload(); // Access download context
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        const movieData = await fetchMovieDetails(movieId);
        setMovie(movieData);
        setError(null);
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to fetch movie details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadMovieDetails();
  }, [movieId]);

  const handleAddToMyList = () => {
    const movieExists = myList.some((item) => item.id === movie.id);
    if (movieExists) {
      Alert.alert("Already Added", "This movie is already in your list.");
    } else {
      addToMyList(movie);
      Alert.alert("Added", "The movie has been added to your list.");
      navigation.navigate("MyList");
    }
  };

  const handleDownload = () => {
    addDownload(movie);
    Alert.alert(
      "Download Added",
      "The movie has been added to your downloads."
    );
    navigation.navigate("Download");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff0000" />
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
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }}
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.releaseDate}>
          Release Date: {new Date(movie.release_date).toLocaleDateString()}
        </Text>
        <Text style={styles.overviewTitle}>Overview:</Text>
        <Text style={styles.overview}>{movie.overview}</Text>

        <View style={styles.additionalInfo}>
          <Text style={styles.additionalInfoTitle}>Genres:</Text>
          {movie.genres.map((genre) => (
            <Text key={genre.id} style={styles.genre}>
              {genre.name}
            </Text>
          ))}
        </View>

        <View style={styles.iconContainer}>
          {/* Add to My List */}
          <Pressable onPress={handleAddToMyList} style={styles.iconButton}>
            <MaterialIcons name="playlist-add" size={24} color="red" />
            <Text style={styles.iconText}>Add to My List</Text>
          </Pressable>
          {/* Download */}
          <Pressable onPress={handleDownload} style={styles.iconButton}>
            <MaterialIcons name="file-download" size={24} color="red" />
            <Text style={styles.iconText}>Download</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  poster: {
    marginTop: 18,
    width: "100%",
    height: 220,
    resizeMode: "contain",
    borderRadius: 8,
    marginBottom: 16,
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  releaseDate: {
    fontSize: 16,
    color: "gray",
    marginBottom: 12,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff0000",
    marginBottom: 8,
  },
  overview: {
    fontSize: 16,
    color: "#ffffff",
    marginBottom: 12,
    lineHeight: 22,
  },
  additionalInfo: {
    marginTop: 12,
  },
  additionalInfoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff0000",
    marginBottom: 4,
  },
  genre: {
    fontSize: 16,
    color: "#ff0000",
    marginRight: 8,
    marginBottom: 4,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
    marginBottom: 40,
  },
  iconButton: {
    alignItems: "center",
  },
  iconText: {
    color: "#ffffff",
    fontSize: 14,
    marginTop: 4,
  },
  errorText: {
    color: "#ff0000",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});

export default MovieDetails;
