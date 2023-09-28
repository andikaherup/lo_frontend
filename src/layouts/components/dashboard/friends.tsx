// ** React Imports
import { useState, Fragment, useEffect } from 'react'

// ** MUI Imports
// ** MUI Imports

import React from 'react'
import { Dialog, Transition } from '@headlessui/react'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { yupResolver } = require('@hookform/resolvers/yup')

// ** Configs
import contentConfig from 'src/configs/content'

// ** Axios
import axios from 'axios'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import FormControl from '@mui/material/FormControl'
import toast from 'react-hot-toast'

// ** Context
import { useAuth } from 'src/hooks/useAuth'

const schema = yup.object().shape({
  email: yup.string().email().required(),
  message: yup.string().min(5).required()
})

const guessSchema = yup.object().shape({
  email: yup.string().email().required(),
  character: yup.string().required()
})

const defaultValues = {
  email: '',
  message:
    "I recently tried out this amazing personality test and thought you might be interested too! Why not give it a shot and then we can compare our results? It's completely free and will only take about 10 minutes of your time. Thanks!"
}
const defaultGuessValues = {
  email: '',
  character: ''
}

const similarArray = ['Hero', 'Magician', 'Rebel', 'Oracle', 'Creator', 'Ruler', 'Synergist', 'Protector']

interface FormData {
  email: string
  message: string
}
interface Guess {
  email: string
  character: string
}

