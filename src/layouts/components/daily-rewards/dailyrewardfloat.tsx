import { useEffect, useState } from 'react'

// ** Configs
import contentConfig from 'src/configs/content'

// ** MUI Imports
import axios from 'axios'

// ** Hooks Import
// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'
import { DailyRewardData } from 'src/context/types'

// ** MUI Imports
import { useRouter } from 'next/router'

const DailyRewardFloat = () => {
  const auth = useAuth()

  const router = useRouter()

  useEffect(() => {
    const initData = async () => {
      if (auth.user) {
        await axios
          .get(contentConfig.getDailyLoginRewardStatus, {
            headers: { Authorization: 'Bearer ' + window.localStorage.getItem(contentConfig.storageTokenKeyName)! }
          })
          .then(async res => {
            const today = res.data.today_date
            const data = res.data.cycle_status

            const foundItem: DailyRewardData = data.find((item: DailyRewardData) => item.date === today)
            console.log(foundItem)
            if (foundItem) {
              if (foundItem.status == 'pending') setShow(true)
            }
          })
          .catch(() => {
            // toast.error('Something went wrong, contact Admin33')
          })
      }
    }

    initData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [show, setShow] = useState<boolean>(false)
  const goDailyReward = () => {
    router.replace('/dashboard?tab=dailyreward')
    setShow(false)
  }
  if (show) {
    return (
      <div className='fixed bottom-0 right-0 z-50 bg-transparent animate-fade-in-bottom'>
        <div className='flex pr-4'>
          <div className='w-full lg:p-7 p-5 mb-10 bg-dailypopup rounded-2xl lg:max-w-[350px] max-w-[200px]'>
            <button
              onClick={() => setShow(false)}
              className='absolute p-1 rounded-lg lg:top-2 top-1 lg:right-7 right-6 focus:outline-none focus:ring'
            >
              <svg
                className='w-4 h-4 lg:w-6 lg:h-6'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
              </svg>
              <span className='sr-only'>Close sidebar</span>
            </button>
            <h1 className='text-xs font-bold lg:text-lg text-white-300'>Click here to claim your daily reward</h1>

            <div className='flex justify-start w-full mt-4 lg:mt-5'>
              <button
                onClick={goDailyReward}
                className={`px-2 lg:px-10 lg:py-2 py-1 items-center text-xs justify-between bg-white-300  w-full  outline outline-white-300 transition hover:-translate-y-1 hover:scale-105  lg:text-lg font-semibold flex rounded-full`}
              >
                Claim
                <img alt='img' src='/assets/daily-rewards/play.svg' className='w-5 h-5 lg:w-8 lg:h-8'></img>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return <></>
  }
}

export default DailyRewardFloat
