import React, { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'

<<<<<<< HEAD
<<<<<<< HEAD
import { useAuth } from 'src/hooks/useAuth'

// ** Type
import { Archetype } from 'src/context/characterType'

// ** Axios
import axios from 'axios'
import { characters } from 'src/configs/characterData'
=======
// ** MUI Imports
// ** Hooks

// ** MUI Imports
// ** Hooks Import
=======
>>>>>>> 58dbe8e (update to deploy)
import { useAuth } from 'src/hooks/useAuth'

// ** Type
import { Archetype } from 'src/context/characterType'

// ** Axios
import axios from 'axios'
<<<<<<< HEAD
>>>>>>> e72a04a (done implement quest level 1)
=======
import { characters } from 'src/configs/characterData'
>>>>>>> 58dbe8e (update to deploy)

// ** Config
import authConfig from 'src/configs/auth'

<<<<<<< HEAD
<<<<<<< HEAD
import { getBaseTextColor, getBaseLightTextColor } from 'src/configs/getBackground'

=======
>>>>>>> e72a04a (done implement quest level 1)
=======
import { getBaseTextColor, getBaseLightTextColor } from 'src/configs/getBackground'

>>>>>>> 58dbe8e (update to deploy)
interface RefProps {
  open: boolean
  close: () => void
}

const PopupLevelup = (props: RefProps) => {
  const auth = useAuth()

  const { open, close } = props
<<<<<<< HEAD
<<<<<<< HEAD

  const [char, setChar] = useState<Archetype>()

  useEffect(() => {
    const myCharacter = characters.find(character => character.name === auth.user?.character)
    setChar(myCharacter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const circumference = 50 * 2 * Math.PI
  const percent = 100
=======
  const [error, setError] = useState<string>('')
=======
>>>>>>> 58dbe8e (update to deploy)

  const [char, setChar] = useState<Archetype>()

  useEffect(() => {
    const myCharacter = characters.find(character => character.name === auth.user?.character)
    setChar(myCharacter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

<<<<<<< HEAD
  const onSubmit = () => {
    setError('')
  }
>>>>>>> e72a04a (done implement quest level 1)
=======
  const circumference = 50 * 2 * Math.PI
  const percent = 100
>>>>>>> 58dbe8e (update to deploy)

  const onSkip = () => {
    axios
      .put(
        authConfig.editUserEndpoint,
<<<<<<< HEAD
<<<<<<< HEAD
        { has_just_leveled_up: false },
=======
        { is_new_user: false },
>>>>>>> e72a04a (done implement quest level 1)
=======
        { has_just_leveled_up: false },
>>>>>>> 58dbe8e (update to deploy)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
            setError(err.response.data.data)
>>>>>>> e72a04a (done implement quest level 1)
=======
>>>>>>> 58dbe8e (update to deploy)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 58dbe8e (update to deploy)
              <Dialog.Panel
                className={`w-full max-w-3xl px-10 pt-5 overflow-hidden text-left align-middle transition-all transform shadow-xl ${
                  characters.find(character => character.name === auth.user?.character)?.background
                } rounded-2xl`}
              >
<<<<<<< HEAD
                <Dialog.Title
                  as='h1'
                  className='mt-10 text-3xl font-medium leading-6 text-center text-textcolorblack-300'
                ></Dialog.Title>

                <div className='w-full max-w-3xl px-5 pt-2 mx-auto mt-5'>
                  <div className='mt-8'>
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
=======
              <Dialog.Panel className='w-full max-w-xl px-10 pt-5 overflow-hidden text-left align-middle transition-all transform shadow-xl bg-white-500 rounded-2xl'>
=======
>>>>>>> 58dbe8e (update to deploy)
                <Dialog.Title
                  as='h1'
                  className='mt-10 text-3xl font-medium leading-6 text-center text-textcolorblack-300'
                ></Dialog.Title>

                <div className='w-full max-w-3xl px-5 pt-2 mx-auto mt-5'>
                  <div className='mt-8'>
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
<<<<<<< HEAD
>>>>>>> e72a04a (done implement quest level 1)
=======
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
>>>>>>> 58dbe8e (update to deploy)
                    </div>
                  </div>
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
