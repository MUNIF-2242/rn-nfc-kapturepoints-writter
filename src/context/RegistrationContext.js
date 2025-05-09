import React, { createContext, useState, useEffect } from "react";

import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
export const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const [licenseImage, setLicenseImage] = useState(null);

  const [licenseFaceDetectResult, setLicenseFaceDetectResult] = useState("");

  const [licenseLoading, setLicenseLoading] = useState(false);
  const [licenseData, setLicenseData] = useState(false);

  const BASE_URL = "http://192.168.0.236:3000";

  const pickLicense = async () => {
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
      setLicenseImage(result.assets[0].uri);
      uploadLicense(result.assets[0].base64);
    }
  };

  const uploadLicense = async (base64Image) => {
    setLicenseLoading(true);
    setLicenseFaceDetectResult("");
    try {
      const response = await fetch(`${BASE_URL}/api/uploads/upload-license`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Image }),
      });

      const data = await response.json();
      console.log("License upload response: ", data);
      if (data.imageUrl) {
        //setLicenseUrl(data.imageUrl);

        console.log("fileName...... ", data.fileName);
        detectText(data.fileName);

        Alert.alert(
          "License card uploaded successfully!",
          `License URL: ${data.imageUrl}`
        );
      } else {
        Alert.alert("Failed to upload License", `Error: ${data.message}`);
      }
    } catch (error) {
      Alert.alert("An error occurred", error.message);
    } finally {
      setLicenseLoading(false);
    }
  };

  const detectText = async (fileName) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/extract/extract-licenseInfo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fileName }),
        }
      );

      const data = await response.json();
      setLicenseData(JSON.stringify(data.licenseData, null, 2));

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

  const handleActivateCard = async () => {
    console.log("Activate card");
    console.log("ALu: ", licenseData);
    whatIsMyTagNumber(0);
    try {
      const response = await fetch(`${BASE_URL}/api/users/get-user/${0}`);
      const data = await response.json();

      if (response.ok) {
        const userId = data.user._id;

        const parsedLicenseData =
          typeof licenseData === "string"
            ? JSON.parse(licenseData)
            : licenseData;

        // Example licenseData extracted from Textract
        const licensePayload = {
          licenseHolderName: parsedLicenseData.licenseHolderName,
          dateOfBirth: parsedLicenseData.dateOfBirth,
          bloodGroup: parsedLicenseData.bloodGroup,
          fatherName: parsedLicenseData.fatherName,
          licenseIssueDate: parsedLicenseData.licenseIssueDate,
          licenseExpirationDate: parsedLicenseData.licenseExpirationDate,
          isLicenseDateValid: parsedLicenseData.isLicenseDateValid,
          balance: 800,
          isCardActivated: true,
        };

        console.log("License payload: @@@@@@@@@@@@", licensePayload);
        const updateResponse = await fetch(
          `${BASE_URL}/api/users/update-user/${userId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(licensePayload),
          }
        );

        const updateResult = await updateResponse.json();

        if (updateResponse.ok) {
          Alert.alert(
            "Registration Success",
            "License data updated in user profile."
          );
        } else {
          Alert.alert(
            "Update Failed",
            updateResult.error || "Something went wrong"
          );
        }
      } else {
        Alert.alert("User not found", data.error);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const whatIsMyTagNumber = async (phoneNumber) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/users/get-user/${phoneNumber}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log("User data:", data);

      if (response.ok) {
        const tagId = data.user.tagId;
        const userId = data.user._id;
        const userPhoneNumber = data.user.phoneNumber;
        Alert.alert(
          "Your Tag ID",
          `Tag Number: ${tagId} ${userId} ${userPhoneNumber}`
        );
      } else {
        Alert.alert("User not found", data.error || "Unknown error");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <RegistrationContext.Provider
      value={{
        pickLicense,
        licenseImage,
        licenseData,
        handleActivateCard,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};
