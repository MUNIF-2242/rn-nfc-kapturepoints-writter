import NfcManager from "react-native-nfc-manager";

async function writeUserInfo(userId) {
  if (!userId || typeof userId !== "string") {
    throw new Error("Invalid ID");
  }

  let allBytes = [];
  let userIdBytes = Array.from(userId).map((char) => char.charCodeAt(0));

  while (userIdBytes.length % 4 !== 0) {
    userIdBytes.push(0);
  }

  const startBlock = 4;
  const totalBlocks = Math.min(Math.ceil(userIdBytes.length / 4), 12);

  for (let i = 0; i < totalBlocks; i++) {
    const blockData = userIdBytes.slice(i * 4, i * 4 + 4);
    const blockNumber = startBlock + i;

    const respBytes = await NfcManager.nfcAHandler.transceive([
      0xa2,
      blockNumber,
      ...blockData,
    ]);

    //console.warn(`block ${blockNumber}`, blockData, respBytes);

    if (respBytes[0] !== 0x0a) {
      throw new Error(`Failed to write block ${blockNumber}`);
    }

    allBytes = [...allBytes, ...blockData];
  }

  return allBytes;
}

export default writeUserInfo;
