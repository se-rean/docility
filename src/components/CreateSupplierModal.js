/* eslint-disable react/no-unknown-property */
import React, { useEffect, useState } from 'react'
import httpClientRequest from '../lib/httpClientRequest'
import ErrorBoundary from '../ErrorBoundary'
// eslint-disable-next-line react/no-unknown-property
import { decryptFromStorage, encryptAndStore } from '../lib/SecureStorage'

const userData = decryptFromStorage('user')
const existingFields = [
  { name: 'supplierName', label: 'Supplier name ', value: '' },
  { name: 'supplierTradingAs', label: 'Supplier trading as ', value: '' },
  { name: 'companyRegistrationAbnNo', label: 'Company registration ABN no.', value: '', type: 'number' },
  { name: 'companyRegistrationAcnNo', label: 'Company registration ACN no. ', value: '', type: 'number' },
  { name: 'website', label: 'Website ', value: '' },
  { name: 'bsb', label: 'BSB', value: '' },
  { name: 'bankAccountNumber', label: 'Bank Account Number', value: '', type: 'number' },
  { name: 'bankAccountName', label: 'Bank Account Name', value: '' },
  { name: 'localOrOverseasSupplier', label: 'Local / Overseas supplier ', value: '', options: [{ name: 'Local' }, { name: 'International' }] },
  { name: 'supplierAddress', label: 'Supplier address', value: '' },
  { name: 'country', label: 'Country ', value: '' },
  { name: 'state', label: 'State', value: '' },
  { name: 'subUrb', label: 'Suburb', value: '' },
  { name: 'postCode', label: 'Postcode', value: '', type: 'number' },
  { name: 'contactPersonName', label: 'Contact person name', value: '' },
  { name: 'supplierPhoneNumber', label: 'Phone number ', value: '', type: 'number' },
  { name: 'supplierEmailId', label: 'Email id ', value: '' },
  { name: '24x7ContactPersonName', label: '24x7 contact person name (if any) ', value: '' },
  { name: 'contactPersonPhoneNumber', label: 'Phone number ', value: '', type: 'number' },
  { name: 'contactPersonEmailId', label: 'Email id ', value: '' },
  { name: 'paymentTerms', label: 'Payment terms', value: '' },
  { name: 'specialConditionsOrAdditionalNotes', label: 'Special conditions or additional notes ', value: '' },
  { name: 'supplierCategory', label: 'Supplier category ', value: 'Non-critical Supplier', options: [{ name: 'Critical Supplier' }, { name: 'Non-critical Supplier' }] },
  { name: 'supplierType', label: 'Supplier category ', value: 'Cloud Service Provider', options: [{ name: 'Cloud Service Provider' }, { name: 'Manage Service Provider' }] },
  { name: 'serviceManaged', label: 'Service managed (if any) ', value: '' },
  { name: 'purposeOfSupplier', label: 'Purpose of supplier ', value: '' },
  { name: 'dataSharedWithSupplier', label: 'Data shared with supplier ', value: '' },
  { name: 'departmentManagingSupplier', label: 'Department managing supplier ', value: '' },
  { name: 'supplierOwner', label: 'Supplier owner ', value: '', options: [{}] },
  { name: 'slaDetails', label: 'SLA details ', value: '' },
  { name: 'creditLimit', label: 'Credit limit ', value: '', type: 'number' },
  { name: 'ISO27001', label: 'ISO 27001 Certified and valid', value: 'Yes', options: [{ name: 'Yes' }, { name: 'No' }] },
  { name: 'ISO9001', label: 'ISO 9001 Certified and valid', value: 'Yes', options: [{ name: 'Yes' }, { name: 'No' }] },
  { name: 'ISO14001', label: 'ISO 14001 Certified and valid ', value: '', options: [{ name: 'Yes' }, { name: 'No' }] },
  { name: 'ISO45001', label: 'ISO 45001 Certified and valid ', value: '', options: [{ name: 'Yes' }, { name: 'No' }] },
  { name: 'modernSlaveryActApplicable', label: 'Modern Slavery Act applicable ', value: 'Yes', options: [{ name: 'Yes' }, { name: 'No' }] },
  { name: 'modernSlaveryStatementPublishedDate', label: 'Modern Slavery Statement published date', value: '', type: 'date' },
  { name: 'anyOtherCertification', label: 'Any other certification', value: 'Yes', options: [{ name: 'Yes' }, { name: 'No' }] },
  { name: 'estimatedAnnualBudgetValue', label: 'Estimated annual budget value ', value: '', type: 'number' },
  { name: 'contractCommencementDate', label: 'Contract Commencement date ', value: '' },
  { name: 'contractEndDate', label: 'Contract end date ', value: '' },
  { name: 'Sensitivity_of_data_involved', label: 'Sensitivity of data involved (CIA Impact) ', value: 'Availability', options: [{ name: 'Confidentiality' }, { name: 'Integrity' }, { name: 'Availability' }] },
  { name: 'threat', label: 'Threat ', value: '' },
  { name: 'matrix_to_be_used_for_risk_assessment', label: 'Matrix to be used for risk assessment ', value: '3X3', options: [{ name: '3X3' }, { name: '5X5' }] },
  { name: 'likelihood', label: 'Likelihood ', value: 'Rare 1', options: [{ name: 'Almost Certain 3' }, { name: 'Possible 2' }, { name: 'Rare 1' }] },
  { name: 'impact', label: 'Impact ', value: 'Insignificant 1', options: [{ name: 'Insignificant 1' }, { name: 'Moderate 2' }, { name: 'Significant 3' }] },
  { name: 'inherent_risk_level', label: 'Inherent Risk level/rating ', value: '', disabled: true },
  { name: 'risk_assessment_completed', label: 'Risk Assessment completed ', value: 'No', options: [{ name: 'Yes' }, { name: 'No' }] },
  { name: 'supplier_assessment_required', label: 'Supplier assessment required ', value: 'Yes', options: [{ name: 'Yes' }, { name: 'No' }] },
  { name: 'supplier_assessment_due_date', label: 'Supplier assessment due date ', value: '', type: 'date' },
  { name: 'supplier_assessment_status', label: 'Supplier Assessment status ', value: 'Not Due', options: [{ name: 'Not Due' }, { name: 'Not Yet Started' }, { name: 'In Progress' }, { name: 'Completed' }] },
  { name: 'supplier_assessment_reviewer_person', label: 'Supplier assessment reviewer person ', value: '' },
  { name: 'supplier_agreement ', label: 'Supplier agreement ', value: 'Yes', options: [{ name: 'Yes' }, { name: 'No' }] },
  { name: 'supplier_approval_status', label: 'Supplier approval status ', value: 'Draft ', options: [{ name: 'Draft ' }, { name: 'approved ' }, { name: 'rejected' }] },
  { name: 'date_entered ', label: 'Date entered ', value: '', type: 'date' },
  { name: 'decision_date ', label: 'Decision date ', value: '', type: 'date' }
]

