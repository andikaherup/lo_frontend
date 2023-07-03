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

const images = [
  {
    background: 'h-screen bg-gradient-to-r from-darkHero from-10% via-darkHero via-10% to-lightHero',
    image: 'Hero_LVL_1_(F).png',
    name: 'Hero'
  },
  {
    background: 'h-screen bg-gradient-to-r from-darkHero from-10% via-darkHero via-10% to-lightHero',
    image: 'HERO_LVL_1.png',
    name: 'Hero'
  },
  {
    background: 'h-screen bg-gradient-to-r from-darkMagician from-10% via-darkMagician via-10% to-lightMagician',
    image: 'Magician_LVL_1_(F).png',
    name: 'Magician'
  },
  {
    background: 'h-screen bg-gradient-to-r from-darkMagician from-10% via-darkMagician via-10% to-lightMagician',
    image: 'magician_LVL_1.png',
    name: 'Magician'
  },
  {
    background: 'h-screen bg-gradient-to-r from-darkRebel from-10% via-darkRebel  via-10% to-lightRebel',
    image: 'Rebel_LVL_1_(F).png',
    name: 'Rebel'
  },
  {
    background: 'h-screen bg-gradient-to-r from-darkRebel from-10% via-darkRebel  via-10% to-lightRebel',
    image: 'rebel_LVL_0_(2).png',
    name: 'Rebel'
  },
  {
    background: 'h-screen bg-gradient-to-r from-darkCreator from-10% via-darkCreator  via-10% to-lightCreator',
    image: 'Creator_LVL_1_(F).png',
    name: 'Creator'
  },
  {
    background: 'h-screen bg-gradient-to-r from-darkCreator from-10% via-darkCreator  via-10% to-lightCreator',
    image: 'CREATOR_LVL_0_(2).png',
    name: 'Creator'
  },
  {
    background: 'h-screen bg-gradient-to-r from-darkGreen from-10% via-darkGreen via-10% to-lightGreen',
    image: 'Synergist_LVL_1_(F).png',
    name: 'Synergist'
  },
  {
    background: 'h-screen bg-gradient-to-r from-darkGreen from-10% via-darkGreen via-10% to-lightGreen',
    image: 'synergist_LVL_0_(2).png',
    name: 'Synergist'
  },
  {
    background: 'h-screen bg-gradient-to-r from-darkOracle from-10% via-darkOracle  via-10% to-lightOracle',
    image: 'Oracle_LVL_1_(F).png',
    name: 'Oracle'
  },
  {
    background: 'h-screen bg-gradient-to-r from-darkOracle from-10% via-darkOracle  via-10% to-lightOracle',
    image: 'oracle_LVL_1.png',
    name: 'Oracle'
  },
  {
    background: 'h-screen bg-gradient-to-r from-darkProtector from-10% via-darkProtector  via-10% to-lightProtector',
    image: 'Protector_LVL_1_(F).png',
    name: 'Protector'
  },
  {
    background: 'h-screen bg-gradient-to-r from-darkProtector from-10% via-darkProtector  via-10% to-lightProtector',
    image: 'protector_lvl_1.png',
    name: 'Protector'
  },
  {
    background: 'h-screen bg-gradient-to-r from-darkBlue from-10% via-darkBlue  via-10% to-lightBlue',
    image: 'Ruler_LVL_1_(F).png',
    name: 'Ruler'
  },
  {
    background: 'h-screen bg-gradient-to-r from-darkBlue from-10% via-darkBlue  via-10% to-lightBlue',
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
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div className={`px-8 pt-20 mx-auto xl:px-16 ${images[currentImageIndex].background}`} id='about'>
        <div className='grid h-full grid-flow-row px-20 py-6 sm:grid-flow-col md:grid-rows-1 sm:grid-cols-2 sm:py-16'>
          <div className='flex flex-col items-center justify-center row-start-2 lg:items-start lg:px-10 sm:row-start-1'>
            {/* <span className='font-medium leading-normal text-blue-500 text-1xl lg:text-2xl xl:text-2xl'>
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
              </p> */}

            <h1
              key={images[currentImageIndex].image}
              className={`text-3xl font-extrabold lg:text-left text-center uppercase transition duration-300 animate-focus-in-expand lg:text-8xl text-white-300`}
            >
              {images[currentImageIndex].name}
            </h1>
            <Link className='pt-5' href='/personality-test' aria-current='page'>
              <button className='px-3 py-2 transition duration-300 ease-in-out lg:px-10 text-md lg:text-2xl delay-50 hover:-translate-y-1 hover:scale-110 outline outline-offset-3 outline-white-500 text-white-300'>
                Start Quest
              </button>
              {/* <ButtonPrimary>Personality Test</ButtonPrimary> */}
            </Link>
          </div>
          <div className='flex w-full'>
            <div className='relative flex w-full '>
              {images.map((image, index) => (
                <>
                  <img
                    key={index}
                    src={`/assets/characters/${image.image}`}
                    alt={`Image ${index + 1}`}
                    className={`${
                      index === currentImageIndex ? 'opacity-100 flex' : 'opacity-0 hidden'
                    } transition-opacity object-scale-down animate-fade-in-bottom duration-3000 delay-150 drop-shadow-md`}
                  />
                </>
              ))}
            </div>
          </div>
        </div>
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

      <div className='container mx-auto my-24 md:px-6'>
        <section className='mb-32 text-center'>
          <h2 className='pb-4 mb-12 text-3xl font-bold text-center'>Testimonials</h2>

          <div className='grid gap-6 md:grid-cols-3 xl:gap-x-12'>
            <div className='mb-6 lg:mb-0'>
              <div className='relative block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700'>
                <div className='flex'>
                  <div
                    className='relative mx-4 -mt-4 w-full overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]'
                    data-te-ripple-init
                    data-te-ripple-color='light'
                  >
                    <img alt='image' src='https://mdbcdn.b-cdn.net/img/new/avatars/8.jpg' className='w-full' />
                    <a href='#!'>
                      <div className='absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsl(0,0%,98.4%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100'></div>
                    </a>
                  </div>
                </div>
                <div className='p-6'>
                  <h5 className='mb-2 text-lg font-bold'>John Doe</h5>
                  <h6 className='mb-4 font-medium text-primary dark:text-primary-400'>Web Developer</h6>

                  <p>
                    Ut pretium ultricies dignissim. Sed sit amet mi eget urna placerat vulputate. Ut vulputate est non
                    quam dignissim elementum. Donec a ullamcorper diam.
                  </p>
                </div>
              </div>
            </div>

            <div className='mb-6 lg:mb-0'>
              <div className='relative block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700'>
                <div className='flex'>
                  <div
                    className='relative mx-4 -mt-4 w-full overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]'
                    data-te-ripple-init
                    data-te-ripple-color='light'
                  >
                    <img alt='image' src='https://mdbcdn.b-cdn.net/img/new/avatars/6.jpg' className='w-full' />
                    <a href='#!'>
                      <div className='absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsl(0,0%,98.4%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100'></div>
                    </a>
                  </div>
                </div>
                <div className='p-6'>
                  <h5 className='mb-2 text-lg font-bold'>Halley Frank</h5>
                  <h6 className='mb-4 font-medium text-primary dark:text-primary-400'>Marketing Specialist</h6>

                  <p>
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium accusamus
                    contestatur voluptatum deleniti atque corrupti.
                  </p>
                </div>
              </div>
            </div>

            <div className='mb-0'>
              <div className='relative block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700'>
                <div className='flex'>
                  <div
                    className='relative mx-4 -mt-4 w-full overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]'
                    data-te-ripple-init
                    data-te-ripple-color='light'
                  >
                    <img alt='image' src='https://mdbcdn.b-cdn.net/img/new/avatars/18.jpg' className='w-full' />
                    <a href='#!'>
                      <div className='absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsl(0,0%,98.4%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100'></div>
                    </a>
                  </div>
                </div>
                <div className='p-6'>
                  <h5 className='mb-2 text-lg font-bold'>Lisa Trey</h5>
                  <h6 className='mb-4 font-medium text-primary dark:text-primary-400'>Public Relations</h6>

                  <p>
                    Enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
                    aliquid commodi quis nostrum minima.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

Home.getLayout = (page: ReactNode) => <BlankLayoutLandingPage>{page}</BlankLayoutLandingPage>

Home.guestGuard = true

export default Home
