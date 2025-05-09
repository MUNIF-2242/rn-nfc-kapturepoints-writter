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
  const [licenseLoading, setLicenseLoading] = useState(false);

  const { handleWriteTag } = useContext(NfcContext);

  const { pickLicense, licenseImage, licenseData, handleActivateCard } =
    useContext(RegistrationContext);

  console.log("licenseData......... ", licenseData);
  return (
    <>
      <View style={[styles.pad]}>
        <TouchableOpacity
          style={styles.readyButton}
          onPress={() => handleWriteTag(androidPromptRef)}
          activeOpacity={0.7}
        >
          <Text style={styles.readyButtonText}>Configure NFC tag</Text>
        </TouchableOpacity>
        <Text style={styles.label}>License image</Text>

        <View style={styles.widePlaceholderContainer}>
          {/* {licenseLoading && <CustomActivityIndicator />} */}
          {licenseImage ? (
            <CustomImage source={{ uri: licenseImage }} />
          ) : (
            !licenseLoading && <PlaceholderImage />
          )}
        </View>
        {/* {licenseFaceDetectResult === "error" && !licenseLoading && (
          <Text style={styles.errorMessage}>Please upload valid License image</Text>
        )} */}

        {/* <CustomButton
          buttonStyle={{ width: "50%" }}
          onPress={pickLicense}
          // disabled={licenseLoading || licenseFaceDetectResult === "success"}
          text="Upload License image"
          showIcon={licenseFaceDetectResult === "success"}
        /> */}
        <TouchableOpacity
          style={styles.readyButton}
          onPress={pickLicense}
          activeOpacity={0.7}
        >
          <Text style={styles.readyButtonText}>Upload license</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.readyButton}
          onPress={handleActivateCard}
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

export default VehicleRegistrationScreen;
