// ** React Imports
import { useState } from 'react'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Layout Import

import React from 'react'
import StepperQuest from 'src/layouts/components/quest/stepper'
import { getBaseColor, getBaseBorderColor, getBaseTextColor } from 'src/configs/getBackground'

const Quest = () => {
  const auth = useAuth()
  const [selectedTab, setSelectedTab] = useState('journey')

  const handleTabChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTab(event.target.value)
  }

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'journey':
        return (
          <>
            <StepperQuest></StepperQuest>
          </>
        )
      case 'daiy':
        return <></>
    }
  }
  const menu = [
    {
      title: 'journey',
      content: 'Your Journey'
    },
    {
      title: 'daily',
      content: 'Daily Quest'
    }
  ]

  return (
    <section className='relative  h-full min-h-screen z-5 overflow-hidden pb-12 lg:pt-10  lg:pb-[90px]'>
      <div className='container mx-auto rounded-xl bg-white-300 lg:px-10'>
        <div className='w-full'>
          <div className='pt-20'>
            <h1 className='text-5xl font-bold'>Quests</h1>
          </div>
          <div className='flex justify-center w-full pt-5 mt-6 sm:hidden'>
            <select
              id='tabs'
              className='w-full max-w-sm  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              value={selectedTab}
              onChange={handleTabChange}
            >
              <option value='journey'>Your Journey</option>
              <option value='daily'>Daily Quest</option>
            </select>
          </div>
          {auth.user && (
            <div
              className={`justify-start hidden w-full lg:flex lg:pt-10 border-b-2 border-${getBaseColor(
                auth.user?.character
              )}`}
            >
              <div className='text-sm font-medium text-center border-b border-gray-200 dark:text-gray-400 dark:border-gray-700'>
                <ul className='flex flex-wrap -mb-px'>
                  {menu.map((menu, index) => (
                    <li key={index} className='mr-4'>
                      {auth.user && (
                        <button
                          className={`inline-block px-1 py-2  rounded-t-lg ${
                            selectedTab == menu.title
                              ? getBaseTextColor(auth.user?.character) +
                                ' font-bold active border-b-4 text-md ' +
                                getBaseBorderColor(auth.user?.character)
                              : ' text-black-300'
                          }`}
                          onClick={() => setSelectedTab(menu.title)}
                          aria-current={selectedTab === menu.title ? 'page' : undefined}
                        >
                          {menu.content}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className='w-full'>{renderTabContent()}</div>
        </div>
      </div>
    </section>
  )
}

export default Quest
