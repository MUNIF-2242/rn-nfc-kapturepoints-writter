import NfcManager from "react-native-nfc-manager";

async function readUserId() {
  let collectedBytes = [];

  try {
    // Read blocks 4 to 15 (12 blocks total)
    // NTAG215 allows reading 4 blocks (16 bytes) at once using command 0x30
    // So we read in chunks starting at 4, 8, and 12 (3 reads to cover all)
    for (let blockStart = 4; blockStart <= 8; blockStart += 4) {
      const response = await NfcManager.nfcAHandler.transceive([
        0x30,
        blockStart,
      ]);

      if (!response || response.length !== 16) {
        throw new Error(`Failed to read from block ${blockStart}`);
      }

      collectedBytes = [...collectedBytes, ...response];
    }

    // Remove any zero-padding (you added 0 during writing)
    const userIdBytes = collectedBytes.filter((byte) => byte !== 0);

    // Convert byte array back to string
    const userId = String.fromCharCode(...userIdBytes);

    return {
      userId,
      rawBytes: collectedBytes,
    };
  } catch (error) {
    console.error("Error reading NFC tag:", error);
    throw error;
  }
}

export default readUserId;
