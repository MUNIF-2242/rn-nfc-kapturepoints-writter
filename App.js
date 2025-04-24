// In App.js in a new project

import * as React from "react";
import { PaperProvider } from "react-native-paper";
import AppNavigator from "./src/AppNavigator";

function App() {
  return (
    <PaperProvider>
      <AppNavigator />
    </PaperProvider>
  );
}

export default App;
