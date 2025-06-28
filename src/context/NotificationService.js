import * as Notifications from "expo-notifications";

// Request permissions (call this in App.js once)
export const requestNotificationPermission = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    alert("Enable notifications to stay updated with your content!");
  }
};

// Trigger a notification
export const sendNotification = async (title, body) => {
  await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: null, // send immediately
  });
};

// Optional: for scheduling reminders later
export const scheduleReminder = async (title, body, secondsFromNow = 10) => {
  await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: { seconds: secondsFromNow },
  });
};
