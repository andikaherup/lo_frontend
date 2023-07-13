import React, { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'

// ** MUI Imports
// ** Hooks

// ** MUI Imports

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

interface RefProps {
  open: boolean
  close: () => void
}

const PopupRef = (props: RefProps) => {
  const { open, close } = props
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const setReferral = async () => {
      const ref = await localStorage.getItem('referralCode')
      if (ref) {
        setRef(ref)
      }
    }
    setReferral()
  }, [])

  function processInput(input: string) {
    const urlRegex = /^https:\/\/thel0\.com\/invitation\/(\w+)$/
    let invitationCode = null
    let message = ''
    let accept = false

    // Check if it seems to be a URL
    if (input.startsWith('http://') || input.startsWith('https://')) {
      // If it is a valid URL
      try {
        const url = new URL(input)
        const match = urlRegex.exec(input)

        if (match) {
          // Get the code after '/invitation/'
          invitationCode = match[1]
          message = 'URL is valid. Invitation code: ' + invitationCode
          accept = true
          console.log(url)
        } else {
          message = 'URL format is incorrect. It should be https://thel0.com/invitation/{code}'
        }
      } catch (error) {
        message = 'Invalid URL.'
      }
    } else {
      // If it is not a URL, it is considered as the code
      invitationCode = input
      message = 'URL is not provided. Using input as Invitation code: ' + invitationCode
      accept = true
    }

    return { invitationCode, message, accept }
  }

  const [ref, setRef] = useState('')

  const onChange = (event: any) => {
    setRef(event.target.value)
  }

  const onSubmit = () => {
    setError('')
    const { invitationCode, message, accept } = processInput(ref)
    if (!accept) {
      setError(message)
    }
    if (accept) {
      axios
        .post(
          authConfig.registReferralEndpoint,
          { referral_code_used_to_register: invitationCode },
          {
            headers: { Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)! }
          }
        )
        .then(() => onSkip())
        .catch(err => {
          if (err.response.data) {
            if (err.response.data.data) {
              setError(err.response.data.data)
            }
          }
        })
    }
  }

  const onSkip = () => {
    axios
      .put(
        authConfig.editUserEndpoint,
        { is_new_user: false },
        {
          headers: { Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)! }
        }
      )
      .then(() => close())
      .catch(err => {
        if (err.response.data) {
          if (err.response.data.data) {
            setError(err.response.data.data)
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
              <Dialog.Panel className='w-full max-w-xl px-10 pt-5 overflow-hidden text-left align-middle transition-all transform shadow-xl bg-white-500 rounded-2xl'>
                <Dialog.Title
                  as='h1'
                  className='mt-10 text-3xl font-medium leading-6 text-center text-textcolorblack-300'
                >
                  Have Invitation Code ?
                </Dialog.Title>

                <div className='w-full max-w-xl pt-2 mx-auto mt-5'>
                  <div className='mt-8'>
                    <div className='my-6'>
                      <div className='mt-1'>
                        <input
                          id='referral'
                          name='referral'
                          type='text'
                          value={ref}
                          onChange={onChange}
                          autoComplete='email'
                          className='block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300'
                        />
                      </div>
                      {error && (
                        <div className='py-2'>
                          <span className='text-red-900'>{error}</span>
                        </div>
                      )}

                      <div className='flex justify-between w-full mt-5 mb-10'>
                        <button className='w-full p-4 mr-2 text-red-900 rounded-lg ' onClick={onSkip}>
                          Skip for now
                        </button>

                        <button
                          className='w-full p-4 font-medium tracking-wide capitalize transition-all bg-blue-500 border rounded-l-full rounded-r-full outline-none text-white-500 sm:px-8 op hover:opacity-70 hover:text-white-500 '
                          onClick={onSubmit}
                        >
                          Submit
                        </button>
                      </div>
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

export default PopupRef
