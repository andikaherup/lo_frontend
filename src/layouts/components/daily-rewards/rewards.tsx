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

  // const [bonus, setBonus] = useState<number>(0)
  const [extraPts, setExtraPts] = useState<number>(0)

  const [loading, setLoading] = useState<boolean>(false)
  const [strike, setStrike] = useState<boolean>(false)

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
          setStrike(res.data.day_strike)

          // if (res.data.last_day_additional_points) {
          //   setBonus(res.data.last_day_additional_points)
          // }
          if (res.data.extra_pts) {
            setExtraPts(res.data.extra_pts)
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
    setLoading(true)

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
              setStrike(res.data.day_strike)

              // if (res.data.last_day_additional_points) {
              //   setBonus(res.data.last_day_additional_points)
              // }
              if (res.data.extra_pts) {
                setExtraPts(res.data.extra_pts)
              }
              setRewardData(res.data.cycle_status)
              auth.refreshUser()
              toast.success('Daily Reward Claimed!')
            })
          setLoading(false)
        })
    }
  }

  return (
    <div className='w-full h-full min-h-screen pt-10 rounded-xl'>
      <div className='flex flex-col items-center justify-start h-full min-h-screen'>
        <div className='w-full '>
          <div className='grid w-full rounded-2xl '>
            <div className='flex flex-col items-center justify-center pb-10'>
              <img
                alt='img'
                src='/assets/icon/daily-rewards/Daily-reward.png'
                className='w-4/6 pt-10 md:w-3/6 lg:w-2/5'
              />

              <div className='flex items-center justify-center'>
                <h1 className='font-bold lg:text-xl text-md text-black-300'>Points you earn on week : </h1>
                <h1 className='ml-4 text-xl font-bold lg:text-5xl text-purpleText'> 20 Points</h1>
              </div>
            </div>

            <div className='grid grid-cols-3 gap-4 px-5 lg:px-20 lg:grid-cols-7 md:grid-cols-5 '>
              {rewardData?.map((items: DailyRewardData, index: number) => {
                // const isLastElement = index === rewardData.length - 1

                return (
                  <div key={index}>
                    <div
                      className={`flex items-center justify-center rounded-t-xl py-3 ${
                        today === items.date ? 'bg-dailyRewardDayBG' : 'bg-gray-500'
                      } `}
                    >
                      MON
                    </div>
                    <div className='flex flex-col items-center justify-center border border-gray-500 rounded-b-xl'>
                      <button onClick={() => claimDaily(items)}>
                        <img
                          alt='img'
                          src={
                            items.status == 'claimed'
                              ? `/assets/icon/daily-rewards/claimed/C${items.day}.png`
                              : items.status == 'missed'
                              ? `/assets/icon/daily-rewards/missed/M${items.day}.png`
                              : items.status == 'pending'
                              ? '/assets/icon/dashboard/LOCKED-Icon.png'
                              : `/assets/daily-rewards/${items.day}.png`
                          }
                          className={`lg:max-w-[150px] max-w-[100px] lg:max-h-[250px] max-h-[150px] object-scale-down ${
                            items.status == 'pending' && today === items.date
                              ? 'animate-pulse'
                              : items.status == 'pending' && items.date > today
                              ? 'opacity-40'
                              : ''
                          } `}
                        />
                      </button>
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
                      {/* <button
                        className={`lg:px-5 px-2 py-1 text-xs transition rounded-full ${
                          items.status == 'claimed' || items.date < today ? 'bg-gray-400' : 'bg-white-300'
                        }   lg:text-sm ring-2 ring-yellow-500  text-black-300 ${
                          items.date === today && items.status != 'claimed'
                            ? 'hover:-translate-y-1 hover:scale-110 cursor-pointer'
                            : 'cursor-default'
                        } `}
                        onClick={() => claimDaily(items)}
                      >
                        {items.status == 'claimed' && `${items.points} pts claimed`}
                        {items.status == 'pending' &&
                          items.date === today &&
                          `Claim ${isLastElement ? items.points + bonus : items.points} pts`}
                        {items.status == 'pending' && items.date != today && (
                          <div className='flex items-center justify-center'>
                            <Icon icon='solar:lock-bold-duotone' fontSize={14} className='mr-1' />
                            {isLastElement ? items.points + bonus : items.points} pts
                          </div>
                        )}
                        {items.status == 'missed' && `Missed`}
                      </button> */}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className='flex justify-center py-3'>
              {strike && (
                <h1 className='text-sm text-center lg:text-lg lg:w-1/2 text-black-300'>
                  {' '}
                  Great news! You're on track to receive an additional <span className='font-bold'>
                    {' '}
                    {extraPts}
                  </span>{' '}
                  points on the last day of your streak. Keep the momentum going and secure your bonus reward!
                </h1>
              )}
              {!strike && (
                <h1 className='text-sm text-center text-red-900 lg:text-lg lg:w-1/2'>
                  Unfortunately, you've missed out on the additional <span className='font-bold'> {extraPts}</span>{' '}
                  points this time. But don't fret, start a new streak now and you'll have another chance to earn those
                  bonus points next week. Keep going!
                </h1>
              )}
            </div>
          </div>
        </div>
        {selectedItem && openRef && (
          <ClaimPopup load={loading} open={true} close={closeRef} item={selectedItem}></ClaimPopup>
        )}
      </div>
    </div>
  )
}

export default Rewards
