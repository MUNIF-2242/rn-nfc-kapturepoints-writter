import NfcManager from "react-native-nfc-manager";

const startPage = 8;
const endPage = 130;

async function formatTagMemory() {
  for (let page = startPage; page < endPage; page++) {
    const data = [0x00, 0x00, 0x00, 0x00];

    const cmd = [0xa2, page, ...data];

    await NfcManager.transceive(cmd);
  }
}
export default formatTagMemory;
