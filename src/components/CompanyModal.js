import React, { useEffect, useState } from 'react'
import httpClientRequest from '../lib/httpClientRequest'
import ErrorBoundary from '../ErrorBoundary'

export default function CompanyModal ({
  handleSubmit, closeModal, createUser, update = false,
  updateData = {}
}) {
  const [users, setUsers] = useState([])
  const [fields, setFields] = useState([
    { name: 'username', label: 'Username', value: '' },
    { name: 'email', label: 'Email', value: '' },
    { name: 'first_name', label: 'First Name', value: '' },
    { name: 'last_name', label: 'Last Name', value: '' },
    { name: 'department', label: 'Department', value: '' },
    { name: 'position', label: 'Position', value: '' },
    { name: 'phone_no', label: 'Phone No.', value: '' },
    { name: 'site_address', label: 'Site Address', value: '' },
    { name: 'country', label: 'Country', value: '' },
    { name: 'state', label: 'State', value: '' },
    { name: 'suburb', label: 'SubUrb', value: '' },
    { name: 'expiration_date', label: 'Expiration Date', value: '' },
    { name: 'MFA', label: 'MFA', value: 'No' },
    { name: 'role', label: 'Role', value: 'Guest' }
  ])

  const addUser = async (e) => {
    e.preventDefault()
    // Create a user object with field values
    const user = {}
    fields.forEach((field) => {
      user[field.name] = field.value
    })

    setUsers([...users, user])

    const mappedData = fields.reduce((acc, cur) => {
      return { ...acc, [cur.name]: cur.value }
    }, {})

    const result = await httpClientRequest.post('user/', mappedData)
    createUser(result)
  }

  const fetchUserDataForUpdate = async () => {
    try {
      // Use the provided updateData for initializing field values
      setFields((prevFields) => {
        const updatedFields = [...prevFields]
        updatedFields.forEach((field) => {
          field.value = updateData[field.name] || ''
        })
        return updatedFields
      })
    } catch (error) {
      console.error('Error initializing fields for update:', error)
    }
  }

  useEffect(() => {
    fetchRole()
    console.log(update)
    if (update) {
      fetchUserDataForUpdate()
    }
  }, [])

  const fetchRole = async () => {
    try {
      const userRole = await httpClientRequest.get('http://47.128.250.72:8009/milestone/api/v1/user/role')
      console.log(userRole)
      setFields((prevFields) => {
        const roleFieldIndex = prevFields.findIndex((field) => field.name === 'role')
        const updatedFields = [...prevFields]
        updatedFields[roleFieldIndex].options = userRole?.data
        const MFA = prevFields.findIndex((field) => field.name === 'MFA')
        updatedFields[MFA].options = [{
          name: 'Yes'
        },
        {
          name: 'No'
        }]

        return updatedFields
      })
    } catch (error) {
      console.error('Error fetching roles:', error)
    }
  }

  const handleFieldChange = (name, value) => {
    setFields((prevFields) => {
      const fieldIndex = prevFields.findIndex((field) => field.name === name)
      const updatedFields = [...prevFields]
      updatedFields[fieldIndex].value = value
      return updatedFields
    })
  }

  const closing = () => {
    setFields((prevFields) => {
      const updatedFields = [...prevFields]
      updatedFields.forEach((field) => {
        field.value = ''
      })
      return updatedFields
    })
    closeModal()
  }

  return (
    <ErrorBoundary>
      <form onSubmit={(e) => addUser(e)}>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen h-40 pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* ... (unchanged code) */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle w-[70vh]">
              {/* Modal content */}
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 !important">
                <div className="border p-4">
                  <h2 className="text-lg font-semibold mb-4">Create a New User</h2>
                  { fields.length > 0 &&
                    fields.map((field) => (
                      <div key={field.name} className="mb-4 relative z-0">
                        {field.options
                          ? (
                            <><label htmlFor={field.name} className="absolute text-sm text-textAccent dark:text-green-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">{field.label}</label><select
                              id={field.name}
                              value={field.value}
                              onChange={(e) => handleFieldChange(field.name, e.target.value)}
                              className="mt-1 p-2 border rounded w-full"
                              required
                            >
                              {field.options.map((option) => (
                                <option key={option.name} value={option.name}>
                                  {option.name}
                                </option>
                              ))}
                            </select></>
                          )
                          : (
                            <div>
                              <div className="relative z-0">
                                <input value={field.value} onChange={(e) => handleFieldChange(field.name, e.target.value)} type="text" id={field.name} aria-describedby="standard_success_help" className="block py-2.5 px-0 w-full text-sm text-textAccent bg-transparent border-0 border-b-2 border-textAccent appearance-none dark:text-white dark:border-green-500 dark:focus:border-green-500 focus:outline-none focus:ring-0 peer" placeholder=" " />
                                <label htmlFor={field.name} className="absolute text-sm text-textAccent dark:text-green-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">{field.label}</label>
                              </div>
                              {/* <p id="standard_success_help" class="mt-2 text-xs text-green-600 dark:text-green-400"><span class="font-medium">Well done!</span> Some success message.</p> */}
                            </div>
                          )}
                      </div>
                    ))}
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => closing()}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
            Cancel
                </button>

                <button type="submit" className="bg-blue-500 text-white p-2 rounded">{(update === true) ? 'Update User' : 'Save User'}</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </ErrorBoundary>
  )
}
