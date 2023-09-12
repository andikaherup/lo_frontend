// ** MUI Imports
import Link from 'next/link'

const DailyRewardFloat = () => {
  return (
    <div className='fixed bottom-0 right-0 z-50 bg-transparent animate-fade-in-bottom'>
      <div className='w-full p-10 mb-10 bg-dailypopup rounded-3xl max-w-[350px]'>
        <h1 className='text-xl font-bold text-white-300'>Click here to claim your daily reward</h1>

        <div className='flex justify-start w-full mt-10'>
          <Link
            href='/daily-rewards'
            className={`px-5 lg:px-10 py-2 items-center justify-between bg-white-300  w-full  outline outline-white-300 transition hover:-translate-y-1 hover:scale-105  lg:text-xl font-semibold flex rounded-full`}
          >
            Claim
            <img alt='img' src='/assets/daily-rewards/play.svg' className='w-10 h-10'></img>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DailyRewardFloat
