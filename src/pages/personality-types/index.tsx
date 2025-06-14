// ** React Imports
import { ReactNode, useState } from 'react'

import React from 'react'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { getBackground } from 'src/configs/getBackground'
import Link from 'next/link'

// import { motion } from 'framer-motion'
// import getScrollAnimation from 'src/views/pages/utils/getScrollAnimation'

// import ScrollAnimationWrapper from 'src/layouts/ScrollAnimationWrapper'

// ** Configs

// ** Layout Import
import BlankLayoutLandingPage from 'src/@core/layouts/BlankLayoutLandingPage'

interface Character {
  name: string
  image1: string
  image2: string
  bgColor: string
  desc: string
}

// import Header from 'src/layouts/components/header/Header'
// import ButtonPrimary from 'src/layouts/components/misc/ButtonPrimary'

const PersonalityTypes = () => {
  // const scrollAnimation = useMemo(() => getScrollAnimation(), [])
  const [detail, setDetail] = useState<boolean>(false)
  const [selected, setSelected] = useState<Character>()
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      partialVisibilityGutter: 100,
      items: 3
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      partialVisibilityGutter: 100,
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 40
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 40
    }
  }
  const heroes: Character[] = [
    {
      name: 'Hero',
      image1: '/assets/characters/HERO_LVL_1(NEW).png',
      image2: '/assets/characters/Hero_LVL_1_(F).png',
      bgColor: 'bg-purple-500',
      desc: 'A heroic personality is characterized by a strong sense of duty, bravery, and a desire to make a difference. Heroes are often associated with acts of selflessness and valor and are driven by a sense of purpose or mission.      '
    },
    {
      name: 'Magician',
      image1: '/assets/characters/magician_LVL_1.png',
      image2: '/assets/characters/Magician_LVL_1_(F).png',
      bgColor: 'bg-purple-500',
      desc: 'A magician personality is characterized by a deep imagination of wonders of the world and a talent for harnessing the mysteries of the universe to create change. Magicians are often associated with creativity, innovation, and transformation.      '
    },
    {
      name: 'Rebel',
      image1: '/assets/characters/rebel_LVL_0_(2).png',
      image2: '/assets/characters/Rebel_LVL_1_(F).png',
      bgColor: 'bg-red-900',
      desc: 'A rebel personality is characterized by a strong desire to change and a need for freedom. Rebels are often associated with nonconformity, individualism, and a willingness to take risks.'
    },
    {
      name: 'Oracle',
      image1: '/assets/characters/oracle_LVL_1.png',
      image2: '/assets/characters/Oracle_LVL_1_(F).png',
      bgColor: 'bg-red-900',
      desc: 'An oracle personality is characterized by wisdom, insight, and a deep understanding of the world. Oracles are often associated with knowledge, introspection, and a desire to understand the nature of existence, and guide others to success.'
    },
    {
      name: 'Creator',
      image1: '/assets/characters/CREATOR_LVL_1.png',
      image2: '/assets/characters/Creator_LVL_1_(F).png',
      bgColor: 'bg-creatorrulerbg-300',
      desc: 'A creator personality is characterized by a strong sense of creativity, originality, and innovation. Creators are often associated with artistic expression, imagination, and a desire to bring something new and unique into the world.'
    },
    {
      name: 'Ruler',
      image1: '/assets/characters/RULER_LVL_1.png',
      image2: '/assets/characters/Ruler_LVL_1_(F).png',
      bgColor: 'bg-creatorrulerbg-300',
      desc: 'As a Ruler, you possess leadership qualities, a keen sense of organization, and a natural ability to bring order and structure to any situation. You thrive in positions of authority and are driven by a deep desire to create a positive impact on others. Your ability to guide, organize, and empower sets you apart as a natural-born leader.'
    },
    {
      name: 'Protector',
      image1: '/assets/characters/protector_lvl_1.png',
      image2: '/assets/characters/Protector_LVL_1_(F).png',
      bgColor: 'bg-protectorsynergistbg-300',
      desc: 'A protector is characterized by a strong sense of loyalty and compassion, and protective of those they care about, using their strength and courage to defend the vulnerable and uphold justice. Protectors are often associated with empathy, kindness, and a willingness to put the needs of others before their own.'
    },
    {
      name: 'Synergist',
      image1: '/assets/characters/synergist_LVL_0_(2).png',
      image2: '/assets/characters/Synergist_LVL_1_(F).png',
      bgColor: 'bg-protectorsynergistbg-300',
      desc: 'A synergist personality is characterized by a deep sense of harmony and collaboration, making them an essential asset in any team. Synergists are often associated with someone who enhances the effectiveness or efficiency of a group or system by contributing to a common goal or objective.'
    }

    // Add more objects for additional heroes
  ]

  const selectType = (hero: any) => {
    console.log('hero', hero)
    setDetail(true)
    setSelected(hero)
  }

  const goBack = () => {
    setDetail(false)
    setSelected(undefined)
  }

  if (detail && selected) {
    return (
      <div className='pt-20'>
        <div className='pt-20 mx-auto xl:px-16" ' id='about'>
          <div className='max-w-screen-md mx-auto text-center '>
            <h2 className='text-2xl font-extrabold tracking-tight text-gray-900 lg:text-4xl text-black-300 dark:text-white'>
              Personality Types
            </h2>
          </div>
        </div>
        <div
          className={`relative py-10 h-screen flex-col lg:mt-10 mt-[150px]  flex justify-center items-center lg:ml-[200px] lg:rounded-tl-2xl rounded-tl-[200px] ${getBackground(
            selected?.name
          )}`}
        >
          <div className=' lg:-ml-[200px] lg:-mt-[250px] -mt-[480px]  '>
            <div className='grid lg:grid-cols-4'>
              <div className='grid grid-cols-2 lg:col-start-1 lg:col-end-3 '>
                <img className='lg:scale-150' src={selected?.image1} alt='first'></img>
                <img className='scale-100' src={selected?.image2} alt='second'></img>
              </div>

              <div className={`lg:col-start-3 lg:col-end-5 `}>
                <div className='px-5 mt-10 '>
                  <h1 className='text-3xl font-extrabold text-center lg:text-left lg:text-9xl text-white-500 '>
                    {selected?.name}
                  </h1>
                  <h1 className='mt-5 text-xl text-center lg:text-left text-white-500'>{selected?.desc}</h1>
                </div>
                <div className='flex justify-center mt-10 lg:justify-start'>
                  <Link href='/personality-test' aria-current='page'>
                    <button className='px-16 py-3 text-xl font-bold text-black-300 bg-white-500 rounded-3xl hover:opacity-80 hover:cursor-pointer'>
                      Take Test
                    </button>
                  </Link>
                </div>

                <div className='flex items-center justify-center mt-10 lg:justify-start '>
                  <button onClick={goBack}>
                    <span className='mt-2 text-center text-md lg:text-xl text-white-500'>
                      {'Find Out More Character >'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  if (!detail) {
    return (
      <div className='pt-20'>
        <div className='pt-20 mx-auto xl:px-16" ' id='about'>
          <div className='max-w-screen-md mx-auto text-center '>
            <h2 className='text-2xl font-extrabold tracking-tight text-gray-900 lg:text-4xl text-black-300 dark:text-white'>
              Personality Types
            </h2>
          </div>
        </div>

        <Carousel
          swipeable={true}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={2000}
          partialVisbile
          slidesToSlide={1}
          keyBoardControl={true}
          customTransition='transform 1000ms ease-in-out '
          transitionDuration={1000}
          containerClass='carousel-container'
          removeArrowOnDeviceType={['tablet', 'mobile']}
          itemClass='lg:px-10 px-2 mb-20'
        >
          {heroes.map((hero, index) => (
            <button
              onClick={() => {
                selectType(hero)
              }}
              key={index}
            >
              <div
                className={` relative flex flex-col justify-center px-4 items-center h-full hover:cursor-pointer hover:scale-125 transition`}
              >
                <div className='px-4 pt-10 pb-20 mt-20 mb-10 rounded-lg lg:py-20 sm:px-8 md:px-12 '></div>
                <div className={`${getBackground(hero.name)} flex flex-col justify-center lg:pb-10 pb-2  rounded-2xl`}>
                  <img src={hero.image2} alt='Characters' className='lg:mt-[-220px] mt-[-100px]' />
                  <span className='font-bold text-center lg:text-5xl text-md text-white-500'>{hero.name}</span>
                  <span className='mt-2 text-xs text-center lg:text-xl text-white-500'>{'Find Out More >'} </span>
                </div>
              </div>
            </button>
          ))}
        </Carousel>
        {/* {heroes.map((hero, index) => (
        <div key={index} className={`px-8 mx-auto ${hero.bgColor} shadow-md xl:px-16 py-10`} id='about'>
          <div className='max-w-screen-xl mx-auto '>
            <div className='flex justify-center mb-5'>
              <h1 className='text-4xl text font-knewave lg:text-9xl text-white-300'>{hero.name}</h1>
            </div>

            <div className='flex justify-center mt-10'>
              <div className='grid justify-center grid-cols-2 lg:gap-xl-12 gap-x-6 md:grid-cols-2 lg:grid-cols-2'>
                <Image src={hero.image1} alt='Characters' quality={100} width={250} height={250} />
                <Image src={hero.image2} alt='Characters' quality={100} width={250} height={250} />
              </div>
            </div>
            <div className='flex justify-center mt-10 text-center lg:px-10 lg:text-2xl text-white-300'>{hero.desc}</div>
          </div>
        </div>
      ))} */}
      </div>
    )
  }
}

PersonalityTypes.getLayout = (page: ReactNode) => <BlankLayoutLandingPage>{page}</BlankLayoutLandingPage>

PersonalityTypes.guestGuard = true

export default PersonalityTypes
