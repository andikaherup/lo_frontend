// ** React Imports
import { ReactNode, useEffect, useState } from 'react'

// ** MUI Imports
import Link from 'next/link'

import React from 'react'

// import ButtonPrimary from 'src/layouts/components/misc/ButtonPrimary'

// import { motion } from 'framer-motion'
// import getScrollAnimation from 'src/views/pages/utils/getScrollAnimation'
// import ScrollAnimationWrapper from 'src/layouts/ScrollAnimationWrapper'

// ** Configs

// ** Layout Import
import BlankLayoutLandingPage from 'src/@core/layouts/BlankLayoutLandingPage'
import Testimonials from 'src/layouts/components/home/testimonials'

const images = [
  {
    background: ' bg-gradient-to-r from-darkHero from-10% via-darkHero via-10% to-lightHero',
    image: 'Hero_LVL_1_(F).png',
    name: 'Hero'
  },
  {
    background: ' bg-gradient-to-r from-darkHero from-10% via-darkHero via-10% to-lightHero',
    image: 'HERO_LVL_1.png',
    name: 'Hero'
  },
  {
    background: ' bg-gradient-to-r from-darkMagician from-10% via-darkMagician via-10% to-lightMagician',
    image: 'Magician_LVL_1_(F).png',
    name: 'Magician'
  },
  {
    background: ' bg-gradient-to-r from-darkMagician from-10% via-darkMagician via-10% to-lightMagician',
    image: 'magician_LVL_1.png',
    name: 'Magician'
  },
  {
    background: ' bg-gradient-to-r from-darkRebel from-10% via-darkRebel  via-10% to-lightRebel',
    image: 'Rebel_LVL_1_(F).png',
    name: 'Rebel'
  },
  {
    background: ' bg-gradient-to-r from-darkRebel from-10% via-darkRebel  via-10% to-lightRebel',
    image: 'rebel_LVL_0_(2).png',
    name: 'Rebel'
  },
  {
    background: ' bg-gradient-to-r from-darkCreator from-10% via-darkCreator  via-10% to-lightCreator',
    image: 'Creator_LVL_1_(F).png',
    name: 'Creator'
  },
  {
    background: ' bg-gradient-to-r from-darkCreator from-10% via-darkCreator  via-10% to-lightCreator',
    image: 'CREATOR_LVL_1.png',
    name: 'Creator'
  },
  {
    background: ' bg-gradient-to-r from-darkGreen from-10% via-darkGreen via-10% to-lightGreen',
    image: 'Synergist_LVL_1_(F).png',
    name: 'Synergist'
  },
  {
    background: ' bg-gradient-to-r from-darkGreen from-10% via-darkGreen via-10% to-lightGreen',
    image: 'synergist_LVL_0_(2).png',
    name: 'Synergist'
  },
  {
    background: ' bg-gradient-to-r from-darkOracle from-10% via-darkOracle  via-10% to-lightOracle',
    image: 'Oracle_LVL_1_(F).png',
    name: 'Oracle'
  },
  {
    background: ' bg-gradient-to-r from-darkOracle from-10% via-darkOracle  via-10% to-lightOracle',
    image: 'oracle_LVL_1.png',
    name: 'Oracle'
  },
  {
    background: ' bg-gradient-to-r from-darkProtector from-10% via-darkProtector  via-10% to-lightProtector',
    image: 'Protector_LVL_1_(F).png',
    name: 'Protector'
  },
  {
    background: ' bg-gradient-to-r from-darkProtector from-10% via-darkProtector  via-10% to-lightProtector',
    image: 'protector_lvl_1.png',
    name: 'Protector'
  },
  {
    background: ' bg-gradient-to-r from-darkBlue from-10% via-darkBlue  via-10% to-lightBlue',
    image: 'Ruler_LVL_1_(F).png',
    name: 'Ruler'
  },
  {
    background: ' bg-gradient-to-r from-darkBlue from-10% via-darkBlue  via-10% to-lightBlue',
    image: 'RULER_LVL_1.png',
    name: 'Ruler'
  }
]

