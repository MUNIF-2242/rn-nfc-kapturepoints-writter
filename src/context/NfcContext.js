import React, { createContext, useState, useEffect } from "react";
import NfcManager, { NfcTech } from "react-native-nfc-manager";
import { Platform } from "react-native";

import writeUserId from "../utils/nfcUtils/writeUserId";
import writeSignature from "../utils/nfcUtils/writeSignature";
import ensurePasswordProtection from "../utils/nfcUtils/ensurePasswordProtection";
import readUserId from "../utils/nfcUtils/readUserId";
import verifySignature from "../utils/nfcUtils/verifySignature";

export const NfcContext = createContext();

export const NfcProvider = ({ children }) => {
  const [hasNfc, setHasNfc] = useState(null);
  const [enabled, setEnabled] = useState(null);

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
      await ensurePasswordProtection();
      const userIdBytes = await writeUserId("64e7a2cbb3ef6b1a77f9d0c3");

      await writeSignature(userIdBytes);
      alert("NFC written successfully!");
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

      const { userId, rawBytes } = await readUserId();

      console.log("userId: ", userId);
      console.log("rawBytes: ", rawBytes);

      const result = await verifySignature(rawBytes);
      console.log("Verification Result: ", result);

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

  return (
    <NfcContext.Provider
      value={{
        hasNfc,
        enabled,
        refreshNfcStatus,
        writeTag,
        handleWriteTag,
        handleReadTag,
      }}
    >
      {children}
    </NfcContext.Provider>
  );
};
