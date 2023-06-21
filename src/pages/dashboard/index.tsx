// ** React Imports
import { ReactNode, useState } from 'react'

// ** MUI Imports

import React, { useMemo } from 'react'
import Image from 'next/image'
import ButtonPrimary from 'src/layouts/components/misc/ButtonPrimary'
import { motion } from 'framer-motion'
import getScrollAnimation from 'src/views/pages/utils/getScrollAnimation'
import ScrollAnimationWrapper from 'src/layouts/ScrollAnimationWrapper'

import Overview from 'src/layouts/components/dashboard/overview'
// ** Configs

// ** Layout Import
import BlankLayoutLandingPage from 'src/@core/layouts/BlankLayoutLandingPage'

const Dashboard = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), [])
  const [selectedTab, setSelectedTab] = useState('Overview')

  const handleTabChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTab(event.target.value)
  }
  const renderTabContent = () => {
    switch (selectedTab) {
      case 'Overview':
        return <Overview></Overview>
      case 'Friends':
        return <Overview></Overview>
      case 'Reward':
        return <Overview></Overview>
      case 'Settings':
        return <Overview></Overview>
      default:
        return null
    }
  }

  return (
    <>
      <div className='px-8 mx-auto mt-20 xl:px-16 bg-skyblue-500 ' id='about'>
        <div className='w-full'>
          <div className='flex justify-center w-full pt-5 mt-6 sm:hidden'>
            <select
              id='tabs'
              className='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              value={selectedTab}
              onChange={handleTabChange}
            >
              <option value='Overview'>Overview</option>
              <option value='Friends'>Friends</option>
              <option value='Reward'>Reward</option>
              <option value='Settings'>Settings</option>
            </select>
          </div>
          <div className='flex justify-center w-full lg:pt-10'>
            <div className='w-full max-w-md rounded-lg'>
              <ul className='hidden text-sm font-medium text-center divide-x divide-gray-200 rounded-lg shadow sm:flex dark:divide-gray-200 dark:text-gray-400'>
                <li
                  className={`w-full rounded-lg rounded-r-none ${
                    selectedTab === 'Overview' ? 'bg-blue-500' : 'bg-greybackground-300'
                  }`}
                >
                  <button
                    className='inline-block w-full p-4 rounded-lg rounded-r-none outline-none text-textcolorblack-500 hover:text-gray-700 hover:bg-skyblue-500 hover:ring-skyblue-500 focus:ring-2 focus:ring-blue-500 active focus:bg-blue-500 focus:text-white-500 focus:outline-none dark:bg-gray-700 dark:text-white'
                    onClick={() => setSelectedTab('Overview')}
                    aria-current={selectedTab === 'Overview' ? 'page' : undefined}
                  >
                    Overview
                  </button>
                </li>
                <li className={`w-full  ${selectedTab === 'Overview' ? 'bg-blue-500' : 'bg-greybackground-300'}`}>
                  <button
                    className='inline-block w-full p-4 outline-none text-textcolorblack-500 hover:text-gray-700 hover:bg-skyblue-500 hover:ring-skyblue-500 focus:ring-2 focus:ring-blue-500 active focus:bg-blue-500 focus:text-white-500 focus:outline-none dark:bg-gray-700 dark:text-white'
                    onClick={() => setSelectedTab('Friends')}
                    aria-current={selectedTab === 'Friends' ? 'page' : undefined}
                  >
                    Friends
                  </button>
                </li>{' '}
                <li className={`w-full  ${selectedTab === 'Overview' ? 'bg-blue-500' : 'bg-greybackground-300'}`}>
                  <button
                    className='inline-block w-full p-4 outline-none text-textcolorblack-500 hover:text-gray-700 hover:bg-skyblue-500 hover:ring-skyblue-500 focus:ring-2 focus:ring-blue-500 active focus:bg-blue-500 focus:text-white-500 focus:outline-none dark:bg-gray-700 dark:text-white'
                    onClick={() => setSelectedTab('Reward')}
                    aria-current={selectedTab === 'Reward' ? 'page' : undefined}
                  >
                    Reward
                  </button>
                </li>{' '}
                <li
                  className={`w-full rounded-lg rounded-l-none ${
                    selectedTab === 'Overview' ? 'bg-blue-500' : 'bg-greybackground-300'
                  }`}
                >
                  <button
                    className='inline-block w-full p-4 rounded-lg rounded-l-none outline-none text-textcolorblack-500 hover:text-gray-700 hover:bg-skyblue-500 hover:ring-skyblue-500 focus:ring-2 focus:ring-blue-500 active focus:bg-blue-500 focus:text-white-500 focus:outline-none dark:bg-gray-700 dark:text-white'
                    onClick={() => setSelectedTab('Settings')}
                    aria-current={selectedTab === 'Settings' ? 'page' : undefined}
                  >
                    Settings
                  </button>
                </li>
              </ul>
            </div>
          </div>
          {renderTabContent()}
        </div>
      </div>
    </>
  )
}

Dashboard.getLayout = (page: ReactNode) => <BlankLayoutLandingPage>{page}</BlankLayoutLandingPage>

Dashboard.guestGuard = true

export default Dashboard
