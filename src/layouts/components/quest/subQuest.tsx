import { useState, useEffect } from 'react'
import AccordionItem from './accordion'

// ** MUI Imports
import axios from 'axios'

// ** Configs
import questConfig from 'src/configs/quest'

import toast from 'react-hot-toast'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

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
  link: string
  tips: string
  code: string
  action_type: string
}

const SubQuest = (props: subQuestProps) => {
  const auth = useAuth()

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
        auth.refreshUser()
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
          <div className='relative flex flex-col items-center w-full px-3 space-y-4 text-white transition transform rounded cursor-pointer lg:px-6 hover:-translate-y-2 md:flex-row md:space-y-0'>
            <div className='z-10 flex w-full'>
              <div className='w-full lg:max-w-[90%]'>
                <AccordionItem
                  character={character}
                  header={detail.name}
                  text={detail.description}
                  type={detail.action_type}
                  status={detail.is_completed}
                  video_url={detail.file}
                  image={detail.quest_image}
                  code={detail.code}
                  id={detail.id}
                  points={detail.quest_points}
                  is_completed={detail.is_completed}
                  link={detail.link}
                  onFinishVideo={initAuth}
                ></AccordionItem>
              </div>
              {/* <div className='w-full lg:max-w-[10%] lg:flex hidden'>
                {!detail.is_completed && (
                  <div className='flex flex-col items-center justify-center pl-3'>
                    <img alt='img' src='/assets/icon/medal.png'></img>
                    <span className='pt-2 text-black-300'>+{detail.quest_points}</span>
                  </div>
                )}
              </div> */}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default SubQuest
