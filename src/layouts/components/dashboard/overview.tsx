// ** React Imports
// import { ReactNode, useState } from 'react'

// ** MUI Imports

import React from 'react'
import Image from 'next/image'

import ScrollAnimationWrapper from 'src/layouts/ScrollAnimationWrapper'

// ** Context
import { useAuth } from 'src/hooks/useAuth'

const Overview: React.FC = () => {
  const auth = useAuth()

  return (
    <div>
      <ScrollAnimationWrapper>
        <div className='grid grid-flow-row gap-8 py-6 sm:grid-flow-col md:grid-rows-1 sm:grid-cols-2 sm:py-16'>
          <div className='flex flex-col items-start justify-start row-start-2 lg:px-10 sm:row-start-1'>
            <h1 className='text-3xl font-medium leading-normal lg:text-4xl xl:text-5xl text-black-600'>
              Hi {auth.user?.name || 'null'}! You are a <span className='text-skyblue-300'>Protector</span>
            </h1>
            <p className='mt-4 mb-6 text-black-500'>
              You are driven by a strong sense of loyalty, compassion, and a desire to protect others. You are willing
              to put the needs of others before their own and advocate for the vulnerable. Protectors possess a strong
              sense of responsibility, empathy, and a natural inclination to care for and protect others. They
              prioritize the well-being and safety of those around them, and their actions often contribute to creating
              a supportive and nurturing environment. Protectors are often compassionate, dependable, and have a strong
              desire to make a positive impact. Protectors may sometimes experience burnout or neglect their own needs
              in favor of taking care of others. Their strong emotional connection and sense of responsibility may lead
              to difficulty in setting boundaries. Protectors may also face challenges in navigating conflicts and
              making tough decisions that balance the needs of individuals and the collective.
            </p>
            <button className='px-12 py-3 mt-5 text-sm font-semibold transition-all bg-blue-500 outline-none lg:py-3 lg:px-13 text-white-500 hover:shadow-blue-md '>
              Download Your Result
            </button>
          </div>
          <div className='flex w-full px-20'>
            <div className='flex w-full h-full '>
              <Image
                src='/assets/characters/image.png'
                alt='Characters'
                quality={100}
                width={200}
                height={200}
                layout='responsive'
              />
            </div>
          </div>
        </div>
      </ScrollAnimationWrapper>
    </div>
  )
}

export default Overview
