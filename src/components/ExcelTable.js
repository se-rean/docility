import React, { useState, useEffect, useRef } from 'react'
import { useTable } from 'react-table'
import { Resizable } from 'react-resizable' // Import Resizable from react-resizable

const EditableCell = ({ cell: { value }, row: { index }, column: { id, maxWidth }, updateData }) => {
  const [editable, setEditable] = useState(false)
  const [cellValue, setCellValue] = useState(value)
  const textareaRef = useRef(null)

  const handleDoubleClick = () => {
    setEditable(true)
  }

  const handleBlur = () => {
    setEditable(false)
    updateData(index, id, cellValue)
  }

  const handleChange = (e) => {
    setCellValue(e.target.value)
  }

  useEffect(() => {
    // Auto-adjust textarea height based on content
    if (editable && textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [editable, cellValue])

  const textareaStyle = {
    // width: `${maxWidth}px`, // Set the fixed width
    resize: 'none', // Disable textarea resizing
    overflow: 'hidden' // Hide any content that exceeds the height
  }

  return (
    <textarea
      className='w-full'
      ref={textareaRef}
      value={cellValue}
      readOnly={!editable}
      onClick={handleDoubleClick}
      onBlur={handleBlur}
      onChange={handleChange}
      style={textareaStyle}
      key={`cell-${index}-${id}`}
    />
  )
}

const ResizableHeader = ({ column }) => {
  const { getHeaderProps, getResizeProps } = column
  const isResizable = getResizeProps !== undefined && getResizeProps().style !== undefined

  return (
    <div {...getHeaderProps()} {...(isResizable ? getResizeProps() : {})}>
      {column.render('Header')}
    </div>
  )
}

const Table = ({ columns, data, updateData, mergedCells }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  })

  const isMergedCell = (rowIndex, columnId) => {
    return (
      mergedCells &&
      mergedCells.some(
        (cell) =>
          rowIndex >= cell.start.row &&
          rowIndex <= cell.end.row &&
          columnId >= cell.start.column &&
          columnId <= cell.end.column
      )
    )
  }

  return (
    <table id="exportTable" {...getTableProps()} style={{ border: '1px solid black' }}>
      <thead>
        {/* {headerGroups.map((headerGroup, index) => (
          <Resizable
            key={`header-${headerGroup.id}`}
            width={headerGroup.headers.length > 0 ? headerGroup.headers[0].width : 0}
            height={40}
            onResize={(e, { size }) => {
              const newWidth = size.width
              headerGroup.headers.forEach((column) => {
                column.width = newWidth
              })
            }}
          >
            <div>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: '2px solid black',
                    backgroundColor: isMergedCell(0, column.id) ? 'lightgray' : 'white', // Adjust styles
                    width: column.width
                  }}
                  key={`header-${column.id}`}
                >
                  <ResizableHeader column={column} />
                </th>
              ))}
            </div>
          </Resizable>
        ))} */}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, rowIndex) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()} key={`row-${row.id}`}>
              {row.cells.map((cell, columnIndex) => (
                <td
                  {...cell.getCellProps()}
                  style={{
                    border: '1px solid black',
                    backgroundColor: isMergedCell(rowIndex, cell.column.id) ? 'lightgray' : 'white' // Adjust styles
                  }}
                  key={`cell-${rowIndex}-${cell.column.id}`}
                >
                  {
                    <EditableCell cell={cell} row={row} column={cell.column} updateData={updateData} />
                  }
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
