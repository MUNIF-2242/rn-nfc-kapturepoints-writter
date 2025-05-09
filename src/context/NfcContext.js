import React, { createContext, useState, useEffect } from "react";
import NfcManager, { NfcTech } from "react-native-nfc-manager";
import { Platform } from "react-native";

import writeUserId from "../utils/nfcUtils/writeUserId";
import writeSignature from "../utils/nfcUtils/writeSignature";
import ensurePasswordProtection from "../utils/nfcUtils/ensurePasswordProtection";
import readUserId from "../utils/nfcUtils/readUserId";
import verifySignature from "../utils/nfcUtils/verifySignature";
import writeTagId from "../utils/nfcUtils/writeTagId";
import formatTagMemory from "../utils/nfcUtils/formatTagMemory";
import readTagId from "../utils/nfcUtils/readTagId";

export const NfcContext = createContext();

const BASE_URL = "http://192.168.0.236:3000";

export const NfcProvider = ({ children }) => {
  const [hasNfc, setHasNfc] = useState(null);
  const [enabled, setEnabled] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function checkNfc() {
      const supported = await NfcManager.isSupported();
      if (supported) {
        await NfcManager.start();
        setEnabled(await NfcManager.isEnabled());
      }
      setHasNfc(supported);
    }
    checkNfc();
  }, []);

  const refreshNfcStatus = async () => {
    setEnabled(await NfcManager.isEnabled());
  };

  const handleWriteTag = async (androidPromptRef) => {
    if (androidPromptRef && androidPromptRef.current) {
      try {
        await writeTag(androidPromptRef);
      } catch (error) {
        console.error("Error writing NFC: ", error);
      }
    } else {
      console.warn("androidPromptRef is not defined.");
    }
  };
  const writeTag = async (androidPromptRef) => {
    console.log("Writing NFC tag...");
    try {
      if (Platform.OS === "android") {
        androidPromptRef.current.setVisible(true);
      }

      await NfcManager.requestTechnology(NfcTech.NfcA);

      const userIdBytes = await writeTagId(); // your NFC tag value
      console.log("userIdBytes: ", userIdBytes);

      // Convert tag to string if needed
      const tag = await NfcManager.getTag();
      const tagId = tag.id;

      // Example phone number (replace this with actual user's number)
      const phoneNumber = "0";

      // Send to backend
      const response = await fetch(`${BASE_URL}/api/users/create-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          tagId: tagId,
        }),
      });

      const result = await response.json();

      console.log("Backend response: ", result);

      if (response.ok) {
        alert("NFC written and user saved successfully!");
      } else {
        // Show backend error message if available
        alert(`Error: ${result.error || "Something went wrong"}`);
      }
    } catch (ex) {
      console.log("Error writing NFC: ", ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
      if (Platform.OS === "android") {
        androidPromptRef.current.setVisible(false);
      }
    }
  };

  const handleReadTag = async (androidPromptRef) => {
    console.log("Reading NFC tag...");
    try {
      if (Platform.OS === "android") {
        androidPromptRef.current.setVisible(true);
      }

      await NfcManager.requestTechnology(NfcTech.NfcA);

      const { tagId, rawBytes } = await readTagId();

      console.log("TagId: ", tagId);
      console.log("rawBytes: ", rawBytes);

      //const result = await verifySignature(rawBytes);
      //console.log("Verification Result: ", result);

      alert("NFC Read successfully!");
    } catch (ex) {
      console.log("Error writing NFC: ", ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
      if (Platform.OS === "android") {
        androidPromptRef.current.setVisible(false);
      }
    }
  };

  const handleFormatTag = async (androidPromptRef) => {
    if (androidPromptRef && androidPromptRef.current) {
      try {
        await formatTag(androidPromptRef);
      } catch (error) {
        console.error("Error writing NFC: ", error);
      }
    } else {
      console.warn("androidPromptRef is not defined.");
    }
  };
  const formatTag = async (androidPromptRef) => {
    console.log("Formatting NFC tag...");
    try {
      if (Platform.OS === "android") {
        androidPromptRef.current.setVisible(true);
      }

      await NfcManager.requestTechnology(NfcTech.NfcA);
      //await ensurePasswordProtection();

      const userIdBytes = await formatTagMemory();
      console.log("userIdBytes: ", userIdBytes);

      alert("NFC formatted successfully!");
    } catch (ex) {
      console.log("Error writing NFC: ", ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
      if (Platform.OS === "android") {
        androidPromptRef.current.setVisible(false);
      }
    }
  };

  return (
    <NfcContext.Provider
      value={{
        hasNfc,
        enabled,
        refreshNfcStatus,
        writeTag,
        handleWriteTag,
        handleReadTag,
        handleFormatTag,
      }}
    >
      {children}
    </NfcContext.Provider>
  );
};
