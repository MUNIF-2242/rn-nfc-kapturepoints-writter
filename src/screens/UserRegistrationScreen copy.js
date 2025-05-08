import React, { useContext, useEffect, useRef, useState } from "react";
import { View, StyleSheet, SafeAreaView, Text, ScrollView } from "react-native";
import { Button, TextInput, Menu } from "react-native-paper";
import NfcManager from "react-native-nfc-manager";
import AndroidPrompt from "../components/AndroidPrompt";
import { NfcContext } from "../context/NfcContext";

import {
  industryDropdownOptions,
  professionDropdownOptions,
} from "../data/dropdownOptions";
import { TouchableOpacity } from "react-native";

function UserRegistrationScreen({ navigation }) {
  const androidPromptRef = useRef();
  const { value, setValue } = useContext(NfcContext);

  const [customProfession, setCustomProfession] = useState("");

  return (
    <>
      <SafeAreaView />
      <View style={styles.wrapper}>
        <View style={[styles.wrapper, styles.pad]}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            value={value}
            onChangeText={setValue}
            style={styles.input}
            placeholder="Enter creative name"
          />
        </View>

        <TouchableOpacity
          style={styles.readyButton}
          onPress={() => navigation.navigate("VideoStream")}
          activeOpacity={0.7}
        >
          <Text style={styles.readyButtonText}>Stream Video</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.readyButton}
          onPress={() => handleWriteNdef(androidPromptRef, customProfession)}
          activeOpacity={0.7}
        >
          <Text style={styles.readyButtonText}>
            Ready to Write? Click Here!
          </Text>
        </TouchableOpacity>
        <AndroidPrompt
          ref={androidPromptRef}
          onCancelProps={() => {
            NfcManager.cancelTechnologyRequest();
          }}
        />

        <SafeAreaView style={styles.bgLight} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  pad: {
    padding: 20,
    paddingTop: 0,
  },
  dropdownContainer: {
    marginTop: 10,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#E1F5FE",
  },
  bgLight: {
    backgroundColor: "#E1F5FE",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    color: "#0D5BFF",
  },
  input: {
    marginTop: 10,
    backgroundColor: "#E1F5FE",
  },
  readyButton: {
    backgroundColor: "#E1F5FE",
    borderRadius: 15,
    paddingVertical: 30,
    paddingHorizontal: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    margin: 30,
    marginTop: 0,
  },
  readyButtonText: {
    color: "#0D5BFF",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  dropdownButtonText: {
    color: "#000",
  },
});

export default UserRegistrationScreen;
