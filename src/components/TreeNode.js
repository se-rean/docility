import React, { useState } from 'react'

const TreeNode = ({ node }) => {
  const [expanded, setExpanded] = useState(false)

  const toggleOn = () => {
    setExpanded(true)
  }

  const toggleOff = () => {
    setExpanded(false)
    console.log(expanded)
  }

  return (
    <div className='cursor-pointer px-2 w-[18rem]'
      // onMouseEnter={() => setExpanded(true)}
      // onMouseLeave={() => setExpanded(false)}
    >
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium text-gray-900">{node.site_address}</div>
        <button className='font-bold text-lg px-1 hover:border-2 h-7' onClick={expanded ? toggleOff : toggleOn}>{expanded ? 'X' : '▼'}</button>
      </div>
      {expanded && (
        <div className="ml-12 flex justify-between">
          <div>
            <p>Address: {node.site_address}</p>
            <p>Country: {node.country}</p>
            <p>State: {node.site_state}</p>
            <p>Suburb: {node.site_suburb}</p>
            <p>Contact Person: {node.site_contact_person}</p>
            <p>mobile: {node.site_person_mobile}</p>
            <p>Email: {node.site_person_email}</p>
            <p>Site Status: <a className={`${node.site_status === 'Inactive' ? 'text-red-500' : 'text-yellow-400'}`}>{node.site_status}</a></p>
          </div>
        </div>
      )}
      <div className="mt-2">
        {
          expanded && (<div className='w-full flex items-center flex-row-reverse gap-3'>
            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
            Edit
            </a>
            <a href="#" className="font-medium text-red-500 dark:text-blue-500 hover:underline">
            Delete
            </a>
          </div>)
        }
      </div>
    </div>
  )
}

const Tree = ({ data }) => {
  return (
    (data.length > 0) &&
    <div className="flex flex-col">
      <div className="-my-2 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((rootNode) => (
                  <tr key={rootNode.id}>
                    <td className="px-1 py-1 whitespace-nowrap  hover:bg-gray-100">
                      <TreeNode node={rootNode} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Tree
