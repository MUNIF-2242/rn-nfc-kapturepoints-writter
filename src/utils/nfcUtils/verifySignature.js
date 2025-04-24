import NfcManager from "react-native-nfc-manager";
import * as HexUtils from "../HexUtils";
import * as Signer from "../Signer";

async function verifySignature() {
  const tag = await NfcManager.getTag();

  // Step 1: Re-read only the user ID portion (blocks 4 to 8)
  let userIdBytes = [];
  for (let pageStart = 4; pageStart <= 8; pageStart += 4) {
    const response = await NfcManager.nfcAHandler.transceive([0x30, pageStart]);

    if (!response || response.length !== 16) {
      throw new Error(`Failed to read user ID from page ${pageStart}`);
    }

    userIdBytes = [...userIdBytes, ...response];
  }

  // Remove zero-padding from user ID if added during write
  userIdBytes = userIdBytes.filter((byte) => byte !== 0);

  const msgHex = HexUtils.bytesToHex(userIdBytes) + tag.id;
  console.log("msg read", msgHex);

  // Step 2: Read 64-byte signature from pages 12 to 27
  let sigBytes = [];
  for (let pageStart = 12; pageStart <= 24; pageStart += 4) {
    const respBytes = await NfcManager.nfcAHandler.transceive([
      0x30,
      pageStart,
    ]);

    if (!respBytes || respBytes.length !== 16) {
      throw new Error(`Failed to read signature block ${pageStart}`);
    }

    sigBytes = [...sigBytes, ...respBytes];
  }

  // Step 3: Build r and s
  const sigHex = HexUtils.bytesToHex(sigBytes);
  const r = sigHex.slice(0, 64);
  const s = sigHex.slice(64, 128);

  console.warn("sig r", r);
  console.warn("sig s", s);

  // Step 4: Verify signature
  const isValid = Signer.verify(msgHex, { r, s });
  console.log("Signature verification result:", isValid);

  return isValid;
}

export default verifySignature;
