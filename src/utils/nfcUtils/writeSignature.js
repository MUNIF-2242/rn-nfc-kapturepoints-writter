import NfcManager from "react-native-nfc-manager";
import * as HexUtils from "../HexUtils";
import * as Signer from "../Signer";

async function writeSignature(userIdBytes) {
  const tag = await NfcManager.getTag();

  const msgHex = HexUtils.bytesToHex(userIdBytes) + tag.id;
  console.warn("msg write", msgHex);

  // Generate signature
  const sig = Signer.sign(msgHex); // { r: '...', s: '...' }

  const sigHex = sig.r + sig.s;
  console.warn("sig write", sigHex);

  const sigBytes = HexUtils.hexToBytes(sigHex); // total 64 bytes

  // Write to pages 12–27 (each page = 4 bytes)
  for (let i = 0; i < 16; i++) {
    const pageIndex = 12 + i;
    const pageData = sigBytes.slice(i * 4, i * 4 + 4);

    if (pageData.length < 4) {
      // pad with zeros if short
      while (pageData.length < 4) pageData.push(0x00);
    }

    await NfcManager.nfcAHandler.transceive([0xa2, pageIndex, ...pageData]);
  }

  console.log("Signature written to NFC tag.");
}

export default writeSignature;
