// ** React Imports
import { ReactNode } from 'react'

import React from 'react'
import Image from 'next/image'

// import { motion } from 'framer-motion'
// import getScrollAnimation from 'src/views/pages/utils/getScrollAnimation'

// import ScrollAnimationWrapper from 'src/layouts/ScrollAnimationWrapper'
import Icon from 'src/@core/components/icon'

// ** Configs

// ** Layout Import
import BlankLayoutLandingPage from 'src/@core/layouts/BlankLayoutLandingPage'

// import Header from 'src/layouts/components/header/Header'
// import ButtonPrimary from 'src/layouts/components/misc/ButtonPrimary'

const PersonalityTypes = () => {
  // const scrollAnimation = useMemo(() => getScrollAnimation(), [])

  const heroes = [
    {
      name: '>> HERO <<',
      image1: '/assets/characters/female/hero.png',
      image2: '/assets/characters/male/hero_lvl_2.png',
      bgColor: 'bg-purple-500',
      desc: 'A heroic personality is characterized by a strong sense of duty, bravery, and a desire to make a difference. Heroes are often associated with acts of selflessness and valor and are driven by a sense of purpose or mission.      '
    },
    {
      name: '>> Magician <<',
      image1: '/assets/characters/male/MAGICIAN_LVL_2.png',
      image2: '/assets/characters/female/magician.png',
      bgColor: 'bg-purple-500',
      desc: 'A magician personality is characterized by a deep imagination of wonders of the world and a talent for harnessing the mysteries of the universe to create change. Magicians are often associated with creativity, innovation, and transformation.      '
    },
    {
      name: '>> Rebel <<',
      image1: '/assets/characters/male/rebel_lvl_2.png',
      image2: '/assets/characters/female/rebel_2.png',
      bgColor: 'bg-red-900',
      desc: 'A rebel personality is characterized by a strong desire to change and a need for freedom. Rebels are often associated with nonconformity, individualism, and a willingness to take risks.'
    },
    {
      name: '>> Oracle <<',
      image1: '/assets/characters/male/oracle_lvl_2.png',
      image2: '/assets/characters/female/oracle_2.png',
      bgColor: 'bg-red-900',
      desc: 'An oracle personality is characterized by wisdom, insight, and a deep understanding of the world. Oracles are often associated with knowledge, introspection, and a desire to understand the nature of existence, and guide others to success.'
    },
    {
      name: '>> Creator <<',
      image1: '/assets/characters/male/creator_lvl_2.png',
      image2: '/assets/characters/female/creator.png',
      bgColor: 'bg-creatorrulerbg-300',
      desc: 'A creator personality is characterized by a strong sense of creativity, originality, and innovation. Creators are often associated with artistic expression, imagination, and a desire to bring something new and unique into the world.'
    },
    {
      name: '>> Ruler <<',
      image1: '/assets/characters/male/RULER_LVL_2.png',
      image2: '/assets/characters/female/ruler_2.png',
      bgColor: 'bg-creatorrulerbg-300',
      desc: 'A ruler personality is characterized by a high level of organization, responsibility, and attention to detail. Rulers are often associated with dependability, consistency, and a strong work ethic.'
    },
    {
      name: '>> Protector <<',
      image1: '/assets/characters/male/protector_lvl_2.png',
      image2: '/assets/characters/female/protector_2.png',
      bgColor: 'bg-protectorsynergistbg-300',
      desc: 'A protector is characterized by a strong sense of loyalty and compassion, and protective of those they care about, using their strength and courage to defend the vulnerable and uphold justice. Protectors are often associated with empathy, kindness, and a willingness to put the needs of others before their own.'
    },
    {
      name: '>> Synergist <<',
      image1: '/assets/characters/male/SYNERGIST_LVL_2.png',
      image2: '/assets/characters/female/synergist.png',
      bgColor: 'bg-protectorsynergistbg-300',
      desc: 'A synergist personality is characterized by a deep sense of harmony and collaboration, making them an essential asset in any team. Synergists are often associated with someone who enhances the effectiveness or efficiency of a group or system by contributing to a common goal or objective.'
    }

    // Add more objects for additional heroes
  ]

  return (
    <>
      <div className='pt-10 mx-auto mt-20 bg-purple-500 shadow-md xl:px-16" ' id='about'>
        <div className='max-w-screen-md mx-auto mb-8 text-center lg:mb-12'>
          <h2 className='text-2xl font-extrabold tracking-tight text-gray-900 lg:text-4xl text-white-300 dark:text-white'>
            Personality Types
          </h2>
        </div>
        <div className='flex justify-center'>
          <button
            className='flex items-center justify-center px-10 py-3 bg-yellow-500 text-white-300 mb-7 rounded-2xl hover:bg-yellow-500'
            type='submit'
          >
            Find Your Type
            <Icon icon='mdi:arrow-right' />
          </button>
        </div>
      </div>
      {heroes.map((hero, index) => (
        <div key={index} className={`px-8 mx-auto ${hero.bgColor} shadow-md xl:px-16 py-10`} id='about'>
          <div className='max-w-screen-xl mx-auto '>
            <div className='flex justify-center mb-5'>
              <h1 className='text-4xl font-knewave lg:text-9xl text-white-300'>{hero.name}</h1>
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
      ))}
    </>
  )
}

PersonalityTypes.getLayout = (page: ReactNode) => <BlankLayoutLandingPage>{page}</BlankLayoutLandingPage>

PersonalityTypes.guestGuard = true

export default PersonalityTypes
