import { ReactNode, useEffect, useState } from 'react'

import BlankLayoutLandingPage from 'src/@core/layouts/BlankLayoutLandingPage'

// ** Type
import { characters } from 'src/configs/characterData'
import Badge from '@mui/material/Badge'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'
import ProgressQuest from 'src/layouts/components/header/progressQuest'

// ** Type
import { Archetype } from 'src/context/characterType'

const Setting = () => {
  useEffect(() => {
    const character = characters.find(character => character.name === auth.user?.character)
    setChar(character)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const auth = useAuth()
  const [char, setChar] = useState<Archetype>()

  return (
    <section
      className={`h-full min-h-screen bg-white-300 ${
        characters.find(character => character.name === auth.user?.character)?.background
      }`}
    >
      <div className='max-w-2xl px-4 py-8 mx-auto lg:py-16'>
        <div className='mx-auto mt-6 w-fit'>
          <Badge
            overlap='circular'
            sx={{ ml: 2, cursor: 'pointer' }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
          >
            <img
              alt='userimage'
              src={`/assets/characters/${
                auth.user?.character_level == 0
                  ? auth.user?.gender == 'male'
                    ? char?.lvl0_image_M
                    : char?.lvl0_image_F
                  : auth.user?.gender == 'male'
                  ? char?.lvl1_image_M
                  : char?.lvl1_image_F
              }`}
              className='w-40 h-40'
            />
          </Badge>
        </div>
        <div className='mb-5'>
          <h1 className='text-xl font-bold text-center uppercase text-white-300 '>the {auth.user?.character}</h1>
        </div>
        {auth.user && (
          <div>
            <ProgressQuest user={auth.user}></ProgressQuest>
          </div>
        )}

        <div className='flex items-center justify-between pb-4 mt-5 mb-4 border-b rounded-t sm:mb-5 dark:border-gray-600'>
          <h3 className='text-lg font-semibold text-gray-900 text-white-300'> User Info</h3>
        </div>

        <div className='mt-5'>
          <form action='#'>
            <div className='grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5'>
              <div className='sm:col-span-2'>
                <label htmlFor='name' className='block mb-2 text-sm font-medium text-white-300 dark:text-white'>
                  Name
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                  value={auth.user?.name || ''}
                  placeholder='Type product name'
                  required
                />
              </div>
              <div className='w-full'>
                <label htmlFor='brand' className='block mb-2 text-sm font-medium text-white-300 dark:text-white'>
                  Email
                </label>
                <input
                  type='text'
                  name='brand'
                  id='brand'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                  value={auth.user?.email}
                  placeholder='Product brand'
                  required
                />
              </div>

              <div>
                <label htmlFor='category' className='block mb-2 text-sm font-medium text-white-300 dark:text-white'>
                  Age
                </label>
                <select
                  id='category'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                >
                  <option selected>Child: 0 to 12 years</option>
                  <option value='TV'>Teenager: 13 to 19 years</option>
                  <option value='PC'>Young Adult: 20 to 39 years</option>
                  <option value='GA'>Middle-Aged Adult: 40 to 59 years</option>
                  <option value='senior'>Senior: 60 years and above</option>
                </select>
              </div>
              <div>
                <label htmlFor='item-weight' className='block mb-2 text-sm font-medium text-white-300 dark:text-white'>
                  Gender
                </label>
                <select
                  id='gender'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                >
                  <option selected>Male</option>
                  <option value='TV'>Female</option>
                </select>
              </div>
            </div>
            <div className='flex items-center space-x-4'>
              <button
                type='submit'
                className='text-white bg-blue-500 hover:opacity-80 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              >
                Update Info
              </button>
              {/* <button
                type='button'
                className='text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900'
              >
                <svg
                  className='w-5 h-5 mr-1 -ml-1'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
                Delete
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
Setting.getLayout = (page: ReactNode) => <BlankLayoutLandingPage>{page}</BlankLayoutLandingPage>

Setting.guestGuard = true

export default Setting
