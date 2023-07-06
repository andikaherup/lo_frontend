// ** React Imports
// import { ReactNode, useState } from 'react'

// ** MUI Imports
// ** MUI Imports
import Link from 'next/link'
import React from 'react'

const Noresult = () => {
  return (
    <div className='flex items-center justify-center h-screen max-h-fit'>
      <div className='flex flex-col items-center '>
        <h1 className={`text-center text-lg font-bold lg:mb-4 lg:text-md text-black-300`}>Level Zero</h1>
        <h1 className='mb-4 text-3xl font-bold text-center text-black-300'>You don't have any Character Yet</h1>
        <Link href='/personality-test' aria-current='page'>
          <button
            className={`px-5 lg:px-10 py-2 text-black-300  outline outline-black-300 transition hover:-translate-y-1 hover:scale-110 lg:text-xl font-semibold flex rounded-full`}
          >
            Find Your Character
            <svg
              aria-hidden='true'
              className='w-5 h-5 ml-2 -mr-1'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                clipRule='evenodd'
              ></path>
            </svg>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Noresult