const Friends = () => {
  const auth = useAuth()

  useEffect(() => {
    if (auth.user?.referral_code) {
      setPersonalLink('https://thel0.com/invitation/' + auth.user.referral_code)
    }
  }, [auth])

  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [personalLink, setPersonalLink] = useState('https://thel0.com/invitation/')

  const { control: accountControl, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const {
    control: guessControl,
    handleSubmit: handleGuessSubmit,
    formState: { errors: guessError },
    reset: guessReset
  } = useForm({
    defaultValues: defaultGuessValues,
    resolver: yupResolver(guessSchema)
  })

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(personalLink)
    toast.success('Copied to clipboard')
  }

  const handleCopyCode = () => {
    if (auth.user?.referral_code) {
      navigator.clipboard.writeText(auth.user?.referral_code)
      toast.success('Copied to clipboard')

      // Reset the "Copied" state after 2 seconds
    }
  }
  function closeModal() {
    setIsOpen(false)
  }

  const onFormSubmit = async (value: Guess) => {
    setLoading(true)
    const payload = {
      email_to_invite: value.email,
      character_prediction: value.character
    }

    axios
      .post(contentConfig.submitEmail, payload, {
        headers: { Authorization: 'Bearer ' + window.localStorage.getItem(contentConfig.storageTokenKeyName)! }
      })
      .then(async () => {
        guessReset()
        toast.success('Mail sent!')
        setLoading(false)
      })
      .catch(err => {
        if (err.response.data) {
          if (err.response.data.data) {
            toast.error(err.response.data.data)
          }
        }
        setLoading(false)
      })
  }

  // function openModal() {
  //   setIsOpen(true)
  // }

  const onSubmit = async (data: FormData) => {
    const { email } = data
    const payload = {
      email_to_invite: email
    }

    axios
      .post(contentConfig.submitEmail, payload, {
        headers: { Authorization: 'Bearer ' + window.localStorage.getItem(contentConfig.storageTokenKeyName)! }
      })
      .then(async () => {
        defaultValues
        toast.success('Mail sent!')
      })
      .catch(err => {
        if (err.response.data) {
          if (err.response.data.data) {
            toast.error(err.response.data.data)
          }
        }
      })

    closeModal()
  }

  return (
    <div className='h-full lg:h-screen lg:px-20'>
      <div>
        <div className='flex flex-col items-center px-10 mt-10 lg:items-start'>
          <h1 className={`text-center lg:text-5xl text-3xl font-bold lg:mb-4 lg:text-md text-white-300`}>Friends</h1>
          {auth.user?.friend_sign_ups == 0 && (
            <h1 className='mb-4 font-bold text-center lg:text-lg text-md text-white-300'>
              You don’t have any friends here yet. Why not invite a few?
            </h1>
          )}
        </div>
        {/* {auth.user && (
          <div className='grid grid-cols-1 gap-4 px-3 pb-20 mt-5 lg:pb-0 sm:grid-cols-12'>
            <div className='px-10 py-10 rounded-md sm:col-start-1 sm:col-end-8 bg-white-300'>
              <div className='px-3 py-2 bg-referralYellow'>
                <span className='text-lg font-bold text-white-300'>
                  Invite 3 Friends to take the LO Personality Test
                </span>
              </div>
              <div className='flex justify-between w-full mt-10 sm:flex-row '>
                <div className='items-center justify-start hidden mr-4 lg:flex'>
                  <span className='text-xl font-bold text-black-300'>Rewards</span>
                </div>
                <div className='flex items-center justify-start mr-4'>
                  <div className='hidden lg:flex'>
                    {auth.user?.friend_sign_ups >= 1 && (
                      <span
                        className={`inline-flex items-center justify-center w-8 h-8 mr-2 text-sm font-semibold text-gray-800  rounded-full ring-1 ring-black-300 `}
                      >
                        <svg
                          className='w-4 h-4 text-gray-800 dark:text-white'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path d='M15.077.019a4.658 4.658 0 0 0-4.083 4.714V7H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-1.006V4.68a2.624 2.624 0 0 1 2.271-2.67 2.5 2.5 0 0 1 2.729 2.49V8a1 1 0 0 0 2 0V4.5A4.505 4.505 0 0 0 15.077.019ZM9 15.167a1 1 0 1 1-2 0v-3a1 1 0 1 1 2 0v3Z' />
                        </svg>
                      </span>
                    )}
                    {auth.user?.friend_sign_ups < 1 && (
                      <span className='inline-flex items-center justify-center w-8 h-8 mr-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-full ring-1 ring-black-300 dark:bg-gray-700 dark:text-gray-300'>
                        <svg
                          className='w-4 h-4 text-gray-800 dark:text-white'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='currentColor'
                          viewBox='0 0 16 20'
                        >
                          <path d='M14 7h-1.5V4.5a4.5 4.5 0 1 0-9 0V7H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-5 8a1 1 0 1 1-2 0v-3a1 1 0 1 1 2 0v3Zm1.5-8h-5V4.5a2.5 2.5 0 1 1 5 0V7Z' />
                        </svg>
                      </span>
                    )}
                  </div>
                  <div className='flex flex-col items-center justify-center pl-3 lg:flex-row'>
                    <img alt='img' src='/assets/icon/medal.png'></img>
                    <span className='pt-2 text-black-300'>+50</span>
                  </div>
                </div>
                <div className='flex items-center justify-start mr-4'>
                  <div className='hidden lg:flex'>
                    {auth.user?.friend_sign_ups >= 2 && (
                      <span
                        className={`inline-flex items-center justify-center w-8 h-8 mr-2 text-sm font-semibold text-gray-800  rounded-full ring-1 ring-black-300 `}
                      >
                        <svg
                          className='w-4 h-4 text-gray-800 dark:text-white'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path d='M15.077.019a4.658 4.658 0 0 0-4.083 4.714V7H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-1.006V4.68a2.624 2.624 0 0 1 2.271-2.67 2.5 2.5 0 0 1 2.729 2.49V8a1 1 0 0 0 2 0V4.5A4.505 4.505 0 0 0 15.077.019ZM9 15.167a1 1 0 1 1-2 0v-3a1 1 0 1 1 2 0v3Z' />
                        </svg>
                      </span>
                    )}
                    {auth.user?.friend_sign_ups < 2 && (
                      <span className='inline-flex items-center justify-center w-8 h-8 mr-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-full ring-1 ring-black-300 dark:bg-gray-700 dark:text-gray-300'>
                        <svg
                          className='w-4 h-4 text-gray-800 dark:text-white'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='currentColor'
                          viewBox='0 0 16 20'
                        >
                          <path d='M14 7h-1.5V4.5a4.5 4.5 0 1 0-9 0V7H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-5 8a1 1 0 1 1-2 0v-3a1 1 0 1 1 2 0v3Zm1.5-8h-5V4.5a2.5 2.5 0 1 1 5 0V7Z' />
                        </svg>
                      </span>
                    )}
                  </div>
                  <div className='flex flex-col items-center justify-center pl-3 lg:flex-row'>
                    <img alt='img' src='/assets/icon/medal.png'></img>
                    <span className='pt-2 text-black-300'>+50</span>
                  </div>
                </div>
                <div className='flex items-center justify-start'>
                  <div className='hidden lg:flex'>
                    {auth.user?.friend_sign_ups >= 3 && (
                      <span
                        className={`inline-flex items-center justify-center w-8 h-8 mr-2 text-sm font-semibold text-gray-800  rounded-full ring-1 ring-black-300 `}
                      >
                        <svg
                          className='w-4 h-4 text-gray-800 dark:text-white'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path d='M15.077.019a4.658 4.658 0 0 0-4.083 4.714V7H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-1.006V4.68a2.624 2.624 0 0 1 2.271-2.67 2.5 2.5 0 0 1 2.729 2.49V8a1 1 0 0 0 2 0V4.5A4.505 4.505 0 0 0 15.077.019ZM9 15.167a1 1 0 1 1-2 0v-3a1 1 0 1 1 2 0v3Z' />
                        </svg>
                      </span>
                    )}
                    {auth.user?.friend_sign_ups < 3 && (
                      <span className='inline-flex items-center justify-center w-8 h-8 mr-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-full ring-1 ring-black-300 dark:bg-gray-700 dark:text-gray-300'>
                        <svg
                          className='w-4 h-4 text-gray-800 dark:text-white'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='currentColor'
                          viewBox='0 0 16 20'
                        >
                          <path d='M14 7h-1.5V4.5a4.5 4.5 0 1 0-9 0V7H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-5 8a1 1 0 1 1-2 0v-3a1 1 0 1 1 2 0v3Zm1.5-8h-5V4.5a2.5 2.5 0 1 1 5 0V7Z' />
                        </svg>
                      </span>
                    )}
                  </div>
                  <div className='flex flex-col items-center justify-center pl-3 lg:flex-row'>
                    <img alt='img' src='/assets/icon/medal.png'></img>
                    <span className='pt-2 text-black-300'>+50</span>
                  </div>
                </div>
              </div>
              <div className='grid w-full grid-cols-12 mt-2 lg:mt-10'>
                <span className='col-start-1 col-end-3'>0</span>
                <span className='col-start-4 text-right'>1</span>
                <span className='col-start-9'>2</span>
                <span className='col-start-12 text-right'>3</span>
              </div>
              <div className='grid w-full grid-cols-3 gap-3'>
                <div
                  className={`w-full h-5 rounded-xs   ${
                    auth.user?.friend_sign_ups >= 1 ? getBaseDarkColor(auth.user?.character) : 'bg-referralGray'
                  }`}
                ></div>
                <div
                  className={`w-full h-5 rounded-xs  ${
                    auth.user?.friend_sign_ups >= 2 ? getBaseDarkColor(auth.user?.character) : 'bg-referralGray'
                  }`}
                ></div>
                <div
                  className={`w-full h-5 rounded-xs   ${
                    auth.user?.friend_sign_ups >= 3 ? getBaseDarkColor(auth.user?.character) : 'bg-referralGray'
                  }`}
                ></div>
              </div>
            </div>
            <div className='sm:col-start-8 sm:col-end-12'>
              <div className='p-8 rounded-md bg-white-300'>
                <div>
                  <h1 className='text-4xl font-bold text-black-300'>{auth.user?.friend_sign_ups}</h1>
                </div>
                <div>
                  <h1 className='text-xl font-semibold text-black-300'>Friends Invited</h1>
                </div>

                <div className='w-full mt-5'>
                  <button
                    onClick={openModal}
                    className='w-full px-3 py-4 text-lg font-semibold bg-blue-500 rounded-lg text-white-300'
                  >
                    Invite a Friend
                  </button>
                </div>
                <div>
                  <div className='flex justify-center mt-5'>
                    <span className='mb-2 text-xs font-medium text-referralSemiBlack'>Or copy your personal link</span>
                  </div>
                  <div className='flex'>
                    <div className='relative w-full'>
                      <input
                        value={personalLink}
                        readOnly
                        className='block p-2.5 w-full z-20 text-sm border-2  ring-blue-500 border-blue-500'
                      />
                      <button
                        onClick={handleCopyUrl}
                        type='submit'
                        className='absolute top-0 right-0 p-2.5 h-full text-sm font-medium text-white bg-blue-500  border border-blue-500 hover:bg-blue-300 '
                      >
                        <svg
                          className='w-6 h-6 text-white-300 dark:text-white'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 18 20'
                        >
                          <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='m7.708 2.292.706-.706A2 2 0 0 1 9.828 1h6.239A.97.97 0 0 1 17 2v12a.97.97 0 0 1-.933 1H15M6 5v4a1 1 0 0 1-1 1H1m11-4v12a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V9.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 5h5.239A.97.97 0 0 1 12 6Z'
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <div className='flex justify-center mt-5'>
                    <span className='mb-2 text-xs font-medium text-referralSemiBlack'>Or copy your code</span>
                  </div>
                  <div className='flex'>
                    <div className='relative w-full'>
                      <input
                        value={auth.user?.referral_code}
                        readOnly
                        className='block p-2.5 w-full z-20 text-sm border-2  ring-blue-500 border-blue-500'
                      />
                      <button
                        onClick={handleCopyCode}
                        type='submit'
                        className='absolute top-0 right-0 p-2.5 h-full text-sm font-medium text-white bg-blue-500  border border-blue-500 hover:bg-blue-300 '
                      >
                        <svg
                          className='w-6 h-6 text-white-300 dark:text-white'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 18 20'
                        >
                          <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='m7.708 2.292.706-.706A2 2 0 0 1 9.828 1h6.239A.97.97 0 0 1 17 2v12a.97.97 0 0 1-.933 1H15M6 5v4a1 1 0 0 1-1 1H1m11-4v12a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V9.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 5h5.239A.97.97 0 0 1 12 6Z'
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )} */}

        <div className='grid grid-cols-1 gap-4 px-3 pb-20 mt-5 lg:pb-0 sm:grid-cols-12'>
          <div className='px-10 py-10 rounded-md sm:col-start-1 sm:col-end-8 bg-white-300'>
            <div className='pb-5'>
              <div className='px-2 py-2 bg-referralYellow'>
                <span className='text-lg font-bold text-black-300'>Gain 200 points</span>
              </div>
              <div className='pt-1'>
                <span className='font-bold text-md lg:text-lg text-black-300'>
                  Send an Invitation & Guess Your Friend's Character Correctly
                </span>
              </div>
              <div>
                <span className='text-xs lg:text-sm text-black-300'>
                  If the character of your friend matches with the character guessed, you shall earn additional 200
                  points.
                </span>
              </div>
            </div>
            <div>
              <div className='px-2 py-2 bg-referralYellow'>
                <span className='text-lg font-bold text-black-300'>Gain 300 points</span>
              </div>
              <div className='pt-1'>
                <span className='font-bold text-md lg:text-lg text-black-300'>Match with Your Friend's Character.</span>
              </div>
              <div>
                <span className='text-xs lg:text-sm text-black-300'>
                  If their character matches with your character, you shall earn 300 points.
                </span>
              </div>
            </div>

            <div className='pt-10'>
              <form onSubmit={handleGuessSubmit(onFormSubmit)}>
                <div className='grid gap-4 lg:grid-cols-2'>
                  <FormControl fullWidth>
                    <div className='grid '>
                      <div className='flex flex-col items-center justify-center lg:items-start '>
                        <label htmlFor='character' className='block mb-1 font-bold text-md dark:text-black-300'>
                          Guess Their Character
                        </label>
                        {guessError.character && <span className='text-sm text-red-900 '> This field is required</span>}
                      </div>

                      <Controller
                        name='character'
                        control={guessControl}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <select
                            id='occupation'
                            value={value}
                            onChange={e => {
                              onChange(e)
                            }}
                            className='bg-referralYellow border border-gray-300 text-gray-900 font-bold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-referralYellow dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          >
                            <option value=''>Select a character</option>
                            {similarArray.map(char => (
                              <option key={char} value={char}>
                                {char}
                              </option>
                            ))}
                          </select>
                        )}
                      />
                    </div>
                  </FormControl>
                  <FormControl fullWidth>
                    <div className='grid '>
                      <div className='flex flex-col items-center justify-center lg:items-start '>
                        <label htmlFor='email' className='block mb-1 font-bold text-md dark:text-black-300'>
                          Enter Your Friend's Email
                        </label>
                        {guessError.email && <span className='text-sm text-red-900 '> This field is required</span>}
                      </div>

                      <Controller
                        name='email'
                        control={guessControl}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <input
                            id='email'
                            name='email'
                            type='email'
                            value={value}
                            onChange={onChange}
                            autoComplete='email'
                            className='bg-referralYellow font-bold border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-referralYellow dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          />
                        )}
                      />
                    </div>
                  </FormControl>
                </div>
                <div className='flex justify-center w-full pt-5'>
                  <button
                    type='submit'
                    disabled={loading}
                    className='w-1/2 px-5 py-3 bg-blue-500 lg:w-1/5 text-white-300 rounded-xl hover:opacity-80 hover:cursor-pointer'
                  >
                    {!loading && ' Submit'}
                    {loading && (
                      <svg
                        aria-hidden='true'
                        className='inline w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                        viewBox='0 0 100 101'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                          fill='currentColor'
                        />
                        <path
                          d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                          fill='currentFill'
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className='sm:col-start-8 sm:col-end-12'>
            <div className='p-8 rounded-md bg-white-300'>
              <div>
                <h1 className='text-4xl font-bold text-black-300'>{auth.user?.friend_sign_ups}</h1>
              </div>
              <div>
                <h1 className='text-xl font-semibold text-black-300'>Friends Invited</h1>
              </div>

              {/* <div className='w-full mt-5'>
                <button
                  onClick={openModal}
                  className='w-full px-3 py-4 text-lg font-semibold bg-blue-500 rounded-lg text-white-300'
                >
                  Invite a Friend
                </button>
              </div> */}
              <div>
                <div className='flex justify-center mt-5'>
                  <span className='mb-2 text-xs font-medium text-referralSemiBlack'> copy your personal link</span>
                </div>
                <div className='flex'>
                  <div className='relative w-full'>
                    <input
                      value={personalLink}
                      readOnly
                      className='block p-2.5 w-full z-20 text-sm border-2  ring-blue-500 border-blue-500'
                    />
                    <button
                      onClick={handleCopyUrl}
                      type='submit'
                      className='absolute top-0 right-0 p-2.5 h-full text-sm font-medium text-white bg-blue-500  border border-blue-500 hover:bg-blue-300 '
                    >
                      <svg
                        className='w-6 h-6 text-white-300 dark:text-white'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 18 20'
                      >
                        <path
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='m7.708 2.292.706-.706A2 2 0 0 1 9.828 1h6.239A.97.97 0 0 1 17 2v12a.97.97 0 0 1-.933 1H15M6 5v4a1 1 0 0 1-1 1H1m11-4v12a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V9.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 5h5.239A.97.97 0 0 1 12 6Z'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div className='flex justify-center mt-5'>
                  <span className='mb-2 text-xs font-medium text-referralSemiBlack'>Or copy your code</span>
                </div>
                <div className='flex'>
                  <div className='relative w-full'>
                    <input
                      value={auth.user?.referral_code}
                      readOnly
                      className='block p-2.5 w-full z-20 text-sm border-2  ring-blue-500 border-blue-500'
                    />
                    <button
                      onClick={handleCopyCode}
                      type='submit'
                      className='absolute top-0 right-0 p-2.5 h-full text-sm font-medium text-white bg-blue-500  border border-blue-500 hover:bg-blue-300 '
                    >
                      <svg
                        className='w-6 h-6 text-white-300 dark:text-white'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 18 20'
                      >
                        <path
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='m7.708 2.292.706-.706A2 2 0 0 1 9.828 1h6.239A.97.97 0 0 1 17 2v12a.97.97 0 0 1-.933 1H15M6 5v4a1 1 0 0 1-1 1H1m11-4v12a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V9.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 5h5.239A.97.97 0 0 1 12 6Z'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
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
                <Dialog.Panel className='w-full max-w-xl px-10 overflow-hidden text-left align-middle transition-all transform shadow-xl bg-white-500 rounded-2xl'>
                  <Dialog.Title
                    as='h1'
                    className='mt-10 text-3xl font-medium leading-6 text-center text-textcolorblack-300'
                  >
                    Invite a Friend
                  </Dialog.Title>

                  <div className='w-full max-w-xl mx-auto'>
                    <div className='mt-8'>
                      <div className='my-6'>
                        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                          <div>
                            <FormControl fullWidth>
                              <label className='block mb-2 text-sm font-medium text-textcolorblack-300'>
                                Email address
                              </label>
                              <div className='mt-1'>
                                <Controller
                                  name='email'
                                  control={accountControl}
                                  rules={{ required: true }}
                                  render={({ field: { value, onChange } }) => (
                                    <input
                                      id='email'
                                      name='email'
                                      type='email'
                                      value={value}
                                      onChange={onChange}
                                      autoComplete='email'
                                      className='block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300'
                                    />
                                  )}
                                />
                              </div>
                            </FormControl>
                          </div>
                          <div className='mt-5'>
                            {/* <FormControl fullWidth>
                              <label className='block mb-2 text-sm font-medium text-textcolorblack-300'>Message</label>
                              <div className='mt-1'>
                                <Controller
                                  name='message'
                                  control={accountControl}
                                  rules={{ required: true }}
                                  render={({ field: { value, onChange } }) => (
                                    <textarea
                                      name='message'
                                      value={value}
                                      readOnly
                                      className='block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300'
                                      id='grid-password'
                                      rows={6}
                                    />
                                  )}
                                />
                              </div>
                            </FormControl> */}
                          </div>
                          <div className='flex justify-end w-full'>
                            <button
                              className='w-[40%] p-4 font-medium tracking-wide capitalize transition-all bg-blue-500 border rounded-l-full rounded-r-full outline-none  text-white-500 sm:px-8 op hover:opacity-70 hover:text-white-500'
                              type='submit'
                            >
                              Send
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default Friends