const Home = () => {
  // const scrollAnimation = useMemo(() => getScrollAnimation(), [])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div className={`px-8 pt-20 mx-auto xl:px-16 h-screen ${images[currentImageIndex].background} w-full`} id='about'>
        <div className='grid w-full h-full grid-flow-row py-6 lg:px-20 sm:grid-flow-col md:grid-rows-1 sm:grid-cols-2 sm:py-16'>
          <div className='flex flex-col items-center justify-center w-full row-start-2 lg:items-start lg:px-10 sm:row-start-1'>
            <div key={images[currentImageIndex].image} className='relative'>
              <h1
                className={`text-3xl font-extrabold lg:text-left text-center uppercase z-10 transition duration-2000 animate-clip lg:text-8xl text-white-300`}
              >
                {images[currentImageIndex].name}
              </h1>
              <div className='absolute left-0 h-full transition delay-1000 -translate-y-1/2 duration-50 top-1/2 bg-white-300 z-2 animate-hide'></div>
            </div>

            <Link className='pt-5 lg:pl-2' href='/personality-test' aria-current='page'>
              <button className='px-3 py-2 font-semibold transition duration-300 ease-in-out lg:px-10 text-md lg:text-2xl delay-50 hover:-translate-y-1 hover:scale-110 outline outline-2 outline-offset-3 outline-white-500 text-white-300'>
                Start Quest
              </button>
              {/* <ButtonPrimary>Personality Test</ButtonPrimary> */}
            </Link>
          </div>
          <div className='flex w-full'>
            <div className='relative flex w-full min-w-fit '>
              {images.map((image, index) => (
                <img
                  key={index}
                  src={`/assets/characters/${image.image}`}
                  alt={`Image ${index + 1}`}
                  className={`${
                    index === currentImageIndex ? 'opacity-100 flex' : 'opacity-0 hidden'
                  } transition-opacity object-scale-down animate-fade-in-bottom duration-2000 delay-150 drop-shadow-md`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`z-9 ${images[currentImageIndex].background}`} style={{ position: 'relative', zIndex: 9 }}>
        <div className='px-6 py-20 m-auto text-gray-500 md:px-12 xl:px-0'>
          <div className='grid gap-6 mx-auto md:w-3/4 lg:w-1/2 '>
            <div className='px-8 pt-12 bg-yellow-300 border-8 shadow-2xl border-black-300 rounded-3xl dark:bg-gray-800 shadow-gray-600/10 dark:shadow-none sm:px-12 lg:px-8'>
              <div className='mb-12 space-y-4'>
                <p className='mb-6 text-sm lg:text-lg text-black-600 dark:text-gray-300'>
                  Our test analyzes your preferences, beliefs, and aspirations, providing you with a reliable and valid
                  profile that empowers you to make informed decisions, embrace your natural talents, and harness your
                  full potential.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container py-24 mx-auto md:px-6'>
        <Testimonials></Testimonials>
      </div>

      {/* <div className={`w-full ${images[currentImageIndex].background}`}>
        <div className='container py-20 mx-auto md:px-6'>
          <section className='mb-32 text-center'>
            <h2 className='mb-16 text-3xl font-bold text-white-300'>FEATURE</h2>

            <div className='grid px-6 md:grid-cols-2 lg:grid-cols-6'>
              <div className='mx-auto mb-12 lg:mb-0'>
                <img
                  alt='image'
                  src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/landing-page/8.png'
                  className='max-w-[90px] dark:brightness-150'
                />
              </div>

              <div className='mx-auto mb-12 lg:mb-0'>
                <img
                  alt='image'
                  src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/landing-page/2.png'
                  className='max-w-[90px] dark:brightness-150'
                />
              </div>

              <div className='mx-auto mb-12 lg:mb-0'>
                <img
                  alt='image'
                  src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/landing-page/7.png'
                  className='max-w-[90px] dark:brightness-150'
                />
              </div>

              <div className='mx-auto mb-12 lg:mb-0'>
                <img
                  alt='image'
                  src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/landing-page/1.png'
                  className='max-w-[90px] dark:brightness-150'
                />
              </div>

              <div className='mx-auto mb-12 lg:mb-0'>
                <img
                  alt='image'
                  src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/landing-page/4.png'
                  className='max-w-[90px] dark:brightness-150'
                />
              </div>

              <div className='mx-auto mb-12 lg:mb-0'>
                <img
                  alt='image'
                  src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/landing-page/5.png'
                  className='max-w-[90px] dark:brightness-150'
                />
              </div>
            </div>
          </section>
        </div>
      </div> */}
    </>
  )
}

Home.getLayout = (page: ReactNode) => <BlankLayoutLandingPage>{page}</BlankLayoutLandingPage>

Home.guestGuard = true

export default Home
