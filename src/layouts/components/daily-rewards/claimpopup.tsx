import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

// ** Config
import { DailyRewardData } from 'src/context/types'

interface RefProps {
  open: boolean
  close: () => void
  item: DailyRewardData
}

const ClaimPopup = (props: RefProps) => {
  const { item } = props

  const { open, close } = props

  const closeModal = () => {
    // if (!loading) {
    //   setError({ data: '', code: '' })
    //   close()
    // }
    close()
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
              <Dialog.Panel className='w-full max-w-xl px-10 pt-5 overflow-hidden text-left align-middle transition-all transform shadow-xl bg-white-300 rounded-2xl'>
                <div className='pb-10'>
                  <Dialog.Title
                    as='h1'
                    className='pt-5 text-xl font-bold leading-6 text-center text-darkMagician lg:text-3xl'
                  >
                    CONGRATULATIONS!
                  </Dialog.Title>

                  <div className='flex flex-col items-center justify-center'>
                    <img
                      alt='img'
                      src={`/assets/daily-rewards/${item.day}.png`}
                      className='lg:max-w-[150px] max-w-[100px] lg:max-h-[250px] max-h-[150px] object-scale-down'
                    />

                    <img
                      alt='img'
                      src='/assets/daily-rewards/button.png'
                      className=' transition max-w-[150px] lg:max-h-[200px] max-h-[50px]'
                    />
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

export default ClaimPopup
