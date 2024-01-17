// ExcelComponent.js
import React, { useState, useCallback } from 'react'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
// import './ExcelComponent.css'

const initialData = [
  ['', 'Column 1', 'Column 2', 'Column 3'],
  ['Row 1', '', '', ''],
  ['Row 2', '', '', ''],
  ['Row 3', '', '', '']
]

const ExcelComponent = () => {
  const [data, setData] = useState(initialData)
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedColumns, setSelectedColumns] = useState([])

  const closeContextMenu = () => {
    const contextMenu = document.getElementById('context-menu')
    contextMenu.style.display = 'none'
    contextMenu.innerHTML = ''
    document.removeEventListener('click', closeContextMenu)
  }

  const addRow = (index) => {
    const newData = [...data]
    newData.splice(index + 1, 0, Array(data[0].length).fill(''))
    setData(newData)
    closeContextMenu()
  }

  const addColumn = (index) => {
    const newData = data.map((row) => {
      const newRow = [...row]
      newRow.splice(index + 1, 0, '')
      return newRow
    })
    setData(newData)
    closeContextMenu()
  }

  const removeRow = (index) => {
    if (data.length > 1) {
      const newData = [...data]
      newData.splice(index, 1)
      setData(newData)
    }
    closeContextMenu()
  }

  const removeColumn = (index) => {
    if (data[0].length > 1) {
      const newData = data.map((row) => {
        const newRow = [...row]
        newRow.splice(index, 1)
        return newRow
      })
      setData(newData)
    }
    closeContextMenu()
  }

  const handleContextMenu = useCallback(
    (e, rowIndex, columnIndex) => {
      e.preventDefault()

      const menu = [
        {
          label: 'Add Row',
          action: () => addRow(rowIndex)
        },
        {
          label: 'Add Column',
          action: () => addColumn(columnIndex)
        },
        {
          label: 'Remove Row',
          action: () => removeRow(rowIndex)
        },
        {
          label: 'Remove Column',
          action: () => removeColumn(columnIndex)
        }
      ]

      const contextMenu = document.getElementById('context-menu')
      contextMenu.style.top = `${e.clientY}px`
      contextMenu.style.left = `${e.clientX}px`

      menu.forEach((item) => {
        const menuItem = document.createElement('div')
        menuItem.classList.add('context-menu-item')
        menuItem.textContent = item.label
        menuItem.addEventListener('click', item.action)
        contextMenu.appendChild(menuItem)
      })

      contextMenu.style.display = 'block'
      document.addEventListener('click', closeContextMenu)
    },
    [addRow, addColumn, removeRow, removeColumn]
  )

  const handleInputChange = (e, rowIndex, columnIndex) => {
    const newData = [...data]
    newData[rowIndex][columnIndex] = e.target.value
    setData(newData)
  }

  const handleRowClick = (rowIndex) => {
    if (selectedRows.includes(rowIndex)) {
      setSelectedRows(selectedRows.filter((row) => row !== rowIndex))
    } else {
      setSelectedRows([...selectedRows, rowIndex])
    }
  }

  const handleColumnClick = (columnIndex) => {
    if (selectedColumns.includes(columnIndex)) {
      setSelectedColumns(selectedColumns.filter((col) => col !== columnIndex))
    } else {
      setSelectedColumns([...selectedColumns, columnIndex])
    }
  }

  const handleExport = async () => {
    const exportedData = data.map((row) =>
      row.filter((_, columnIndex) => selectedColumns.includes(columnIndex))
    )

    const ws = XLSX.utils.aoa_to_sheet(exportedData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

    // Wrap the writing process in a Promise
    const blob = await new Promise((resolve) => {
      XLSX.writeFileAsync(wb, 'excel-export.xlsx', { bookType: 'xlsx', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }, (blob) => {
        resolve(blob)
      })
    })

    // Convert the blob string to a Blob object
    const blobObject = new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

    // Save the blob using FileSaver.js
    saveAs(blobObject, 'excel-export.xlsx')
  }

  return (
    <div className="relative">
      <div
        id="context-menu"
        className="fixed bg-white border rounded border-gray-300 shadow p-2 hidden"
      ></div>
      <table id="excel-table" className="table-auto mx-auto mt-8">
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={selectedRows.includes(rowIndex) ? 'selected-row' : ''}
            >
              {row.map((cell, columnIndex) => (
                <td
                  key={columnIndex}
                  onContextMenu={(e) => handleContextMenu(e, rowIndex, columnIndex)}
                  onClick={() => handleRowClick(rowIndex)}
                >
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => handleInputChange(e, rowIndex, columnIndex)}
                  />
                </td>
              ))}
            </tr>
          ))}
          <tr>
            {data[0].map((header, columnIndex) => (
              <td
                key={columnIndex}
                className={selectedColumns.includes(columnIndex) ? 'selected-column' : ''}
                onClick={() => handleColumnClick(columnIndex)}
              >
                <input
                  type="text"
                  value={header}
                  onChange={(e) => handleInputChange(e, 0, columnIndex)}
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <button className="export-excel-btn" onClick={handleExport}>
        Export to Excel
      </button>
    </div>
  )
}

export default ExcelComponent
