import React, { useState, useEffect } from 'react'
import Checkbox from './CheckBox'

const CheckboxGroup = ({ options, onCheckboxChange }) => {
  const initialState = options.reduce((acc, option) => {
    acc[option.id] = false
    return acc
  }, {})

  const [checkboxes, setCheckboxes] = useState(initialState)

  useEffect(() => {
    // Call the callback function with the updated checkbox values
    onCheckboxChange(checkboxes)
  }, [checkboxes])

  const handleCheckboxChange = (key) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [key]: !prevCheckboxes[key]
    }))
  }

  return (
    <div>
      {options.map((option) => (
        <Checkbox
          key={option.id}
          id={option.id}
          label={option.label}
          checked={checkboxes[option.id]}
          onChange={() => handleCheckboxChange(option.id)}
        />
      ))}
    </div>
  )
}

export default CheckboxGroup
