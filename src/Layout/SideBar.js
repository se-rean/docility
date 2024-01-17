// src/components/ToggleableSidebar.js
import DarkModeToggle from '../components/DarkModeToggle'
import React, { useState } from 'react'
import { Transition } from 'react-transition-group'
import home from '../assets/home.svg'
import customer from '../assets/customer.svg'
import user from '../assets/user.svg'
import company from '../assets/company.svg'
import compliance from '../assets/compliance.svg'
import documents from '../assets/documents.svg'
import risk from '../assets/risk.svg'
import supplier from '../assets/supplier.svg'

const Sidebar = ({ isOpen, onClose, onSelect }) => {
  const Menu = [
    { name: 'home', label: 'Home', icon: home },
    { name: 'category', label: 'Manage' }, // for creating menu category note: change label
    { name: 'customer', label: 'Customer', icon: customer },
    { name: 'user', label: 'User', icon: user },
    { name: 'company', label: 'Company', icon: company },
    { name: 'compliance', label: 'Compliance', icon: compliance },
    { name: 'Themeplates', label: 'Themeplates', icon: documents },
    { name: 'risk', label: 'Risk', icon: risk },
    { name: 'supplier', label: 'Supplier', icon: supplier }
  ]

  const [selectedItem, setSelectedItem] = useState('Home')

  const duration = 300

  const defaultStyle = {
    transition: `width ${duration}ms ease-in-out`,
    width: isOpen ? '220px' : '120px'
  }

  const transitionStyles = {
    entering: { width: '120px' },
    entered: { width: '220px' },
    exiting: { width: '120px' },
    exited: { width: '120px' }
  }

  const handleOnSelect = (args) => {
    onSelect(args)
    setSelectedItem(args)
  }

  return (
    <Transition in={isOpen} timeout={duration}>
      {(state) => (
        <div
          style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}
          className="bg-accent text-white  h-full flex flex-col gap-4"
        >
          <div
            className="w-fullh-full overflow-hidden flex flex-1 flex-col gap-4 "
          >
            <img
              alt=''
              // onClick={onClose}
              className="text-2xl font-bold mb-4 pt-[30px] px-[38px]"
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuiv8OnGDFr37sFZasBKlRrCZm46guLppTFo38z01XKQ&s'
            />
            <ul className='pt-[30px] px-[40px] gap-4 flex flex-col overflow-auto scrollbar w-full'>
              {
                Menu.map((item, index) => {
                  return item.name === 'category'
                    ? (<p className='text-gray-400 text-sm w-full mt-5 border-b my-4' key={item.name} >{item.label}</p>)
                    : (
                      <div onClick={() => handleOnSelect(item.label)} className={`flex justify-start items-start gap-2 cursor-pointer mb-2 hover:underline hover:text-md rounded-[38.05px] text-left p-2 hover:text-textPrimary w-full hover:bg-textBackground ${selectedItem === item.label ? 'bg-textBackground text-textPrimary' : 'text-textSecondary '}`}>
                        { item.icon && <img className='w-7 h-7' src={item?.icon} /> }
                        <li
                          key={item.name}
                        >
                          {item.label}
                        </li></div>
                    )
                })
              }
            </ul>
          </div>

          <div className='mt-10'>
            {/* <DarkModeToggle /> */}
            <h1 className='text-center text-textPrimary text-sm'>@{new Date(Date.now()).getFullYear()} v.1.0.0.1</h1>
          </div>
        </div>
      )}
    </Transition>
  )
}

export default Sidebar
