import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from "react-native";

// Get the width and height of the device's window
const { width, height } = Dimensions.get("window");

const OnboardingSlides = ({ navigation }) => {
  // State to keep track of the currently active slide
  const [activeSlide, setActiveSlide] = useState(0);

  // Slides data containing title, description, and images
  const slides = [
    {
      id: 1,
      title: "Unlimited movies, TV shows & more!",
      description: "Watch anywhere. Cancel anytime",
      image: require("../images/netflixBackground.jpg"),
    },
    {
      id: 2,
      title: "There is a plan for every fan",
      description: "Plans start at $2200.",
      image: require("../images/slide1.png"),
    },
    {
      id: 3,
      title: "Watch everywhere",
      description: "Stream on your phone, tablet, laptop, and TV",
      image: require("../images/slide2.png"),
    },
    {
      id: 4,
      title: "Download and Go",
      description: "Save your favorites and watch offline anytime.",
      image: require("../images/slide3.png"),
    },
  ];

  // Function to handle scrolling and update active slide index
  const handleScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveSlide(slideIndex);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Scrollable area for the slides */}
      <ScrollView
        onScroll={handleScroll}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        {slides.map((slide, index) => (
          <View
            key={slide.id}
            style={[styles.slide, { width }]} // Set slide width dynamically
          >
            {index === 0 ? (
              // First slide with background image and overlay
              <ImageBackground
                source={slide.image}
                style={styles.backgroundImage}
              >
                <View style={styles.overlay}>
                  <Text style={styles.title}>{slide.title}</Text>
                  <Text style={styles.description}>{slide.description}</Text>
                </View>
              </ImageBackground>
            ) : (
              // Other slides with image and text
              <View style={styles.imagecontainer}>
                <Image source={slide.image} style={styles.image} />
                <Text style={styles.main}>{slide.title}</Text>
                <Text style={styles.script}>{slide.description}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeSlide === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}

        {/* Get Started Button */}
        <View style={styles.buttonparent}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("SignUp")} // Navigate to SignUp screen
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollContainer: {
    flex: 1,
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    height: "100%",
    width: "100%", // Full height of the device
  },
  overlay: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain", // Maintain aspect ratio
    marginBottom: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  imagecontainer: {
    alignItems: "center",
    paddingBottom: 40,
  },
  main: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 0,
  },
  script: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 40,
    marginBottom: 70,
  },
  description: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 40,
    marginBottom: 0,
  },
  buttonparent: {
    width: 200,
    height: 80,
    marginTop: 50,
    position: "absolute",
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#E50914",
    paddingVertical: 12,
    width: 255,
    height: 50,
    paddingHorizontal: 28,
    borderRadius: 25,
    alignSelf: "baseline",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  pagination: {
    position: "absolute",
    padding: 31,
    bottom: 95,
    flexDirection: "row",
    alignSelf: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#fff",
  },
  inactiveDot: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
});

export default OnboardingSlides;
