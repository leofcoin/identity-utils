import { randombytes } from '@leofcoin/crypto'
import smartConcat from '@vandeurenglenn/typed-array-smart-concat'
import passwordToKey from './password-to-key.js'
import deriveKey from './derive-key.js'

export default async (password: string, data: string, version = new TextEncoder().encode('1')): Promise<Uint8Array> => {
    const passwordKey = await passwordToKey(password)
    const salt = randombytes(16)
    const iv = randombytes(16)
    
    const key = await deriveKey(passwordKey, salt)
  
    const encrypted = await globalThis.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv
      },
      key,
      new TextEncoder().encode(data)
    )
    
    return smartConcat([version, salt, iv, new Uint8Array(encrypted)])
  }