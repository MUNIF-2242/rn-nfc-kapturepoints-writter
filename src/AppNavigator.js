// App.js

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NfcProvider } from "./context/NfcContext";
import HomeScreen from "./screens/HomeScreen";
import WriteTagScreen from "./screens/WriteTagScreen";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NfcProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
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
        </Stack.Navigator>
      </NavigationContainer>
    </NfcProvider>
  );
}

export default AppNavigator;
