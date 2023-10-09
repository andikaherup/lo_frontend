// ** MUI Imports
import Link from 'next/link'
import React, { useState } from 'react'

// ** Context
import { useAuth } from 'src/hooks/useAuth'

// ** Type
import { Archetype } from 'src/context/characterType'

import { FacebookShareButton, FacebookIcon } from 'next-share'
import LoginDialog from '../header/loginDialog'

// import SparklingSvg from '../other/sparklingsvg'

interface Props {
  character: Archetype
  gender: string
  changeTab: (val: string) => void
}

const Overview = ({ character, gender, changeTab }: Props) => {
  const auth = useAuth()

  const checkHeroBrightness = (name: string): string => {
    let nams = 'text-white-300'

    if (name == 'Hero' || name == 'Magician') {
      nams = 'text-black-300'
    }

    return nams
  }

  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }
  const toQuest = () => {
    changeTab('Quest')
  }

  // function openModal() {
  //   console.log('here')
  //   setIsOpen(true)
  // }

  return (
    <div className={`bg-white-500`}>
      <div className={`px-8 xl:px-16 w-full  ${character.background} lg:rounded-b-[150px] rounded-b-[50px]`}>
        <div
          className={`${
            auth.user
              ? 'flex flex-col justify-center items-center w-full  py-6  sm:py-16'
              : 'flex justify-center items-center w-full h-full max-h-screen'
          }`}
        >
          {/* <div className='w-full h-screen'>
            <SparklingSvg></SparklingSvg>
          </div> */}

          <div className='flex items-center justify-center w-full lg:px-10 '>
            <div className='flex flex-col items-center justify-center'>
              <h1 className={`mb-3 text-xl lg:mb-7 font-bold lg:text-2xl ${checkHeroBrightness(character.name)}`}>
                Your Primary Genius Profile is the
              </h1>

              <h1
                className={`text-3xl font-bold lg:text-left uppercase transition duration-300 mb-3 animate-focus-in-expand lg:text-9xl ${checkHeroBrightness(
                  character.name
                )}`}
              >
                {character.name}
              </h1>
              {!auth.user && (
                <Link href='/login' aria-current='page'>
                  <button
                    className={`px-5 lg:px-10 py-2 flex justify-center items-center ${
                      character.background
                    }  outline outline-white-300 transition hover:-translate-y-1 hover:scale-110 ${checkHeroBrightness(
                      character.name
                    )} lg:text-xl font-semibold flex rounded-full`}
                  >
                    Login to view your full report
                    <svg
                      aria-hidden='true'
                      className='w-5 h-5 ml-2 -mr-1'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                  </button>
                </Link>
              )}
            </div>
          </div>

          {auth.user && (
            <div className='flex w-full mb-[-100px] lg:mb-[-200px] '>
              <div className='relative flex justify-center w-full '>
                <div className='absolute lg:top-0 top-[50px] lg:right-0 right-[-100px] rotate-90'>
                  <FacebookShareButton
                    url={`https://thel0.com/invitation/${auth.user?.referral_code}`}
                    hashtag={'#personality-test'}
                  >
                    <div className='flex flex-row items-center justify-center'>
                      <div className='hidden -rotate-90 lg:flex'>
                        <FacebookIcon size={50} round />
                      </div>
                      <div className='flex -rotate-90 lg:hidden'>
                        <FacebookIcon size={30} round />
                      </div>
                      <span className={`pl-2 font-bold text-lg lg:text-xl text-white-300 text-left  `}>
                        Share your character <br /> on Facebook
                      </span>
                    </div>
                  </FacebookShareButton>
                </div>
                <div className='flex flex-col items-center'>
                  <img
                    src={`/assets/characters/${
                      auth.user?.character_level == 0
                        ? gender == 'male'
                          ? character.lvl0_image_M
                          : character.lvl0_image_F
                        : gender == 'male'
                        ? character.lvl1_image_M
                        : character.lvl1_image_F
                    }`}
                    alt={`Image`}
                    className={`object-scale-down `}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {auth.user && (
        <>
          <div className={`px-8 xl:px-16 lg:py-20 py-10 mt-20  w-ful flex justify-center`} id='about'>
            <div className='max-w-3xl text-center lg:text-center'>
              <p className={`text-black-300 text-sm lg:text-xl`}>{character.char_description}</p>
            </div>
          </div>

          <div className={`${character.background} flex justify-center w-full `}>
            <div>
              <h1 className='-mt-3 text-4xl font-extrabold scale-150 lg:-mt-7 scale text-white-300 lg:text-9xl'>
                Wealth Creation{' '}
              </h1>
            </div>
          </div>
          <div className={`px-8 xl:px-16 lg:py-12 py-5 ${character.background} w-full`} id='about'>
            <div className='grid w-full h-full grid-flow-row grid-cols-1 lg:px-20 sm:grid-flow-col md:grid-rows-1 sm:grid-cols-8'>
              <div className='flex flex-col items-center justify-center w-full row-start-2 sm:col-start-2 sm:col-end-7 lg:items-start lg:px-10 sm:row-start-1'>
                <span className={`mb-5 text-3xl font-bold ${checkHeroBrightness(character.name)}`}>Strengths:</span>
                {character.strengths.map((strength, index) => (
                  <p key={index} className={`mb-5 ${checkHeroBrightness(character.name)} `}>
                    <span className='font-bold'>{strength.title} </span>
                    {strength.content}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <hr
            className={`h-0.5  border-t-0  bg-transparent bg-gradient-to-r from-transparent  via-white-500  to-transparent  opacity-10 dark:opacity-100`}
          />
          <div className={`px-8 xl:px-16 lg:py-12 py-5 ${character.background} w-full`} id='about'>
            <div className='grid w-full h-full grid-flow-row grid-cols-1 lg:px-20 sm:grid-flow-col md:grid-rows-1 sm:grid-cols-8'>
              <div className='flex w-full lg:pl-10 sm:col-start-2 sm:col-end-4'>
                <div className='text-center lg:text-left'>
                  <h1
                    className={`text-xl font-extrabold lg:text-left uppercase transition duration-300 mb-3 animate-focus-in-expand lg:text-4xl ${checkHeroBrightness(
                      character.name
                    )}`}
                  >
                    AREA OF GROWTH
                  </h1>
                  <img src={`/assets/characters/66.png`} alt={`Image`} className={`object-scale-down `} />
                </div>
              </div>
              <div className='flex flex-col items-center justify-center w-full row-start-2 sm:col-start-4 sm:col-end-8 lg:items-end lg:px-10 sm:row-start-1'>
                {character.area_of_growth.map((area, index) => (
                  <div key={index} className={`${character.background} rounded-xl text-center lg:text-left p-5 mb-5`}>
                    <p className={`${checkHeroBrightness(character.name)}`}>
                      <span className='font-bold'> {area.title} </span> {area.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <hr
            className={`h-0.5  border-t-0  bg-transparent bg-gradient-to-r from-transparent  via-white-500  to-transparent  opacity-10 dark:opacity-100`}
          />
          <div className={`px-8 lg:px-20 w-full lg:py-12 py-5 ${character.background} w-full`} id='about'>
            <div className='grid lg:px-20 lg:grid-cols-7'>
              <div className=' sm:col-start-3 sm:col-end-6'>
                <div className='flex items-center w-full justify-left'>
                  <div className='lg:basis-3/5'>
                    <h1
                      className={`text-2xl font-bold text-center lg:text-left lg:text-4xl ${checkHeroBrightness(
                        character.name
                      )}`}
                    >
                      Motivations and Inspirations
                    </h1>
                  </div>
                  <div className='hidden basis-2/5 lg:flex'>
                    <img src={`/assets/characters/67.png`} alt={`Image`} className={`object-scale-down  `} />
                  </div>
                </div>
              </div>
            </div>
            <div className='grid lg:px-20 lg:grid-cols-5'>
              {character.motivation_and_aspiration.map((motivation, index) => (
                <div key={index} className={`mb-6 lg:mb-0 sm:col-start-${2 + index}`}>
                  <div
                    className={`block h-full rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ${character.background} `}
                  >
                    <div className='p-6 text-center border-opacity-100 border-neutral-100 dark:border-opacity-10'>
                      <div
                        className={`flex items-center justify-center w-8 h-8 ${character.background} border rounded-full mb-4 `}
                      >
                        <span className={`text-xs font-semibold ${checkHeroBrightness(character.name)}`}>
                          {index + 1}
                        </span>
                      </div>

                      <p className={`text-left ${checkHeroBrightness(character.name)}`}>
                        <span className='font-bold'>{motivation.title}</span> {motivation.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <hr
            className={`h-0.5  border-t-0  bg-transparent bg-gradient-to-r from-transparent  via-white-500  to-transparent  opacity-10 dark:opacity-100`}
          />
          <div className={`px-8 lg:px-20 w-full lg:py-12 py-5 ${character.background} w-full`} id='about'>
            <div className='flex justify-center lg:px-20'>
              <h2
                className={`mb-20 text-xl font-bold text-center lg:w-2/3 lg:px-20 ${checkHeroBrightness(
                  character.name
                )}`}
              >
                {character.embrace_text}
              </h2>
            </div>
            <div className='grid w-full h-full grid-flow-row grid-cols-1 lg:gap-5 lg:px-20 sm:grid-flow-col md:grid-rows-1 sm:grid-cols-5'>
              {character.recommend.map((recomm, index) => (
                <div key={index} className={`mb-20 md:mb-0 sm:col-start-${2 + index}`}>
                  <div className='block h-full rounded-lg bg-white-300 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700'>
                    <div className='flex items-center justify-center '>
                      <div
                        className={`flex justify-center items-center rounded-lg -mt-[30px] ${character.background} px-3 py-4`}
                      >
                        <h1
                          className={`font-bold text-center text-md uppercase ${checkHeroBrightness(character.name)}`}
                        >
                          {recomm.title}
                        </h1>
                      </div>
                    </div>
                    <div className='p-6'>
                      <p className={`mb-6 text-sm text-black-300`}>{recomm.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <hr
            className={`h-0.5  border-t-0  bg-transparent bg-gradient-to-r from-transparent  via-white-500  to-transparent  opacity-10 dark:opacity-100`}
          />
          <div className={`px-8 lg:px-20 w-full lg:py-12 py-5 ${character.background} w-full`} id='about'>
            <div className='flex justify-center'>
              <div className={`rounded-3xl ${character.background} px-10 py-8 w-full max-w-xl`}>
                <h1 className={`mb-5 text-3xl font-bold ${checkHeroBrightness(character.name)}`}>
                  Here is how you can kick start your {character.name} journey :
                </h1>

                <p className={`${checkHeroBrightness(character.name)}`}>1. Watch our introductory video</p>
                <p className={`${checkHeroBrightness(character.name)}`}>
                  {' '}
                  2. Invite 3 friends to take the L0 Personality Test
                </p>
                <p className={`${checkHeroBrightness(character.name)}`}>3. Watch the personality level-up video</p>
                <div className='flex justify-end mt-10'>
                  <button
                    onClick={toQuest}
                    className={`px-5 lg:px-10 py-2 ${
                      character.background
                    }  outline outline-white-300 transition hover:-translate-y-1 hover:scale-110 ${checkHeroBrightness(
                      character.name
                    )} lg:text-xl font-semibold flex rounded-full`}
                  >
                    Watch Now
                    <svg
                      aria-hidden='true'
                      className='w-5 h-5 ml-2 -mr-1'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <hr
            className={`h-0.5  border-t-0  bg-transparent bg-gradient-to-r from-transparent  via-white-500  to-transparent  opacity-10 dark:opacity-100`}
          />
          <div className={`px-8 lg:px-20 w-full lg:py-12 py-5 ${character.background} w-full`} id='about'>
            <div className='flex justify-center w-full'>
              <div className='lg:p-10 lg:w-2/3'>
                <h1 className={`mb-5 text-4xl font-extrabold ${checkHeroBrightness(character.name)}`}>
                  Bonus: Complimentary Foundation Class
                </h1>
                <p className={`mb-2 ${checkHeroBrightness(character.name)}`}>{character.bonus_class.content}</p>

                <p className={`mb-2 font-bold ${checkHeroBrightness(character.name)}`}>
                  To access your Foundation Class, <b>click on the Join Now button below.</b>
                </p>

                <p className={`${checkHeroBrightness(character.name)}`}>{character.conclusion}</p>
                <div className='flex justify-end w-full mt-10'>
                  <Link
                    href='https://learnpod.clickfunnels.com/foundation-class-registration-page'
                    aria-current='page'
                    target='_blank'
                  >
                    <button
                      className={`px-5 lg:px-10 py-2 ${
                        character.background
                      }  outline outline-white-300 transition hover:-translate-y-1 hover:scale-110 ${checkHeroBrightness(
                        character.name
                      )} lg:text-xl font-semibold flex rounded-full`}
                    >
                      Join Now
                      <svg
                        aria-hidden='true'
                        className='w-5 h-5 ml-2 -mr-1'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          fillRule='evenodd'
                          d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                          clipRule='evenodd'
                        ></path>
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <LoginDialog open={isOpen} close={closeModal}></LoginDialog>
    </div>
  )
}

export default Overview
