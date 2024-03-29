import React, { useEffect, useState } from 'react'
import { useNavigate, useHistory } from 'react-router-dom'
import httpClientRequest from '../lib/httpClientRequest'
import AuthenticateUser from '../lib/AuthenticateUser'
import { decryptFromStorage, encryptAndStore } from '../lib/SecureStorage'
export default function Login () {
  const navigate = useNavigate()
  useEffect(() => {
    const user = decryptFromStorage('user')
    // eslint-disable-next-line eqeqeq
    if (user) {
      navigate('/main')
    }
  }, [])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('')

  const handleSubmit = async (args) => {
    args.preventDefault()

    try {
      if (!userType) return alert('User type required')
      const response = await httpClientRequest.post('/auth/login', { username, password, userType })
      if (response.is_success === false) return alert(response.message)

      encryptAndStore('user', JSON.stringify(response.data))
      localStorage.setItem('username', response.data.username)
      localStorage.setItem('role', response.data?.role)
      // Redirect or update state to indicate successful login
      // Reload the page
      window.location.reload(true)
    } catch (error) {
      console.error('Login failed', error)
      // Handle login failure (e.g., show an error message)
    }
  }

  return (
    <div className="min-h-screen mt-[-10rem] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className="mt-1 p-2 border rounded-lg w-35"
          required
        >
          <option selected={true} disabled={true} key='1' value=''>
            Choose User Type
          </option>
          {
            [
              { value: 'application_owner', label: 'Application owner' },
              { value: 'system_owner', label: 'System Owner' },
              { value: 'privileged_user', label: 'Privileged user' },
              { value: 'operations_user', label: 'Operations user' },
              { value: 'authorising officer', label: 'Authorising officer' },
              { value: 'aAuditor', label: 'Auditor' },
              { value: 'consultant', label: 'Consultant' },
              { value: 'guest', label: 'Guest' },
              { value: 'end_user', label: 'End user' }
            ].map(item => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))
          }
        </select>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            id="username"
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            id="password"
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Log in
        </button>
      </form>
    </div>
  )
}
