// ** React Imports
import { ReactNode } from 'react'

// ** MUI Imports

// import ScrollAnimationWrapper from 'src/layouts/ScrollAnimationWrapper'

// ** Configs

// ** Layout Import
import BlankLayoutLandingPage from 'src/@core/layouts/BlankLayoutLandingPage'

import React from 'react'

const quest = () => {
  return (
    <section className='relative z-5 overflow-hidden bg-skyblue-500 pt-20 pb-12 lg:pt-[120px] lg:pb-[90px]'>
      <div className='container mx-auto'>
        <div className='text-sm font-medium text-center border-b border-gray-200 text-black-500 dark:text-black-500 dark:border-gray-700'>
          <ul className='flex flex-wrap -mb-px'>
            <li className='mr-2'>
              <a
                href='#'
                className='inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              >
                Your Journey
              </a>
            </li>
            <li className='mr-2'>
              <a
                href='#'
                className='inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500'
                aria-current='page'
              >
                Daily Quest
              </a>
            </li>
            {/* <li className='mr-2'>
              <a
                href='#'
                className='inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              >
                Settings
              </a>
            </li>
            <li className='mr-2'>
              <a
                href='#'
                className='inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              >
                Contacts
              </a>
            </li>
            <li>
              <a className='inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-black-500'>
                Disabled
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </section>
  )
}

quest.getLayout = (page: ReactNode) => <BlankLayoutLandingPage>{page}</BlankLayoutLandingPage>

quest.guestGuard = true

export default quest
