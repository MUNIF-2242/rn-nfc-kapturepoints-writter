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
  const writeTag = async (androidPromptRef) => {
    console.log("Writing NFC tag...");
    try {
      if (Platform.OS === "android") {
        androidPromptRef.current.setVisible(true);
      }

      await NfcManager.requestTechnology(NfcTech.NfcA);
      //await ensurePasswordProtection();

      const userIdBytes = await writeTagId();
      console.log("userIdBytes: ", userIdBytes);

      //await writeSignature(userIdBytes);
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
