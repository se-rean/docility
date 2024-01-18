import React, { useState } from 'react'
import Select from 'react-select'
import CreateSupplierModal from './CreateSupplierModal'
// import Tree from './TreeNode'
// import FilePreview from '../FilePreview'
const SupplierTable = ({ filteredSupplier, handleDelete }) => {
  const [viewCreateModal, setViewCreateModal] = useState(false)
  const [updateData, setUpdateData] = useState([{}])
  const headers = [
    { name: 'companyId', label: 'Company Id', visible: true },
    { name: 'supplierName', label: 'Supplier name ', visible: true },
    { name: 'supplierTradingAs', label: 'Supplier trading as ', visible: true },
    { name: 'companyRegistrationAbnNo', label: 'Company registration ABN no.', visible: true },
    { name: 'companyRegistrationAcnNo', label: 'Company registration ACN no. ', visible: true },
    { name: 'website', label: 'Website ', visible: true },
    { name: 'bsb', label: 'BSB', visible: true },
    { name: 'bankAccountNumber', label: 'Bank Account Number', visible: true },
    { name: 'bankAccountName', label: 'Bank Account Name', visible: true },
    { name: 'localOrOverseasSupplier', label: 'Local / Overseas supplier ', visible: true },
    { name: 'supplierAddress', label: 'Supplier address', visible: true },
    { name: 'country', label: 'Country ', visible: true },
    { name: 'state', label: 'State', visible: true },
    { name: 'subUrb', label: 'Suburb', visible: true },
    { name: 'postCode', label: 'Postcode', visible: true },
    { name: 'contactPersonName', label: 'Contact person name', visible: true },
    { name: 'supplierPhoneNumber', label: 'Phone number ', visible: true },
    { name: 'supplierEmailId', label: 'Email id ', visible: true },
    { name: '24x7ContactPersonName', label: '24x7 contact person name (if any) ', visible: true },
    { name: 'contactPersonPhoneNumber', label: 'Phone number ', visible: true },
    { name: 'contactPersonEmailId', label: 'Email id ', visible: true },
    { name: 'paymentTerms', label: 'Payment terms', visible: true },
    { name: 'specialConditionsOrAdditionalNotes', label: 'Special conditions or additional notes ', visible: true },
    { name: 'supplierCategory', label: 'Supplier category ', visible: true },
    { name: 'serviceManaged', label: 'Service managed (if any) ', visible: true },
    { name: 'purposeOfSupplier', label: 'Purpose of supplier ', visible: true },
    { name: 'dataSharedWithSupplier', label: 'Data shared with supplier ', visible: true },
    { name: 'departmentManagingSupplier', label: 'Department managing supplier ', visible: true },
    { name: 'supplierOwner', label: 'Supplier owner ', visible: true },
    { name: 'slaDetails', label: 'SLA details ', visible: true },
    { name: 'creditLimit', label: 'Credit limit ', visible: true },
    { name: 'ISO27001', label: 'ISO 27001 Certified and valid', visible: true },
    { name: 'ISO9001', label: 'ISO 9001 Certified and valid', visible: true },
    { name: 'ISO14001', label: 'ISO 14001 Certified and valid ', visible: true },
    { name: 'ISO45001', label: 'ISO 45001 Certified and valid ', visible: true },
    { name: 'modernSlaveryActApplicable', label: 'Modern Slavery Act applicable ', visible: true },
    { name: 'modernSlaveryStatementPublishedDate', label: 'Modern Slavery Statement published date', visible: true },
    { name: 'anyOtherCertification', label: 'Any other certification', visible: true },
    { name: 'estimatedAnnualBudgetValue', label: 'Estimated annual budget value ', visible: true },
    { name: 'contractCommencementDate', label: 'Contract Commencement date ', visible: true, type: 'date' },
    { name: 'contractEndDate', label: 'Contract end date ', visible: true, type: 'date' },
    { name: 'Sensitivity_of_data_involved', label: 'Sensitivity of data involved (CIA Impact) ', visible: true },
    { name: 'threat', label: 'Threat ', visible: true },
    { name: 'matrix_to_be_used_for_risk_assessment', label: 'Matrix to be used for risk assessment ', visible: true },
    { name: 'likelihood', label: 'Likelihood ', visible: true },
    { name: 'impact', label: 'Impact ', visible: true },
    { name: 'inherent_risk_level', label: 'Inherent Risk level/rating ', visible: true, disabled: true },
    { name: 'risk_assessment_completed', label: 'Risk Assessment completed ', visible: true },
    { name: 'supplier_assessment_required', label: 'Supplier assessment required ', visible: true },
    { name: 'supplier_assessment_due_date', label: 'Supplier assessment due date ', visible: true, type: 'date' },
    { name: 'supplier_assessment_status', label: 'Supplier Assessment status ', visible: true },
    { name: 'supplier_assessment_reviewer_person', label: 'Supplier assessment reviewer person ', visible: true },
    { name: 'supplier_agreement ', label: 'Supplier agreement ', visible: true },
    { name: 'supplier_approval_status', label: 'Supplier approval status ', visible: true },
    { name: 'date_entered ', label: 'Date entered ', visible: true, type: 'date' },
    { name: 'decision_date ', label: 'Decision date ', visible: true, type: 'date' }
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
    <div className="scollbar overflow-y-auto shadow-md sm:rounded-lg p-5">
      {viewCreateModal && <CreateSupplierModal closeModal={closeModal} updateSupplier={newSupplier} updateData={updateData} isUpdate={true} />}
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
                columnVisibility[item.name]
                  ? (
                    <th key={item.name} scope="col" className="border p-2 whitespace-nowrap">
                      <span>{item.label}</span>
                    </th>
                  )
                  : null
              )}
            </tr>
          </thead>
          <tbody>
            {filteredSupplier && filteredSupplier.map((supplier) => (
              <tr key={supplier} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-600">
                <td className="flex flex-row px-6 py-4 gap-2 items-center align-center justify-center">
                  <a onClick={() => updateSupplier(supplier)} href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  Edit
                  </a>
                  <a onClick={() => handleDelete(supplier._id)} href="#" className="font-medium text-red-500 dark:text-blue-500 hover:underline">
                  Delete
                  </a>
                </td>
                {headers.map((item) =>
                  columnVisibility[item.name]
                    ? (
                      <td key={`${[supplier.id]}-${item.name}`} className="border p-2">
                        {/* {JSON.stringify(supplier.data)} */}
                        {supplier.data[item.name]}
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
export default SupplierTable
