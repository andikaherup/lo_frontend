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

const Leaderboard = () => {
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

  const getCharacter = (level: number, gender: string, name: string): string => {
    console.log('char', level, gender, name)
    if (name) {
      if (level == 0) {
        if (gender == 'male') {
          return characters.find(character => character.name === name)?.lvl0_image_M || ''
        } else {
          return characters.find(character => character.name === name)?.lvl0_image_F || ''
        }
      } else {
        if (gender == 'male') {
          return characters.find(character => character.name === name)?.lvl1_image_M || ''
        } else {
          return characters.find(character => character.name === name)?.lvl1_image_F || ''
        }
      }
    } else {
      return 'CREATOR_LVL_0.png'
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-full min-h-screen py-20 bg-gradient-to-b from-leaderboardTopBlue to-leaderboardBotBlue'>
      <div className='mb-10'>
        <div>
          <h1 className='mb-5 text-3xl font-bold text-center lg:text-8xl text-white-300'>LEADERBOARD</h1>
          <p className='font-bold text-center text-md lg:text-3xl text-white-300'>
            Sign up and invite friends to join the Quest
          </p>
        </div>
        <div className='flex justify-center'>
          <span className='text-xs font-bold text-center lg:text-xl text-white-300'>
            Share Level 0 and earn{' '}
            <Link href={auth.user ? '/rewards' : '/login'} aria-current='page' className='underline'>
              Rewards
            </Link>{' '}
            for your referrals
          </span>
        </div>
        <div className='flex justify-center mt-5 lg:mt-10'>
          <Link href={auth.user ? '/dashboard?tab=friends' : '/login'} aria-current='page' className='underline'>
            <button className='px-5 py-2 text-sm font-extrabold transition lg:px-10 lg:text-lg hover:-translate-y-1 hover:scale-110 text-white-300 rounded-3xl ring-2 ring-white-300'>
              INVITE
            </button>
          </Link>
        </div>
      </div>
      <div className='px-2 lg:w-1/2'>
        {/* <Card className='animate-bounce'>
          <Box className='bg-white-300'>
            <Box
              className='p-5 bg-gradient-to-r from-rewardLightBlue to-rewardLightYellow text-white-300'
              sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <div>
                <span className='mr-10 text-xl font-bold text-black-300'>Rank</span>
                <span className='text-xl font-bold text-black-300'>Name</span>
              </div>
              <span className='text-xl font-bold text-black-300'>Level</span>
              <span className='text-xl font-bold text-black-300'>Points</span>
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

        <div className='w-full pt-10 lg:pt-20'>
          {userList && userList.length > 0 && (
            <div className='flex justify-between'>
              <div>
                <div className='flex justify-center text-lg font-bold lg:text-2xl'>Rank 2</div>

                <div className='flex justify-center'>
                  <img
                    alt='avatar'
                    src={`/assets/characters/${getCharacter(
                      userList[1].character_level,
                      userList[1].gender,
                      userList[1].character
                    )}`}
                  />
                </div>
                <div className='flex flex-col items-center'>
                  <p className='text-xs font-bold text-center lg:text-lg text-white-300'>
                    <span> {userList[1].name}</span>
                    <br />
                    <span>Level {userList[1].character_level}</span>
                    <br />
                    <span>Points : {userList[1].user_points}</span>
                  </p>
                </div>
              </div>
              <div className='-translate-y-1/4'>
                <div className='flex justify-center text-lg font-bold lg:text-2xl'>Rank 1</div>
                <div className='flex flex-col justify-center'>
                  <img
                    alt='avatar'
                    src={`/assets/characters/${getCharacter(
                      userList[0].character_level,
                      userList[0].gender,
                      userList[0].character
                    )}`}
                  />
                </div>
                <div className='flex flex-col items-center'>
                  <p className='text-xs font-bold text-center lg:text-lg text-white-300'>
                    <span> {userList[0].name}</span>
                    <br />
                    <span>Level {userList[0].character_level}</span>
                    <br />
                    <span>Points : {userList[0].user_points}</span>
                  </p>
                </div>
              </div>
              <div>
                <div className='flex justify-center text-lg font-bold lg:text-2xl'>Rank 3</div>

                <div className='flex justify-center'>
                  <img
                    alt='avatar'
                    src={`/assets/characters/${getCharacter(
                      userList[2].character_level,
                      userList[2].gender,
                      userList[2].character
                    )}`}
                  />
                </div>
                <div className='flex flex-col items-center'>
                  <p className='text-xs font-bold text-center lg:text-lg text-white-300'>
                    <span>{userList[2].name}</span>
                    <br />
                    <span>Level {userList[2].character_level}</span>
                    <br />
                    <span>Points : {userList[2].user_points}</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className='w-full p-3 mt-5 rounded-2xl '>
            <table className='w-full rounded-xl bg-gradient-to-r from-rewardLightBlue to-rewardLightYellow'>
              <thead className='text-xs font-semibold uppercase lg:text-lg text-white-300 '>
                <tr>
                  <th className='px-2 py-2 lg:py-4 whitespace-nowrap'>
                    <div className='font-semibold text-left'>Rank</div>
                  </th>
                  <th className='px-2 py-2 lg:py-4 whitespace-nowrap'>
                    <div className='ml-10 font-semibold text-left'>Name</div>
                  </th>
                  <th className='px-2 py-2 lg:py-4 whitespace-nowrap'>
                    <div className='font-semibold text-left'>Level</div>
                  </th>
                  <th className='px-2 py-2 lg:py-4 whitespace-nowrap'>
                    <div className='font-semibold text-left'>Points</div>
                  </th>
                </tr>
              </thead>
              <tbody className='text-lg bg-white divide-gray-100'>
                {userList?.slice(2).map((data: UserData, index: number) => {
                  return (
                    <tr key={index} className={`${myRank == data.rank ? 'bg-yellow-300' : ''}`}>
                      <td className='p-2 whitespace-nowrap'>
                        <div className='text-sm text-center lg:text-lg'>{data.rank}</div>
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
                          <div className='text-xs font-bold text-gray-800 lg:text-lg '>{data.name}</div>
                        </div>
                      </td>

                      <td className='p-2 whitespace-nowrap'>
                        <div className='text-sm font-medium text-left text-green-500 lg:text-lg'>
                          <Link href={`/reward?level=${data.character_level}`}>{data.character_level}</Link>
                        </div>
                      </td>
                      <td className='p-2 whitespace-nowrap'>
                        <div className='text-sm text-left lg:text-lg'>{data.user_points}</div>
                      </td>
                    </tr>
                  )
                })}
                {auth.user && myRank > 20 && (
                  <tr className='bg-yellow-300'>
                    <td className='p-2 whitespace-nowrap'>
                      <div className='text-xs text-center lg:text-lg'>{myRank}</div>
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
                        <div className='text-xs font-bold text-gray-800 lg:text-lg '>{auth.user?.name}</div>
                      </div>
                    </td>

                    <td className='p-2 whitespace-nowrap'>
                      <div className='text-xs font-medium text-left text-green-500 lg:text-lg'>
                        {auth.user?.character_level}
                      </div>
                    </td>
                    <td className='p-2 whitespace-nowrap'>
                      <div className='text-xs text-left lg:text-lg'>{myData?.user_points}</div>
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

export default Leaderboard
