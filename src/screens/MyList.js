import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useMyList } from "../context/MyListContext";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const MyList = () => {
  const { myList, removeFromMyList } = useMyList(); // Access removeFromMyList
  const navigation = useNavigation();

  const renderMovie = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.releaseDate}>
          Release Date: {new Date(item.release_date).toLocaleDateString()}
        </Text>

        <Pressable
          style={styles.removeButton}
          onPress={() => removeFromMyList(item.id)} // Remove movie from list
        >
          <Text style={styles.removeButtonText}>Remove from List</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#141414" }}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.header}>My List</Text>

        {myList.length > 0 ? (
          <FlatList
            data={myList}
            renderItem={renderMovie}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <Text style={styles.emptyMessage}>Your list is empty.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
    padding: 16,
  },
  backButton: {
    marginTop: 5,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16,
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#222",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  poster: {
    width: 100,
    height: 150,
  },
  details: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  releaseDate: {
    fontSize: 14,
    color: "gray",
    marginBottom: 8,
  },
  overview: {
    fontSize: 14,
    color: "#ffffff",
    marginBottom: 8,
    lineHeight: 20,
  },
  removeButton: {
    alignSelf: "flex-start",
    backgroundColor: "#e50914",
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 8,
  },
  removeButtonText: {
    color: "#ffffff",
    fontSize: 14,
  },
  emptyMessage: {
    color: "gray",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default MyList;