const newFields = [
  { name: 'supplierName', label: 'Supplier name ', value: '' },
  { name: 'supplierTradingAs', label: 'Supplier trading as ', value: '' },
  { name: 'companyRegistrationAbnNo', label: 'Company registration ABN no.', value: '', type: 'number' },
  { name: 'companyRegistrationAcnNo', label: 'Company registration ACN no. ', value: '', type: 'number' },
  { name: 'website', label: 'Website ', value: '' },
  { name: 'bsb', label: 'BSB', value: '' },
  { name: 'bankAccountNumber', label: 'Bank Account Number', value: '', type: 'number' },
  { name: 'bankAccountName', label: 'Bank Account Name', value: '' },
  { name: 'localOrOverseasSupplier', label: 'Local / Overseas supplier ', value: '', options: [{ name: 'Local' }, { name: 'International' }] },
  { name: 'supplierAddress', label: 'Supplier address', value: '' },
  { name: 'country', label: 'Country ', value: '' },
  { name: 'state', label: 'State', value: '' },
  { name: 'subUrb', label: 'Suburb', value: '' },
  { name: 'postCode', label: 'Postcode', value: '', type: 'number' },
  { name: 'contactPersonName', label: 'Contact person name', value: '' },
  { name: 'supplierPhoneNumber', label: 'Phone number ', value: '', type: 'number' },
  { name: 'supplierEmailId', label: 'Email id ', value: '' },
  { name: '24x7ContactPersonName', label: '24x7 contact person name (if any) ', value: '' },
  { name: 'contactPersonPhoneNumber', label: 'Phone number ', value: '', type: 'number' },
  { name: 'contactPersonEmailId', label: 'Email id ', value: '' },
  { name: 'paymentTerms', label: 'Payment terms', value: '' },
  { name: 'specialConditionsOrAdditionalNotes', label: 'Special conditions or additional notes ', value: '' },
  { name: 'supplierCategory', label: 'Supplier category ', value: 'Non-critical Supplier', options: [{ name: 'Critical Supplier' }, { name: 'Non-critical Supplier' }] },
  { name: 'supplierType', label: 'Supplier category ', value: 'Cloud Service Provider', options: [{ name: 'Cloud Service Provider' }, { name: 'Manage Service Provider' }] },
  { name: 'serviceManaged', label: 'Service managed (if any) ', value: '' },
  { name: 'purposeOfSupplier', label: 'Purpose of supplier ', value: '' },
  { name: 'dataSharedWithSupplier', label: 'Data shared with supplier ', value: '' },
  { name: 'departmentManagingSupplier', label: 'Department managing supplier ', value: '' },
  { name: 'supplierOwner', label: 'Supplier owner ', value: '', options: [{}] },
  { name: 'slaDetails', label: 'SLA details ', value: '' },
  { name: 'creditLimit', label: 'Credit limit ', value: '', type: 'number' },
  { name: 'ISO27001', label: 'ISO 27001 Certified and valid', value: 'Yes', options: [{ name: 'Yes' }, { name: 'No' }] },
  { name: 'ISO9001', label: 'ISO 9001 Certified and valid', value: 'Yes', options: [{ name: 'Yes' }, { name: 'No' }] },
  { name: 'ISO14001', label: 'ISO 14001 Certified and valid ', value: 'Yes', options: [{ name: 'Yes' }, { name: 'No' }] },
  { name: 'ISO45001', label: 'ISO 45001 Certified and valid ', value: 'Yes', options: [{ name: 'Yes' }, { name: 'No' }] },
  { name: 'modernSlaveryActApplicable', label: 'Modern Slavery Act applicable ', value: 'Yes', options: [{ name: 'Yes' }, { name: 'No' }] },
  { name: 'modernSlaveryStatementPublishedDate', label: 'Modern Slavery Statement published date', value: '', type: 'date' },
  { name: 'anyOtherCertification', label: 'Any other certification', value: 'Yes', options: [{ name: 'Yes' }, { name: 'No' }] },
  { name: 'estimatedAnnualBudgetValue', label: 'Estimated annual budget value ', value: '', type: 'number' },
  { name: 'contractCommencementDate', label: 'Contract Commencement date ', value: '', type: 'date' },
  { name: 'contractEndDate', label: 'Contract end date ', value: '', type: 'date' },
  { name: 'Sensitivity_of_data_involved', label: 'Sensitivity of data involved (CIA Impact) ', value: 'Availability', options: [{ name: 'Confidentiality' }, { name: 'Integrity' }, { name: 'Availability' }] },
  { name: 'threat', label: 'Threat ', value: '' },
  { name: 'matrix_to_be_used_for_risk_assessment', label: 'Matrix to be used for risk assessment ', value: '3X3', options: [{ name: '3X3' }, { name: '5X5' }] },
  { name: 'likelihood', label: 'Likelihood ', value: 'Rare 1', options: [{ name: 'Almost Certain 3' }, { name: 'Possible 2' }, { name: 'Rare 1' }] },
  { name: 'impact', label: 'Impact ', value: 'Insignificant 1', options: [{ name: 'Insignificant 1' }, { name: 'Moderate 2' }, { name: 'Significant 3' }] },
  { name: 'inherent_risk_level', label: 'Inherent Risk level/rating ', value: '', disabled: true },
  { name: 'risk_assessment_completed', label: 'Risk Assessment completed ', value: 'No', options: [{ name: 'Yes' }, { name: 'No' }] },
  { name: 'supplier_assessment_required', label: 'Supplier assessment required ', value: 'Yes', options: [{ name: 'Yes' }, { name: 'No' }] },
  { name: 'supplier_assessment_due_date', label: 'Supplier assessment due date ', value: '', type: 'date' },
  { name: 'supplier_assessment_status', label: 'Supplier Assessment status ', value: 'Not Due', options: [{ name: 'Not Due' }, { name: 'Not Yet Started' }, { name: 'In Progress' }, { name: 'Completed' }] },
  { name: 'supplier_assessment_reviewer_person', label: 'Supplier assessment reviewer person ', value: '' },
  { name: 'supplier_agreement', label: 'Supplier agreement ', value: 'Yes', options: [{ name: 'Yes' }, { name: 'No' }] },
  { name: 'supplier_approval_status', label: 'Supplier approval status ', value: 'Draft ', options: [{ name: 'Draft ' }, { name: 'approved' }, { name: 'rejected' }] },
  { name: 'date_entered', label: 'Date entered ', value: '', type: 'date' },
  { name: 'decision_date', label: 'Decision date ', value: '', type: 'date' }
]

