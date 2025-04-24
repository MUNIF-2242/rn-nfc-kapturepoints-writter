import React, { useContext, useRef } from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";

import NfcManager from "react-native-nfc-manager";
import AndroidPrompt from "../components/AndroidPrompt";
import { NfcContext } from "../context/NfcContext";

import { TouchableOpacity } from "react-native";

function WriteTagScreen() {
  const androidPromptRef = useRef();
  const { handleWriteTag, handleReadTag } = useContext(NfcContext);

  return (
    <>
      <SafeAreaView />
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.readyButton}
          onPress={() => handleWriteTag(androidPromptRef)}
          activeOpacity={0.7}
        >
          <Text style={styles.readyButtonText}>
            Ready to Write? Click Here!
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.readyButton}
          onPress={() => handleReadTag(androidPromptRef)}
          activeOpacity={0.7}
        >
          <Text style={styles.readyButtonText}>Ready to Read? Click Here!</Text>
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

export default WriteTagScreen;
