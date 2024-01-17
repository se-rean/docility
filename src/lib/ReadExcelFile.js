import * as XLSX from 'xlsx'

export const ReadExcelData = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result)
      const workbook = XLSX.read(data, { type: 'array', cellStyles: true })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' })

      // Extract cell styles separately
      const cellStyles = {}
      const merges = sheet['!merges'] || []
      for (const cellAddress in sheet) {
        if (cellAddress !== '!ref') {
          const cell = sheet[cellAddress]
          if (cell && cell.s) {
            cellStyles[cellAddress] = cell.s
          }

          // Handle merged cells
          for (let i = 0; i < merges.length; i++) {
            const mergeRange = merges[i]
            if (
              mergeRange.s.c <= cell.c &&
              cell.c <= mergeRange.e.c &&
              mergeRange.s.r <= cell.r &&
              cell.r <= mergeRange.e.r
            ) {
              // Apply styles to all cells in merged range
              for (let j = mergeRange.s.r; j <= mergeRange.e.r; j++) {
                for (let k = mergeRange.s.c; k <= mergeRange.e.c; k++) {
                  const mergedCellAddress = XLSX.utils.encode_cell({ r: j, c: k })
                  cellStyles[mergedCellAddress] = cellStyles[cellAddress]
                }
              }
            }
          }
        }
      }

      resolve({ jsonData, cellStyles })
    }
    reader.readAsArrayBuffer(file)
  })
}
