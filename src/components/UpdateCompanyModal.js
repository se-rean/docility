import React, { useEffect, useState } from 'react'
import httpClientRequest from '../lib/httpClientRequest'
import ErrorBoundary from '../ErrorBoundary'
import SiteForm from './company/SiteForm'
import SiteEntry from './company/SiteEntry'

export default function UpdateCompanyModal ({ data, closeModal, updateData }) {
  const [allFieldsData, setAllFieldsData] = useState([])
  const getAllFieldsData = (data) => {
    setAllFieldsData(data)
  }
  const handlesubmitForm = async (e) => {
    e.preventDefault()
    console.log('submit', { ...allFieldsData, ...data })
    const payload = allFieldsData
    if (!payload.companyFieldData) return alert('no data updated')
    const result = await httpClientRequest.put(`/company/?company_id=${data.company_id}`, payload)
    if (!result?.is_success) return alert(result.message)
    alert(result.message)
  }
  return (
    <ErrorBoundary>
      <form onSubmit={(e) => handlesubmitForm(e)}>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen h-40 pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            {/* ... (unchanged code) */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle w-[70vh]">
              {/* Modal content */}
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 !important">
                <div className="border p-4">
                  <h2 className="text-lg font-semibold mb-4">Update Company Details</h2>
                  <SiteForm isUpdate={true} companyData={data} allFieldsData={getAllFieldsData}/>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
            Cancel
                </button>

                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Saves</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </ErrorBoundary>
  )
}
