import { useEffect, useState } from 'react'

// ** Configs
import contentConfig from 'src/configs/content'
import Link from 'next/link'

// ** MUI Imports
import axios from 'axios'

import { FacebookShareButton } from 'next-share'

interface QuoteData {
  author: string
  created_at: string
  quote: string
  quote_images: string
  theme: number
  updated_at: string
  uuid: string
}

const PublicQuote = () => {
  const [dailyQuote, setDailyQuote] = useState<QuoteData[]>()

  useEffect(() => {
    const initData = async () => {
      await axios
        .get(contentConfig.getPublicDailyQuote)
        .then(async res => {
          setDailyQuote(res.data.data)
        })
        .catch(() => {
          // toast.error('Something went wrong, contact Admin33')
        })
    }

    initData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='w-full h-full min-h-screen bg-newUIbackground'>
      <div className='flex flex-col items-center justify-center h-full min-h-screen pt-20 lg:items-center lg:px-20 '>
        <h1 className='text-2xl font-bold text-left lg:text-4xl lg:pt-10 text-black-300'>Daily Quote</h1>
        <div className='pb-20 '>
          <div className='grid w-full grid-cols-1 gap-5 px-5 pt-5 lg:pt-20 lg:gap-5 lg:grid-cols-3'>
            {dailyQuote?.map((items: QuoteData, index: number) => {
              return (
                <button
                  className='flex flex-col items-center justify-between h-full py-10 hover:ring-2 has-tooltip bg-white-500 rounded-2xl'
                  key={index}
                >
                  <div className='flex flex-col items-start justify-center px-10 rounded-3xl '>
                    {/* <img alt='img' src={items.quote_images} className='' /> */}
                    <div className='flex justify-start pb-2 lg:px-10'>
                      <svg className='w-6 h-6' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          fill-rule='evenodd'
                          clip-rule='evenodd'
                          d='M9.62231 6.78278C10.0546 6.43909 10.1265 5.81001 9.78277 5.3777C9.43908 4.94539 8.81001 4.87354 8.37769 5.21724C4.73471 8.11342 4 11.8784 4 16C4 17.6569 5.34315 19 7 19C8.65685 19 10 17.6569 10 16C10 14.3432 8.65685 13 7 13C6.71233 13 6.43412 13.0405 6.17076 13.1161C6.5162 10.5872 7.45738 8.50391 9.62231 6.78278ZM20 16C20 17.6569 18.6569 19 17 19C15.3431 19 14 17.6569 14 16C14 11.8784 14.7347 8.11342 18.3777 5.21724C18.81 4.87354 19.4391 4.94539 19.7828 5.3777C20.1265 5.81001 20.0546 6.43909 19.6223 6.78278C17.4574 8.50391 16.5162 10.5872 16.1708 13.1161C16.4341 13.0405 16.7123 13 17 13C18.6569 13 20 14.3432 20 16Z'
                          fill='gray'
                        />
                      </svg>
                    </div>
                    <h1 className='text-xs text-center text-black-300'>{items.quote}</h1>
                  </div>
                  <div className='flex justify-between w-full px-10 mt-10 lg:px-20'>
                    <h1 className='text-sm font-bold lg:text-md text-black-300'>- {items.author}</h1>
                    <FacebookShareButton url={items.quote_images} hashtag={'#personality-test'}>
                      <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5' fill='gray' viewBox='0 0 24 24'>
                        <path d='M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z' />
                      </svg>
                    </FacebookShareButton>
                  </div>
                </button>
              )
            })}

            <button className='flex flex-col items-center justify-between h-full py-10 hover:ring-2 has-tooltip bg-white-500 rounded-2xl'>
              <Link href='/login' aria-current='page'>
                <div className='flex flex-col items-center justify-center px-10 rounded-3xl '>
                  <img alt='img' src='/assets/icon/quote/LOCKED-Icon.png' className='object-scale-down w-20' />

                  <h1 className='text-xs text-center text-black-300'>Sign in to unlock more quote</h1>
                </div>
              </Link>
            </button>
            <button className='flex flex-col items-center justify-between h-full py-10 hover:ring-2 has-tooltip bg-white-500 rounded-2xl'>
              <Link href='/login' aria-current='page'>
                <div className='flex flex-col items-center justify-center px-10 rounded-3xl '>
                  <img alt='img' src='/assets/icon/quote/LOCKED-Icon.png' className='object-scale-down w-20' />

                  <h1 className='text-xs text-center text-black-300'>Sign in to unlock more quote</h1>
                </div>
              </Link>
            </button>
            <button className='flex flex-col items-center justify-between h-full py-10 hover:ring-2 has-tooltip bg-white-500 rounded-2xl'>
              <Link href='/login' aria-current='page'>
                <div className='flex flex-col items-center justify-center px-10 rounded-3xl '>
                  <img alt='img' src='/assets/icon/quote/LOCKED-Icon.png' className='object-scale-down w-20' />

                  <h1 className='text-xs text-center text-black-300'>Sign in to unlock more quote</h1>
                </div>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PublicQuote
