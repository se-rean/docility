// Breadcrumbs.js
import React from 'react'
import { Link } from 'react-router-dom'

const Breadcrumbs = ({ path }) => {
  const paths = [
    { label: 'Main', url: '/main' },
    { label: path }
  ]

  return (
    <nav className="bg-gray-200 p-4">
      <ul className="flex">
        {paths.map((path, index) => (
          <li key={index} className="flex items-center">
            {index < paths.length - 1
              ? (
                <Link to={path.url} className="text-blue-500 hover:underline">
                  {path.label}
                </Link>
              )
              : (
                <span className="text-gray-500">{path.label}</span>
              )}
            {index < paths.length - 1 && <span className="mx-2">&#8594;</span>}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Breadcrumbs
