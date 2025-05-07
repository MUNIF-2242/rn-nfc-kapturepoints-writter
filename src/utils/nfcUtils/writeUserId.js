import NfcManager from "react-native-nfc-manager";

async function writeUserId(userId, counter1 = 47, counter2 = 48) {
  if (!userId || typeof userId !== "string") {
    throw new Error("Invalid ID");
  }

  if (
    !Number.isInteger(counter1) ||
    !Number.isInteger(counter2) ||
    counter1 < 0 ||
    counter2 < 0
  ) {
    throw new Error("Counter values must be non-negative integers");
  }

  let allBytes = [];

  // Convert userId to byte array
  let userIdBytes = Array.from(userId).map((char) => char.charCodeAt(0));

  // Pad userId to a multiple of 4 bytes
  while (userIdBytes.length % 4 !== 0) {
    userIdBytes.push(0);
  }

  const startBlock = 4;
  const userIdBlockCount = Math.min(Math.ceil(userIdBytes.length / 4), 12);

  // Write user ID blocks
  for (let i = 0; i < userIdBlockCount; i++) {
    const blockData = userIdBytes.slice(i * 4, i * 4 + 4);
    const blockNumber = startBlock + i;

    const respBytes = await NfcManager.nfcAHandler.transceive([
      0xa2,
      blockNumber,
      ...blockData,
    ]);

    if (respBytes[0] !== 0x0a) {
      throw new Error(`Failed to write user ID block ${blockNumber}`);
    }

    allBytes = [...allBytes, ...blockData];
  }

  // Convert counters to 4-byte arrays
  const counter1Bytes = [
    (counter1 >> 24) & 0xff,
    (counter1 >> 16) & 0xff,
    (counter1 >> 8) & 0xff,
    counter1 & 0xff,
  ];
  const counter2Bytes = [
    (counter2 >> 24) & 0xff,
    (counter2 >> 16) & 0xff,
    (counter2 >> 8) & 0xff,
    counter2 & 0xff,
  ];

  // Calculate block numbers for counters
  const counter1Block = startBlock + userIdBlockCount;
  const counter2Block = counter1Block + 6;

  // Write counter 1
  const resp1 = await NfcManager.nfcAHandler.transceive([
    0xa2,
    counter1Block,
    ...counter1Bytes,
  ]);

  if (resp1[0] !== 0x0a) {
    throw new Error(`Failed to write counter1 block ${counter1Block}`);
  }

  // Write counter 2
  const resp2 = await NfcManager.nfcAHandler.transceive([
    0xa2,
    counter2Block,
    ...counter2Bytes,
  ]);

  if (resp2[0] !== 0x0a) {
    throw new Error(`Failed to write counter2 block ${counter2Block}`);
  }

  console.warn("userIdBytes", allBytes);
  console.warn("Counter1 written to block", counter1Block, counter1Bytes);
  console.warn("Counter2 written to block", counter2Block, counter2Bytes);

  return {
    userIdBytes: allBytes,
    counter1Block,
    counter2Block,
    counter1Bytes,
    counter2Bytes,
  };
}

export default writeUserId;
