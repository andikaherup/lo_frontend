import { ReactNode, useEffect, useState } from 'react'

import BlankLayoutLandingPage from 'src/@core/layouts/BlankLayoutLandingPage'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'

import Typography from '@mui/material/Typography'

import Link from 'next/link'

// ** MUI Imports
import axios from 'axios'

// ** Type
import { characters } from 'src/configs/characterData'

// ** Configs
import contentConfig from 'src/configs/content'

// ** Config
import authConfig from 'src/configs/auth'

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

interface UserData {
  character: string
  character_level: number
  current_level_points: number
  gender: string
  hidden_points: number
  name: string
  next_character_level: number
  next_level_required_points: number
  point_updated_at: string
  rank: number
  referral_points: number
  user_points: number
  username: string
}

interface myData {
  points_required_for_top_20: number
  user_points: number
}

const LeaderBoard = () => {
  const auth = useAuth()
  const [userList, setUserList] = useState<UserData[]>()
  const [myData, setMyData] = useState<myData>()
  const [myRank, setMyRank] = useState<number>(0)

  useEffect(() => {
    const initData = async () => {
      if (auth.user) {
        await axios
          .get(contentConfig.getAuthLeaderBoardData, {
            headers: { Authorization: 'Bearer ' + window.localStorage.getItem(contentConfig.storageTokenKeyName)! }
          })
          .then(async res => {
            console.log(res.data)
            setUserList(res.data.data)
            setMyData(res.data.logged_in_user_data)
            setMyRank(res.data.logged_in_user_rank)
          })
          .catch(() => {
            // toast.error('Something went wrong, contact Admin33')
          })
      } else {
        await axios
          .get(contentConfig.getLeaderBoardData)
          .then(async res => {
            setUserList(res.data.data)
          })
          .catch(() => {
            // toast.error('Something went wrong, contact Admin33')
          })
      }
    }

    initData()
  }, [])

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
        <div className='flex justify-center mt-10'>
          <button className='px-10 py-2 text-lg font-extrabold transition hover:-translate-y-1 hover:scale-110 text-white-300 rounded-3xl ring-2 ring-white-300'>
            INVITE
          </button>
        </div>
      </div>
      <div className='w-1/2'>
        {/* <Card className='animate-bounce'>
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
            {userList?.map((data: UserData, index: number) => {
              return (
                <Box
                  key={index}
                  className='px-8 hover:bg-gray-500'
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <div className='flex justify-center mr-10 text-black-300'>
                    <span>{index + 1}</span>
                  </div>
                  <img
                    alt='avatar'
                    src={`/assets/characters/${
                      data.character_level == 0
                        ? data.gender == 'male'
                          ? characters.find(character => character.name === data.character)?.lvl0_image_M
                          : characters.find(character => character.name === data.character)?.lvl0_image_F
                        : data.gender == 'male'
                        ? characters.find(character => character.name === data.character)?.lvl1_image_M
                        : characters.find(character => character.name === data.character)?.lvl1_image_F
                    }`}
                    width={55}
                    height={55}
                  />

                  <div className='grid w-full grid-cols-8'>
                    <Box sx={{ mr: 2, display: 'flex', mb: 0.4, flexDirection: 'column' }}>
                      <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'black' }}>
                        {data.name}
                      </Typography>
                    </Box>
                    <Box className='col-start-5' sx={{ mr: 2, display: 'flex', mb: 0.4, flexDirection: 'column' }}>
                      <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'black' }}>
                        {data.character_level}
                      </Typography>
                    </Box>
                    <Box className='flex justify-end col-start-8'>
                      <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'black' }}>
                        {data.user_points}
                      </Typography>
                    </Box>
                  </div>
                </Box>
              )
            })}
          </Box>
        </Card>
        {auth.user && (
          <div className='mt-10 rounded-lg bg-white-300'>
            <Box
              className='px-8 hover:bg-gray-500'
              sx={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <div className='flex justify-center mr-10 text-black-300'>
                <span>{myRank}</span>
              </div>
              <img alt='avatar' src='/assets/characters/Hero_LVL_0_(F).png' width='55' height='55' />

              <div className='grid w-full grid-cols-8'>
                <Box sx={{ mr: 2, display: 'flex', mb: 0.4, flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'black' }}>
                    {auth.user?.name}
                  </Typography>
                </Box>
                <Box className='col-start-5' sx={{ mr: 2, display: 'flex', mb: 0.4, flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'black' }}>
                    {auth.user?.character_level}
                  </Typography>
                </Box>
                <Box className='flex justify-end col-start-8'>
                  <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'black' }}>
                    {auth.user?.points}
                  </Typography>
                </Box>
              </div>
            </Box>
          </div>
        )} */}
        <div className='w-full'>
          <div className='w-full p-3 border rounded-2xl bg-white-300 '>
            <table className='w-full '>
              <thead className='text-xs font-semibold text-gray-400 uppercase '>
                <tr>
                  <th className='p-2 whitespace-nowrap'>
                    <div className='font-semibold text-left'></div>
                  </th>
                  <th className='p-2 whitespace-nowrap'>
                    <div className='ml-10 font-semibold text-left'>Name</div>
                  </th>
                  <th className='p-2 whitespace-nowrap'>
                    <div className='font-semibold text-left'>Level</div>
                  </th>
                  <th className='p-2 whitespace-nowrap'>
                    <div className='font-semibold text-left'>Points</div>
                  </th>
                </tr>
              </thead>
              <tbody className='text-lg divide-gray-100'>
                {userList?.map((data: UserData, index: number) => {
                  return (
                    <tr className={`${myRank == data.rank ? 'bg-yellow-300' : ''}`}>
                      <td className='p-2 whitespace-nowrap'>
                        <div className='text-lg text-center'>{data.rank}</div>
                      </td>
                      <td className='p-2 whitespace-nowrap'>
                        <div className='flex items-center'>
                          <div className='flex-shrink-0 '>
                            {data.character && (
                              <img
                                className='rounded-full'
                                src={`/assets/characters/${
                                  data.character_level == 0
                                    ? data.gender == 'male'
                                      ? characters.find(character => character.name === data.character)?.lvl0_image_M
                                      : characters.find(character => character.name === data.character)?.lvl0_image_F
                                    : data.gender == 'male'
                                    ? characters.find(character => character.name === data.character)?.lvl1_image_M
                                    : characters.find(character => character.name === data.character)?.lvl1_image_F
                                }`}
                                width='60'
                                height='60'
                                alt='character'
                              />
                            )}
                            {!data.character && (
                              <img alt='noimage' src='/assets/characters/noimage.png' width={60} height={60}></img>
                            )}
                          </div>
                          <div className='font-bold text-gray-800 '>{data.name}</div>
                        </div>
                      </td>

                      <td className='p-2 whitespace-nowrap'>
                        <div className='font-medium text-left text-green-500'>{data.character_level}</div>
                      </td>
                      <td className='p-2 whitespace-nowrap'>
                        <div className='text-lg text-left'>{data.user_points}</div>
                      </td>
                    </tr>
                  )
                })}
                {auth.user && myRank > 20 && (
                  <tr className='bg-yellow-300'>
                    <td className='p-2 whitespace-nowrap'>
                      <div className='text-lg text-center'>{myRank}</div>
                    </td>
                    <td className='p-2 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0 '>
                          {auth.user?.character && (
                            <img
                              className='rounded-full'
                              src={`/assets/characters/${
                                auth.user?.character_level == 0
                                  ? auth.user?.gender == 'male'
                                    ? characters.find(character => character.name === auth.user?.character)
                                        ?.lvl0_image_M
                                    : characters.find(character => character.name === auth.user?.character)
                                        ?.lvl0_image_F
                                  : auth.user?.gender == 'male'
                                  ? characters.find(character => character.name === auth.user?.character)?.lvl1_image_M
                                  : characters.find(character => character.name === auth.user?.character)?.lvl1_image_F
                              }`}
                              width='60'
                              height='60'
                              alt='character'
                            />
                          )}
                          {!auth.user?.character && (
                            <img alt='noimage' src='/assets/characters/noimage.png' width={60} height={60}></img>
                          )}
                        </div>
                        <div className='font-bold text-gray-800 '>{auth.user?.name}</div>
                      </div>
                    </td>

                    <td className='p-2 whitespace-nowrap'>
                      <div className='font-medium text-left text-green-500'>{auth.user?.character_level}</div>
                    </td>
                    <td className='p-2 whitespace-nowrap'>
                      <div className='text-lg text-left'>{myData?.user_points}</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

LeaderBoard.getLayout = (page: ReactNode) => <BlankLayoutLandingPage>{page}</BlankLayoutLandingPage>

LeaderBoard.guestGuard = true

export default LeaderBoard
