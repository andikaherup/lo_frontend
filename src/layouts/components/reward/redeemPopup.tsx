import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { useAuth } from 'src/hooks/useAuth'
import Link from 'next/link'

// ** Configs
import contentConfig from 'src/configs/content'

// ** MUI Imports
import axios from 'axios'

// ** Config
import { RewardData } from 'src/context/types'

import toast from 'react-hot-toast'

interface RefProps {
  open: boolean
  close: () => void
  item: RewardData
}

const RedeemPopup = (props: RefProps) => {
  const { item } = props
  const auth = useAuth()

  const { open, close } = props
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)

  const closeModal = () => {
    if (!loading) {
      setError(undefined)
      close()
    }
  }

  const redeem = () => {
    setLoading(true)
    axios
      .post(
        contentConfig.redeemReward,
        { reward_id: item.id },
        {
          headers: { Authorization: 'Bearer ' + window.localStorage.getItem(contentConfig.storageTokenKeyName)! }
        }
      )
      .then(async response => {
        console.log(response)
        toast.success('Redeem Success')
        await auth.refreshUser()
        setLoading(false)
        close()
      })
      .catch(error => {
        setError(error.response.data.data)
        setLoading(false)

        // toast.error(error.response.data.data)
      })
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={closeModal}>
        <div className='fixed inset-0 bg-gray-500 opacity-80' aria-hidden='true' />
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
              <Dialog.Panel className='w-full max-w-xl px-10 pt-5 overflow-hidden text-left align-middle transition-all transform shadow-xl bg-gradient-to-r from-rewardLightBlue to-rewardLightYellow rounded-2xl'>
                {auth.user && !error && !loading && (
                  <>
                    <Dialog.Title
                      as='h1'
                      className='text-3xl font-medium leading-6 text-center lg:pt-5 text-textcolorblack-300'
                    >
                      {item.name}
                    </Dialog.Title>
                    <div className='py-10'>
                      <div className='flex flex-col items-center justify-center'>
                        <div className='px-2 lg:w-1/2 rounded-3xl bg-gradient-to-r from-rewardLightYellow to-rewardLightYellowItem'>
                          <img alt='img' src={item.image} className='lg:p-5' />
                        </div>

                        <div className='flex flex-col items-center justify-center w-full mt-2 lg:px-10 lg:mt-5'>
                          <span className='text-lg lg:text-xl text-black-300'>{item.points} POINTS</span>

                          <button
                            disabled={item.points > (auth.user?.available_points ?? 0) ? true : false}
                            className={`w-full py-1 mt-2 text-lg font-bold transition rounded-full ${
                              item.points > (auth.user?.available_points ?? 0)
                                ? 'bg-gray-400'
                                : 'bg-gradient-to-r from-rewardLightYellow to-rewardLightYellowItem hover:-translate-y-1 hover:scale-110'
                            }  lg:py-2 lg:text-2xl  ring-2 ring-white-300 text-black-300 `}
                            onClick={redeem}
                          >
                            Redeem
                          </button>

                          {item.level_required_to_unlock >= 0 && (
                            <button className='w-full py-1 mt-2 text-lg font-bold transition rounded-full lg:py-2 lg:text-2xl hover:-translate-y-1 hover:scale-110 ring-2 ring-white-300 text-black-300 bg-gradient-to-r from-rewardLightYellow to-rewardLightYellowItem'>
                              <div className='flex items-center justify-center'>
                                Buy
                                <img
                                  className='pb-1 ml-2'
                                  src='/assets/Icon/credit-card.png'
                                  alt='creditcard'
                                  width={30}
                                />
                              </div>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {!auth.user && (
                  <>
                    <Dialog.Title
                      as='h1'
                      className='pt-5 text-xl font-medium leading-6 text-center lg:text-3xl text-textcolorblack-300'
                    >
                      You are not logged in
                    </Dialog.Title>
                    <div className='flex justify-center mt-2 text-xs text-center lg:text-lg'>
                      Create an account and redeem the reward !
                    </div>

                    <div className='px-10 py-5 lg:py-10'>
                      <div className='flex flex-col items-center justify-center'>
                        <Link href={'/login'} aria-current='page' className='w-full underline'>
                          <button className='w-full py-1 mt-2 text-lg font-bold transition rounded-full lg:py-2 lg:text-2xl hover:-translate-y-1 hover:scale-110 ring-2 ring-white-300 text-black-300 bg-gradient-to-r from-rewardLightYellow to-rewardLightYellowItem'>
                            <div className='flex items-center justify-center'>Go To Login Page</div>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </>
                )}
                {error && (
                  <>
                    <Dialog.Title
                      as='h1'
                      className='pt-5 text-xl font-bold leading-6 text-center text-red-900 lg:text-3xl'
                    >
                      Redeem Failed
                    </Dialog.Title>
                    <div className='flex justify-center pt-10'>
                      <span className='text-lg text-black-300'>{error}</span>
                    </div>
                    <div className='px-10 py-10'>
                      <Link href={'/user-setting'} aria-current='page' className='w-full underline'>
                        <button className='w-full py-1 mt-2 text-lg font-bold transition rounded-full lg:py-2 lg:text-2xl hover:-translate-y-1 hover:scale-110 ring-2 ring-white-300 text-black-300 bg-gradient-to-r from-rewardLightYellow to-rewardLightYellowItem'>
                          <div className='flex items-center justify-center'>Go to Profile</div>
                        </button>
                      </Link>
                    </div>
                  </>
                )}

                {loading && (
                  <>
                    <>
                      <Dialog.Title
                        as='h1'
                        className='pt-5 text-xl font-bold leading-6 text-center text-black-300 lg:text-3xl'
                      >
                        Processing
                      </Dialog.Title>
                      <div className='py-10 text-center '>
                        <div role='status'>
                          <svg
                            aria-hidden='true'
                            className='inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
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
                          <span className='text-lg text-black-300'>
                            Your reward redemption is on process your point will be deducted accordingly..
                          </span>
                        </div>
                      </div>
                    </>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default RedeemPopup
