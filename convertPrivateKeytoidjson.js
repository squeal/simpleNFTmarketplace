import bs58 from 'bs58';
import fs from 'fs';

const pKey = bs58.decode('priveKey from phantom wallet goes here');
const j = new Uint8Array(pKey.buffer, pKey.byteOffset, pKey.byteLength / Uint8Array.BYTES_PER_ELEMENT);
fs.writeFileSync('key.json', j.toString());
