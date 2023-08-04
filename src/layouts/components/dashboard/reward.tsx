import React from 'react'

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
  return (
    <div className='w-full h-full min-h-screen pt-10 bg-gradient-to-r from-rewardLightBlue to-rewardLightYellow'>
      <div className='flex flex-col items-center justify-start h-full min-h-screen px-5 lg:px-20'>
        <h1 className='text-3xl font-bold text-center lg:text-6xl text-black-300'>
          UNLOCK
          <br /> YOUR REWARD
        </h1>
        <div className='pt-10 pb-20 lg:pt-20 lg:px-20 lg:mx-20'>
          <div className='grid w-full grid-cols-2 gap-5 lg:gap-20 lg:px-20 lg:grid-cols-3'>
            {data.map((items, index) => (
              <div key={index}>
                <div className='px-2 rounded-3xl bg-gradient-to-r from-rewardLightYellow to-rewardLightYellowItem'>
                  <img alt='img' src={items.image} />
                </div>
                <div className='flex flex-col items-center justify-center mt-2 lg:mt-5'>
                  <span className='text-2xl font-bold lg:text-5xl text-white-300'>{items.price}</span>
                  <span className='text-lg lg:text-xl text-white-300'>{items.point} POINTS</span>
                  <button className='w-full py-1 mt-2 text-lg font-bold transition rounded-full lg:py-2 lg:text-2xl hover:-translate-y-1 hover:scale-110 ring-2 ring-white-300 text-black-300 bg-gradient-to-r from-rewardLightYellow to-rewardLightYellowItem'>
                    Redeem
                  </button>
                  {items.buy && (
                    <button className='w-full py-1 mt-2 text-lg font-bold transition rounded-full lg:py-2 lg:text-2xl hover:-translate-y-1 hover:scale-110 ring-2 ring-white-300 text-black-300 bg-gradient-to-r from-rewardLightYellow to-rewardLightYellowItem'>
                      Buy
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reward
