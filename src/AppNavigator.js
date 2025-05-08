// App.js

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NfcProvider } from "./context/NfcContext";
import HomeScreen from "./screens/HomeScreen";
import WriteTagScreen from "./screens/WriteTagScreen";
import VehicleRegistrationScreen from "./screens/VehicleRegistrationScreen";
import UserRegistrationScreen from "./screens/UserRegistrationScreen";
import VideoStreamScreen from "./screens/VideoStreamScreen";
import { RegistrationProvider } from "./context/RegistrationContext";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NfcProvider>
      <RegistrationProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {/* <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
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
          /> */}
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
                headerTitle: "Stram Video",
                headerTitleAlign: "center",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </RegistrationProvider>
    </NfcProvider>
  );
}

export default AppNavigator;
