import React, { useState } from 'react'
import Tree from '../TreeNode'
import FilePreview from '../FilePreview'
import UpdateCompanyModal from '../UpdateCompanyModal'
import DivisionTreeNode from '../DivisionTreeNode'
const CompanyTable = ({ filteredSites, handleDelete }) => {
  const [modal, setModal] = useState(false)
  const [companyData, setCompanyData] = useState({})
  console.log(filteredSites)
  const updateCompanyModal = (data) => {
    setCompanyData(data)
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }
  return (
    <div className="shadow-md sm:rounded-lg">
      { modal && <UpdateCompanyModal data={companyData} closeModal={closeModal}/> }
      <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th></th>
            <th key='sites' scope="col" className="px-6 py-3">
              sites
            </th>
            <th key='division' scope="col" className="px-6 py-3">
              division
            </th>
            {
              Object.keys(filteredSites[0]).filter(item => !['id', 'sites', 'created_at', 'updated_at', 'company_id', 'division'].includes(item)).map(item => (
                <th key={item} scope="col" className="px-6 py-3">
                  {item}
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody className='  h-[100%] '>
          {filteredSites.map((site) => (
            <tr key={site.id} className="  bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-600">
              <td className="flex flex-col px-6 py-4 gap-2 items-center  justify-center">
                <a onClick={() => updateCompanyModal(site)} href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
              ✎
                </a>
                <a onClick={() => handleDelete(site.company_id)} href="#" className="font-medium text-red-500 dark:text-blue-500 hover:underline">
              🗑️
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap ">
                <Tree data={site.sites}/>
              </td>
              <td className="px-6 py-4 whitespace-nowrap ">
                <DivisionTreeNode data={site.division}/>
              </td>
              {
                Object.keys(filteredSites[0]).filter(item => !['id', 'organisation_structure', 'company_file', 'sites', 'created_at', 'updated_at', 'company_id', 'division'].includes(item)).map(item => (

                  <td key={site[item]} className="px-6 py-4">
                    {site[item]}
                  </td>
                ))
              }
              <td key='organization_structure' className="px-6 py-4 text-textPrimary hover:underline">
                <a target='_blank' href={`http://localhost:8009/milestone/api/v1/file/read/${site.organisation_structure}?docType=organisation`} rel="noreferrer">{site.organisation_structure}</a>
              </td>
              <td key='company_file' className="px-6 py-4 text-textPrimary hover:underline">
                <a target='_blank' href={`http://localhost:8009/milestone/api/v1/file/read/${site.company_file}?docType=company_file`} rel="noreferrer">{site.company_file}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CompanyTable
