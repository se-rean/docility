import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from './ExcelTable'
import { ReadExcelData } from '../lib/ReadExcelFile'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import ReactHtmlParser from 'react-html-parser'
import FileUploadComponent from './Upload'
import httpClientRequest from '../lib/httpClientRequest'
import FilePreview from './FilePreview'
import { decryptFromStorage, encryptAndStore } from '../lib/SecureStorage'

export default function SupplierAssessment () {
  const [excelData, setExcelData] = useState(null)
  const [excelHtml, setExcelHtml] = useState(null)
  const [cellStyles, setCellStyles] = useState(null)
  const [upload, setUpload] = useState(false)
  const [themeplateData, setThemeplateData] = useState(null)
  const [state, setState] = useState(false)

  useEffect(() => {
    fetchThemeplate()
  }, [])

  const fetchThemeplate = async () => {
    setState(true)
    const theme = await httpClientRequest.get('themeplate')
    setThemeplateData(theme)
    setState(false)
  }

  const handleFileChange = async (file) => {
    if (file) {
      setUpload(true)
      const data = await ReadExcelData(file)
      setExcelData(data.jsonData)
      console.log(data.jsonData)
      setExcelHtml(data.html)
      setCellStyles(data.cellStyles)
    }
  }

  const updateData = (rowIndex, columnId, value) => {
    const newData = [...excelData]
    newData[rowIndex][columnId] = value
    setExcelData(newData)
  }

  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
    return buf
  }

  const handleSave = async () => {
    if (excelData) {
      const ws = XLSX.utils.aoa_to_sheet([...excelData])
      console.log(excelData)
      const rowCount = excelData.length + 1
      for (let rowIndex = 1; rowIndex <= rowCount; rowIndex++) {
        for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
          const cellAddress = XLSX.utils.encode_cell({ r: rowIndex, c: columnIndex })
          ws[cellAddress] = ws[cellAddress] || {}
          ws[cellAddress].s = ws[cellAddress].s || {}
          ws[cellAddress].s.wrapText = true
        }
      }

      const colWidths = columns.map((_) => ({ width: 25 }))
      ws['!cols'] = colWidths
      console.log(ws)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' })

      const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' })
      // saveAs(blob, 'edited_data.xlsx')
      const formData = new FormData()
      formData.append('file', blob, 'edited_data.xlsx')

      try {
        const response = await axios.post('http://localhost:8009/milestone/api/v1/file/upload?docType=themeplate', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        if (response.data?.filename) {
          const user = decryptFromStorage('user')
          const data = JSON.stringify({
            user_id: user.id,
            themeplate: response.data.filename
          })
          const result = await httpClientRequest.post('themeplate', data)
          console.log(result)
          if (result.is_success === true) {
            alert(result.message)
            setExcelData(null)
            setUpload(false)
            fetchThemeplate()
          }
        }

        console.log('File uploaded successfully', response.data)
      // Handle success
      } catch (error) {
        console.error('Error uploading file:', error)
      // Handle error
      }
    }
  }

  const columns = excelData && excelData[0] ? Object.keys(excelData[0]).map((key) => ({ Header: key, accessor: key })) : []

  const exportToExcel = () => {
    if (excelData) {
      const table = document.getElementById('exportTable')
      const book = XLSX.utils.table_to_book(table, { sheet: 'Format' })
      const ws = book.Sheets.Format

      // Apply cell styles
      for (const cellAddress in cellStyles) {
        // eslint-disable-next-line no-prototype-builtins
        if (cellStyles.hasOwnProperty(cellAddress)) {
          ws[cellAddress] = ws[cellAddress] || {}
          ws[cellAddress].s = cellStyles[cellAddress]
          ws[cellAddress].s.wrapText = true
        }
      }

      console.log(columns)
      const colWidths = columns.map((_) => ({ width: 30 }))
      ws['!cols'] = colWidths

      console.log(cellStyles)
      console.log(ws['!cols'])

      const wbout = XLSX.write(book, { bookType: 'xlsx', type: 'binary' })

      const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' })
      saveAs(blob, 'edited_data.xlsx')
    }
  }

  const deleteThemeplate = async (id) => {
    const result = await httpClientRequest.delete(`themeplate?id=${id}`)
    console.log(result)
    if (result.is_success === true) {
      alert(result.message)
      fetchThemeplate()
    }
  }

  const cancelSave = () => {
    fetchThemeplate()
    setExcelData(null)
    setUpload(false)
  }

  return (
    <div className="flex justify-around h-full w-full bg-secondary p-5">
      <div className="border p-4 w-1/2 flex-1 rounded-md bg-primary">
        <div className='flex justify-between items-center'>
          <h2 className="text-lg font-semibold mb-4">Themeplates</h2>
          <FileUploadComponent onFileSelect={handleFileChange} title="Upload Assessment Format"/>
        </div>
        {/* <input type="file" onChange={handleFileChange} /> */}

        {
          excelData && upload && (<div className="w-full mt-5 h-[50vh] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 p-5 gap-2 flex flex-col overflow-y-auto overflow-x-auto scrollbar">
            <h2 className="text-lg font-semibold mb-4">New Themeplates</h2>
            <Table columns={columns} data={excelData} updateData={updateData} />
            <div className='flex self-end'>
              <button onClick={() => cancelSave()} type="button" className="text-gray-900 bg-red-500 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 w-[10rem] self-end">Cancel</button>
              <button onClick={() => handleSave()} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 w-[10rem] self-end">Save Themeplate</button>
            </div>
          </div>
          )}

        {
          !excelData && !upload && (
            <div className="w-full mt-5 h-[50vh] text-sm text-left rtl:text-right text-gray-500 bg-primary dark:text-gray-400 p-5 gap-2 flex flex-col overflow-y-auto overflow-x-auto scrollbar">
              <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="border p-2">Themeplate</th>
                    <th scope="col" className="border p-2">Owner</th>
                    <th scope="col" className="border p-2">Status</th>
                    <th scope="col" className="border p-2">Date Created</th>
                    <th scope="col" className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {themeplateData?.data?.length > 0 && themeplateData.data.map((item, index) => (
                    <tr key={index} className='hover:bg-secondary cursor-pointer'>
                      <td className="border p-2">
                        <a className='text-textPrimary hover:underline' href={`http://localhost:8009/milestone/api/v1/file/read/${item.themplate}?docType=themeplate`}>{item.themplate}</a>
                      </td>
                      <td className="border p-2">{item.user_id}</td>
                      <td className="border p-2">{item.status}</td>
                      <td className="border p-2">{item.created_at}</td>
                      <td className=" border">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline p-3">
                    Approve
                        </a>
                        <a onClick={() => deleteThemeplate(item.id)} href="#" className="font-medium text-red-500 dark:text-blue-500 hover:underline p-3">
                    Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
      </div>
    </div>
  )
}
