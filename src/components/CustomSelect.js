import React from 'react'

export default function CustomSelect ({ field, handleFieldChange }) {
  console.log(field.label)
  return (
    <div className="relative z-0"><label htmlFor={field.name} className="absolute text-sm text-textAccent dark:text-green-500 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">{field.label}</label><select
      id={field.name}
      value={field.value}
      onChange={(e) => handleFieldChange(field.name, e.target.value, field.type)}
      className="mt-3 p-1 border rounded w-full cursor-pointer"
      required
    >
      <option selected disabled key={field.value}>
                                Select {field.label}
      </option>
      {field.options.map((option) => (
        <option key={option.name} value={option.value}>
          {option.name}
        </option>
      ))}
    </select> </div>
  )
}
