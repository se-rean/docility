import React, { useState, useEffect } from 'react'

const DivisionEntry = ({ isUpdate, divisionData, onValuesChange }) => {
  const initialFields = [
    { name: 'department_name', label: 'Department', value: '' },
    { name: 'department_responsible_person', label: 'Department Responsible person', value: '' },
    { name: 'staff', label: 'Department Number of Staff', value: '' }
  ]

  const [divs, setDivs] = useState([{ id: 1, fields: initialFields }]) // Initial array with one div
  const [nextDivId, setNextDivId] = useState(2) // Initial value for the next div id

  const handleAddDiv = () => {
    setDivs(prevDivs => [...prevDivs, { id: nextDivId, fields: initialFields }])
    setNextDivId(prevNextDivId => prevNextDivId + 1)
  }

  const handleRemoveDiv = (divIdToRemove) => {
    setDivs(prevDivs => prevDivs.filter(div => div.id !== divIdToRemove))
    updateValue()
  }

  const handleFieldChange = (divId, fieldName, value) => {
    setDivs(prevDivs => prevDivs.map(div =>
      div.id === divId
        ? {
          ...div,
          fields: div.fields.map(field =>
            field.name === fieldName ? { ...field, value } : field
          )
        }
        : div
    ))

    updateValue()
  }

  useEffect(() => {
    // Reset fields when the parent container form is submitted

    if (isUpdate === true) {
      let divData = []
      divisionData.forEach((element, index) => {
        console.log(divisionData)
        console.log(initialFields)
        const fields = [...initialFields]
        fields.forEach(item => {
          item.value = element[item.name]
        })
        divData = [...divData, { id: index, fields }]
        console.log('fields', fields)
        console.log(`divdata ${index}`, divData)
        setNextDivId(prevNextDivId => prevNextDivId + 1)
      })
      // setDivs(divData)
      setDivs(divData)
      console.log(divs)
      updateValue()
    }
  }, [])

  const updateValue = () => {
    const allValues = divs.reduce((acc, cur) => {
      return { ...acc, [cur.id]: cur.fields }
    }, {})
    onValuesChange(allValues)
  }

  return (
    <div className='flex flex-col gap-1  bg-secondary border-2 p-1'>
      {divs.map(({ id, fields }, index) => (
        <div key={id} className="grid md:grid-cols-1 md:gap-6 mt-5  ">
          <div className="relative z-0 w-full pb-4 group bg-primary p-5">
            <div className='flex justify-between pb-4'>
              <h1>Department {nextDivId}</h1>
              {
                index > 0 && (
                  <button className='bg-red-500 hover:bg-accent text-primary hover:text-textPrimary border rounded-md px-[20px] py-[5px] ' onClick={() => handleRemoveDiv(id)}>Remove</button>
                )
              }
            </div>
            <div className=''>
              {fields.map(field => (
                <div key={field.name} className="mb-4 relative z-0">
                  {field.options
                    ? (
                      <>
                        <label htmlFor={field.name} className="absolute text-sm text-textAccent dark:text-green-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">{field.label}</label>
                        <select
                          id={field.name}
                          value={field.value}
                          onChange={(e) => handleFieldChange(id, field.name, e.target.value)}
                          className="mt-1 p-2 border rounded w-full"
                          required
                        >
                          {field.options.map((option) => (
                            <option key={option.name} value={option.name}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </>
                    )
                    : (
                      <div>
                        <div className="relative z-0">
                          <input
                            value={field.value}
                            onChange={(e) => handleFieldChange(id, field.name, e.target.value)}
                            type="text"
                            id={field.name}
                            aria-describedby="standard_success_help"
                            className="block py-2.5 px-0 w-full text-sm text-textAccent bg-transparent border-0 border-b-2 border-textAccent appearance-none dark:text-white dark:border-green-500 dark:focus:border-green-500 focus:outline-none focus:ring-0 peer"
                            placeholder=" "
                          />
                          <label htmlFor={field.name} className="absolute text-sm text-textAccent dark:text-green-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">{field.label}</label>
                        </div>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      <a className='bg-secondary hover:bg-accent text-gray-600 hover:text-textPrimary border rounded-md px-[20px] py-[5px] w-[135px] cursor-pointer' onClick={handleAddDiv}>New Division</a>
    </div>
  )
}

export default DivisionEntry
