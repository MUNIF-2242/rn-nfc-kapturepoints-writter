// AppNavigator.js

import React from "react";
import { View, Platform, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { NfcProvider } from "./context/NfcContext";
import HomeScreen from "./screens/HomeScreen";
import WriteTagScreen from "./screens/WriteTagScreen";
import VehicleRegistrationScreen from "./screens/VehicleRegistrationScreen";
import UserRegistrationScreen from "./screens/UserRegistrationScreen";
import VideoStreamScreen from "./screens/VideoStreamScreen";
import { RegistrationProvider } from "./context/RegistrationContext";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  // Calculate the status bar height for Android
  const STATUSBAR_HEIGHT =
    Platform.OS === "android" ? StatusBar.currentHeight : 0;

  return (
    <View style={{ flex: 1, paddingTop: STATUSBAR_HEIGHT }}>
      <NfcProvider>
        <RegistrationProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  headerTitle: "Creative Portal",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Write"
                component={WriteTagScreen}
                options={{
                  headerTitle: "Creative Portal URL Set",
                  headerTitleAlign: "center",
                }}
              />
              <Stack.Screen
                name="UserRegistration"
                component={UserRegistrationScreen}
                options={{
                  headerTitle: "Creative Portal URL Set",
                  headerTitleAlign: "center",
                }}
              />
              <Stack.Screen
                name="VehicleRegistration"
                component={VehicleRegistrationScreen}
                options={{
                  headerTitle: "Creative Portal URL Set",
                  headerTitleAlign: "center",
                }}
              />
              <Stack.Screen
                name="VideoStream"
                component={VideoStreamScreen}
                options={{
                  headerTitle: "Stream Video",
                  headerTitleAlign: "center",
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </RegistrationProvider>
      </NfcProvider>
    </View>
  );
}

export default AppNavigator;
