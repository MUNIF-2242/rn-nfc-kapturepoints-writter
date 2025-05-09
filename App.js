import React, { useEffect } from "react";
import { StatusBar, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import AppNavigator from "./src/AppNavigator";

function App() {
  // Set status bar height for Android
  // useEffect(() => {
  //   if (Platform.OS === "android") {
  //     StatusBar.setTranslucent(true);
  //     StatusBar.setBackgroundColor("transparent");
  //   }
  // }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default App;
