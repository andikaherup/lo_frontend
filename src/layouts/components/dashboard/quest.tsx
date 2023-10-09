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
      link: '/dashboard?tab=questjourney',
      imageActive: 'assets/icon/dashboard/Journey-Icon-White.png',
      imageNotActive: 'assets/icon/dashboard/Journey-Icon.png'
    },
    // {
    //   title: 'daily',
    //   content: 'Daily Quest',
    //   link: '/dashboard?tab=dailyquest'
    // },
    {
      title: 'dailyreward',
      content: 'Daily Reward',
      link: '/dashboard?tab=dailyreward',
      imageActive: 'assets/icon/dashboard/Daily-Reward-Icon-W.png',
      imageNotActive: 'assets/icon/dashboard/Daily-Reward-Icon.png'
    }
  ]

  return (
    <section className='relative  h-full min-h-screen z-5 overflow-hidden pb-12 px-3 lg:pt-10 pt-5  lg:pb-[90px]'>
      <div className='container pb-5 mx-auto lg:px-10'>
        <div className='w-full'>
          <div className='px-2 pt-5 lg:pt-20'>
            <h1 className='mb-3 text-2xl font-bold lg:text-5xl'>Quests</h1>
          </div>

          {auth.user && (
            <div className={`justify-start  w-full lg:flex lg:pt-10 `}>
              <div className='text-sm font-medium text-center'>
                <ul className='flex flex-wrap '>
                  {menu.map((menu, index) => (
                    <li key={index} className='mr-10'>
                      {auth.user && (
                        <Link href={menu.link}>
                          <button
                            className={` px-16 py-10 flex justify-center items-center font-bold   text-2xl  rounded-t-lg ${
                              selectedTab == menu.title
                                ? getBaseTextColor(auth.user?.character) +
                                  ' active text-white-300 bg-purpleText bg-gradient-to-r from-button1stcolor via-button2ndcolor to-button3rdcolor ' +
                                  getBaseBorderColor(auth.user?.character)
                                : ' text-purpleText bg-white-500'
                            }`}
                            onClick={() => setSelectedTab(menu.title)}
                            aria-current={selectedTab === menu.title ? 'page' : undefined}
                          >
                            {menu.title == 'journey' && (
                              <img
                                src={selectedTab === menu.title ? menu.imageActive : menu.imageNotActive}
                                className='w-12 h-12 mr-2'
                                alt='icon'
                              />
                            )}
                            {menu.title == 'dailyreward' && (
                              <img
                                src={selectedTab === menu.title ? menu.imageActive : menu.imageNotActive}
                                className='w-12 h-12 mr-2'
                                alt='icon'
                              />
                            )}
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

          <div className='w-full bg-white-500'>{renderTabContent()}</div>
        </div>
      </div>
    </section>
  )
}

export default Quest
