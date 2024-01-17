import React, { useState } from 'react'

const DarkModeToggle = () => {
  const [isDarkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode)
    document.body.classList.toggle('dark', !isDarkMode)
  }

  return (
    <div className="p-4 flex flex-col justify-center align-center items-center">
      <label className="switch">
        <input type="checkbox" onChange={toggleDarkMode} />
        <span className="slider"></span>
      </label>
      <p>Dark Mode</p>
    </div>
  )
}

export default DarkModeToggle
