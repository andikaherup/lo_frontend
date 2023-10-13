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

  // const currentURL = window.location.href
  // const urlObject = new URL(currentURL)
  // const domain = urlObject.hostname

  const downloadImage = () => {
    const imageUrl = `/assets/icon/overview/onepage-m/${character.name}-${gender == 'male' ? 'm' : 'f'}.jpg`
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = `${character.name}-report`
    link.click()
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
    <div className={`${auth.user ? 'bg-white-500' : ''}`}>
      <div
        className={`px-8 xl:px-16 w-full  ${
          auth.user ? character.background : ''
        } lg:rounded-b-[150px] rounded-b-[50px]`}
      >
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
            {!auth.user && (
              <div className='grid grid-cols-1 pt-20 rever lg:grid-cols-2'>
                <img
                  src={`/assets/icon/overview/onepage-d/${character.name}-${gender == 'male' ? 'm' : 'f'}.jpg`}
                  alt='onepage'
                  className='hidden object-scale-down blur-md lg:order-last lg:flex'
                ></img>
                <img
                  src={`/assets/icon/overview/onepage-m/${character.name}-${gender == 'male' ? 'm' : 'f'}.jpg`}
                  alt='onepage'
                  className='flex object-scale-down blur-md lg:order-last lg:hidden'
                ></img>
                <div className='flex flex-col items-center justify-center pt-10 '>
                  <h1 className={`mb-3 text-xl lg:mb-7 lg:text-left text-center font-bold lg:text-2xl text-black-300`}>
                    Your Primary Genius Profile is
                  </h1>

                  <h1
                    className={`text-3xl font-extrabold lg:text-left uppercase transition duration-300 mb-3 animate-focus-in-expand lg:text-8xl text-black-300`}
                  >
                    {character.name}
                  </h1>

                  <div className='flex'>
                    <Link href='/login' aria-current='page'>
                      <button
                        className={`px-5 lg:px-10 py-2 flex justify-center items-center ${character.background}  outline outline-white-300 transition hover:-translate-y-1 hover:scale-110 text-black-300 lg:text-xl font-semibold flex rounded-full`}
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
                  </div>
                </div>
              </div>
            )}
            {auth.user && (
              <div className='flex flex-col items-center justify-center'>
                <h1 className={`mb-3 text-xl lg:mb-7 font-bold lg:text-2xl ${checkHeroBrightness(character.name)}`}>
                  Your Primary Genius Profile is
                </h1>

                <h1
                  className={`text-3xl font-bold lg:text-left uppercase transition duration-300 mb-3 animate-focus-in-expand lg:text-9xl ${checkHeroBrightness(
                    character.name
                  )}`}
                >
                  {character.name}
                </h1>
              </div>
            )}
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
              <h1 className='-mt-3 text-4xl font-extrabold scale-150 lg:-mt-9 scale text-white-500 lg:text-9xl'>
                Wealth Creation{' '}
              </h1>
            </div>
          </div>
          <div className={`lg:px-20 xl:px-16 lg:py-12 py-5 ${character.background} w-full`} id='about'>
            <div className='lg:px-20'>
              <div className='px-5 lg:px-20'>
                <span className={`mb-5 lg:text-3xl text-xl font-bold text-white-500 `}>Path To Wealth Creation:</span>
                <p className='pt-2 mb-3 text-sm lg:pt-5 lg:text-lg text-white-500'>
                  {character.path_to_wealth.first_explanation}
                </p>

                <p className='mb-5 text-sm lg:text-lg text-white-500'>{character.path_to_wealth.second_explanation}</p>
                <div className='grid grid-flow-col grid-cols-1 lg:grid-cols-2'>
                  <img
                    src={`/assets/icon/overview/ladder/${character.name}.png`}
                    alt='ladder'
                    className='object-scale-down '
                  ></img>

                  <div>
                    <p className='mb-5 text-sm lg:text-lg text-white-500'>
                      {character.path_to_wealth.third_explanation}
                    </p>
                    <ul className='pl-3 list-disc lg:pl-0'>
                      {character.path_to_wealth.list.map((strength, index) => (
                        <li key={index} className={`mb-5 text-sm lg:text-lg ${checkHeroBrightness(character.name)} `}>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='lg:px-20'>
            <div className='lg:px-20'>
              <div className='px-5 py-20 lg:px-14'>
                <h1 className='mb-10 text-2xl font-bold text-black-300'>Career Path</h1>

                <p className='mb-5'>{character.career.career_text}</p>
                <div className='grid w-full grid-cols-3 '>
                  <ul className='w-full pl-3 list-disc lg:col-start-1 lg:col-end-2 '>
                    {character.career.list_of_career.map((career, index) => (
                      <li key={index}>{career}</li>
                    ))}
                  </ul>

                  <img
                    src={`/assets/icon/overview/career/${character.name}.png`}
                    alt='career'
                    className='object-scale-down lg:col-start-2 lg:col-end-4'
                  ></img>
                </div>
              </div>
            </div>
          </div>

          <div className={`px-8 xl:px-16 lg:py-12 py-5 w-full`} id='about'>
            <div className='w-full lg:px-20 '>
              <div className='flex flex-col justify-center w-full lg:px-20'>
                {/* <span className={`mb-5 text-[200px] font-extrabold  ${getBaseTextColor(character.name)}`}>
                  Strengths:
                </span> */}
                <img src='/assets/icon/overview/herostrength.png' alt='ladder' className='object-scale-down'></img>

                <div className='grid lg:grid-cols-2  lg:gap-32 lg:px-20 lg:-mt-[500px] lg:pb-[100px]'>
                  <div className='text-black-300'>
                    <div className='max-w-sm lg:mb-20'>
                      <span className='text-xl font-bold lg:text-2xl'>{character.strengths[0].title} </span>

                      <p className={`mb-5 lg:text-md text-sm text-black-300 text-left `}>
                        {character.strengths[0].content}
                      </p>
                    </div>
                    <div className='max-w-sm'>
                      <span className='text-xl font-bold lg:text-2xl'>{character.strengths[2].title} </span>

                      <p className={`mb-5 text-black-300 text-left lg:text-md text-sm `}>
                        {character.strengths[2].content}
                      </p>
                    </div>
                  </div>

                  <div className='flex flex-col justify-start max-w-sm lg:mt-20 lg:items-end text-black-300'>
                    <span className='text-xl font-bold lg:text-2xl'>{character.strengths[1].title} </span>

                    <p className={`mb-5 text-black-300  lg:text-right lg:text-md text-sm`}>
                      {character.strengths[1].content}
                    </p>
                  </div>
                </div>
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

          <div className={`px-8 lg:px-5 w-full lg:py-12 py-5 `} id='about'>
            <div className='lg:px-20'>
              <div className='mb-10 lg:px-20'>
                <div className='flex flex-col items-center justify-center w-full lg:px-20'>
                  <h1 className={`w-full text-xl font-bold text-center  lg:text-3xl text-black-300`}>
                    Motivations and Inspirations
                  </h1>
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
                    className={`px-5 lg:px-10 py-2 bg-gradient-to-r from-button1stcolor via-button2ndcolor to-button3rdcolor  outline outline-white-300 transition hover:-translate-y-1 hover:scale-110 ${checkHeroBrightness(
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
                    href='https://www.nextlvlconference.com/unleash2023?utm_source=int&utm_medium=level0&utm_campaign=report'
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

          <div className='pb-20 '>
            <div className=''>
              <div className='flex flex-col items-center justify-center'>
                <img
                  src={`/assets/icon/overview/onepage-d/${character.name}-${gender == 'male' ? 'm' : 'f'}.jpg`}
                  alt='onepage'
                  className='hidden object-scale-down lg:flex'
                ></img>
                <img
                  src={`/assets/icon/overview/onepage-m/${character.name}-${gender == 'male' ? 'm' : 'f'}.jpg`}
                  alt='onepage'
                  className='flex object-scale-down lg:hidden '
                ></img>
                <div className='flex pt-5'>
                  <button
                    onClick={downloadImage}
                    className={`px-5 lg:px-10 py-2  border border-gray-400 bg-newUIbackground  transition hover:-translate-y-1 hover:scale-110 text-black-300 lg:text-xl font-semibold flex rounded-full`}
                  >
                    Download
                  </button>
                  <FacebookShareButton
                    url={`https://newuistaging.thel0.com/api/char=${character.name}&gender=${gender}&onepage=true`}
                    hashtag={'#personality-test'}
                  >
                    <button
                      className={`px-5 ml-2 lg:px-10 py-2 bg-gradient-to-r from-button1stcolor via-button2ndcolor to-button3rdcolor  transition hover:-translate-y-1 hover:scale-110 ${checkHeroBrightness(
                        character.name
                      )} lg:text-xl font-semibold flex rounded-full`}
                    >
                      Share
                    </button>
                  </FacebookShareButton>
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
