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

const defaultValues = {
  email: '',
  message:
    "I recently tried out this amazing personality test and thought you might be interested too! Why not give it a shot and then we can compare our results? It's completely free and will only take about 10 minutes of your time. Thanks!"
}

interface FormData {
  email: string
  message: string
}

const Friends = () => {
  const auth = useAuth()

  useEffect(() => {
    if (auth.user?.referral_code) {
      setPersonalLink('https://thel0.com/invitation/' + auth.user.referral_code)
    }
  }, [auth])

  const [isOpen, setIsOpen] = useState(false)
  const [personalLink, setPersonalLink] = useState('https://thel0.com/invitation/')

  const { control: accountControl, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const onSubmit = async (data: FormData) => {
    const { email, message } = data
    const payload = {
      email_to_invite: email,
      message: message
    }

    axios
      .post(contentConfig.submitEmail, payload, {
        headers: { Authorization: 'Bearer ' + window.localStorage.getItem(contentConfig.storageTokenKeyName)! }
      })
      .then(async () => {
        defaultValues
        toast.success('Mail sent!')
      })
      .catch(() => {
        toast.error('Error occured, please contact Admin')
      })

    closeModal()
  }

  return (
    <div className='h-screen lg:px-20'>
      <div>
        <div className='flex flex-col items-start px-10 mt-10'>
          <h1 className={`text-center text-5xl font-bold lg:mb-4 lg:text-md text-white-300`}>Friends</h1>
          <h1 className='mb-4 text-lg font-bold text-center text-white-300'>
            You don’t have any friends here yet. Why not invite a few?
          </h1>
        </div>
        <div className='grid grid-cols-1 gap-4 px-3 mt-5 sm:grid-cols-12'>
          <div className='px-10 py-10 rounded-md sm:col-start-1 sm:col-end-8 bg-white-300'>
            <div className='px-3 py-2 bg-referralYellow'>
              <span className='text-lg font-bold text-white-300'>Invite 3 Friends to take the LO Personality Test</span>
            </div>
            <div className='flex justify-start w-full mt-10 sm:flex-row '>
              <div className='flex items-center justify-start mr-4'>
                <span className='text-xl font-bold text-black-300'>Rewards</span>
              </div>
              <div className='flex items-center justify-start mr-4'>
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
                <span className='text-lg text-black-300'>Surprise Gift</span>
              </div>{' '}
              <div className='flex items-center justify-start mr-4'>
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
                <span className='text-lg text-black-300'>Surprise Gift</span>
              </div>
              <div className='flex items-center justify-start'>
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
                <span className='text-lg text-black-300'>Surprise Gift</span>
              </div>
            </div>
            <div className='grid w-full grid-cols-12 mt-10'>
              <span className='col-start-1 col-end-3'>0</span>
              <span className='col-start-4 text-right'>1</span>
              <span className='col-start-9'>2</span>
              <span className='col-start-12 text-right'>3</span>
            </div>
            <div className='grid w-full grid-cols-3 gap-3'>
              <div className='w-full h-5 rounded-xs bg-referralGray'></div>
              <div className='w-full h-5 rounded-xs bg-referralGray'></div>
              <div className='w-full h-5 rounded-xs bg-referralGray'></div>
            </div>
          </div>
          <div className='sm:col-start-8 sm:col-end-12'>
            <div className='p-8 rounded-md bg-white-300'>
              <div>
                <h1 className='text-4xl font-bold text-black-300'>0</h1>
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
                            <FormControl fullWidth>
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
                                      onChange={onChange}
                                      className='block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300'
                                      id='grid-password'
                                      rows={6}
                                    />
                                  )}
                                />
                              </div>
                            </FormControl>
                            <button
                              className='w-full px-3 py-4 mt-5 text-lg font-semibold bg-blue-500 rounded-lg text-white-300'
                              type='submit'
                            >
                              submit
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
