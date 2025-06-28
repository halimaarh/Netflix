import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sendNotification } from "../context/NotificationService"; // Import the notification helper

const DownloadContext = createContext();

export const DownloadProvider = ({ children }) => {
  const [downloads, setDownloads] = useState([]);

  useEffect(() => {
    const loadDownloads = async () => {
      try {
        const storedDownloads = await AsyncStorage.getItem("downloads");
        if (storedDownloads) {
          setDownloads(JSON.parse(storedDownloads));
        }
      } catch (error) {
        console.error("Failed to load downloads:", error);
      }
    };
    loadDownloads();
  }, []);

  const saveDownloads = async (list) => {
    try {
      await AsyncStorage.setItem("downloads", JSON.stringify(list));
    } catch (error) {
      console.error("Failed to save downloads:", error);
    }
  };

  const addDownload = (movie) => {
    const updatedList = [...downloads, movie];
    setDownloads(updatedList);
    saveDownloads(updatedList);

    // 🔔 Trigger local notification
    sendNotification(
      "Downloaded",
      `${movie.title || movie.name} was downloaded.`
    );
  };

  const removeDownload = (movieId) => {
    const movieToRemove = downloads.find((movie) => movie.id === movieId);
    const updatedList = downloads.filter((movie) => movie.id !== movieId);
    setDownloads(updatedList);
    saveDownloads(updatedList);

    // 🔔 Notify removal
    if (movieToRemove) {
      sendNotification(
        "Removed",
        `${
          movieToRemove.title || movieToRemove.name
        } was removed from Downloads.`
      );
    }
  };

  return (
    <DownloadContext.Provider
      value={{ downloads, addDownload, removeDownload }}
    >
      {children}
    </DownloadContext.Provider>
  );
};

export const useDownload = () => useContext(DownloadContext);
