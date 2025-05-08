import React, { useContext, useRef, useState } from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";

import NfcManager from "react-native-nfc-manager";
import AndroidPrompt from "../components/AndroidPrompt";
import { NfcContext } from "../context/NfcContext";

import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import PlaceholderImage from "../components/PlaceholderImage";
import CustomImage from "../components/CustomImage";
import * as ImagePicker from "expo-image-picker";
import { RegistrationContext } from "../context/RegistrationContext";

function VehicleRegistrationScreen() {
  const androidPromptRef = useRef();

  const [nidFaceDetectResult, setNidFaceDetectResult] = useState("");
  const [porichoyVerificationResponse, setPorichoyVerificationResponse] =
    useState("");

  const [loading, setLoading] = useState(false);
  const [nidLoading, setNidLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [nid, setNid] = useState("");
  const { handleWriteTag, handleReadTag, handleFormatTag } =
    useContext(NfcContext);
  const { value, setValue } = useContext(NfcContext);

  const { pickNid, nidImage } = useContext(RegistrationContext);
  return (
    <>
      <SafeAreaView />
      <View style={[styles.pad]}>
        <Text style={styles.label}>License image</Text>

        <View style={styles.widePlaceholderContainer}>
          {/* {nidLoading && <CustomActivityIndicator />} */}
          {nidImage ? (
            <CustomImage source={{ uri: nidImage }} />
          ) : (
            !nidLoading && <PlaceholderImage />
          )}
        </View>
        {/* {nidFaceDetectResult === "error" && !nidLoading && (
          <Text style={styles.errorMessage}>Please upload valid NID image</Text>
        )} */}

        {/* <CustomButton
          buttonStyle={{ width: "50%" }}
          onPress={pickNid}
          // disabled={nidLoading || nidFaceDetectResult === "success"}
          text="Upload NID image"
          showIcon={nidFaceDetectResult === "success"}
        /> */}
        <TouchableOpacity
          style={styles.readyButton}
          onPress={pickNid}
          activeOpacity={0.7}
        >
          <Text style={styles.readyButtonText}>Upload license</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.readyButton}
          onPress={() => handleWriteTag(androidPromptRef)}
          activeOpacity={0.7}
        >
          <Text style={styles.readyButtonText}>Configure NFC tag</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.readyButton}
          onPress={() => handleWriteTag(androidPromptRef)}
          activeOpacity={0.7}
        >
          <Text style={styles.readyButtonText}>Register</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.readyButton}
          onPress={() => handleReadTag(androidPromptRef)}
          activeOpacity={0.7}
        >
          <Text style={styles.readyButtonText}>Ready to Read? Click Here!</Text>
        </TouchableOpacity> */}
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
    // justifyContent: "center",
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

export default VehicleRegistrationScreen;
