import { useState, useEffect } from 'react'
import AccordionItem from './accordion'

// ** MUI Imports
import axios from 'axios'

// ** Configs
import questConfig from 'src/configs/quest'
import { getBaseColor, getBaseDarkColor } from 'src/configs/getBackground'
import toast from 'react-hot-toast'

interface subQuestProps {
  id: number
  character: string
}

interface QuestDetails {
  id: number
  is_completed: boolean
  level: number
  file: string
  quest_image: string
  link_type: string | null
  name: string
  description: string
  quest_points: number
  sorting_number: number
  tips: string
}

const SubQuest = (props: subQuestProps) => {
  const { id, character } = props
  useEffect(() => {
    const initAuth = async () => {
      await axios
        .get(questConfig.getQuestById + id, {
          headers: { Authorization: 'Bearer ' + window.localStorage.getItem(questConfig.storageTokenKeyName)! }
        })
        .then(async res => {
          setDetailQuest(res.data.data)
        })
        .catch(() => {
          toast.error('Something went wrong, contact Admin22')
        })
    }

    initAuth()
  }, [id])

  const initAuth = async () => {
    await axios
      .get(questConfig.getQuestById + id, {
        headers: { Authorization: 'Bearer ' + window.localStorage.getItem(questConfig.storageTokenKeyName)! }
      })
      .then(async res => {
        setDetailQuest(res.data.data)
      })
      .catch(() => {
        toast.error('Something went wrong, contact Admin11')
      })
  }

  const [detailQuest, setDetailQuest] = useState<QuestDetails[]>([])
  const [sortedQuest, setSortedQuest] = useState<QuestDetails[]>([])

  useEffect(() => {
    const sortedQuests = detailQuest.sort((a, b) => a.sorting_number - b.sorting_number)
    setSortedQuest(sortedQuests)
  }, [detailQuest])

  return (
    <>
      {sortedQuest.map((detail, index) => (
        <div key={index}>
          {/* <li key={index} className='flex items-center justify-start w-full pl-4 mb-10 lg:ml-4'>
            <span
              className={`absolute flex items-center justify-center w-5 h-5 ${'bg-lightGreen'} rounded-full -left-4  `}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icon icon-tabler icon-tabler-check'
                width='18'
                height='18'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='white'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' />
                <path d='M5 12l5 5l10 -10' />
              </svg>
            </span>

            <div className='flex items-center justify-between w-full'>
              <AccordionItem
                character={character}
                header={detail.name}
                text={detail.description}
                type={detail.link_type}
                status={detail.is_completed}
                video_url={detail.file}
                image={detail.quest_image}
              ></AccordionItem>
              <div className='flex items-center justify-center pl-3'>
                <span className='pt-2 text-black-300'>+{detail.quest_points}</span>
                <img src='/assets/icon/medal.png'></img>
              </div>
            </div>
          </li> */}

          <div className='relative flex flex-col items-center w-full px-3 space-y-4 text-white transition transform rounded cursor-pointer lg:py-4 lg:px-6 lg:ml-10 hover:-translate-y-2 md:flex-row md:space-y-0'>
            <div
              className={`absolute lg:flex hidden z-10 mt-2 transform ${
                detail.is_completed ? getBaseDarkColor(character) : 'bg-gray-400 '
              } rounded-full w-7 h-7 -left-10 flex justify-center items-center -translate-x-2/4 md:mt-0`}
            >
              {detail.is_completed && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='4'
                  stroke='white'
                  className='w-6 h-6'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                </svg>
              )}
            </div>

            <div
              className={`lg:flex hidden absolute z-0 w-20 h-1 ${
                detail.is_completed ? 'bg-' + getBaseColor(character) : 'bg-gray-400 '
              } -left-10`}
            ></div>

            <div className='z-10 flex w-full'>
              <AccordionItem
                character={character}
                header={detail.name}
                text={detail.description}
                type={detail.link_type}
                status={detail.is_completed}
                video_url={detail.file}
                image={detail.quest_image}
                id={detail.id}
                onFinishVideo={initAuth}
              ></AccordionItem>
              <div className='flex flex-col items-center justify-center pl-3'>
                <img alt='img' src='/assets/icon/medal.png'></img>
                <span className='pt-2 text-black-300'>+{detail.quest_points}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default SubQuest
