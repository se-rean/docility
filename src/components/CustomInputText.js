import React from 'react'

function CustomInputText ({ field, handleFieldChange }) {
  return (
    <div>
      <div className="relative z-0">
        <input value={field.value} onChange={(e) => handleFieldChange(field.name, e.target.value, field.type)} type={field.type === 'date' ? 'date' : 'text'} id={field.name}
          required={field.required}
          aria-describedby="standard_success_help" className={`block py-2.5 px-0 w-full text-sm text-textAccent bg-transparent border-0 border-b-2 border-textAccent appearance-none dark:text-white dark:border-green-500 dark:focus:border-green-500 focus:outline-none focus:ring-0 peer ${field.disabled === true ? 'cursor-not-allowed' : ''}`} placeholder=" " />
        <label htmlFor={field.name} className="absolute text-sm text-textAccent dark:text-green-500 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">{field.label}</label>
      </div>
      {/* <p id="standard_success_help" class="mt-2 text-xs text-green-600 dark:text-green-400"><span class="font-medium">Well done!</span> Some success message.</p> */}
    </div>
  )
}

export default CustomInputText
