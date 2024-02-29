import React, { useState } from 'react'
import ErrorBoundary from '../../ErrorBoundary'
import Button from '../Button'
import CustomInputText from '../CustomInputText'
import CustomSelect from '../CustomSelect'
import { decryptFromStorage } from '../../lib/SecureStorage'
import httpClientRequest from '../../lib/httpClientRequest'

const userData = decryptFromStorage('user')

export default function CreateCustomerModal ({ closeModal }) {
  const defaultFields = [
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

  const [fields, setFields] = useState(defaultFields)

  const handleFieldChange = (name, value, type) => {
    const numericRegex = /^[0-9]*$/
    if (type === 'number' && !numericRegex.test(value)) return

    setFields((prevFields) => {
      const fieldIndex = prevFields.findIndex((field) => field.name === name)
      const updatedFields = [...prevFields]
      updatedFields[fieldIndex].value = value
      return updatedFields
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    submitData()
  }

  const submitData = async () => {
    const mappedData = fields.reduce((acc, cur) => {
      return { ...acc, [cur.name]: cur.value }
    }, {})

    mappedData.company_id = userData?.company_id
    const result = await httpClientRequest.post('customer/', { customer: mappedData })
    alert(result.message)
    closeModal()
  }

  return (
    <ErrorBoundary>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="fixed inset-0 z-10 overflow-y-auto rounded-lg ">
          <div className="flex items-end justify-center min-h-screen h-40 pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            {/* ... (unchanged code) */}
            <div className="inline-block align-bottom bg-white border-2 rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle w-[70vh]">
              {/* Modal content */}
              <div className="bg-secondary px-4 rounded-lg pt-5 pb-4 sm:p-6 sm:pb-4 !important rounded-lg">
                <div className="border p-4 bg-primary rounded-lg">
                  <div className='pb-5'>
                    <h2 className="text-lg font-semibold mb-4">Create Customer</h2>
                    {
                      fields.map(f => (
                        <div className='mt-2' key={f.name}>{
                          f.options
                            ? (<CustomSelect key={f.name} handleFieldChange={(name, value, type) => handleFieldChange(name, value, type)} field={f} />)
                            : (
                              <CustomInputText key={f.name} handleFieldChange={(name, value, type) => handleFieldChange(name, value, type)} field={f} />
                            )
                        }
                        </div>
                      )
                      )
                    }
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-lg">
                <Button
                  onClick={() => {}}
                  type="Primary"
                  title="Save"
                />

                <Button
                  onClick={() => closeModal()}
                  title="Cancel"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </ErrorBoundary>
  )
}
