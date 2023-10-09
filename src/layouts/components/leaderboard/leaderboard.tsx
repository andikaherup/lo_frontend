import { useEffect, useState } from 'react'

import Link from 'next/link'

// ** MUI Imports
import axios from 'axios'

// ** Type
import { characters } from 'src/configs/characterData'

// ** Configs
import contentConfig from 'src/configs/content'

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getCharacter = (level: number, gender: string, name: string): string => {
    if (name) {
      if (level == 0) {
        if (gender == 'male') {
          return 'L0/' + characters.find(character => character.name === name)?.lead_M || ''
        } else {
          return 'L0/' + characters.find(character => character.name === name)?.lead_F || ''
        }
      } else {
        if (gender == 'male') {
          return 'L1/' + characters.find(character => character.name === name)?.lead_M || ''
        } else {
          return 'L1/' + characters.find(character => character.name === name)?.lead_F || ''
        }
      }
    } else {
      return 'CREATOR_LVL_0.png'
    }
  }

  return (
    <div className='flex flex-col items-center justify-center w-full h-full min-h-screen bg-white-500 '>
      <div className='w-full lg:rounded-b-[150px] rounded-b-[50px]  bg-gradient-to-r from-button1stcolor pt-20 via-button2ndcolor to-button3rdcolor lg:pb-[200px] pb-[50px]'>
        <div className='w-full pt-20 mb-10'>
          <div>
            <h1 className='mb-5 text-3xl font-bold text-center lg:text-4xl text-white-300'>
              TOP {userList?.length} LEADERBOARD
            </h1>
            <p className='text-center text-md lg:text-lg text-white-300'>
              Sign up and invite friends to join the Quest
            </p>
          </div>
          <div className='flex justify-center'>
            <span className='text-xs text-center lg:text-lg text-white-300'>
              Share Level 0 and earn{' '}
              <Link href={auth.user ? '/reward' : '/login'} aria-current='page' className='underline'>
                Rewards
              </Link>{' '}
              for your referrals
            </span>
          </div>
          <div className='flex justify-center mt-5 lg:pb-10 lg:mt-10'>
            <Link href={auth.user ? '/dashboard?tab=friends' : '/login'} aria-current='page' className='underline'>
              <button className='px-5 py-2 text-sm font-bold transition lg:px-10 lg:text-lg hover:-translate-y-1 hover:scale-110 text-white-300 rounded-3xl ring-2 ring-white-300'>
                INVITE
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className='px-2 lg:w-1/2 lg:-mt-[200px] -mt-[60px]'>
        <div className='w-full '>
          {userList && userList.length > 0 && (
            <div className='flex justify-between'>
              <div>
                <div className='flex flex-col justify-center'>
                  <img
                    className='z-10 scale-90'
                    alt='avatar'
                    src={
                      userList[1].character === 'Anonymous'
                        ? '/assets/characters/podnoimage.png'
                        : `/assets/icon/leaderboard/${getCharacter(
                            userList[1].character_level,
                            userList[1].gender,
                            userList[1].character
                          )}`
                    }
                  />

                  <img
                    className='absolute z-20 lg:translate-x-20 md:translate-x-20 md:translate-y-20 translate-x-10 translate-y-6 lg:translate-y-14 md:w-[120px] lg:w-[150px] w-[70px]'
                    src={'/assets/3.png'}
                    alt='rank'
                  />

                  {/* <img className='-translate-y-3 lg:-translate-y-5' src={'/assets/podium.png'} alt='podium' /> */}
                </div>
                <div className='flex flex-col items-center'>
                  <p className='text-xs font-bold text-center lg:text-lg text-black-300'>
                    <span> {userList[1].name}</span>
                    <br />
                    <Link href={`/reward?level=${userList[1].character_level}`}>
                      <span>Level {userList[1].character_level}</span>
                    </Link>
                    <br />
                    <span className='font-normal'>Points : {userList[1].user_points}</span>
                  </p>
                </div>
              </div>
              <div>
                <div className='flex flex-col justify-center'>
                  <img
                    className='z-10 scale-125 '
                    alt='avatar'
                    src={
                      userList[0].character === 'Anonymous'
                        ? '/assets/characters/podnoimage.png'
                        : `/assets/icon/leaderboard/${getCharacter(
                            userList[0].character_level,
                            userList[0].gender,
                            userList[0].character
                          )}`
                    }
                  />
                  <img
                    className='absolute z-20 lg:translate-x-20 md:translate-x-20 md:translate-y-20 translate-x-10 translate-y-6 lg:translate-y-14 md:w-[120px] lg:w-[150px] w-[70px]'
                    src={'/assets/2.png'}
                    alt='rank'
                    width={150}
                  />
                  {/* <img className='-translate-y-3 lg:-translate-y-5' src={'/assets/podium.png'} alt='podium' /> */}
                </div>
                <div className='flex flex-col items-center pt-5'>
                  <p className='text-xs font-bold text-center lg:text-lg text-black-300'>
                    <span> {userList[0].name}</span>
                    <br />
                    <Link href={`/reward?level=${userList[0].character_level}`}>
                      <span>Level {userList[0].character_level}</span>
                    </Link>
                    <br />
                    <span className='font-normal'>Points : {userList[0].user_points}</span>
                  </p>
                </div>
              </div>
              <div>
                <div className='flex flex-col justify-center'>
                  <img
                    className={'z-10 scale-90'}
                    alt='avatar'
                    src={
                      userList[2].character === 'Anonymous'
                        ? '/assets/characters/podnoimage.png'
                        : `/assets/icon/leaderboard/${getCharacter(
                            userList[2].character_level,
                            userList[2].gender,
                            userList[2].character
                          )}`
                    }
                  />
                  <img
                    className='absolute z-20 lg:translate-x-20 md:translate-x-20 md:translate-y-20 translate-x-10 translate-y-6 lg:translate-y-14 md:w-[120px] lg:w-[150px] w-[70px]'
                    src={'/assets/4.png'}
                    alt='rank'
                    width={150}
                  />
                  {/* <img className='-translate-y-3 lg:-translate-y-5' src={'/assets/podium.png'} alt='podium' /> */}
                </div>
                <div className='flex flex-col items-center'>
                  <p className='text-xs font-bold text-center lg:text-lg text-black-300'>
                    <span>{userList[2].name}</span>
                    <br />
                    <Link href={`/reward?level=${userList[2].character_level}`}>
                      <span>Level {userList[2].character_level}</span>
                    </Link>
                    <br />
                    <span className='font-normal'>Points : {userList[2].user_points}</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className='w-full p-3 pb-20 mt-5 rounded-2xl '>
            <div className='w-full overflow-scroll text-lg bg-white max-h-[550px] bg-scroll '>
              {userList?.map((data: UserData, index: number) => {
                return (
                  // <tr key={index} className={`rounded-2xl  ${myRank == data.rank ? 'bg-yellow-300' : 'bg-gray-500'}`}>
                  //   <td className='p-2 whitespace-nowrap'>
                  //     <div className='text-sm text-center lg:text-lg'>{data.rank}</div>
                  //   </td>
                  //   <td className='p-2 whitespace-nowrap'>
                  //     <div className='flex items-center'>
                  //       <div className='flex-shrink-0 '>
                  //         {data.character && data.character != 'Anonymous' && (
                  //           <img
                  //             className='rounded-full'
                  //             src={`/assets/icon/leaderboard/${
                  //               data.character_level == 0
                  //                 ? data.gender == 'male'
                  //                   ? 'L0/' + characters.find(character => character.name === data.character)?.lead_M
                  //                   : 'L0/' + characters.find(character => character.name === data.character)?.lead_F
                  //                 : data.gender == 'male'
                  //                 ? 'L1/' + characters.find(character => character.name === data.character)?.lead_M
                  //                 : 'L1/' + characters.find(character => character.name === data.character)?.lead_F
                  //             }`}
                  //             width='60'
                  //             height='60'
                  //             alt='character'
                  //           />
                  //         )}
                  //         {(!data.character || data.character === 'Anonymous') && (
                  //           <img alt='noimage' src='/assets/characters/noimage.png' width={60} height={60}></img>
                  //         )}
                  //       </div>
                  //       <div className='text-xs font-bold text-gray-800 lg:text-lg '>{data.name}</div>
                  //     </div>
                  //   </td>

                  //   <td className='p-2 whitespace-nowrap'>
                  //     <div className='text-sm font-medium text-center text-green-500 lg:text-lg'>
                  //       <Link href={`/reward?level=${data.character_level}`}>{data.character_level}</Link>
                  //     </div>
                  //   </td>
                  //   <td className='p-2 whitespace-nowrap'>
                  // <div className='text-sm text-center lg:text-lg'>{data.user_points}</div>
                  //   </td>
                  // </tr>
                  <div
                    className={`grid w-full grid-cols-3 mb-2  rounded-3xl  ${
                      myRank == data.rank ? 'bg-yellow-300' : 'bg-greyloading-300'
                    }`}
                  >
                    <div className='flex items-center justify-start col-start-1 col-end-3 pl-5 lg:pl-10'>
                      <span className='mr-2 text-sm font-bold text-center lg:text-lg text-black-300'>{data.rank}</span>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0 '>
                          {data.character && data.character != 'Anonymous' && (
                            <img
                              className='scale-90 rounded-full lg:scale-100'
                              src={`/assets/icon/leaderboard/${
                                data.character_level == 0
                                  ? data.gender == 'male'
                                    ? 'L0/' + characters.find(character => character.name === data.character)?.lead_M
                                    : 'L0/' + characters.find(character => character.name === data.character)?.lead_F
                                  : data.gender == 'male'
                                  ? 'L1/' + characters.find(character => character.name === data.character)?.lead_M
                                  : 'L1/' + characters.find(character => character.name === data.character)?.lead_F
                              }`}
                              width='70'
                              height='70'
                              alt='character'
                            />
                          )}
                          {(!data.character || data.character === 'Anonymous') && (
                            <img alt='noimage' src='/assets/characters/noimage.png' width={60} height={60}></img>
                          )}
                        </div>
                        <div className='text-xs font-bold text-gray-800 lg:text-lg '>{data.name}</div>
                      </div>
                    </div>

                    <div className='flex items-center justify-end col-start-3 pr-5 lg:pr-10'>
                      <div className='grid grid-cols-2 gap-4 lg:gap-10'>
                        <div className='flex items-center justify-end '>
                          <Link href={`/reward?level=${data.character_level}`}>
                            <span className='text-sm text-start'>Lv. {data.character_level} </span>
                          </Link>
                        </div>
                        <div className='flex items-center justify-start'>
                          <span className='font-bold text-left text-md lg:text-lg text-purpleText'>
                            {data.user_points}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
              {auth.user && myRank > (userList?.length || 0) && (
                <tr className='bg-yellow-300'>
                  <td className='p-2 whitespace-nowrap'>
                    <div className='text-xs text-center lg:text-lg'>{myRank}</div>
                  </td>
                  <td className='p-2 whitespace-nowrap'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0 '>
                        {auth.user?.character && auth.user?.character != 'Anonymous' && (
                          <img
                            className='rounded-full'
                            src={`/assets/icon/leaderboard/${
                              auth.user?.character_level == 0
                                ? auth.user?.gender == 'male'
                                  ? 'L0/' +
                                    characters.find(character => character.name === auth.user?.character)?.lead_M
                                  : 'L0/' +
                                    characters.find(character => character.name === auth.user?.character)?.lead_F
                                : auth.user?.gender == 'male'
                                ? 'L1/' + characters.find(character => character.name === auth.user?.character)?.lead_M
                                : 'L1/' + characters.find(character => character.name === auth.user?.character)?.lead_F
                            }`}
                            width='60'
                            height='60'
                            alt='character'
                          />
                        )}
                        {!auth.user?.character ||
                          (auth.user?.character === 'Anonymous' && (
                            <img alt='noimage' src='/assets/characters/noimage.png' width={60} height={60}></img>
                          ))}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
