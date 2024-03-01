/* eslint-disable react/display-name */
// FileUploadComponent.jsx
import React, { useState, forwardRef, useImperativeHandle } from 'react'
import axios from 'axios'

const FileUploadComponent = forwardRef((_props, ref) => {
  const [file, setFile] = useState(null)

  const handleFileChange = (event) => {
    // Update the state when a file is selected
    setFile(null)
    const selectedFile = event.target.files[0]

    if (selectedFile) {
      const allowedFileTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // Add xlsx file type
      ]

      if (allowedFileTypes.includes(selectedFile.type)) {
        setFile(selectedFile)
        _props.onFileSelect(selectedFile)
      } else {
        // File type is not allowed
        alert('Please select a valid file type (PDF or DOCX)')
        // Optionally, clear the file input value to prevent submitting the wrong file
        event.target.value = null
      }
    }
  }

  const handleSaveClick = async (docType) => {
    if (file) {
      const data = new FormData()
      data.append('file', file)

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://13.213.6.180:8009/milestone/api/v1/file/upload/${docType}`, // Replace with your actual upload URL
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data
      }

      try {
        const response = await axios.request(config)
        return response.data
      } catch (error) {
        // Handle the error as needed
      }
    }
  }

  // Expose the function to the parent component using useImperativeHandle
  useImperativeHandle(ref, () => ({
    handleSaveClick
  }))

  return (
    <div className='flex-col gap-1 flex'>
      {/* Input for file selection */}
      <label>{_props.title}</label>
      <input type="file" required={_props.required} className='bg-yellow-200' onChange={handleFileChange} />
      {/* Button to trigger file upload */}
      {/* <button onClick={handleSaveClick}>Save</button> */}
    </div>
  )
})

export default FileUploadComponent
