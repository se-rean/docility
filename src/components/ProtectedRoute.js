import React from 'react'
import { Route, Navigate } from 'react-router-dom'

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = () => {
    const token = localStorage.getItem('accessToken')
    return token !== null
  }

  return isAuthenticated() ? <Route element={<Element />} {...rest} /> : <Navigate to="/login" />
}

export default ProtectedRoute
