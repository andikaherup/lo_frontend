import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { useAuth } from 'src/hooks/useAuth'

// ** Type

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

interface RefProps {
  open: boolean
  close: () => void
}

const PopupLevelup = (props: RefProps) => {
  const auth = useAuth()

  const { open, close } = props

  const onSkip = () => {
    axios
      .put(
        authConfig.editUserEndpoint,
        { has_just_leveled_up: false },
        {
          headers: { Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)! }
        }
      )
      .then(() => {
        auth.refreshUser()
        close()
      })
      .catch(err => {
        if (err.response.data) {
          if (err.response.data.data) {
          }
        }
      })
  }
  function closeModal() {
    console.log(' ')
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={closeModal}>
        <div className='fixed inset-0 bg-gray-500 opacity-50' aria-hidden='true' />
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 w-full overflow-y-auto'>
          <div className='flex items-center justify-center min-h-full p-2 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel
                className={`w-full max-w-3xl  overflow-hidden text-left align-middle transition-all transform shadow-xl  rounded-2xl`}
              >
                <div className='w-full max-w-3xl px-5 pt-2 mx-auto mt-5'>
                  <button onClick={onSkip}>
                    <img
                      src={`/assets/icon/levelup/${auth.user?.character}-${
                        auth.user?.gender == 'male' ? 'B' : 'G'
                      }-Level-Up-Popup.jpg`}
                      alt='whole popup'
                    ></img>
                  </button>
                  {/* <div className='mt-8'>
                    <div className='grid items-center grid-cols-2 gap-5'>
                      <div
                        className={`${getBaseLightTextColor(
                          auth.user?.character || 'Hero'
                        )} rounded-3xl py-5 transition-shadow shadow-gray-400 drop-shadow-2xl shadow-xl bg-white-300`}
                      >
                        <h1 className='text-2xl text-center'>CONGRATULATIONS!</h1>
                        <h1 className='text-lg text-center'>You are now at level {auth.user?.character_level}</h1>
                        <div
                          className='flex items-center justify-center mt-5 '
                          x-data='{ circumference: 50 * 2 * Math.PI, percent: 80 }'
                        >
                          <div className='flex items-center justify-center overflow-hidden rounded-full'>
                            <svg className='w-32 h-32 transform translate-x-1 translate-y-1' aria-hidden='true'>
                              <circle
                                className='text-gray-300'
                                strokeWidth='10'
                                stroke='currentColor'
                                fill='transparent'
                                r='50'
                                cx='60'
                                cy='60'
                              />
                              <circle
                                className={`${getBaseTextColor(auth.user?.character || 'Hero')} transition`}
                                strokeWidth='15'
                                strokeDasharray={circumference}
                                strokeDashoffset={circumference - (percent / 100) * circumference}
                                strokeLinecap='round'
                                stroke='currentColor'
                                fill='transparent'
                                r='50'
                                cx='60'
                                cy='60'
                              />
                            </svg>
                            <span className='absolute text-2xl text-black-300'>{`${percent}%`}</span>
                          </div>
                        </div>

                        <h1
                          className={`${getBaseLightTextColor(
                            auth.user?.character || 'Hero'
                          )} text-2xl text-center font-bold mt-3 `}
                        >
                          Conquer more <br /> quest to level up!
                        </h1>
                      </div>
                      <img
                        src={`/assets/characters/pod${
                          auth.user?.character_level == 0
                            ? auth.user.gender == 'male'
                              ? char?.lvl0_image_M
                              : char?.lvl0_image_F
                            : auth.user?.gender == 'male'
                            ? char?.lvl1_image_M
                            : char?.lvl1_image_F
                        }`}
                        alt={`Image`}
                        className={`object-scale-down `}
                      />
                    </div>
                    <div className='flex justify-center w-full mt-5 mb-10'>
                      <button
                        className='w-1/4 p-4 font-medium tracking-wide capitalize transition-all bg-blue-500 border rounded-l-full rounded-r-full outline-none text-white-500 sm:px-8 op hover:opacity-70 hover:text-white-500 '
                        onClick={onSkip}
                      >
                        Continue
                      </button>
                    </div>
                  </div> */}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default PopupLevelup
