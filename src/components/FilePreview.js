import React, { useState } from 'react'
import FileViewer from 'react-file-viewer'
import Modal from './Modal'

const FilePreview = ({ file }) => {
  const [modal, setModal] = useState(false)

  const handleOpenModal = () => {
    setModal(true)
  }

  const handleCloseModal = () => {
    setModal(false)
  }

  const handleDownloadFile = async (file) => {
  }

  if (!file) return null

  const [fileName, ext] = file.split('.')
  const path = `http://localhost:8009/milestone/api/v1/file/read/${file}`

  return (
    <div className="">
      {/* Main FileViewer */}
      <div className='' onClick={handleOpenModal}>
        {/* <FileViewer

          fileType={ext}
          filePath={path}
        /> */}
        <p className='text-blue-500 hover:underline'>{file}</p>
      </div>

      {modal && (
        <Modal.PreviewModal ext={ext} file={file} path={path} handleDownloadFile={handleDownloadFile} handleCloseModal={handleCloseModal} />
      )}
    </div>
  )
}

export default FilePreview
