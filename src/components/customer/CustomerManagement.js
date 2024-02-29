import React, { useEffect, useState } from 'react'
import Button from '../Button'
import CreateCustomerModal from './CreateCustomerModal'
import httpClientRequest from '../../lib/httpClientRequest'
import { decryptFromStorage } from '../../lib/SecureStorage'
import CustomerTable from './CustomerTable'
const userData = decryptFromStorage('user')
export default function CustomerManagement () {
  const [modal, viewModal] = useState(false)
  const [customerData, setCustomerData] = useState(null)

  useEffect(() => {
    fetchData()
  }, [modal, customerData])

  const fetchData = async () => {
    const result = await httpClientRequest.get(`customer/${userData.company_id}`)
    console.log(result)
    setCustomerData(result.data)
  }

  return (
    <div className='bg-primary w-full h-full'>
      <div className='m-10 gap-2 flex flex-col'>
        {modal && <CreateCustomerModal closeModal={() => viewModal(false)} />}
        <div className='flex justify-between'>
          <Button title="Create Customer" type="Primary" onClick={() => viewModal(true)}/>
          <Button title="Fetch Data" onClick={() => viewModal(!modal)}/>
        </div>
        <div className='divider border-b-2'></div>
        <div className='w-[100rem]'>
          { customerData && <CustomerTable filteredCustomer={customerData}/> }
        </div>
      </div>

    </div>
  )
}
