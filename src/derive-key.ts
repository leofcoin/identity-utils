import { pkdf2SupportedAlgorithm } from "@leofcoin/crypto";

export default (key: CryptoKey, salt: Uint8Array, iterations = 250000, hashAlgorithm: pkdf2SupportedAlgorithm = 'SHA-512'): Promise<CryptoKey> => 
  globalThis.crypto.subtle.deriveKey({
    name: 'PBKDF2',
    salt,
    iterations,
    hash: hashAlgorithm
  },
  key,
  {
    name: 'AES-GCM',
    length: 256
  },
  false,
  ['encrypt', 'decrypt']
)