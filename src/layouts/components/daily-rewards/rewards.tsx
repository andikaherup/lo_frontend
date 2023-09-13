import { useEffect, useState } from 'react'

// ** Configs
import contentConfig from 'src/configs/content'

// ** MUI Imports
import axios from 'axios'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'
import { DailyRewardData } from 'src/context/types'
import toast from 'react-hot-toast'
import ClaimPopup from './claimpopup'

const Rewards = () => {
  const auth = useAuth()

  const [rewardData, setRewardData] = useState<DailyRewardData[]>()
  const [openRef, setOpenRef] = useState<boolean>(false)
  const [today, setToday] = useState<string>('')
  const [selectedItem, setSelectedItem] = useState<DailyRewardData>()
  const [bonus, setBonus] = useState<number>(0)

  const openDialog = (item: DailyRewardData) => {
    setSelectedItem(item)
    setOpenRef(true)
  }
  const closeRef = () => {
    setOpenRef(false)
  }

  useEffect(() => {
    const initData = async () => {
      await axios
        .get(contentConfig.getDailyLoginRewardStatus, {
          headers: { Authorization: 'Bearer ' + window.localStorage.getItem(contentConfig.storageTokenKeyName)! }
        })
        .then(async res => {
          console.log(res.data)
          setToday(res.data.today_date)
          if (res.data.last_day_additional_points) {
            setBonus(res.data.last_day_additional_points)
          }

          setRewardData(res.data.cycle_status)
        })
        .catch(() => {
          // toast.error('Something went wrong, contact Admin33')
        })
    }

    initData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const claimDaily = async (items: DailyRewardData) => {
    console.log(today, items.date, today === items.date)
    if (today === items.date && items.status === 'pending') {
      await axios
        .get(contentConfig.getDailyLoginReward, {
          headers: { Authorization: 'Bearer ' + window.localStorage.getItem(contentConfig.storageTokenKeyName)! }
        })
        .then(async () => {
          await axios
            .get(contentConfig.getDailyLoginRewardStatus, {
              headers: { Authorization: 'Bearer ' + window.localStorage.getItem(contentConfig.storageTokenKeyName)! }
            })
            .then(async res => {
              openDialog(items)
              setRewardData(res.data.cycle_status)
              auth.refreshUser()

              toast.success('Daily Reward Claimed!')
            })
        })
    }
  }

  return (
    <div className='w-full h-full min-h-screen pt-10 rounded-xl bg-gradient-to-r from-rewardLightBlue to-rewardLightYellow'>
      <div className='flex flex-col items-center justify-start h-full min-h-screen'>
        <div className='w-full '>
          <div className='grid w-full rounded-2xl '>
            <div className='flex justify-center'>
              <img alt='img' src='/assets/rewardstitle.png' className='w-5/6 pt-10 lg:w-2/5' />
            </div>
            <div className='grid grid-cols-3 px-5 lg:px-20 lg:grid-cols-7 md:grid-cols-5 '>
              {rewardData?.map((items: DailyRewardData, index: number) => {
                const isLastElement = index === rewardData.length - 1

                return (
                  <div key={index}>
                    <div className='flex flex-col items-center justify-center'>
                      <img
                        alt='img'
                        src={
                          items.status == 'claimed'
                            ? `/assets/daily-rewards/${items.day}claimed.png`
                            : `/assets/daily-rewards/${items.day}.png`
                        }
                        className={`lg:max-w-[150px] max-w-[100px] lg:max-h-[250px] max-h-[150px] object-scale-down ${
                          items.status == 'pending' && today === items.date ? 'animate-pulse' : ''
                        } `}
                      />
                      {/* <button onClick={() => claimDaily(items)}>
                        <img
                          alt='img'
                          src={
                            items.status == 'claimed'
                              ? `/assets/daily-rewards/claimedButton.png`
                              : `/assets/daily-rewards/button.png`
                          }
                          className=' transition max-w-[150px] lg:max-h-[200px] max-h-[50px] hover:-translate-y-1 hover:scale-105'
                        />
                      </button> */}
                      {/* <div className='relative flex justify-center'>
                        <img
                          alt='img'
                          src={
                            items.status == 'claimed'
                              ? `/assets/daily-rewards/claimedButton.png`
                              : `/assets/daily-rewards/button.png`
                          }
                          className=' transition max-w-[150px] lg:max-h-[200px] max-h-[50px] hover:-translate-y-1 hover:scale-105'
                        />
                        <button
                          className={`w-full  lg:top-6  absolute   text-xs font-bold transition  ${
                            items.status == 'claimed'
                              ? 'lg:bg-white-300 '
                              : 'lg:bg-white-300 hover:-translate-y-1 hover:scale-110'
                          }   lg:text-sm   text-black-300  `}
                          onClick={() => claimDaily(items)}
                        >
                          Claim {items.points} points
                        </button>
                      </div> */}
                      <button
                        className={`lg:px-5 px-2 py-1 text-xs transition rounded-full ${
                          items.status == 'claimed' ? 'bg-gray-400' : 'bg-white-300'
                        }   lg:text-sm ring-2 ring-yellow-500  text-black-300 ${
                          items.date === today
                            ? 'hover:-translate-y-1 hover:scale-110 cursor-pointer'
                            : 'cursor-default'
                        } `}
                        onClick={() => claimDaily(items)}
                      >
                        Claim {isLastElement ? items.points + bonus : items.points} points
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        {selectedItem && openRef && <ClaimPopup open={true} close={closeRef} item={selectedItem}></ClaimPopup>}
      </div>
    </div>
  )
}

export default Rewards
