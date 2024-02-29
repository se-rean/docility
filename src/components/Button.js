import React from 'react'

export default function Button ({ onClick, title, type = 'button' }) {
  return (
    <div>
      <button onClick={() => onClick()} type={type} className={`text-gray-700 bg-white ${type === 'Primary' && 'bg-textPrimary text-primary hover:text-textPrimary'} border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700`}>{title}</button>
    </div>
  )
}
