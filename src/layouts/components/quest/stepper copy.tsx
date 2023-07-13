import { useState, useEffect } from 'react'

import { Quest } from 'src/context/questType'

// ** MUI Imports
import axios from 'axios'

// ** Configs
import questConfig from 'src/configs/quest'
import SubQuest from './subQuest'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

import { getBaseDarkColor } from 'src/configs/getBackground'
import toast from 'react-hot-toast'

const NewStepper = () => {
  const auth = useAuth()

  useEffect(() => {
    const initAuth = async () => {
      await axios
        .get(questConfig.getQuest, {
          headers: { Authorization: 'Bearer ' + window.localStorage.getItem(questConfig.storageTokenKeyName)! }
        })
        .then(async res => {
          console.log(res.data.data)
          setQuest(res.data.data)
          setLoad(true)
        })
        .catch(() => {
          toast.error('Something went wrong, contact Admin33')
        })
    }

    initAuth()
  }, [])

  // const [activeStep, setActiveStep] = useState(0)
  // const [isLastStep, setIsLastStep] = useState(false)
  // const [isFirstStep, setIsFirstStep] = useState(false)
  const [quest, setQuest] = useState<Quest[]>([])
  const [load, setLoad] = useState<boolean>(false)

  // const [isOpen, setIsOpen] = useState(false)
  const [sortedQuest, setSortedQuest] = useState<Quest[]>([])

  // const handleToggle = () => {
  //   setIsOpen(!isOpen)
  // }

  useEffect(() => {
    const sortedQuests = quest.sort((a, b) => a.level_number - b.level_number)
    setSortedQuest(sortedQuests)
  }, [quest])

  const determineBadge = (badgeTitle: string) => {
    switch (badgeTitle) {
      case 'INTRO':
        return 'text-textBadgeGreen bg-badgeGreen'

      case 'LEVEL 1':
        return 'text-textBadgeBlue bg-badgeBlue'
    }
  }

  if (!load) {
    return <></>
  }

  return (
    <div className='w-full lg:p-10'>
      {/* {sortedQuest.map((quest, index) => (
        <ol key={index} className='relative text-gray-500 dark:text-gray-400'>
          <li className='flex items-center justify-start w-full pl-4 mb-4 lg:ml-4'>
            <span
              className={`absolute flex items-center justify-center w-5 h-5  rounded-full -left-4 dark:ring-gray-900  ${
                'bg-' + getBaseColor('Rebel')
              }`}
            >
              <svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <circle cx='7.5' cy='7.5' r='7.5' fill='bg-orange-500' />
              </svg>
            </span>
            <div>
              <span
                className={`${determineBadge(quest.label)} ${determineBadge(
                  quest.label
                )} text-xs font-medium mr-2 px-2.5 py-0.5 rounded`}
              >
                {quest.label}
              </span>
              <h3 className='pt-2 font-medium leading-tight text-black-300'>{quest.title}</h3>
              <p className='text-sm'>{quest.description}</p>
            </div>
          </li>
          {auth.user && <SubQuest id={quest.id} character={auth.user?.character} />}
        </ol>
      ))} */}

      {sortedQuest.map((quest, index) => (
        <div key={index} className='relative w-full mb-10'>
          {auth.user && (
            // <div className={`lg:border-l-2 ${getBaseBorderColor(auth.user?.character)} `}>
            <div>
              <div className='relative flex flex-col items-start px-3 py-2 space-y-4 text-white transition transform rounded lg:py-4 lg:px-6 lg:ml-10 md:flex-row md:space-y-0'>
                <div
                  className={`lg:flex hidden absolute z-10 w-7 h-7 mt-2 transform ${getBaseDarkColor(
                    auth.user?.character
                  )} rounded-full -left-10 -translate-x-2/4 md:mt-0`}
                ></div>

                {/* <div className={`absolute z-0 w-10 h-1 bg-${getBaseColor('Rebel')} -left-10`}></div> */}

                <div>
                  <span
                    className={`${determineBadge(quest.label)} ${determineBadge(
                      quest.label
                    )} text-xs font-medium mr-2 px-2.5 py-0.5 rounded`}
                  >
                    {quest.label}
                  </span>
                  <h3 className='pt-2 font-medium leading-tight text-black-300'>{quest.title}</h3>
                  <p className='text-sm'>{quest.description}</p>
                </div>
              </div>
              <SubQuest id={quest.id} character={auth.user?.character} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default NewStepper
