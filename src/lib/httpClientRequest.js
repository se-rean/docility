import axios from 'axios'
import { decryptFromStorage } from './SecureStorage'
const user = await decryptFromStorage('user')
const apiUrl = process.env.REACT_APP_API_URL
const request = axios.create({
  baseURL: `${apiUrl}`,
  timeout: 5000, // 5 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user?.access_token}`
  }
})

export const httpClientRequest = Object.freeze({
  get: async (URL, payload) => {
    try {
      const response = await request.get(`${URL}`, payload)
      return response.data
    } catch (error) {
      console.info(`Error on Get request: ${URL}, ${error}`)
    }
  },
  post: async (URL, payload) => {
    try {
      const response = await request.post(`${URL}`, payload)
      return response.data
    } catch (error) {
      console.info(`Error on POST request: ${URL}, ${error}`)
    }
  },
  put: async (URL, payload) => {
    try {
      const response = await request.put(`${URL}`, payload)
      return response.data
    } catch (error) {
      console.info(`Error on POST request: ${URL}, ${error}`)
    }
  },
  delete: async (URL, payload) => {
    try {
      const response = await request.delete(`${URL}`)
      return response.data
    } catch (error) {
      console.info(`Error on Delete request: ${URL}, ${error}`)
    }
  },
  upload: async (directory, payload, fileName = '') => {
    try {
      const data = new FormData()
      data.append('file', payload, fileName)

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://localhost:8009/milestone/api/v1/file/upload?docType=${directory}`,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data
      }

      const response = await axios.request(config)
      return response.data
    } catch (error) {
      console.error(`Error on POST request: ${directory}, ${error}`)
    }
  }
})

export default httpClientRequest
