import React, { useState } from 'react'
import logoutIco from '../assets/logout.svg'

const DropdownMenu = ({ user, logout }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState)
  }

  return (
    <div className="relative inline-block text-left"
      onMouseLeave={() => setDropdownOpen(false)}
    >
      <button
        type="button"
        onClick={toggleDropdown}
        className="text-textPrimary bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-[11rem] justify-between uppercase font-bold truncate"
        id="dropdownDefaultButton"
        aria-haspopup="true"
        aria-expanded={isDropdownOpen ? 'true' : 'false'}
      >
        {user?.username}
        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>

      {isDropdownOpen && (
        <div
          className="z-10 absolute right-0 w-44 bg-white divide-y divide-gray-100 rounded-md shadow dark:bg-gray-700"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="dropdownDefaultButton"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <div className="font-medium truncate">{user.role}: {user.last_name}</div>
              <div className="font-small">{user.email}</div>
            </div>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Settings
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={logout}>
                Sign out
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default DropdownMenu
