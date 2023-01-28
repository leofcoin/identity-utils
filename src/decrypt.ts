import smartDeconcat from '@vandeurenglenn/typed-array-smart-deconcat'
import deriveKey from './derive-key.js'
import passwordToKey from './password-to-key.js'

export default async (password: string, concatecated: Uint8Array): Promise<string> => {
  const [version, salt, iv, cipher] = smartDeconcat(concatecated)
  
  let iterations: number

  if (new TextDecoder().decode(version) === '1') {
    iterations = 250000
  }
  const passwordKey = await passwordToKey(password)
  const key = await deriveKey(passwordKey, salt, iterations)
  const decrypted = await globalThis.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv
    },
    key,
    cipher
  )
  return new TextDecoder().decode(decrypted)
}