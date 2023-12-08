import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

// ** Config
import { QuoteData } from 'src/context/types'
import { FacebookIcon, FacebookShareButton } from 'next-share'

// ** MUI Imports
import axios from 'axios'

// ** Configs
import contentConfig from 'src/configs/content'

interface RefProps {
  open: boolean
  close: () => void
  item: QuoteData
}

const DailyPopup = (props: RefProps) => {
  const { item } = props
  const [shared, setShared] = useState(true)
  const { open, close } = props
  const shareQuote = async () => {
    // check if the quote has been shared or not
    let checker = true
    const payload = {
      theme: item.theme
    }
    await axios
      .post(contentConfig.getDailyQuoteGallery, payload, {
        headers: { Authorization: 'Bearer ' + window.localStorage.getItem(contentConfig.storageTokenKeyName)! }
      })
      .then(async res => {
        res.data.data.forEach((data: QuoteData) => {
          if (data.uuid === item.uuid) {
            checker = false
            setShared(false)
          }
        })
      })
      .catch(() => {
        // toast.error('Something went wrong, contact Admin33')
      })
    if (checker) {
      axios
        .post(
          contentConfig.getDailyQuote,
          { quote_uuid: item.uuid },
          {
            headers: { Authorization: 'Bearer ' + window.localStorage.getItem(contentConfig.storageTokenKeyName)! }
          }
        )
        .then(async res => {
          console.log(res)
        })
    }
  }
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
              <Dialog.Panel className='w-full max-w-xl px-2 overflow-hidden text-left align-middle transition-all transform shadow-xl lg:pt-5 lg:px-10 bg-white-300 rounded-2xl'>
                <div className='pb-2 lg:pb-5'>
                  <Dialog.Title
                    as='h1'
                    className='pt-5 pb-3 text-xl font-bold leading-6 text-center text-black-300 lg:text-3xl'
                  >
                    Today's Quote
                  </Dialog.Title>

                  <div className='flex flex-col items-center justify-center'>
                    <img alt='img' src={`${item.quote_images}`} className='object-scale-down mb-3 lg:mb-5' />

                    {/* <img
                        alt='img'
                        src='/assets/daily-rewards/button.png'
                        className=' transition max-w-[150px] lg:max-h-[200px] max-h-[50px]'
                      /> */}

                    <button
                      className={`lg:px-5 px-2 py-1 flex flex-row text-xs transition rounded-full
                        bg-white-300 lg:text-sm  text-black-300  `}
                      onClick={shareQuote}
                    >
                      <FacebookShareButton url={item.quote_images} hashtag={'#personality-test'}>
                        <div className='flex flex-row '>
                          <FacebookIcon size={20} round></FacebookIcon>{' '}
                          {!shared && (
                            <span className='ml-1'>Share on facebook to get {item.points_reward} points</span>
                          )}
                          {shared && <span className='ml-1'>Share on facebook </span>}
                        </div>
                      </FacebookShareButton>
                    </button>
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

export default DailyPopup
