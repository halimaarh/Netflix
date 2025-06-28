import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sendNotification } from "../context/NotificationService"; // make sure this is correct path

const MyListContext = createContext();

export const MyListProvider = ({ children }) => {
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    const loadMyList = async () => {
      try {
        const storedList = await AsyncStorage.getItem("myList");
        if (storedList) setMyList(JSON.parse(storedList));
      } catch (error) {
        console.error("Failed to load myList:", error);
      }
    };
    loadMyList();
  }, []);

  const saveMyList = async (list) => {
    try {
      await AsyncStorage.setItem("myList", JSON.stringify(list));
    } catch (error) {
      console.error("Failed to save myList:", error);
    }
  };

  const addToMyList = (movie) => {
    const updatedList = [...myList, movie];
    setMyList(updatedList);
    saveMyList(updatedList);

    // 🔔 Notify addition
    sendNotification(
      "Added to My List",
      `${movie.title || movie.name} was added.`
    );
  };

  const removeFromMyList = (movieId) => {
    const movieToRemove = myList.find((movie) => movie.id === movieId);
    const updatedList = myList.filter((movie) => movie.id !== movieId);
    setMyList(updatedList);
    saveMyList(updatedList);

    // 🔔 Notify removal
    if (movieToRemove) {
      sendNotification(
        "Removed from My List",
        `${movieToRemove.title || movieToRemove.name} was removed.`
      );
    }
  };

  return (
    <MyListContext.Provider value={{ myList, addToMyList, removeFromMyList }}>
      {children}
    </MyListContext.Provider>
  );
};

export const useMyList = () => useContext(MyListContext);
