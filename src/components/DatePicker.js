// DatePicker.js
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const MyDatePicker = ({ value }) => {
  const [selectedDate, setSelectedDate] = useState(null)

  const handleDateChange = (date) => {
    setSelectedDate(date)
    value((date))
  }

  return (
    <div className="flex items-center justify-center">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => handleDateChange(date)}
        dateFormat="MMMM d, yyyy"
        className="p-2 border border-gray-300 rounded-md"
      />
    </div>
  )
}

export default MyDatePicker
