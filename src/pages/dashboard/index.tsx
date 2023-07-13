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
import Friends from 'src/layouts/components/dashboard/friends'
import Quest from 'src/layouts/components/dashboard/quest'
import Reward from 'src/layouts/components/dashboard/reward'

const Dashboard = () => {
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      auth.setLoading(true)

      if (!auth.user) {
        router.replace('/home')
        auth.setLoading(false)
      } else {
        auth.refreshUser()
        auth.setLoading(false)
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Include auth and router in the dependency array

  const [selectedTab, setSelectedTab] = useState('Overview')

  // const handleTabChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedTab(event.target.value)
  // }

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

          return <Overview character={character} gender={auth.user?.gender || 'male'} />
        }
      case 'Friends':
        return <Friends></Friends>
      case 'Reward':
        return <Reward></Reward>
      case 'Quest':
        return <Quest></Quest>
      default:
        return null
    }
  }

  return (
    <>
      <div
        className={`lg:pt-20 pt-10 ${
          characters.find(character => character.name === auth.user?.character)?.background
        }`}
        id='about'
      >
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
            <div className='w-full max-w-md rounded-lg'>
              <ul className='flex text-sm font-medium text-center divide-x divide-gray-200 rounded-lg shadow dark:divide-gray-200 dark:text-gray-400'>
                <li
                  className={`w-full rounded-lg rounded-r-none  ${
                    selectedTab === 'Overview' ? 'bg-blue-500' : 'bg-greybackground-300'
                  }`}
                >
                  <button
                    className={` ${
                      selectedTab === 'Overview' ? 'text-white-500 ' : 'text-textcolorblack-500'
                    } inline-block w-full p-3 rounded-lg rounded-r-none outline-none active:text-green-500  hover:text-gray-700 hover:bg-skyblue-500 focus:ring-2 active:ring-blue-500 active focus:bg-blue-500 focus:text-white-500`}
                    onClick={() => setSelectedTab('Overview')}
                    aria-current={selectedTab === 'Overview' ? 'page' : undefined}
                  >
                    Overview
                  </button>
                </li>
                <li className={`w-full  ${selectedTab === 'Quest' ? 'bg-blue-500' : 'bg-greybackground-300'}`}>
                  <button
                    className={` ${
                      selectedTab === 'Quest' ? 'text-white-500 ' : 'text-textcolorblack-500'
                    } inline-block w-full p-3 outline-none active:text-green-500  hover:text-gray-700 hover:bg-skyblue-500 focus:ring-2 active:ring-blue-500 active focus:bg-blue-500 focus:text-white-500`}
                    onClick={() => setSelectedTab('Quest')}
                    aria-current={selectedTab === 'Quest' ? 'page' : undefined}
                  >
                    Quest
                  </button>
                </li>{' '}
                <li className={`w-full  ${selectedTab === 'Friends' ? 'bg-blue-500' : 'bg-greybackground-300'}`}>
                  <button
                    className={` ${
                      selectedTab === 'Friends' ? 'text-white-500 ' : 'text-textcolorblack-500'
                    } inline-block w-full p-3 outline-none active:text-green-500  hover:text-gray-700 hover:bg-skyblue-500 focus:ring-2 active:ring-blue-500 active focus:bg-blue-500 focus:text-white-500`}
                    onClick={() => setSelectedTab('Friends')}
                    aria-current={selectedTab === 'Friends' ? 'page' : undefined}
                  >
                    Friends
                  </button>
                </li>{' '}
                <li
                  className={`w-full rounded-lg rounded-l-none ${
                    selectedTab === 'Reward' ? 'bg-blue-500' : 'bg-greybackground-300'
                  }`}
                >
                  <button
                    className={` ${
                      selectedTab === 'Reward' ? 'text-white-500 ' : 'text-textcolorblack-500'
                    } inline-block w-full p-3 rounded-lg rounded-l-none outline-none active:text-green-500 text-textcolorblack-500 hover:text-gray-700 hover:bg-skyblue-500 focus:ring-2 active:ring-blue-500 active focus:bg-blue-500 focus:text-white-500`}
                    onClick={() => setSelectedTab('Reward')}
                    aria-current={selectedTab === 'Reward' ? 'page' : undefined}
                  >
                    Reward
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
