import { ReactNode } from 'react'

import BlankLayoutLandingPage from 'src/@core/layouts/BlankLayoutLandingPage'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'

import Typography from '@mui/material/Typography'

import Link from 'next/link'

// ** Context
import { useAuth } from 'src/hooks/useAuth'

interface DataType {
  src: string
  title: string
  imgAlt: string
  subtitle: string
  chipText: string
  imgWidth: number
  imgHeight: number
}

const data: DataType[] = [
  {
    imgWidth: 55,
    imgHeight: 55,
    chipText: '$6,500',
    title: 'Sean',
    imgAlt: '3d-illustration',
    subtitle: 'Blender Illustration',
    src: '/assets/characters/Creator_LVL 0_(F).png'
  },
  {
    imgWidth: 55,
    imgHeight: 55,
    chipText: '$4,290',
    subtitle: 'Figma UI Kit',
    title: 'Chloe',
    imgAlt: 'finance-app-design',
    src: '/assets/characters/Hero_LVL_0_(F).png'
  },
  {
    imgWidth: 55,
    imgHeight: 55,
    title: 'Chris',
    imgAlt: '4-square',
    chipText: '$44,500',
    subtitle: 'Android Application',
    src: '/assets/characters/magician_LVL_0.png'
  },
  {
    imgWidth: 55,
    imgHeight: 55,
    chipText: '$12,690',
    title: 'Steven',
    imgAlt: 'delta-web-app',
    subtitle: 'React Dashboard',
    src: '/assets/characters/Rebel_LVL_0_(F).png'
  },
  {
    imgWidth: 55,
    imgHeight: 55,
    chipText: '$10,850',
    subtitle: 'Vue + Laravel',
    title: 'Borwen',
    imgAlt: 'ecommerce-website',
    src: '/assets/characters/Ruler_LVL_0_(F).png'
  },

  {
    imgWidth: 55,
    imgHeight: 55,
    chipText: '$6,500',
    title: 'Sean',
    imgAlt: '3d-illustration',
    subtitle: 'Blender Illustration',
    src: '/assets/characters/Creator_LVL 0_(F).png'
  },
  {
    imgWidth: 55,
    imgHeight: 55,
    chipText: '$4,290',
    subtitle: 'Figma UI Kit',
    title: 'Chloe',
    imgAlt: 'finance-app-design',
    src: '/assets/characters/Hero_LVL_0_(F).png'
  },
  {
    imgWidth: 55,
    imgHeight: 55,
    title: 'Chris',
    imgAlt: '4-square',
    chipText: '$44,500',
    subtitle: 'Android Application',
    src: '/assets/characters/magician_LVL_0.png'
  },
  {
    imgWidth: 55,
    imgHeight: 55,
    chipText: '$12,690',
    title: 'Steven',
    imgAlt: 'delta-web-app',
    subtitle: 'React Dashboard',
    src: '/assets/characters/Rebel_LVL_0_(F).png'
  },
  {
    imgWidth: 55,
    imgHeight: 55,
    chipText: '$10,850',
    subtitle: 'Vue + Laravel',
    title: 'Borwen',
    imgAlt: 'ecommerce-website',
    src: '/assets/characters/Ruler_LVL_0_(F).png'
  },
  {
    imgWidth: 55,
    imgHeight: 55,
    chipText: '$6,500',
    title: 'Sean',
    imgAlt: '3d-illustration',
    subtitle: 'Blender Illustration',
    src: '/assets/characters/Creator_LVL 0_(F).png'
  },
  {
    imgWidth: 55,
    imgHeight: 55,
    chipText: '$4,290',
    subtitle: 'Figma UI Kit',
    title: 'Chloe',
    imgAlt: 'finance-app-design',
    src: '/assets/characters/Hero_LVL_0_(F).png'
  },
  {
    imgWidth: 55,
    imgHeight: 55,
    title: 'Chris',
    imgAlt: '4-square',
    chipText: '$44,500',
    subtitle: 'Android Application',
    src: '/assets/characters/magician_LVL_0.png'
  },
  {
    imgWidth: 55,
    imgHeight: 55,
    chipText: '$12,690',
    title: 'Steven',
    imgAlt: 'delta-web-app',
    subtitle: 'React Dashboard',
    src: '/assets/characters/Rebel_LVL_0_(F).png'
  },
  {
    imgWidth: 55,
    imgHeight: 55,
    chipText: '$10,850',
    subtitle: 'Vue + Laravel',
    title: 'Borwen',
    imgAlt: 'ecommerce-website',
    src: '/assets/characters/Ruler_LVL_0_(F).png'
  },
  {
    imgWidth: 55,
    imgHeight: 55,
    chipText: '$6,500',
    title: 'Sean',
    imgAlt: '3d-illustration',
    subtitle: 'Blender Illustration',
    src: '/assets/characters/Creator_LVL 0_(F).png'
  },
  {
    imgWidth: 55,
    imgHeight: 55,
    chipText: '$4,290',
    subtitle: 'Figma UI Kit',
    title: 'Chloe',
    imgAlt: 'finance-app-design',
    src: '/assets/characters/Hero_LVL_0_(F).png'
  },
  {
    imgWidth: 55,
    imgHeight: 55,
    title: 'Chris',
    imgAlt: '4-square',
    chipText: '$44,500',
    subtitle: 'Android Application',
    src: '/assets/characters/magician_LVL_0.png'
  },
  {
    imgWidth: 55,
    imgHeight: 55,
    chipText: '$12,690',
    title: 'Steven',
    imgAlt: 'delta-web-app',
    subtitle: 'React Dashboard',
    src: '/assets/characters/Rebel_LVL_0_(F).png'
  },
  {
    imgWidth: 55,
    imgHeight: 55,
    chipText: '$10,850',
    subtitle: 'Vue + Laravel',
    title: 'Borwen',
    imgAlt: 'ecommerce-website',
    src: '/assets/characters/Ruler_LVL_0_(F).png'
  }
]

