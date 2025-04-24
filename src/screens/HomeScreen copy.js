import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

function HomeScreen({ navigation }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Creative Info Write</Text>
        <Text style={styles.subHeaderText}>on NFC GIFT card for</Text>
      </View>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => navigation.navigate("Write")}
        activeOpacity={0.7} // Provides a fade effect on press
      >
        <Text style={styles.bannerText}>KriyaKarak</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: width * 0.05,
    backgroundColor: "white",
  },
  headerContainer: {
    marginBottom: height * 0.02, // Space between header and banner
    alignItems: "center", // Center align headers
  },
  headerText: {
    fontSize: width * 0.08, // Size for the first header
    color: "#0D5BFF", // Color for the first header
    fontWeight: "bold",
  },
  subHeaderText: {
    fontSize: width * 0.06, // Size for the second header
    color: "#0D5BFF", // Color for the second header
    fontWeight: "normal", // Regular weight for contrast
  },
  touchable: {
    backgroundColor: "#E1F5FE", // Light background for contrast
    borderRadius: 15, // Rounded corners
    paddingVertical: 15, // Padding for a button feel
    paddingHorizontal: 30, // Horizontal padding
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  bannerText: {
    fontSize: width * 0.12, // Size for the main banner text
    textAlign: "center",
    color: "#0D5BFF",
    fontWeight: "bold",
  },
});

export default HomeScreen;
