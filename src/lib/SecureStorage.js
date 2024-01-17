import CryptoJS from 'crypto-js'

const ENCRYPTION_KEY = 'yourSecretKey'

// Function to encrypt and store data in localStorage
export const encryptAndStore = (key, data) => {
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString()
  localStorage.setItem(key, encryptedData)
}

// Function to decrypt data from localStorage
export const decryptFromStorage = (key) => {
  const encryptedData = localStorage.getItem(key)

  if (!encryptedData) {
    return null
  }

  const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY)
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))

  return JSON.parse(decryptedData)
}
