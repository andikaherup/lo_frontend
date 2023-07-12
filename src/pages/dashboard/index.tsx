// ** React Imports
import { ReactNode, useState, useEffect } from 'react'

// ** MUI Imports

import Overview from 'src/layouts/components/dashboard/overview'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'

// ** Type
import { characters } from 'src/configs/characterData'

// ** Layout Import
import BlankLayoutLandingPage from 'src/@core/layouts/BlankLayoutLandingPage'

// ** Next Import
import { useRouter } from 'next/router'
import Noresult from 'src/layouts/components/dashboard/noresult'

const Dashboard = () => {
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    auth.setLoading(true)

    if (!auth.user) {
      router.replace('/result')
      auth.setLoading(false)
    } else {
      auth.setLoading(false)
    }
  }, [auth, router]) // Include auth and router in the dependency array

  const [selectedTab, setSelectedTab] = useState('Overview')

  const handleTabChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTab(event.target.value)
  }
  const renderTabContent = () => {
    switch (selectedTab) {
      case 'Overview':
        if (auth.user?.character === '') {
          return <Noresult></Noresult>
        } else {
          const character = characters.find(character => character.name === auth.user?.character)
          if (!character) {
            console.log('here2')

            return <Noresult></Noresult>
          }
          console.log('here3')

          return <Overview character={character} gender={auth.user?.gender || 'male'} />
        }
      case 'Friends':
        return <></>
      case 'Reward':
        return <></>
      case 'Settings':
        return <></>
      default:
        return null
    }
  }

  return (
    <>
      <div
        className={`pt-20 ${characters.find(character => character.name === auth.user?.character)?.background}`}
        id='about'
      >
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
                <li className={`w-full  ${selectedTab === 'Friends' ? 'bg-blue-500' : 'bg-greybackground-300'}`}>
                  <button
                    className='inline-block w-full p-4 outline-none text-textcolorblack-500 hover:text-gray-700 hover:bg-skyblue-500 hover:ring-skyblue-500 focus:ring-2 focus:ring-blue-500 active focus:bg-blue-500 focus:text-white-500 focus:outline-none dark:bg-gray-700 dark:text-white'
                    onClick={() => setSelectedTab('Friends')}
                    aria-current={selectedTab === 'Friends' ? 'page' : undefined}
                  >
                    Friends
                  </button>
                </li>{' '}
                <li className={`w-full  ${selectedTab === 'Reward' ? 'bg-blue-500' : 'bg-greybackground-300'}`}>
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
                    selectedTab === 'Settings' ? 'bg-blue-500' : 'bg-greybackground-300'
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
          <div className='w-full'>{renderTabContent()}</div>
        </div>
      </div>
    </>
  )
}

Dashboard.getLayout = (page: ReactNode) => <BlankLayoutLandingPage>{page}</BlankLayoutLandingPage>

Dashboard.guestGuard = true

export default Dashboard
