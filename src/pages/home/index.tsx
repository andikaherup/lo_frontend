// ** React Imports
import { ReactNode } from 'react'

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

const Home = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), [])

  return (
    <>
      <div className='px-8 mx-auto mt-20 xl:px-16 bg-skyblue-500 ' id='about'>
        <ScrollAnimationWrapper>
          <motion.div
            className='grid grid-flow-row gap-8 py-6 sm:grid-flow-col md:grid-rows-1 sm:grid-cols-2 sm:py-16'
            variants={scrollAnimation}
          >
            <div className='flex flex-col items-start justify-start row-start-2 lg:px-10 sm:row-start-1'>
              <span className='font-medium leading-normal text-blue-500 text-1xl lg:text-2xl xl:text-2xl'>
                LO Personality Test
              </span>
              <h1 className='text-3xl font-medium leading-normal lg:text-4xl xl:text-5xl text-black-600'>
                Discover Your Unique Profile and Unleash Your Full Potential!
              </h1>
              <p className='mt-4 mb-6 text-black-500'>
                Are you ready to uncover the depths of your personality and tap into your innate strengths? Take our
                engaging and enlightening personality test designed for reliable and valid analysis. Rest assured, your
                personal information and responses are strictly for research purposes, ensuring confidentiality and
                privacy. By exploring our carefully crafted personality test, you will gain valuable insights into your
                true nature, revealing what drives you and what makes you truly exceptional. Discover if you possess the
                heroic spirit that inspires others, the creative magician spark that ignites innovation, or the
                rebellious nature that challenges the status quo. Are you a visionary oracle with deep wisdom or a
                meticulous ruler who excels at organization? Maybe you embody the protector, guided by empathy and
                compassion, or the synergist, effortlessly fostering collaboration and harmony.
              </p>
              <ButtonPrimary>Personality Test</ButtonPrimary>
            </div>
            <div className='flex w-full px-20'>
              <motion.div className='w-full h-full' variants={scrollAnimation}>
                <Image
                  src='/assets/characters/image.png'
                  alt='Characters'
                  quality={100}
                  width={200}
                  height={200}
                  layout='responsive'
                />
              </motion.div>
            </div>
          </motion.div>
        </ScrollAnimationWrapper>
      </div>
      <div className='relative mb-20'>
        <div className='custom-shape-divider-top-1687181954'>
          <svg data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'>
            <path d='M1200 0L0 0 892.25 114.72 1200 0z' className='shape-fill'></path>
          </svg>
        </div>
      </div>
    </>
  )
}

Home.getLayout = (page: ReactNode) => <BlankLayoutLandingPage>{page}</BlankLayoutLandingPage>

Home.guestGuard = true

export default Home
