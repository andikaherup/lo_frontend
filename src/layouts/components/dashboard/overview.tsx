// ** React Imports
import { ReactNode, useState } from 'react'

// ** MUI Imports

import React, { useMemo } from 'react'
import Image from 'next/image'
import ButtonPrimary from 'src/layouts/components/misc/ButtonPrimary'
import { motion } from 'framer-motion'
import getScrollAnimation from 'src/views/pages/utils/getScrollAnimation'
import ScrollAnimationWrapper from 'src/layouts/ScrollAnimationWrapper'

// ** Configs

// ** Layout Import
import BlankLayoutLandingPage from 'src/@core/layouts/BlankLayoutLandingPage'

const Overview: React.FC = () => {
  return (
    <div>
      <ScrollAnimationWrapper>
        <div className='grid grid-flow-row gap-8 py-6 sm:grid-flow-col md:grid-rows-1 sm:grid-cols-2 sm:py-16'>
          <div className='flex flex-col items-start justify-start row-start-2 lg:px-10 sm:row-start-1'>
            <h1 className='text-3xl font-medium leading-normal lg:text-4xl xl:text-5xl text-black-600'>
              Hi James! You are a <span className='text-skyblue-300'>Protector</span>
            </h1>
            <p className='mt-4 mb-6 text-black-500'>
              Are you ready to uncover the depths of your personality and tap into your innate strengths? Take our
              engaging and enlightening personality test designed for reliable and valid analysis. Rest assured, your
              personal information and responses are strictly for research purposes, ensuring confidentiality and
              privacy. By exploring our carefully crafted personality test, you will gain valuable insights into your
              true nature, revealing what drives you and what makes you truly exceptional. Discover if you possess the
              heroic spirit that inspires others, the creative magician spark that ignites innovation, or the rebellious
              nature that challenges the status quo. Are you a visionary oracle with deep wisdom or a meticulous ruler
              who excels at organization? Maybe you embody the protector, guided by empathy and compassion, or the
              synergist, effortlessly fostering collaboration and harmony.
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
