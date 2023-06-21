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
          <div className='grid grid-flow-row gap-8 py-6 sm:grid-flow-col md:grid-rows-1 sm:grid-cols-2 sm:py-16'>
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
              <motion.div className='hidden w-full h-full lg:flex' variants={scrollAnimation}>
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
          </div>
        </ScrollAnimationWrapper>
      </div>
      <div className='relative z-4'>
        <div className='custom-shape-divider-top-1687181954'>
          <svg data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'>
            <path d='M1200 0L0 0 892.25 114.72 1200 0z' className='shape-fill'></path>
          </svg>
        </div>
      </div>

      <div className='z-9' style={{ position: 'relative', zIndex: 9 }}>
        <div className='container px-6 m-auto text-gray-500 md:px-12 xl:px-0'>
          <div className='grid gap-6 mx-auto md:w-3/4 lg:w-1/2 '>
            <div className='px-8 pt-12 bg-yellow-300 border-8 shadow-2xl border-black-300 rounded-3xl dark:bg-gray-800 shadow-gray-600/10 dark:shadow-none sm:px-12 lg:px-8'>
              <div className='mb-12 space-y-4'>
                <p className='mb-6 text-sm lg:text-md text-black-600 dark:text-gray-300'>
                  Our test analyzes your preferences, beliefs, and aspirations, providing you with a reliable and valid
                  profile that empowers you to make informed decisions, embrace your natural talents, and harness your
                  full potential. Your participation contributes to ongoing research, ensuring that our test continues
                  to provide accurate and insightful results. Please note that all personal information and responses
                  are strictly used for research purposes, ensuring the reliability and validity of the test results.
                  Your privacy and confidentiality are of utmost importance to us. Thank you for your participation.
                  Your contribution to our research is greatly appreciated!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Home.getLayout = (page: ReactNode) => <BlankLayoutLandingPage>{page}</BlankLayoutLandingPage>

Home.guestGuard = true

export default Home
