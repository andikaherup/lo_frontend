// ** React Imports
import { ReactNode, useState, useEffect } from 'react'

// ** MUI Imports

import Overview from 'src/layouts/components/dashboard/overview'
import Icon from 'src/@core/components/icon'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'
import Link from 'next/link'

// ** Type
import { characters } from 'src/configs/characterData'

// ** Layout Import
import BlankLayoutLandingPage from 'src/@core/layouts/BlankLayoutLandingPage'

// ** Next Import
import { useRouter } from 'next/router'
import Noresult from 'src/layouts/components/dashboard/noresult'
import Friends from 'src/layouts/components/dashboard/friends'
import Quest from 'src/layouts/components/dashboard/quest'
import Reward from 'src/layouts/components/dashboard/reward'
import DailyRewardFloat from 'src/layouts/components/daily-rewards/dailyrewardfloat'

const Dashboard = () => {
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.has('tab')) {
        switch (urlParams.get('tab')) {
          case 'friends':
            setSelectedTab('Friends')

            return
          case 'reward':
            setSelectedTab('Reward')

            return
          case 'questjourney':
          case 'dailyquest':
          case 'dailyreward':
            setSelectedTab('Quest')

            return
          default:
            // if user access the page with /dashboard?tab=random string
            router.replace('/dashboard')
        }
      }
      auth.setLoading(true)
      if (!auth.user) {
        router.replace('/')
        auth.setLoading(false)
      } else {
        auth.refreshUser()
        auth.setLoading(false)
      }
    }
    initAuth()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  const [selectedTab, setSelectedTab] = useState('Overview')

  // const handleTabChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedTab(event.target.value)
  // }

  const changeTabs = (val: string) => {
    setSelectedTab(val)
  }

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'Overview':
        if (auth.user?.character === '') {
          return <Noresult></Noresult>
        } else {
          const character = characters.find(character => character.name === auth.user?.character)
          if (!character) {
            return <Noresult></Noresult>
          }

          return (
            <Overview
              character={character}
              gender={auth.user?.gender || 'male'}
              changeTab={(val: string) => changeTabs(val)}
            />
          )
        }
      case 'Friends':
        return <Friends></Friends>
      case 'Reward':
        if (auth.user?.character === '') {
          return <Noresult></Noresult>
        } else {
          const character = characters.find(character => character.name === auth.user?.character)
          if (!character) {
            return <Noresult></Noresult>
          }

          return <Reward isPublic={false}></Reward>
        }
      case 'Quest':
        if (auth.user?.character === '') {
          return <Noresult></Noresult>
        } else {
          const character = characters.find(character => character.name === auth.user?.character)
          if (!character) {
            return <Noresult></Noresult>
          }

          return <Quest></Quest>
        }
      default:
        return null
    }
  }

  return (
    <div className='pt-10'>
      <div className={`lg:pt-20 pt-10 bg-newUIbackground`} id='about'>
        <div className='w-full'>
          {/* <div className='flex justify-center w-full pt-5 mt-6 sm:hidden'>
            <select
              id='tabs'
              className='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              value={selectedTab}
              onChange={handleTabChange}
            >
              <option value='Overview'>Overview</option>
              <option value='Quest'>Quest</option>

              <option value='Friends'>Friends</option>
              <option value='Reward'>Reward</option>
            </select>
          </div> */}

          <div className='flex justify-center w-full px-4 pt-10 lg:px-1'>
            <div className='w-full lg:px-20 rounded-2xl'>
              <ul className='flex text-sm font-bold text-center divide-x divide-gray-200 shadow rounded-2xl dark:divide-gray-200 dark:text-gray-400'>
                <li
                  className={`w-full  rounded-2xl rounded-r-none  ${
                    selectedTab === 'Overview'
                      ? 'bg-gradient-to-r from-button1stcolor via-button2ndcolor to-button3rdcolor'
                      : 'bg-greybackground-300'
                  }`}
                >
                  <Link href={`/dashboard`}>
                    <button
                      className={` ${
                        selectedTab === 'Overview' ? 'text-white-500 ' : 'text-black-300'
                      } inline-block w-full p-3  rounded-2xl rounded-r-none outline-none active:text-green-500  hover:text-gray-700     active focus:text-white-500`}
                      onClick={() => setSelectedTab('Overview')}
                      aria-current={selectedTab === 'Overview' ? 'page' : undefined}
                    >
                      Overview
                    </button>
                  </Link>
                </li>
                <li
                  className={`w-full  ${
                    selectedTab === 'Quest'
                      ? 'bg-gradient-to-r from-button1stcolor via-button2ndcolor to-button3rdcolor'
                      : 'bg-greybackground-300'
                  }`}
                >
                  <Link href={`/dashboard?tab=quest`}>
                    <button
                      className={` ${
                        selectedTab === 'Quest' ? 'text-white-500 ' : 'text-black-300'
                      } inline-block w-full p-3 outline-none active:text-green-500  hover:text-gray-700    active  focus:text-white-500`}
                      onClick={() => setSelectedTab('Quest')}
                      aria-current={selectedTab === 'Quest' ? 'page' : undefined}
                    >
                      Quest
                    </button>
                  </Link>
                </li>{' '}
                <li
                  className={`w-full  ${
                    selectedTab === 'Friends'
                      ? 'bg-gradient-to-r from-button1stcolor via-button2ndcolor to-button3rdcolor'
                      : 'bg-greybackground-300'
                  }`}
                >
                  <Link href={`/dashboard?tab=friends`}>
                    <button
                      className={` ${
                        selectedTab === 'Friends' ? 'text-white-500 ' : 'text-black-300'
                      } inline-block w-full p-3 outline-none active:text-green-500  hover:text-gray-700    active  focus:text-white-500`}
                      onClick={() => setSelectedTab('Friends')}
                      aria-current={selectedTab === 'Friends' ? 'page' : undefined}
                    >
                      Friends
                    </button>
                  </Link>
                </li>{' '}
                <li
                  className={`w-full  rounded-2xl rounded-l-none ${
                    selectedTab === 'Reward'
                      ? 'bg-gradient-to-r from-button1stcolor via-button2ndcolor to-button3rdcolor'
                      : 'bg-greybackground-300'
                  }`}
                >
                  <Link href={`/dashboard?tab=reward`}>
                    <button
                      className={` ${
                        selectedTab === 'Reward' ? 'text-white-500 ' : 'text-black-300'
                      } flex justify-center items-center w-full p-3  rounded-2xl rounded-l-none outline-none active:text-green-500 text-textcolorblack-500 hover:text-gray-700    active focus:text-white-500`}
                      onClick={() => setSelectedTab('Reward')}
                      aria-current={selectedTab === 'Reward' ? 'page' : undefined}
                    >
                      <Icon icon='mdi:cart-variant' fontSize={20} />
                      Shop
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className='w-full'>{renderTabContent()}</div>

          <DailyRewardFloat />
        </div>
      </div>
    </div>
  )
}

Dashboard.getLayout = (page: ReactNode) => <BlankLayoutLandingPage>{page}</BlankLayoutLandingPage>

Dashboard.guestGuard = true

export default Dashboard