const LeaderBoard = () => {
  const auth = useAuth()

  return (
    <div className='flex flex-col items-center justify-center h-full min-h-screen py-20 mt-20 bg-gradient-to-r from-rewardLightBlue to-rewardLightYellow'>
      <div className='mb-10'>
        <div>
          <h1 className='mb-5 text-6xl font-bold text-center text-white-300'>
            LEADER <br /> BOARD{' '}
          </h1>
          <span className='text-3xl font-bold text-center text-white'>
            Sign up and invite friends to join the Quest
          </span>
        </div>
        <div className='flex justify-center'>
          <span className='text-xl font-bold text-center text-white-300'>
            Share Level 0 and earn{' '}
            <Link href={auth.user ? 'rewards' : '/login'} aria-current='page' className='underline'>
              Rewards
            </Link>{' '}
            for your referrals
          </span>
        </div>
      </div>
      <div className='w-1/2'>
        <Card className='animate-bounce'>
          <Box className='bg-white-300'>
            <Box
              className='p-5 bg-gradient-to-r from-rewardLightBlue to-rewardLightYellow text-white-300'
              sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <div>
                <span className='mr-10 text-xl font-bold text-white-300'>Rank</span>
                <span className='text-xl font-bold text-white-300'>Name</span>
              </div>
              <span className='text-xl font-bold text-white-300'>Level</span>
              <span className='text-xl font-bold text-white-300'>Points</span>
            </Box>
            {data.map((item: DataType, index: number) => {
              return (
                <Box
                  key={item.title}
                  className='px-8 hover:bg-gray-500'
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: index !== data.length - 1 ? [4, 4, 5] : undefined
                  }}
                >
                  <div className='flex justify-center mr-10 text-black-300'>
                    <span>{index + 1}</span>
                  </div>
                  <img alt='avatar' src={item.src} width={item.imgWidth} height={item.imgHeight} />

                  <div className='grid w-full grid-cols-8'>
                    <Box sx={{ mr: 2, display: 'flex', mb: 0.4, flexDirection: 'column' }}>
                      <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'black' }}>
                        {item.title}
                      </Typography>
                    </Box>
                    <Box className='col-start-5' sx={{ mr: 2, display: 'flex', mb: 0.4, flexDirection: 'column' }}>
                      <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'black' }}>
                        0
                      </Typography>
                    </Box>
                    <Box className='flex justify-end col-start-8'>
                      <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'black' }}>
                        2000
                      </Typography>
                    </Box>
                  </div>
                </Box>
              )
            })}
          </Box>
        </Card>
        <div className='mt-10 rounded-lg bg-white-300'>
          <Box
            className='px-8 hover:bg-gray-500'
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <div className='flex justify-center mr-10 text-black-300'>
              <span>120</span>
            </div>
            <img alt='avatar' src='/assets/characters/Hero_LVL_0_(F).png' width='55' height='55' />

            <div className='grid w-full grid-cols-8'>
              <Box sx={{ mr: 2, display: 'flex', mb: 0.4, flexDirection: 'column' }}>
                <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'black' }}>
                  Me
                </Typography>
              </Box>
              <Box className='col-start-5' sx={{ mr: 2, display: 'flex', mb: 0.4, flexDirection: 'column' }}>
                <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'black' }}>
                  0
                </Typography>
              </Box>
              <Box className='flex justify-end col-start-8'>
                <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'black' }}>
                  50
                </Typography>
              </Box>
            </div>
          </Box>
        </div>
      </div>
    </div>
  )
}

LeaderBoard.getLayout = (page: ReactNode) => <BlankLayoutLandingPage>{page}</BlankLayoutLandingPage>

LeaderBoard.guestGuard = true

export default LeaderBoard
