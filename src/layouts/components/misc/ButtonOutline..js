import React from 'react'

const ButtonOutline = ({ children }) => {
  return (
    <button className='px-5 py-2 font-medium tracking-wide capitalize transition-all border rounded-l-full rounded-r-full outline-none bg-gradient-to-r from-button1stcolor via-button2ndcolor to-button3rdcolor text-white-500 sm:px-8 hover:opacity-70 hover:text-white-500'>
      {' '}
      {children}
    </button>
  )
}

export default ButtonOutline
