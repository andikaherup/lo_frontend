import { useEffect, useState } from 'react'

// ** Configs
import contentConfig from 'src/configs/content'

// ** MUI Imports
import axios from 'axios'
import Link from 'next/link'

// ** Context
import { useAuth } from 'src/hooks/useAuth'

import { FacebookShareButton } from 'next-share'

import { Theme } from 'src/context/types'
import DailyPopup from './popupDaily'

interface rewardProps {
  isPublic: boolean
}

interface QuoteData {
  author: string
  created_at: string
  quote: string
  quote_images: string
  theme: number
  updated_at: string
  uuid: string
}

const Quote = (props: rewardProps) => {
  const { isPublic } = props
  const auth = useAuth()
  const [themeData, setThemeData] = useState<Theme[]>()
  const [dailyQuote, setDailyQuote] = useState<QuoteData>()
  const [myQuote, setMyQuote] = useState<QuoteData[]>()

  const [isDetail, setIsDetail] = useState<boolean>(false)

  // const [openRef, setOpenRef] = useState<boolean>(false)

  // const [selectedItem, setSelectedItem] = useState()

  const [openRef, setOpenRef] = useState<boolean>(false)

  useEffect(() => {
    const initData = async () => {
      // const urlParams = new URLSearchParams(window.location.search)

      // if (urlParams.has('level')) {
      //   console.log(urlParams.get('level'))
      //   setUrlParam(urlParams.get('level') || '')
      // }
      if (auth.user) {
        await axios
          .get(contentConfig.getThemeList, {
            headers: { Authorization: 'Bearer ' + window.localStorage.getItem(contentConfig.storageTokenKeyName)! }
          })
          .then(async res => {
            setThemeData(res.data.data)
          })
          .catch(() => {
            // toast.error('Something went wrong, contact Admin33')
          })
      }

      await axios
        .get(contentConfig.getPublicDailyQuote)
        .then(async res => {
          setDailyQuote(res.data.data)
        })
        .catch(() => {
          // toast.error('Something went wrong, contact Admin33')
        })

      console.log(isPublic)
    }

    initData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const openDailyQuote = async () => {
    await axios
      .get(contentConfig.getDailyQuote, {
        headers: { Authorization: 'Bearer ' + window.localStorage.getItem(contentConfig.storageTokenKeyName)! }
      })
      .then(async res => {
        setDailyQuote(res.data.data[0])
        console.log(res.data.data[0])
        setOpenRef(true)
      })
      .catch(() => {
        // toast.error('Something went wrong, contact Admin33')
      })
  }

  const getGallery = async (payload: any) => {
    await axios
      .post(contentConfig.getDailyQuoteGallery, payload, {
        headers: { Authorization: 'Bearer ' + window.localStorage.getItem(contentConfig.storageTokenKeyName)! }
      })
      .then(async res => {
        setMyQuote(res.data.data)
        console.log(res.data)
      })
      .catch(() => {
        // toast.error('Something went wrong, contact Admin33')
      })
  }

  const themeDetail = (id: number) => {
    setIsDetail(true)
    openDailyQuote()

    const payload = {
      theme: id
    }
    getGallery(payload)

    // axios
    //   .post(contentConfig.getDailyQuoteGallery, payload, {
    //     headers: { Authorization: 'Bearer ' + window.localStorage.getItem(contentConfig.storageTokenKeyName)! }
    //   })
    //   .then(async res => {
    //     console.log(res)
    //   })
  }

  // const openDialog = (item: any) => {
  //   setSelectedItem(item)
  //   setOpenRef(true)
  // }
  const closeRef = () => {
    setOpenRef(false)
  }

  return (
    <div className='w-full h-full min-h-screen bg-newUIbackground'>
      <div className='flex flex-col items-center justify-start h-full min-h-screen pt-20 lg:items-center lg:px-20 '>
        <h1 className='text-2xl font-bold text-left lg:text-4xl lg:pt-10 text-black-300'>Daily Quote</h1>

        <div className='w-full pb-20'>
          {isDetail && (
            <div className='flex items-start justify-start w-full pt-5 pl-2'>
              <button onClick={() => setIsDetail(false)}>
                <h1 className='text-black-300'>{' <'} Back </h1>
              </button>
            </div>
          )}
          {!isDetail && (
            <div className='grid w-full grid-cols-2 gap-5 pt-5 lg:pt-20 lg:gap-5 lg:grid-cols-4'>
              {themeData?.map((items: Theme, index: number) => {
                return (
                  <button
                    className='h-full px-5 py-4 lg:px-16 lg:py-10 hover:ring-2 bg-white-500 rounded-2xl'
                    key={index}
                    onClick={() => themeDetail(items.id)}
                  >
                    <span className='p-5 -mt-8 transition rounded shadow-lg bg-black-500 text-white-300 tooltip'></span>
                    <Link href={!auth.user ? '/login' : '#'}>
                      <div className='flex justify-center px-2 rounded-3xl '>
                        <img
                          alt='img'
                          src={items.image}
                          className=' transition lg:max-h-[100px] max-h-[100px] hover:-translate-y-1 hover:scale-105'
                        />
                      </div>
                    </Link>

                    <div className='flex flex-col items-center justify-center mt-2 lg:mt-5'>
                      <span className='font-bold text-md lg:text-lg text-black-300'>{items.theme}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          )}

          {dailyQuote && openRef && <DailyPopup open={true} close={closeRef} item={dailyQuote}></DailyPopup>}
          {isDetail && myQuote && (
            <div className='grid w-full grid-cols-1 gap-5 px-5 pt-5 lg:pt-20 lg:gap-5 lg:grid-cols-3'>
              {myQuote?.length > 0 &&
                myQuote?.map((items: QuoteData, index: number) => {
                  return (
                    <button
                      className='flex flex-col items-center justify-between w-full h-full py-10 hover:ring-2 has-tooltip bg-white-500 rounded-2xl'
                      key={index}
                    >
                      <div className='flex flex-col items-start justify-center w-full px-10 rounded-3xl '>
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
            </div>
          )}
          {isDetail && !myQuote && (
            <div className='flex items-center justify-center w-full pt-20 mt-20'>
              <span className='text-center text-black-300'>You haven't share any quote yet!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Quote
