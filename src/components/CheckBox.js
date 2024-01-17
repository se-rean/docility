import React from 'react'

const Checkbox = ({ id, label, checked, onChange }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        className="form-checkbox h-5 w-5 text-indigo-600"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className="ml-2">
        {label}
      </label>
    </div>
  )
}

export default Checkbox
