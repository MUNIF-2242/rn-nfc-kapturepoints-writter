import React, { createContext, useState, useEffect } from "react";

import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
export const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const [nidImage, setNidImage] = useState(null);

  const [nidFaceDetectResult, setNidFaceDetectResult] = useState("");

  const [nidLoading, setNidLoading] = useState(false);

  const BASE_URL = "http://192.168.0.236:3000";

  const pickNid = async () => {
    console.log("Upload License image");
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission to access camera is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [7, 4],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setNidImage(result.assets[0].uri);
      uploadNid(result.assets[0].base64);
    }
  };

  const uploadNid = async (base64Image) => {
    setNidLoading(true);
    setNidFaceDetectResult("");
    try {
      const response = await fetch(`${BASE_URL}/upload-nid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Image }),
      });

      const data = await response.json();
      console.log("NID upload response: ", data);
      if (data.imageUrl) {
        //setNidUrl(data.imageUrl);

        console.log("fileName...... ", data.fileName);
        detectText(data.fileName);
        Alert.alert(
          "License card uploaded successfully!",
          `NID URL: ${data.imageUrl}`
        );
      } else {
        Alert.alert("Failed to upload NID", `Error: ${data.message}`);
      }
    } catch (error) {
      Alert.alert("An error occurred", error.message);
    } finally {
      setNidLoading(false);
    }
  };

  const detectText = async (fileName) => {
    try {
      const response = await fetch(`${BASE_URL}/extract-licenseInfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName }),
      });

      const data = await response.json();

      console.log("License detection data ", data);
      if (response.ok) {
        // setComparisonResult(data.faceDetected ? "success" : "error");

        Alert.alert(
          "License card extraction successful!",
          JSON.stringify(data.licenseData, null, 2)
        );
      } else {
        Alert.alert("Failed to detect text", `Error: ${data.message}`);
        // setComparisonResult("error");
      }
    } catch (error) {
      Alert.alert("An error occurred", error.message);
      //setComparisonResult("error");
    } finally {
      //setLoading(false);
    }
  };

  return (
    <RegistrationContext.Provider
      value={{
        pickNid,
        nidImage,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};
