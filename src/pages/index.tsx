// ** React Imports
import { ReactNode, useEffect, useState } from 'react'

// ** slider
import HeroSlider, { Overlay, Slide, Nav } from 'hero-slider'

// ** MUI Imports
import Link from 'next/link'

import React from 'react'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// import ButtonPrimary from 'src/layouts/components/misc/ButtonPrimary'

// import { motion } from 'framer-motion'
// import getScrollAnimation from 'src/views/pages/utils/getScrollAnimation'
// import ScrollAnimationWrapper from 'src/layouts/ScrollAnimationWrapper'

// ** Configs

// ** Layout Import
import BlankLayoutLandingPage from 'src/@core/layouts/BlankLayoutLandingPage'
import Testimonials from 'src/layouts/components/home/testimonials'
import UTMForm from 'src/layouts/components/utm'
import ButtonOutline from 'src/layouts/components/misc/ButtonOutline.'

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
  const auth = useAuth()
  useEffect(() => {
    const getData = async () => {
      const characterString = await localStorage.getItem('resultNoLogin')
      if (characterString) {
        setHaveResult(true)
      }
    }
    getData()
  }, [auth])

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [haveResult, setHaveResult] = useState(false)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <UTMForm></UTMForm>
      <div className='pt-10 bg-newUIbackground'>
        <HeroSlider
          className='lg:max-h-[500px] max-h-[300px] z-15'
          autoplay
          accessibility={{
            shouldDisplayButtons: true
          }}
          controller={{
            initialSlide: 1,
            slidingDuration: 300,

            onSliding: nextSlide => console.debug('onSliding(nextSlide): ', nextSlide),
            onBeforeSliding: (previousSlide, nextSlide) =>
              console.debug('onBeforeSliding(previousSlide, nextSlide): ', previousSlide, nextSlide),
            onAfterSliding: nextSlide => console.debug('onAfterSliding(nextSlide): ', nextSlide)
          }}
        >
          {images.map((image, index) => (
            <Slide shouldRenderMask>
              <Overlay>
                <div className='flex items-center justify-center w-full'>
                  <img
                    className='z-10 object-scale-down max-w-xs transition delay-500 lg:max-w-lg md:max-w-md sm:max-w-sm animate-fade-in-bottom drop-shadow-md'
                    key={index}
                    src={`/assets/characters/${image.image}`}
                    alt={`Image ${index + 1}`}
                  ></img>
                  <span className='absolute text-6xl font-bold scale-150 z-9 text-black-300 lg:text-9xl'>
                    {image.name}
                  </span>
                </div>
              </Overlay>
            </Slide>
          ))}
        </HeroSlider>
        <div>
          <h1 className='px-10 mt-5 text-lg font-bold text-center lg:text-3xl text-black-300'>
            Discover Your Unique Strength and Potential <br />
            To Win An Abundant Life
          </h1>
          <div className='flex justify-center my-3'>
            <span className='text-sm text-center text-black-300'>
              Take less than 10 minutes to Discover Your Genius Profile
            </span>
          </div>
          <div className='relative flex items-center justify-center mt-3'>
            <Link href='/personality-test' className='absolute z-20 top-3'>
              <ButtonOutline>Take test</ButtonOutline>
            </Link>
          </div>
        </div>
      </div>

      <div className='pt-20 z-9 bg-newUIbackground' style={{ position: 'relative', zIndex: 9 }}>
        <div className='px-6 py-20 m-auto text-gray-500 md:px-12 xl:px-0'>
          <div className='grid gap-6 mx-auto md:w-3/4 lg:w-1/2 '>
            <div className='px-8 pt-12 shadow-2xl dark:shadow-none sm:px-12 lg:px-8'>
              <div className='mb-12 space-y-4'>
                <h1 className='text-2xl font-bold text-center text-black-300'>Unlock Your True Self with Level Zero</h1>
                <p className='mb-6 text-sm text-center lg:text-lg text-black-600 dark:text-gray-300'>
                  Do you ever feel lost, unsure of who you truly are and where you fit in the world?
                  <br />
                  The Level 0 personality test is your compass in this journey of self-discovery.
                </p>
                <p className='mb-6 text-sm text-center lg:text-lg text-black-600 dark:text-gray-300'>
                  It unveils the essence of your character, painting in a vivid portrait of your unique traits as a{' '}
                  <b>hero, magician, rebel, oracle, creator, ruler, protector</b>, or <b>synergist</b>. Beyond labels,
                  Level Zero empowers transformation by unlocking your hidden potential, guiding you toward personal
                  growth, meaningful relationships, and professional success. Embrace this test as the first step toward
                  a purposeful, fulfilled, and limitless future.
                  <br />
                  Your Journey starts now.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`w-full `}>
        <div className='container pt-24 mx-auto md:px-6'>
          <Testimonials></Testimonials>
        </div>
      </div>
      <div className='grid w-full pb-10 mx-auto lg:grid-cols-2'>
        <div>
          <img className='hidden lg:flex' src='/assets/Main-Page-D1.png' />
          <img className='flex lg:hidden' src='/assets/Main-Page-M1.png' />
        </div>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='mb-5 text-lg font-bold text-center lg:text-3xl text-black-300'>
            Transform Your Life with Level Zero Today
          </h1>
          <Link href='/personality-test'>
            <ButtonOutline>Take test</ButtonOutline>
          </Link>
        </div>
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
