import React, { useEffect } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StarterPage from "./src/screens/StarterPage";
import OnboardingSlides from "./src/screens/OnBoardingSlides";
import HeaderTitle from "./src/components/HeaderTitle";
import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";
import ProfileSelection from "./src/screens/ProfileSelection";
import Home from "./src/screens/Home";
import MovieDetails from "./src/components/MovieDetails";
import MyList from "./src/screens/MyList";
import Download from "./src/screens/Download";
import Search from "./src/components/Search";
import NewHot from "./src/screens/NewHot";
import MyNetflix from "./src/screens/MyNetflix";
import ManageProfiles from "./src/screens/ManageProfiles";
import { MyListProvider } from "./src/context/MyListContext";
import { DownloadProvider } from "./src/context/DownloadContext";
import Notifications from "./src/screens/Notifications";
import AppSettings from "./src/screens/AppSettings";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <MyListProvider>
      <DownloadProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Starter">
            <Stack.Screen
              name="Starter"
              component={StarterPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Slides"
              component={OnboardingSlides}
              options={{
                headerLeft: () => false,
                headerBackVisible: false,
                headerTitle: () => <HeaderTitle />,
                headerStyle: {
                  backgroundColor: "#000",
                  height: 60,
                  elevation: 0,
                  shadowOpacity: 0,
                },
              }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProfileSelection"
              component={ProfileSelection}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MovieDetails"
              component={MovieDetails}
              options={{
                headerShown: true,
                headerTitle: "Movie Detail",
                headerStyle: { backgroundColor: "#141414" },
                headerTintColor: "white",
                headerBackTitleVisible: "",
              }}
            />
            <Stack.Screen
              name="MyList"
              component={MyList}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Download"
              component={Download}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Search"
              component={Search}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewHot"
              component={NewHot}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MyNetflix"
              component={MyNetflix}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageProfiles"
              component={ManageProfiles}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Notifications"
              component={Notifications}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="AppSettings"
              component={AppSettings}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </DownloadProvider>
    </MyListProvider>
  );
}
