import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorBoundary from '../ErrorBoundary'
import logoutIco from '../assets/logout.svg'
import DropdownMenu from './DropDownMenu'
import { decryptFromStorage } from '../lib/SecureStorage'
const user = await decryptFromStorage('user')

export default function MainContent ({ selected }) {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.setItem('accessToken', '')
    localStorage.setItem('refreshToken', '')
    localStorage.setItem('user', '')
    navigate('/')
  }

  const [Component, setComponent] = useState(lazy(() => import('./DashBoard')))
  useEffect(() => {
    const user = decryptFromStorage('user')
    // eslint-disable-next-line eqeqeq
    if (!user || user == 'undefined' || user == 'null') {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    if (selected === 'Company') {
      setComponent(lazy(() => import('./Company')))
    } else if (selected === 'User') {
      setComponent(lazy(() => import('./Users')))
    } else if (selected === 'Home') {
      setComponent(lazy(() => import('./DashBoard')))
    } else if (selected === 'Supplier') {
      setComponent(lazy(() => import('./Supplier')))
    } else if (selected === 'Themeplates') {
      setComponent(lazy(() => import('./SupplierAssessment')))
    } else {
      setComponent(lazy(() => import('./UnderConstruction')))
    }
  }, [selected])

  return (
    <div className={'flex-grow px-4 transition-margin duration-300 ease-in-out'}>
      <div className='flex justify-between items-center bg-secondary'>
        <h1 className="text-3xl font-bold  text-[#15192C] p-5">{selected}</h1>
        <DropdownMenu logout={logout} user={user}/>
      </div>
      {/* Your dashboard content goes here */}
      <div className="flex items-center justify-center h-[90vh]">
        <Suspense fallback={<div>Loading...</div>}>
          <ErrorBoundary>
            <Component />
          </ErrorBoundary>
        </Suspense>
      </div>
    </div>
  )
}
