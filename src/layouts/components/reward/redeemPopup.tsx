import React, { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'

// ** MUI Imports
// ** Hooks

// ** MUI Imports
// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'
import Link from 'next/link'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import { RewardData } from 'src/context/types'
interface RefProps {
  open: boolean
  close: () => void
  item: RewardData
}

const RedeemPopup = (props: RefProps) => {
  const { item } = props
  const auth = useAuth()

  const { open, close } = props
  const [error, setError] = useState<string>('')

  const closeModal = () => {
    console.log('close')
    close()
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
                {auth.user && (
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
                            disabled={item.points > (auth.user?.user_points ?? 0) ? true : false}
                            className={`w-full py-1 mt-2 text-lg font-bold transition rounded-full ${
                              item.points > (auth.user?.user_points ?? 0)
                                ? 'bg-gray-400'
                                : 'bg-gradient-to-r from-rewardLightYellow to-rewardLightYellowItem hover:-translate-y-1 hover:scale-110'
                            }  lg:py-2 lg:text-2xl  ring-2 ring-white-300 text-black-300 `}
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default RedeemPopup
