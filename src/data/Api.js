const TMDB_API_KEY = "f55dd2e477072e110c23bb7e6898129b";
const BASE_URL = "https://api.themoviedb.org/3";

// Function to fetch movie details
export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw new Error("Failed to fetch movie details. Please try again.");
  }
};

// Function to fetch movies by category
export const fetchMoviesByCategory = async (categoryIds) => {
  try {
    const fetchPromises = categoryIds.map((categoryId) =>
      fetch(
        `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${categoryId}&language=en-US&page=1`
      ).then((response) => response.json())
    );

    const results = await Promise.all(fetchPromises);

    return [
      { title: "Action Movies", data: results[0].results },
      { title: "Comedy Movies", data: results[1].results },
      { title: "Drama Movies", data: results[2].results },
      { title: "Horror Movies", data: results[3].results },
    ];
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error("Failed to fetch movies. Please try again.");
  }
};
