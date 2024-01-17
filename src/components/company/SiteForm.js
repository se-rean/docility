// SiteForm.js
import React, { useState, useRef, useEffect } from 'react'
import SiteEntry from './SiteEntry'
import DivisionEntry from './DivisionEntry'
import FileUploadComponent from '../Upload'
import CheckboxGroup from '../CheckBoxGroup'
import MyDatePicker from '../DatePicker'

const SiteForm = ({ companyData, submited, isUpdate, handleSiteInputChange, removeSite, allFieldsData, companyFormData }) => {
  const formInitialData = [
    { name: 'company_organization', label: 'Organisation name', value: '' },
    { name: 'company_type_of_business', label: 'Type of business', value: '' },
    { name: 'company_text_file_number', label: 'Tax file number', value: '' },
    { name: 'company_acn_number', label: 'ACN number', value: '' },
    { name: 'company_communication_address', label: 'Communication Address ', value: '' },
    { name: 'company_country', label: 'Country', value: '' },
    { name: 'company_state', label: 'State', value: '' },
    { name: 'company_suburb', label: 'Suburb', value: '' },
    { name: 'contact_person_name', label: 'Contact person name', value: '' },
    { name: 'contact_person_mobile_no', label: 'Contact person mobile no', value: '' },
    { name: 'contact_person_email', label: 'Contact person email', value: '' },
    { name: 'timezone', label: 'Timezone', value: '' },
    { name: 'domain', label: 'Domain', value: 'No', options: [{ name: 'No' }, { name: 'Yes' }] },
    { name: 'account_creation_date', label: 'Account creation date', value: new Date().toISOString().split('T')[0], type: 'date' },
    { name: 'account_expiry_date', label: 'Account expiry date', value: new Date().toISOString().split('T')[0], type: 'date' },
    {
      name: 'information_security_framework',
      label: 'Information Security Framework / Products',
      value: 'ISO/IEC 27001',
      options: [
        { name: 'ISO/IEC 27001' },
        { name: ' ISO 9001' },
        { name: ' ISO 14001' },
        { name: 'NIST' },
        { name: 'SOC' },
        { name: 'CSA' }]
    },
    {
      name: 'license_allocated',
      label: 'License allocated',
      value: 'No license',
      options: [
        { name: 'No license' },
        { name: 'demo license' },
        { name: '0-5' },
        { name: '5-15' },
        { name: '15-30' },
        { name: '30-60' },
        { name: '60-120' },
        { name: '120-240' },
        { name: '240-480' },
        { name: '480-700' },
        { name: '700-1000' },
        { name: '1000 and above' }
      ]
    }
  ]
  const [fields, setFields] = useState({})

  useEffect(() => {
    setFields(formInitialData)
    // Reset fields when the parent container form is submitted
    console.log(isUpdate)
    if (isUpdate === true) {
      console.log(formInitialData)
      console.log(companyData)
      formInitialData.forEach(item => {
        item.value = companyData[item.name]
      })
      setFields(formInitialData)
      const mappedData = formInitialData.reduce((acc, cur) => {
        return { ...acc, [cur.name]: cur.value }
      }, {})

      setCompanyFieldData(mappedData)
      const data = {
        siteFieldData,
        companyFieldData: mappedData,
        selectedCheckboxes,
        organizationChart,
        divisionFieldData
      }
      console.log('update filedsasd', data)
      allFieldsData(data)
    }
  }, [submited])

  const checkboxOptions = [
    { id: 'Module_1', label: 'Module 1' },
    { id: 'Module_2', label: 'Module 2' },
    { id: 'module_3', label: 'module 3' }
  ]

  const [siteFieldData, setSiteFieldData] = useState({})
  const [divisionFieldData, setDivisionFieldData] = useState({})
  const [companyFieldData, setCompanyFieldData] = useState({})
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({})
  const [organizationChart, setOrganizationChart] = useState(null)

  const handleSiteValuesChange = async (updatedValues) => {
    // eslint-disable-next-line array-callback-return
    const siteData = Object.keys(updatedValues).map(item =>
      updatedValues[item].reduce((fieldData, datum) => ({
        ...fieldData,
        [datum.name]: datum.value
      }), {})
    )
    setSiteFieldData(siteData)
    handleAllFields()
  }

  const handleDivisionValuesChange = async (updatedValues) => {
    // eslint-disable-next-line array-callback-return
    const divisionData = Object.keys(updatedValues).map(item =>
      updatedValues[item].reduce((fieldData, datum) => ({
        ...fieldData,
        [datum.name]: datum.value
      }), {})
    )

    setDivisionFieldData(divisionData)
    handleAllFields()
  }

  const handleFieldChange = async (name, value) => {
    const fieldIndex = fields.findIndex((field) => field.name === name)
    const updatedFields = [...fields]
    updatedFields[fieldIndex].value = value
    setFields(updatedFields)
    await handleAllFields()
  }

  const handleCheckboxChange = (newCheckboxes) => {
    setSelectedCheckboxes(newCheckboxes)
    handleAllFields()
  }

  const handleOrganizationFileSelect = (file) => {
    console.log(file)
    setOrganizationChart(file)
  }

  const handleAllFields = async () => {
    const mappedData = await fields.reduce((acc, cur) => {
      return { ...acc, [cur.name]: cur.value }
    }, {})

    setCompanyFieldData(mappedData)
    console.log('mapped', mappedData)

    const data = {
      siteFieldData,
      companyFieldData: mappedData,
      selectedCheckboxes,
      organizationChart,
      divisionFieldData
    }
    console.log('update fileds', data)
    allFieldsData(data)
  }

  return (
    <div className='w-full gap-5 flex flex-col'>
      <h1>{ !isUpdate ? 'Create New Company' : '' }</h1>
      <div className="grid md:grid-cols-2 md:gap-6">

        { fields.length > 0 &&
                    fields.map((field) => (
                      <div key={field.name} className="mb-4 relative z-0">
                        {field.options
                          ? (
                            <><label htmlFor={field.type} className="absolute text-sm text-gray-600 dark:text-green-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">{field.label}</label><select
                              id={field.name}
                              value={field.value}
                              onChange={(e) => handleFieldChange(field.name, e.target.value)}
                              className="mt-1 p-2 border rounded w-full bg-secondary"
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
                                {
                                  <input value={field.value} onChange={(e) => handleFieldChange(field.name, e.target.value)} type={field.type !== 'date' ? 'text' : 'date'} aria-describedby="standard_success_help" className="block py-2.5 px-0 w-full text-sm text-textAccent bg-transparent border-0 border-b-2 border-textAccent appearance-none dark:text-white dark:border-green-500 dark:focus:border-green-500 focus:outline-none focus:ring-0 peer" placeholder=" " required/>
                                }
                                <label htmlFor={field.name} className="absolute text-sm text-gray-600 dark:text-green-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">{field.label}</label>
                              </div>
                              {/* <p id="standard_success_help" class="mt-2 text-xs text-green-600 dark:text-green-400"><span class="font-medium">Well done!</span> Some success message.</p> */}
                            </div>
                          )}
                      </div>
                    ))}
      </div>
      { !isUpdate && <SiteEntry sites={companyData?.sites} isUpdate={isUpdate} onValuesChange={handleSiteValuesChange} /> }
      { !isUpdate && <DivisionEntry divisionData={companyData?.division} isUpdate={isUpdate} onValuesChange={handleDivisionValuesChange}/> }
      { !isUpdate &&
        <div className="mb-4 relative z-0 grid md:grid-cols-2 md:gap-6 border-2 p-5">
          <div className="relative z-0">
            <FileUploadComponent onFileSelect={handleOrganizationFileSelect} required={true} title="Organization Structure"/>
          </div>
        </div>
      }
      { !isUpdate &&
        <div className="mb-4 relative z-0 grid md:grid-cols-2 md:gap-6 border-2 p-5">
          <div className="gap-2 flex">
            <div className="container mx-auto p-4">
              <h1 className="text-2xl font-bold mb-4">Module Assigned</h1>
              <CheckboxGroup title="" options={checkboxOptions} onCheckboxChange={handleCheckboxChange} />
            </div>
          </div>
        </div>
      }
      {/* <span onClick={((prevCount => prevCount + 1)} className="cursor-pointer w-[80px] text-center bg-blue-400 p-2 text-[10px] rounded-lg text-white">New Site</span> */}
    </div>
  )
}

export default SiteForm