export default function CreateSupplierModal ({
  addNewSupplier,
  updateSupplier,
  closeModal,
  update = false,
  createUser,
  updateData = {},
  isUpdate = false
}) {
  const [users, setUsers] = useState([])
  const [supplierType, setSupplierType] = useState('new')

  const [fields, setFields] = useState([])

  const addSupplier = async (e) => {
    e.preventDefault()
    // Create a user object with field values
  }

  const selectSupplier = (e) => {
    console.log(e.target.value)
    setSupplierType(e.target.value)
  }

  useEffect(() => {
    if (supplierType === 'new') {
      setFields(newFields)
      getUserList()
    } else if (supplierType === 'existing') {
      setFields(existingFields)
    }

    if (isUpdate) {
      setSupplierType(updateData.supplierType)
      if (updateData.supplierType === 'new') {
        newFields.forEach(item => {
          item.value = updateData[item.name]
        })
        getUserList()
        console.log(newFields)
      } else {
        existingFields.forEach(item => {
          item.value = updateData[item.name]
        })
      }
    }
  }, [supplierType])

  const handleFieldChange = (name, value, type = 'text') => {
    const numericRegex = /^[0-9]*$/
    console.log('type', type)
    if (type === 'number' && !numericRegex.test(value)) return
    setFields((prevFields) => {
      const fieldIndex = prevFields.findIndex((field) => field.name === name)
      const updatedFields = [...prevFields]
      updatedFields[fieldIndex].value = value
      if (name === 'matrix_to_be_used_for_risk_assessment') {
        const likelihood = prevFields.findIndex((field) => field.name === 'likelihood')
        const impact = prevFields.findIndex((field) => field.name === 'impact')
        // const likelihood = prevFields.findIndex((field) => field.name === 'likelihood')
        if (value === '3X3') {
          updatedFields[likelihood].options = [{ name: 'Almost Certain 3' }, { name: 'Possible 2' }, { name: 'Rare 1' }]
          updatedFields[likelihood].value = 'Rare 1'

          updatedFields[impact].options = [{ name: 'Insignificant 1' }, { name: 'Moderate 2' }, { name: 'Significant 3' }]
          updatedFields[impact].value = 'Insignificant 1'
        } else {
          updatedFields[likelihood].options = [{ name: 'Almost Certain 5' }, { name: 'Likely 4' }, { name: 'Possible 3' }, { name: 'Unlikely 2 ' }, { name: 'Rare 1' }]
          updatedFields[likelihood].value = 'Rare 1'

          updatedFields[impact].options = [{ name: 'Severe 5' }, { name: 'Major 4' }, { name: 'Moderate 3' },
            { name: 'Minor 2 ' }, { name: 'Insignificant 1' }]
          updatedFields[impact].value = 'Insignificant 1'
        }
        console.log(updatedFields)
      }

      const inherentRiskLevel = prevFields.findIndex((field) => field.name === 'inherent_risk_level')
      const likelihood = prevFields.findIndex((field) => field.name === 'likelihood')
      const impact = prevFields.findIndex((field) => field.name === 'impact')
      const likelihoodValue = updatedFields[likelihood].value
      const impactValue = updatedFields[impact].value
      updatedFields[inherentRiskLevel].value = ''
      console.log(likelihoodValue, impactValue)

      let risk = ''
      if (likelihoodValue === 'Almost Certain 3' && impactValue === 'Insignificant 1') risk = 'Medium 4'
      if (likelihoodValue === 'Almost Certain 3' && impactValue === 'Moderate 2') risk = 'High 5'
      if (likelihoodValue === 'Almost Certain 3' && impactValue === 'Significant 3') risk = 'Extreme 6'
      if (likelihoodValue === 'Possible 2' && impactValue === 'Insignificant 1') risk = 'Low 3'
      if (likelihoodValue === 'Possible 2' && impactValue === 'Moderate 2') risk = 'Medium 4'
      if (likelihoodValue === 'Possible 2' && impactValue === 'Significant 3') risk = 'High 5'
      if (likelihoodValue === 'Rare 1' && impactValue === 'Insignificant 1') risk = 'Low 2'
      if (likelihoodValue === 'Rare 1' && impactValue === 'Moderate 2') risk = 'Low 3'
      if (likelihoodValue === 'Rare 1' && impactValue === 'Significant 3') risk = 'Medium 4 5'

      if (likelihoodValue === 'Almost Certain 5' && impactValue === 'Insignificant 1') risk = 'Medium 6'
      if (likelihoodValue === 'Almost Certain 5' && impactValue === 'Minor 2') risk = 'High 7'
      if (likelihoodValue === 'Almost Certain 5' && impactValue === 'Moderate 3') risk = 'Extreme 8'
      if (likelihoodValue === 'Almost Certain 5' && impactValue === 'Major 4') risk = 'Extreme 9'
      if (likelihoodValue === 'Almost Certain 5' && impactValue === 'Severe 5') risk = 'Extreme 10'

      if (likelihoodValue === 'Likely 4' && impactValue === 'Insignificant 1') risk = 'Medium 5'
      if (likelihoodValue === 'Likely 4' && impactValue === 'Minor 2') risk = 'Medium 6'
      if (likelihoodValue === 'Likely 4' && impactValue === 'Moderate 3') risk = 'High 7'
      if (likelihoodValue === 'Likely 4' && impactValue === 'Major 4') risk = 'Extreme 8'
      if (likelihoodValue === 'Likely 4' && impactValue === 'Severe 5') risk = 'Extreme 9'

      if (likelihoodValue === 'Possible 3' && impactValue === 'Insignificant 1') risk = 'Low 4'
      if (likelihoodValue === 'Possible 3' && impactValue === 'Minor 2') risk = 'Medium 5'
      if (likelihoodValue === 'Possible 3' && impactValue === 'Moderate 3') risk = 'Medium 6'
      if (likelihoodValue === 'Possible 3' && impactValue === 'Major 4') risk = 'High 7'
      if (likelihoodValue === 'Possible 3' && impactValue === 'Severe 5') risk = 'Extreme 8'

      if (likelihoodValue === 'Unlikely 2' && impactValue === 'Insignificant 1') risk = 'Low 3'
      if (likelihoodValue === 'Unlikely 2' && impactValue === 'Minor 2') risk = 'Low 4'
      if (likelihoodValue === 'Unlikely 2' && impactValue === 'Moderate 3') risk = 'Medium 5'
      if (likelihoodValue === 'Unlikely 2' && impactValue === 'Major 4') risk = 'Medium 6'
      if (likelihoodValue === 'Unlikely 2' && impactValue === 'Severe 5') risk = 'High 7'

      if (likelihoodValue === 'Rare 1' && impactValue === 'Insignificant 1') risk = 'Low 2'
      if (likelihoodValue === 'Rare 1' && impactValue === 'Minor 2') risk = 'Low 3'
      if (likelihoodValue === 'Rare 1' && impactValue === 'Moderate 3') risk = 'Low 4'
      if (likelihoodValue === 'Rare 1' && impactValue === 'Major 4') risk = 'Medium 5'
      if (likelihoodValue === 'Rare 1' && impactValue === 'Severe 5') risk = 'Medium 6'

      console.log(risk)
      updatedFields[inherentRiskLevel].value = risk
      return updatedFields
    })

    const mappedData = fields.reduce((acc, cur) => {
      return { ...acc, [cur.name]: cur.value }
    }, {})
    console.log(mappedData)
  }

  const getUserList = async () => {
    const userList = await httpClientRequest.get(`/user/?company_id=${userData?.company_id}`)
    console.log('userlist', userList)
    setFields((prevFields) => {
      const updatedFields = [...prevFields]

      const supplierOwner = prevFields.findIndex((field) => field.name === 'supplierOwner')
      const owner = []
      userList.data.forEach(item => {
        owner.push({ value: item.id, name: `${item.first_name} ${item.last_name}` })
      })
      console.log('owner', owner)
      updatedFields[supplierOwner].options = owner

      return updatedFields
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(updateData)
    const mappedData = fields.reduce((acc, cur) => {
      return { ...acc, [cur.name]: cur.value }
    }, {})

    let result = ''
    mappedData.supplierType = supplierType
    mappedData.companyId = userData?.company_id

    console.log(mappedData)
    if (isUpdate === false) {
      result = await httpClientRequest.post('supplier', {
        supplier: mappedData
      })
    } else if (isUpdate === true) {
      result = await httpClientRequest.put(`supplier/${updateData.id}`, mappedData)
    }
    console.log(result)
    if (isUpdate) { updateSupplier() } else { addNewSupplier() }
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
                    <h2 className="text-lg font-semibold mb-4">Create Suppliers</h2>

                    <select
                      id={supplierType}
                      value={supplierType}
                      onChange={(e) => selectSupplier(e)}
                      className="mt-1 p-2 border rounded-lg w-35"
                      required
                    >
                      <option selected={true} disabled={true} key='1' value=''>
                        Choose Supplier Type
                      </option>
                      <option key='new' value='new'>
                        New Supplier
                      </option>
                      {/* <option key='existing' value='existing'>
                        Existing Supplier
                      </option> */}
                    </select>
                  </div>
                  { fields.length > 0 &&
                    fields.map((field) => (
                      <div key={field.name} className="mb-4 relative z-0">
                        {field.options
                          ? (
                            <><label for={field.name} class="absolute text-sm text-textAccent dark:text-green-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">{field.label}</label><select
                              id={field.name}
                              value={field.value}
                              onChange={(e) => handleFieldChange(field.name, e.target.value, field.type)}
                              className="mt-1 p-2 border rounded w-full"
                              required
                            >
                              <option disabled key={field.value}>
                                Select {field.label}
                              </option>
                              {field.options.map((option) => (
                                <option key={option.name} value={option.value}>
                                  {option.name}
                                </option>
                              ))}
                            </select></>
                          )
                          : (
                            <div>
                              <div class="relative z-0">
                                <input value={field.value} onChange={(e) => handleFieldChange(field.name, e.target.value, field.type)} type={field.type === 'date' ? 'date' : 'text'} id={field.name}
                                  required
                                  aria-describedby="standard_success_help" className={`block py-2.5 px-0 w-full text-sm text-textAccent bg-transparent border-0 border-b-2 border-textAccent appearance-none dark:text-white dark:border-green-500 dark:focus:border-green-500 focus:outline-none focus:ring-0 peer ${field.disabled === true ? 'cursor-not-allowed' : ''}`} placeholder=" " />
                                <label for={field.name} class="absolute text-sm text-textAccent dark:text-green-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">{field.label}</label>
                              </div>
                              {/* <p id="standard_success_help" class="mt-2 text-xs text-green-600 dark:text-green-400"><span class="font-medium">Well done!</span> Some success message.</p> */}
                            </div>
                          )}
                      </div>
                    ))}
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-lg">
                <button
                  onClick={() => closeModal()}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
            Cancel
                </button>

                <button className="bg-blue-500 text-white p-2 rounded">{(isUpdate === true) ? 'Update Supplier' : 'Save Supllier'}</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </ErrorBoundary>
  )
}
