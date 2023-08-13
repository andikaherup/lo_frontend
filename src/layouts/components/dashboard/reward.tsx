import { ReactNode, useEffect, useState } from 'react'

// ** Configs
import contentConfig from 'src/configs/content'

// ** MUI Imports
import axios from 'axios'

// ** Context
import { useAuth } from 'src/hooks/useAuth'
import RedeemPopup from '../reward/redeemPopup'
import { RewardData } from 'src/context/types'

const data = [
  {
    image: '/assets/rewards/CAP.png',
    price: 'SG$10',
    point: '500',
    buy: false
  },
  {
    image: '/assets/rewards/KEYCHAIN.png',
    price: 'SG$10',
    point: '500',
    buy: false
  },
  {
    image: '/assets/rewards/L0REPORT.png',
    price: 'SG$10',
    point: '500',
    buy: true
  },
  {
    image: '/assets/rewards/MUG.png',
    price: 'SG$10',
    point: '500',
    buy: true
  },
  {
    image: '/assets/rewards/PHONECASE.png',
    price: 'SG$10',
    point: '500',
    buy: false
  },
  {
    image: '/assets/rewards/SHIRT.png',
    price: 'SG$10',
    point: '500',
    buy: false
  }
]

const Reward = () => {
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
      console.log(urlParams)
      if (auth.user) {
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
  }, [])

  return (
    <div className='w-full h-full min-h-screen pt-10 bg-gradient-to-r from-rewardLightBlue to-rewardLightYellow'>
      <div className='flex flex-col items-center justify-start h-full min-h-screen px-5 lg:px-20'>
        <h1 className='text-3xl font-bold text-center lg:text-6xl text-black-300'>UNLOCK YOUR REWARD</h1>
        {urlParam && <h1 className='text-2xl font-bold text-black-300'>Rewards for Level {urlParam}</h1>}
        {auth.user && (
          <h1 className='text-xl font-bold text-center lg:text-2xl text-black-300'>
            My Points : {auth.user?.available_points}
          </h1>
        )}

        <div className='pt-10 pb-20 lg:pt-20 lg:px-20 lg:mx-20'>
          <div className='grid w-full grid-cols-2 gap-5 lg:gap-20 lg:px-20 lg:grid-cols-3'>
            {rewardData?.map((items: RewardData, index: number) => (
              <div key={index}>
                <div className='px-2 rounded-3xl bg-gradient-to-r from-rewardLightYellow to-rewardLightYellowItem'>
                  <img alt='img' src={items.image} className='p-5' />
                </div>
                <div className='flex flex-col items-center justify-center mt-2 lg:mt-5'>
                  <span className='text-2xl font-bold lg:text-3xl text-black-300'>{items.name}</span>
                  <span className='text-lg lg:text-xl text-black-300'>{items.points} POINTS</span>
                  <button
                    className={`w-full py-1 mt-2 text-lg font-bold transition rounded-full bg-gradient-to-r from-rewardLightYellow to-rewardLightYellowItem hover:-translate-y-1 hover:scale-110
                      lg:py-2 lg:text-2xl  ring-2 ring-white-300 text-black-300 `}
                    onClick={() => openDialog(items)}
                  >
                    Detail
                  </button>
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
            ))}
          </div>
        </div>
        {selectedItem && <RedeemPopup open={openRef} close={closeRef} item={selectedItem}></RedeemPopup>}
      </div>
    </div>
  )
}

export default Reward
