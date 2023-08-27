import { getBackground } from 'src/configs/getBackground'

import { UserDataType } from 'src/context/types'

interface Props {
  user: UserDataType
}

const ProgressQuest = (props: Props) => {
  const { user } = props

  // const [progress, setProgress] = useState<number>(0)

  // useEffect(() => {
  //   const userProgress = (user.user_points / (user.user_points + user.next_level_required_points)) * 100
  //   setProgress(userProgress)
  // }, [user.user_points, user.next_level_required_points])
  const progressStyles = {
    width: `${user.progress_percentage}%`
  }
  const progressString = ' absolute top-0 bottom-0 left-1 rounded-full ' + getBackground(user.character)

  return (
    <div className='w-full h-full lg:mr-5'>
      <div className='w-full p-1 shadow-sm bg-greyloading-300 rounded-xl'>
        <div className='relative flex items-center justify-center w-full h-9 '>
          <div className={progressString} style={progressStyles}></div>

          <div className='absolute top-0 bottom-0 flex -left-3 justify-start items-center rounded-full w-[50%] '>
            <div
              className={`relative inline-flex items-center justify-center ring-4 ring-gray-400  w-9 h-9 overflow-hidden bg-black-300  rounded-full `}
            >
              <span className='font-medium text-white-300 '>{user.character_level}</span>
            </div>
            <div className='relative flex items-start justify-start rounded-lg w-[50%] '>
              <p className='pl-3 text-xs font-bold text-center text-black-300'>{user.current_level_points} points</p>
            </div>
          </div>
          <div className='absolute flex justify-end items-center top-0 bottom-0 -right-3 rounded-lg w-[50%] '>
            <div className='relative  hidden lg:flex items-start justify-start rounded-lg w-[50%]'>
              <p className='text-xs font-bold text-center text-black-300'>
                + {user.next_level_required_points} Pts to next level!
              </p>
            </div>
            <div
              className={`relative inline-flex items-center justify-center  ring-4 ring-gray-400 w-9 h-9 overflow-hidden bg-progressGray rounded-full `}
            >
              <span className='font-medium text-white-300 '>{user.next_character_level}</span>
            </div>
          </div>

          {/* <div className='relative text-sm font-medium text-red-900'>{progress.toString()}%</div> */}
        </div>
      </div>
      <div className='relative flex items-center justify-center w-full mt-2 rounded-lg lg:hidden'>
        <p className='text-xs font-bold text-center text-black-300'>
          + {user.next_level_required_points} Pts to next level!
        </p>
      </div>
    </div>
  )
}

export default ProgressQuest
