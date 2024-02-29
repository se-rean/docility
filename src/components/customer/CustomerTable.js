import React, { useState } from 'react'
import Select from 'react-select'
import CreateSupplierModal from '../CreateSupplierModal'
// import Tree from './TreeNode'
// import FilePreview from '../FilePreview'
const CustomerTable = ({ filteredCustomer, handleDelete }) => {
  const [viewCreateModal, setViewCreateModal] = useState(false)
  const [updateData, setUpdateData] = useState([{}])
  console.log('filtered', filteredCustomer)
  const headers = [
    { name: 'customer_name', label: 'Customer name ', value: '', required: true },
    { name: 'customer_trading_as', label: 'Customer Trading As', value: '', required: true },
    { name: 'ABN_no', label: 'ABN no', value: '', required: true },
    { name: 'ACN_no', label: 'ACN no', value: '', required: true },
    { name: 'website', label: 'Website', value: '', required: true },
    { name: 'local_overseas_customer', label: 'Local / Overseas customer ', value: 'local', required: true, options: [{ name: 'local' }, { name: 'international' }] },
    { name: 'customer_address', label: 'Customer address ', value: '', required: true },
    { name: 'country', label: 'Country', value: '', required: true },
    { name: 'state', label: 'State', value: '', required: true },
    { name: 'suburb', label: 'Suburb', value: '', required: true },
    { name: 'postcode', label: 'Postcode', value: '', type: 'number', required: true },
    { name: 'contact_person_name', label: 'Contact person name', value: '', required: true },
    { name: 'phone_number ', label: 'Phone number', value: '', required: true, type: 'number' },
    { name: 'email', label: 'Email', value: '', required: true },
    { name: 'customer_category', label: 'Customer category', value: 'One off customer', required: true, options: [{ name: 'Key customer' }, { name: 'Regular customer' }, { name: 'One off customer' }] },
    { name: 'customer_type', label: 'Customer type', value: '', required: true },
    { name: 'data_shared_with_customer', label: 'Data shared with customer', value: '', required: true },
    { name: 'department_managing_customer', label: 'Department managing customer', value: '', required: true },
    { name: 'customer_manager', label: 'Customer manager', value: '', required: true },
    { name: 'contract_commencement_date', label: 'Contract Commencement date', value: '', required: true, type: 'date' },
    { name: 'contract_end_date', label: 'Contract end date', value: '', type: 'date', required: false },
    { name: 'sensitivity_of_data_involved', label: 'Sensitivity of data involved', value: 'Availability', required: true, options: [{ name: 'Confidentiality' }, { name: 'Integrity' }, { name: 'Availability' }] },
    { name: 'customer_agreement', label: 'Customer agreement', value: 'No', required: true, options: [{ name: 'Yes ' }, { name: 'No' }] },
    { name: 'customer_approval_status', label: 'Customer approval status', value: 'Draft', required: true, options: [{ name: 'Draft ' }, { name: 'approved' }, { name: 'rejected' }] },
    { name: 'date_entered', label: 'Date entered', value: '', type: 'date', required: true }
  ]

  const [columnVisibility, setColumnVisibility] = useState(
    headers.reduce((acc, { name }) => {
      acc[name] = true // Initialize all columns as visible
      return acc
    }, {})
  )
  const toggleColumnVisibility = (name) => {
    setColumnVisibility((prevVisibility) => ({
      ...prevVisibility,
      [name]: !prevVisibility[name]
    }))
  }
  const options = headers.map((item) => ({
    label: item.label,
    value: item.name
  }))

  const updateSupplier = (data) => {
    setUpdateData(data)
    setViewCreateModal(true)
  }

  const updateSupplierSubmit = (data) => {
    console.log(data)
  }

  const closeModal = () => setViewCreateModal(false)

  const newSupplier = () => {
    setViewCreateModal(false)
  }

  return (
    <div className="scollbar overflow-y-auto overflow-x-auto shadow-md sm:rounded-lg p-5">
      <div className="mb-4">
        <label htmlFor='filter'>Filter Table</label>
        <Select
          id="filter"
          options={options}
          isMulti
          value={options.filter((option) => columnVisibility[option.value])}
          onChange={(selectedOptions) => {
            const newVisibility = options.reduce((acc, option) => {
              acc[option.value] = selectedOptions.some((selected) => selected.value === option.value)
              return acc
            }, {})
            setColumnVisibility(newVisibility)
          }}
        />
      </div>
      <div className='scrollbar border-2 overflow-x-auto '>
        <table className="scollbar overflow-x-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
              Action
              </th>
              {headers.map((item) =>
                columnVisibility[item?.name]
                  ? (
                    <th key={item?.name} scope="col" className="border p-2 whitespace-nowrap">
                      <span>{item.label}</span>
                    </th>
                  )
                  : null
              )}
            </tr>
          </thead>
          <tbody>
            {filteredCustomer && filteredCustomer.map((customer) => (
              <tr key={customer} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-600">
                <td className="flex flex-row px-6 py-4 gap-2 items-center align-center justify-center">
                  <a onClick={() => updatecustomer(customer)} href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  Edit
                  </a>
                  <a onClick={() => handleDelete(customer.id)} href="#" className="font-medium text-red-500 dark:text-blue-500 hover:underline">
                  Delete
                  </a>
                </td>
                {headers.map((item) =>
                  columnVisibility[item.name]
                    ? (
                      <td key={`${[customer.id]}-${item.name}`} className="border p-2">
                        {/* {JSON.stringify(customer.data)} */}
                        {customer[item.name]}
                      </td>
                    )
                    : null
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default CustomerTable
