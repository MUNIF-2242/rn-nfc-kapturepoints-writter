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
      <View style={styles.circleContainer}>
        <TouchableOpacity
          style={[styles.circleButton, { backgroundColor: "#E74C3C" }]}
          onPress={() => navigation.navigate("Write")}
        ></TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.circleButton,
            {
              backgroundColor: "#F1C40F",
              flexDirection: "row",
              gap: 5,
              paddingHorizontal: 10,
            },
          ]}
          onPress={() => navigation.navigate("UserRegistration")}
        >
          <Text style={[styles.circleText, { color: "#333" }]}>Start</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.circleButton, { backgroundColor: "#2ECC71" }]}
          onPress={() => navigation.navigate("VehicleRegistration")}
        ></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: width * 0.05,
    backgroundColor: "#E1F5FE",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: height * 0.05,
  },
  headerText: {
    fontSize: width * 0.08,
    color: "#0D5BFF",
    fontWeight: "bold",
  },
  subHeaderText: {
    fontSize: width * 0.05,
    color: "#0D5BFF",
  },
  circleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  circleButton: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: (width * 0.25) / 2,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: height * 0.02,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  circleText: {
    fontSize: width * 0.05,
    color: "white",
    fontWeight: "bold",
  },
});

export default HomeScreen;
