import { useEffect, useState } from 'react'

// ** Configs
import contentConfig from 'src/configs/content'

// ** MUI Imports
import axios from 'axios'
import Link from 'next/link'

// ** Context
import { useAuth } from 'src/hooks/useAuth'
import RedeemPopup from '../reward/redeemPopup'
import { RewardData } from 'src/context/types'

interface rewardProps {
  isPublic: boolean
}

const Reward = (props: rewardProps) => {
  const { isPublic } = props
  const auth = useAuth()
  const [rewardData, setRewardData] = useState<RewardData[]>()
  const [openRef, setOpenRef] = useState<boolean>(false)
  const [urlParam, setUrlParam] = useState<string>()
  const [selectedItem, setSelectedItem] = useState<RewardData>()

  const openDialog = (item: RewardData) => {
    setSelectedItem(item)
    setOpenRef(true)
  }
  const closeRef = () => {
    setOpenRef(false)
  }

  useEffect(() => {
    const initData = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.has('level')) {
        console.log(urlParams.get('level'))
        setUrlParam(urlParams.get('level') || '')
      }

      if (!isPublic) {
        await axios
          .get(contentConfig.getAuthReward, {
            headers: { Authorization: 'Bearer ' + window.localStorage.getItem(contentConfig.storageTokenKeyName)! }
          })
          .then(async res => {
            console.log(res.data)

            setRewardData(res.data.data)
          })
          .catch(() => {
            // toast.error('Something went wrong, contact Admin33')
          })
      } else {
        await axios
          .get(contentConfig.getReward)
          .then(async res => {
            setRewardData(res.data.data)
          })
          .catch(() => {
            // toast.error('Something went wrong, contact Admin33')
          })
      }
    }

    initData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='w-full h-full min-h-screen pt-20 bg-newUIbackground'>
      <div className='flex flex-col items-start justify-start h-full min-h-screen px-5 lg:px-20'>
        {auth.user && <h1 className='text-3xl font-bold text-left lg:text-6xl text-black-300'>UNLOCK YOUR REWARDS</h1>}
        {!auth.user && (
          <h1 className='text-2xl font-bold text-left lg:text-6xl text-black-300'>JOIN TO GET THE REWARDS</h1>
        )}
        <p className='text-sm text-center lg:text-lg text-black-300'>
          Stay informed with the most recent updates on rewards and quests by joining our
          <Link target='_blank' className='font-bold text-black-300' href='https://t.me/+zl_I2784TugzMjll'>
            {/* <img src='/assets/icon/telegram.svg' alt='telegramicon' className='w-5 h-5' /> */} Level 0 Telegram
          </Link>{' '}
          channel now!
        </p>

        {urlParam && <h1 className='text-2xl font-bold text-black-300'>Rewards for Level {urlParam}</h1>}
        {auth.user && (
          <div className='flex items-center justify-end w-full text-black-300'>
            <img alt='img' className='mr-2' src='/assets/icon/medal.png'></img>
            <span className='font-bold text-black-300'>Your Coins :</span>
            <span className='ml-2 font-bold text-purpleText'>{auth.user.coin} points</span>
          </div>
        )}
        <div className='pb-20 '>
          <div className='grid w-full grid-cols-2 gap-5 lg:pt-20 lg:gap-5 lg:grid-cols-3'>
            {rewardData?.map((items: RewardData, index: number) => {
              //return null if level is not enough
              // if (urlParam && items.level_required_to_unlock > parseInt(urlParam)) {
              //   return null
              // }
              // return null if not active, but if it's public API , just return all the data
              // if (auth.user && !items.is_active) {
              //   return null
              // }

              return (
                <div className='h-full px-16 py-10 hover:ring-2 has-tooltip bg-white-500 rounded-2xl' key={index}>
                  <span className='p-5 -mt-8 transition rounded shadow-lg bg-black-500 text-white-300 tooltip'>
                    {items.description}
                  </span>
                  <Link href={!auth.user ? '/login' : '#'}>
                    <div className='flex justify-center px-2 rounded-3xl '>
                      <img
                        alt='img'
                        src={items.image}
                        className=' transition lg:max-h-[250px] max-h-[150px] hover:-translate-y-1 hover:scale-105'
                      />
                    </div>
                  </Link>

                  <div className='flex flex-col items-center justify-center mt-2 lg:mt-5'>
                    <span className='font-bold text-md lg:text-lg text-black-300'>{items.name}</span>
                    <span className='text-lg lg:text-xl text-black-300'>{items.coin_price} Coins</span>
                    {/* <button
                      className={`w-full py-1 mt-2 text-lg font-bold transition rounded-full bg-gradient-to-r from-rewardLightYellow to-rewardLightYellowItem hover:-translate-y-1 hover:scale-110
                      lg:py-2 lg:text-2xl  ring-2 ring-white-300 text-black-300 `}
                      onClick={() => openDialog(items)}
                    >
                      Detail
                    </button> */}
                    {auth.user && !isPublic && (
                      <button
                        disabled={!items.is_active ? true : false}
                        className={`px-5  mt-2 text-lg font-bold transition rounded-full ${
                          !items.is_active
                            ? 'bg-gray-400'
                            : 'bg-gradient-to-r from-button1stcolor via-button2ndcolor to-button3rdcolor hover:-translate-y-1 hover:scale-110'
                        }  lg:py-2 lg:text-lg  ring-2 ring-white-300 text-white-500 `}
                        onClick={() => openDialog(items)}
                      >
                        Redeem
                      </button>
                    )}

                    {/* {items.level_required_to_unlock >= 0 && (
                      <button className='w-full py-1 mt-2 text-lg font-bold transition rounded-full lg:py-2 lg:text-2xl hover:-translate-y-1 hover:scale-110 ring-2 ring-white-300 text-black-300 bg-gradient-to-r from-rewardLightYellow to-rewardLightYellowItem'>
                        <div className='flex items-center justify-center'>
                          Buy
                          <img className='pb-1 ml-2' src='/assets/Icon/credit-card.png' alt='creditcard' width={30} />
                        </div>
                      </button>
                    )} */}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        {selectedItem && openRef && <RedeemPopup open={openRef} close={closeRef} item={selectedItem}></RedeemPopup>}
      </div>
    </div>
  )
}

export default Reward
