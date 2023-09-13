// ** React Imports
import { useState, useEffect } from 'react'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'

// ** Layout Import

import React from 'react'
import StepperQuest from 'src/layouts/components/quest/stepper'
import { getBaseColor, getBaseBorderColor, getBaseTextColor } from 'src/configs/getBackground'
import Rewards from 'src/layouts/components/daily-rewards/rewards'
import Link from 'next/link'

const Quest = () => {
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.has('tab')) {
        console.log(urlParams.get('tab'))
        switch (urlParams.get('tab')) {
          case 'questjourney':
            setSelectedTab('journey')
            return
          case 'dailyquest':
            setSelectedTab('daily')
            return
          case 'dailyreward':
            setSelectedTab('dailyreward')
            return
          default:
            // if user access the page with /dashboard?tab=random string
            router.replace('/dashboard')
        }
      }
    }
    initAuth()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const auth = useAuth()
  const [selectedTab, setSelectedTab] = useState('journey')

  // const handleTabChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedTab(event.target.value)
  // }

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'journey':
        return (
          <>
            <StepperQuest questType='journey'></StepperQuest>
          </>
        )
      case 'daily':
        return (
          <>
            <StepperQuest questType='daily'></StepperQuest>
          </>
        )
      case 'dailyreward':
        return <Rewards></Rewards>
    }
  }
  const menu = [
    {
      title: 'journey',
      content: 'Your Journey',
      link: '/dashboard?tab=questjourney'
    },
    {
      title: 'daily',
      content: 'Daily Quest',
      link: '/dashboard?tab=dailyquest'
    },
    {
      title: 'dailyreward',
      content: 'Daily Reward',
      link: '/dashboard?tab=dailyreward'
    }
  ]

  return (
    <section className='relative  h-full min-h-screen z-5 overflow-hidden pb-12 px-3 lg:pt-10 pt-5  lg:pb-[90px]'>
      <div className='container px-2 pb-5 mx-auto rounded-xl bg-white-300 lg:px-10'>
        <div className='w-full'>
          <div className='px-2 pt-5 lg:pt-20'>
            <h1 className='mb-3 text-2xl font-bold lg:text-5xl'>Quests</h1>
          </div>

          {auth.user && (
            <div
              className={`justify-start px-2  w-full lg:flex lg:pt-10 border-b-2 border-${getBaseColor(
                auth.user?.character
              )}`}
            >
              <div className='text-sm font-medium text-center border-b border-gray-200 dark:text-gray-400 dark:border-gray-700'>
                <ul className='flex flex-wrap -mb-px'>
                  {menu.map((menu, index) => (
                    <li key={index} className='mr-4'>
                      {auth.user && (
                        <Link href={menu.link}>
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
                        </Link>
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
