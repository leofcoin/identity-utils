import encrypt from './exports/encrypt.js'
import decrypt from './exports/decrypt.js'

const encrypted = await encrypt('pass', 'hello')
const decrypted = await decrypt('pass', encrypted)

console.log(decrypted === 'hello');