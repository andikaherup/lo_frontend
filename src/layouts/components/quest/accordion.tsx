import { useState } from 'react'

import ReactPlayer from 'react-player/lazy'

// ** Axios
import axios from 'axios'
import FormControl from '@mui/material/FormControl'

// ** MUI Imports
import Link from 'next/link'

// ** Configs
import questConfig from 'src/configs/quest'
import { FacebookShareButton, FacebookIcon } from 'next-share'

// ** Context
import { useAuth } from 'src/hooks/useAuth'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { yupResolver } = require('@hookform/resolvers/yup')

import * as yup from 'yup'

import { useForm, Controller } from 'react-hook-form'
import StatisfactionRadio from '../misc/statisfactionRadio'
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { userAgent } from 'next/server'
>>>>>>> e72a04a (done implement quest level 1)
=======
>>>>>>> 58dbe8e (update to deploy)

interface Props {
  header: string
  text: string
  status: boolean
  video_url: string
  type: string | null
  character: string
  image: string
  link: string
  code: string
  id: number
  onFinishVideo: () => void
}

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 58dbe8e (update to deploy)
// interface occStatisfaction {
//   occupation: string
//   job_satisfaction_level: number
// }
// interface strengthShare {
//   strength_1: string
//   strength_2: string
//   strength_3: string
// }
<<<<<<< HEAD

// interface areaOfGrowthShare {
//   area_of_growth_1: string
//   area_of_growth_2: string
//   area_of_growth_3: string
// }
// interface Role {
//   role: string
//   strength: string[]
//   growth: string[]
// }
interface Role {
=======
interface occStatisfaction {
  occupation: string
  job_satisfaction_level: number
}
interface strengthShare {
  strength_1: string
  strength_2: string
  strength_3: string
}
=======
>>>>>>> 58dbe8e (update to deploy)

// interface areaOfGrowthShare {
//   area_of_growth_1: string
//   area_of_growth_2: string
//   area_of_growth_3: string
// }
// interface Role {
//   role: string
//   strength: string[]
//   growth: string[]
// }
interface Role {
<<<<<<< HEAD
  role: string
>>>>>>> e72a04a (done implement quest level 1)
=======
>>>>>>> 58dbe8e (update to deploy)
  strength: string[]
  growth: string[]
}

const occupationSchema = yup.object().shape({
  occupation: yup.string().required(),
<<<<<<< HEAD
<<<<<<< HEAD
  other_occupation: yup.string(),
=======
>>>>>>> e72a04a (done implement quest level 1)
=======
  other_occupation: yup.string(),
>>>>>>> 58dbe8e (update to deploy)
  job_satisfaction_level: yup.number().required()
})

const strengthSchema = yup.object().shape({
  strength_1: yup.string().required(),
  strength_2: yup.string().required(),
  strength_3: yup.string().required()
})

const growthSchema = yup.object().shape({
  area_of_growth_1: yup.string().required(),
  area_of_growth_2: yup.string().required(),
  area_of_growth_3: yup.string().required()
})

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 58dbe8e (update to deploy)
const roles: Role = {
  strength: [
    'Courageous leadership',
    'Resilience',
    'Empowering others',
    'Creative brilliance',
    'Resourceful problem-solving',
    'Enchanting influence',
    'Independent thinking',
    'Collaboration',
    'Embracing change',
    'Imagination and Vision',
    'Artistic Expression',
    'Innovation and Adaptability',
    'Collaborative leadership',
    'Diplomacy and conflict resolution',
    'Empathetic connection',
    'Intuitive wisdom',
    'Visionary perspective',
    'Empowering guidance',
    'Empathetic support',
    'Nurturing nature',
    'Resilient protector',
    'Strategic vision',
    'Effective decision-making',
    'Empowering leadership'
  ],
  growth: [
    'Delegating tasks',
    'Self-care',
    'Embracing vulnerability',
    'Grounding ideas',
    'Focus and execution',
    'Embracing setbacks',
    'Fearless expression',
    'Patience and diplomacy',
    'Selective rebellion',
    'Focus and Discipline',
    'Dealing with Criticism',
    'Balancing Exploration and Completion',
    'Balancing individual needs',
    'Setting boundaries',
    'Embracing constructive conflict',
    'Grounding practicality',
    'Balancing detachment and empathy',
    'Effective communication',
    'Self-care',
    'Balancing support and empowerment',
    'Setting emotional boundaries',
    'Flexibility and adaptability',
    'Delegating and trusting others',
    'Balancing authority and collaboration'
  ]
}

// const roles: Role[] = [
//   {
//     role: 'Hero',
//     strength: ['Courageous leadership', 'Resilience', 'Empowering others'],
//     growth: ['Delegating tasks', 'Self-care', 'Embracing vulnerability']
//   },
//   {
//     role: 'Magician',
//     strength: ['Creative brilliance', 'Resourceful problem-solving', 'Enchanting influence'],
//     growth: ['Grounding ideas', 'Focus and execution', 'Embracing setbacks']
//   },
//   {
//     role: 'Rebel',
//     strength: ['Independent thinking', 'Collaboration', 'Embracing change'],
//     growth: ['Fearless expression', 'Patience and diplomacy', 'Selective rebellion']
//   },
//   {
//     role: 'Creator',
//     strength: ['Imagination and Vision', 'Artistic Expression', 'Innovation and Adaptability'],
//     growth: ['Focus and Discipline', 'Dealing with Criticism', 'Balancing Exploration and Completion']
//   },
//   {
//     role: 'Synergist',
//     strength: ['Collaborative leadership', 'Diplomacy and conflict resolution', 'Empathetic connection'],
//     growth: ['Balancing individual needs', 'Setting boundaries', 'Embracing constructive conflict']
//   },
//   {
//     role: 'Oracle',
//     strength: ['Intuitive wisdom', 'Visionary perspective', 'Empowering guidance'],
//     growth: ['Grounding practicality', 'Balancing detachment and empathy', 'Effective communication']
//   },
//   {
//     role: 'Protector',
//     strength: ['Empathetic support', 'Nurturing nature', 'Resilient protector'],
//     growth: ['Self-care', 'Balancing support and empowerment', 'Setting emotional boundaries']
//   },
//   {
//     role: 'Ruler',
//     strength: ['Strategic vision', 'Effective decision-making', 'Empowering leadership'],
//     growth: ['Flexibility and adaptability', 'Delegating and trusting others', 'Balancing authority and collaboration']
//   }
// ]
<<<<<<< HEAD
=======
const roles: Role[] = [
  {
    role: 'Hero',
    strength: ['Courageous leadership', 'Resilience', 'Empowering others'],
    growth: ['Delegating tasks', 'Self-care', 'Embracing vulnerability']
  },
  {
    role: 'Magician',
    strength: ['Creative brilliance', 'Resourceful problem-solving', 'Enchanting influence'],
    growth: ['Grounding ideas', 'Focus and execution', 'Embracing setbacks']
  },
  {
    role: 'Rebel',
    strength: ['Independent thinking', 'Collaboration', 'Embracing change'],
    growth: ['Fearless expression', 'Patience and diplomacy', 'Selective rebellion']
  },
  {
    role: 'Creator',
    strength: ['Imagination and Vision', 'Artistic Expression', 'Innovation and Adaptability'],
    growth: ['Focus and Discipline', 'Dealing with Criticism', 'Balancing Exploration and Completion']
  },
  {
    role: 'Synergist',
    strength: ['Collaborative leadership', 'Diplomacy and conflict resolution', 'Empathetic connection'],
    growth: ['Balancing individual needs', 'Setting boundaries', 'Embracing constructive conflict']
  },
  {
    role: 'Oracle',
    strength: ['Intuitive wisdom', 'Visionary perspective', 'Empowering guidance'],
    growth: ['Grounding practicality', 'Balancing detachment and empathy', 'Effective communication']
  },
  {
    role: 'Protector',
    strength: ['Empathetic support', 'Nurturing nature', 'Resilient protector'],
    growth: ['Self-care', 'Balancing support and empowerment', 'Setting emotional boundaries']
  },
  {
    role: 'Ruler',
    strength: ['Strategic vision', 'Effective decision-making', 'Empowering leadership'],
    growth: ['Flexibility and adaptability', 'Delegating and trusting others', 'Balancing authority and collaboration']
  }
]
>>>>>>> e72a04a (done implement quest level 1)
=======
>>>>>>> 58dbe8e (update to deploy)

const professions: { index: number; value: string }[] = [
  { index: 0, value: 'Accountant' },
  { index: 1, value: 'Administrative Assistant' },
  { index: 2, value: 'Animator' },
  { index: 3, value: 'Archaeologist' },
  { index: 4, value: 'Architect' },
  { index: 5, value: 'Artist' },
  { index: 6, value: 'Barista' },
  { index: 7, value: 'Biologist' },
  { index: 8, value: 'Business Owner' },
  { index: 9, value: 'Carpenter' },
  { index: 10, value: 'Chef' },
  { index: 11, value: 'Customer Service Representative' },
  { index: 12, value: 'Dentist' },
  { index: 13, value: 'Doctor' },
  { index: 14, value: 'Economist' },
  { index: 15, value: 'Electrician' },
  { index: 16, value: 'Engineer' },
  { index: 17, value: 'Event Planner' },
  { index: 18, value: 'Farmer' },
  { index: 19, value: 'Financial Analyst' },
  { index: 20, value: 'Firefighter' },
  { index: 21, value: 'Fitness Instructor' },
  { index: 22, value: 'Graphic Designer' },
  { index: 23, value: 'Hairdresser' },
  { index: 24, value: 'Influencer' },
  { index: 25, value: 'IT Support Specialist' },
  { index: 26, value: 'Journalist' },
  { index: 27, value: 'Lawyer' },
  { index: 28, value: 'Librarian' },
  { index: 29, value: 'Marketing Manager' },
  { index: 30, value: 'Mechanic' },
  { index: 31, value: 'Musician' },
  { index: 32, value: 'Nurse' },
  { index: 33, value: 'Pharmacist' },
  { index: 34, value: 'Photographer' },
  { index: 35, value: 'Pilot' },
  { index: 36, value: 'Plumber' },
  { index: 37, value: 'Police Officer' },
  { index: 38, value: 'Real Estate Agent' },
  { index: 39, value: 'Retail Manager' },
  { index: 40, value: 'Sales Representative' },
  { index: 41, value: 'Scientist' },
  { index: 42, value: 'Social Worker' },
  { index: 43, value: 'Software Developer' },
  { index: 44, value: 'Teacher' },
  { index: 45, value: 'Translator' },
  { index: 46, value: 'Veterinarian' },
  { index: 47, value: 'Waiter/Waitress' },
  { index: 48, value: 'Writer' },
  { index: 49, value: 'Other' }
]

const AccordionItem = ({
  header,
  text,
  status,
  video_url,
  character,
  type,
  image,
  link,
  code,
  id,
  onFinishVideo
}: Props) => {
  const auth = useAuth()

  const [active, setActive] = useState(false)
  const [satisfaction, setSatisfaction] = useState<number>()
  const [loading, setLoading] = useState<boolean>(false)
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 58dbe8e (update to deploy)

  const [selectedOccupation, setSelectedOccupation] = useState('')

  const defaultOccupationValues = {
    occupation: '',
    other_occupation: '',
<<<<<<< HEAD
=======
  const defaultOccupationValues = {
    occupation: '',
>>>>>>> e72a04a (done implement quest level 1)
=======
>>>>>>> 58dbe8e (update to deploy)
    job_satisfaction_level: 0
  }
  const defaultStrengthValues = {
    strength_1: '',
    strength_2: '',
    strength_3: ''
  }
  const defaultGrowthValues = {
    area_of_growth_1: '',
    area_of_growth_2: '',
    area_of_growth_3: ''
  }

  const {
    control: occupationControl,
    handleSubmit: handleOccupationSubmit,
    formState: { errors: occupationError }
  } = useForm({
    defaultValues: defaultOccupationValues,
    resolver: yupResolver(occupationSchema)
  })

  const {
    control: strengthControl,
    handleSubmit: handleStrengthSubmit,
<<<<<<< HEAD
<<<<<<< HEAD
    formState: { errors: strengthError },
    setError: setStrengthError
=======
    formState: { errors: strengthError }
>>>>>>> e72a04a (done implement quest level 1)
=======
    formState: { errors: strengthError },
    setError: setStrengthError
>>>>>>> 58dbe8e (update to deploy)
  } = useForm({
    defaultValues: defaultStrengthValues,
    resolver: yupResolver(strengthSchema)
  })

  const {
    control: growthControl,
    handleSubmit: handleGrowthSubmit,
<<<<<<< HEAD
<<<<<<< HEAD
    formState: { errors: growthError },
    setError: setGrowthError
=======
    formState: { errors: growthError }
>>>>>>> e72a04a (done implement quest level 1)
=======
    formState: { errors: growthError },
    setError: setGrowthError
>>>>>>> 58dbe8e (update to deploy)
  } = useForm({
    defaultValues: defaultGrowthValues,
    resolver: yupResolver(growthSchema)
  })

  const checkHeroBrightness = (name: string): string => {
    let nams = 'text-white-300'

    if (name == 'Hero' || name == 'Magician') {
      nams = 'text-black-300'
    }

    return nams
  }

  const handleToggle = () => {
    if (type != 'no_action') setActive(!active)
  }

  const changeRadio = (value: number) => {
    console.log(value)
    setSatisfaction(value)
  }

  const shareButton = () => {
    handleVideoEnd()
  }

  const goToLinkClick = () => {
    handleVideoEnd()
  }

  const onFormSubmit = async (value: any) => {
    setLoading(true)
    if (!status) {
      let param = {}
      if (code == '5') {
        param = {
          quest: id,
          completed: true,
          data_collection: {
            occupation: value.occupation,
<<<<<<< HEAD
<<<<<<< HEAD
            other_occupation: value.other_occupation,
=======
>>>>>>> e72a04a (done implement quest level 1)
=======
            other_occupation: value.other_occupation,
>>>>>>> 58dbe8e (update to deploy)
            job_satisfaction_level: satisfaction
          }
        }
      }
      if (code == '6') {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 58dbe8e (update to deploy)
        const strengthValues = [value.strength_1, value.strength_2, value.strength_3]
        const hasDuplicates = new Set(strengthValues).size !== strengthValues.length
        if (hasDuplicates) {
          setStrengthError('root', { message: 'Select 3 unique strengths!' })
        }
        if (!hasDuplicates) {
          param = {
            quest: id,
            completed: true,
            data_collection: {
              strength_1: value.strength_1,
              strength_2: value.strength_2,
              strength_3: value.strength_3
            }
<<<<<<< HEAD
=======
        param = {
          quest: id,
          completed: true,
          data_collection: {
            strength_1: value.strength_1,
            strength_2: value.strength_2,
            strength_3: value.strength_3
>>>>>>> e72a04a (done implement quest level 1)
=======
>>>>>>> 58dbe8e (update to deploy)
          }
        }
      }
      if (code == '7') {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 58dbe8e (update to deploy)
        const growthValues = [value.area_of_growth_, value.area_of_growth_2, value.area_of_growth_3]
=======
        const growthValues = [value.area_of_growth_1, value.area_of_growth_2, value.area_of_growth_3]
>>>>>>> 70df47f (update on quest)
        const hasDuplicates = new Set(growthValues).size !== growthValues.length
        if (hasDuplicates) {
          setGrowthError('root', { message: 'Select 3 unique areas of growth!' })
        }
        if (!hasDuplicates) {
          param = {
            quest: id,
            completed: true,
            data_collection: {
              area_of_growth_1: value.area_of_growth_1,
              area_of_growth_2: value.area_of_growth_2,
              area_of_growth_3: value.area_of_growth_3
            }
<<<<<<< HEAD
=======
        param = {
          quest: id,
          completed: true,
          data_collection: {
            area_of_growth_1: value.area_of_growth_1,
            area_of_growth_2: value.area_of_growth_2,
            area_of_growth_3: value.area_of_growth_3
>>>>>>> e72a04a (done implement quest level 1)
=======
>>>>>>> 58dbe8e (update to deploy)
          }
        }
      }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 58dbe8e (update to deploy)
      // run the API call

      if (Object.keys(param).length > 0) {
        await axios
          .post(questConfig.questSubmit, param, {
            headers: { Authorization: 'Bearer ' + window.localStorage.getItem(questConfig.storageTokenKeyName)! }
          })
          .then(() => {
            onFinishVideo()
          })
          .catch(error => {
            console.log(error, 'errorr')
          })
      }
      setLoading(false)
<<<<<<< HEAD
=======
      //run the API call
      await axios
        .post(questConfig.questSubmit, param, {
          headers: { Authorization: 'Bearer ' + window.localStorage.getItem(questConfig.storageTokenKeyName)! }
        })
        .then(() => {
          setLoading(false)
          onFinishVideo()
        })
        .catch(error => {
          console.log(error, 'errorr')
        })
>>>>>>> e72a04a (done implement quest level 1)
=======
>>>>>>> 58dbe8e (update to deploy)
    }
  }

  const getBackground = (hero: string) => {
    switch (hero) {
      case 'Hero':
        return 'bg-gradient-to-r from-darkHero from-10% via-darkHero via-10% to-lightHero'

      case 'Magician':
        return 'bg-gradient-to-r from-darkMagician from-10% via-darkMagician via-10% to-lightMagician'

      case 'Rebel':
        return 'bg-gradient-to-r from-darkRebel from-10% via-darkRebel via-10% to-lightRebel'

      case 'Creator':
        return 'bg-gradient-to-r from-darkCreator from-10% via-darkCreator via-10% to-lightCreator'

      case 'Synergist':
        return 'bg-gradient-to-r from-darkGreen from-10% via-darkGreen via-10% to-lightGreen'

      case 'Oracle':
        return 'bg-gradient-to-r from-darkOracle from-10% via-darkOracle via-10% to-lightOracle'

      case 'Protector':
        return 'bg-gradient-to-r from-darkProtector from-10% via-darkProtector via-10% to-lightProtector'

      case 'Ruler':
        return 'bg-gradient-to-r from-darkBlue from-10% via-darkBlue via-10% to-lightBlue'
    }
  }

  const getTextColor = (hero: string) => {
    switch (hero) {
      case 'Hero':
      case 'Magician':
        return 'text-black-300'

      case 'Rebel':
      case 'Creator':
      case 'Synergist':
      case 'Oracle':
      case 'Protector':
      case 'Ruler':
        return 'text-white-300'
    }
  }

  const handleVideoEnd = async () => {
    // Run your function when the video finishes playing
    if (!status) {
      const param = {
        quest: id,
        completed: true
      }
      await axios
        .post(questConfig.questSubmit, param, {
          headers: { Authorization: 'Bearer ' + window.localStorage.getItem(questConfig.storageTokenKeyName)! }
        })
        .then(() => {
          onFinishVideo()
        })
        .catch(error => {
          console.log(error, 'errorr')
        })
    }
  }

  return (
    <div className={`single-faq w-full rounded-lg border border-[#F3F4FE] ${getBackground(character)}   px-5 py-3 `}>
      <button
        className={`faq-btn flex lg:flex-row-reverse ${
          type != 'no_action' ? 'cursor-pointer' : 'cursor-default'
        } flex-col-reverse items-center w-full text-left`}
        onClick={() => handleToggle()}
      >
        <div className='flex items-center justify-end w-full '>
          <span className={`text-left lg:text-md font-bold text-xs ${getTextColor(character)}`}>
            {status ? 'COMPLETED' : type == 'no_action' ? '' : 'GET STARTED'}
          </span>
          {type != 'no_action' && (
            <div className=' flex h-10 w-full max-w-[40px] items-center justify-end rounded-lg bg-opacity-10 text-primary'>
              <svg
                className={`duration-200 ease-in-out fill-primary stroke-primary ${active ? 'rotate-180' : ''}`}
                width='17'
                height='10'
                viewBox='0 0 17 10'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z'
                  fill=''
                  stroke=''
                />
              </svg>
            </div>
          )}
        </div>

        <div className='w-full'>
          <h4 className={`lg:text-lg text-sm font-semibold ${getTextColor(character)}`}>{header}</h4>
          <p className={`lg:text-md  text-xs leading-relaxed ${getTextColor(character)}`}>{text}</p>
        </div>
      </button>

      <div className={` duration-2000 my-5 w-full ease-in-out ${active ? 'block' : 'hidden'}`}>
        {video_url && type == 'watch_video' && (
          <div className='flex justify-center w-full h-full'>
            <ReactPlayer url={video_url} controls onEnded={handleVideoEnd} light={image} width='100%' />
          </div>
        )}

        {type == 'share_facebook' && (
          <>
            <FacebookShareButton
              url={`https://thel0.com/invitation/${auth.user?.referral_code}`}
              onClick={shareButton}
              quote={`I’m a ${character}! What’s yours?`}
              hashtag={'#personality-test'}
            >
              <div className='flex flex-row items-center justify-center'>
                <FacebookIcon size={32} round />
                <span className={`pl-2 ${checkHeroBrightness(character)}`}>Share Your Character on Facebook</span>
              </div>
            </FacebookShareButton>
          </>
        )}
        {type == 'click_link' && (
          <>
            <Link href={link} aria-current='page' target='_blank'>
              <button
                onClick={goToLinkClick}
                className='px-5 py-3 bg-blue-500 text-white-300 rounded-xl hover:opacity-80 hover:cursor-pointer'
              >
                Go To Link
              </button>
            </Link>
          </>
        )}

        {type == 'fill_form' && code == '5' && !status && (
          <>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 58dbe8e (update to deploy)
            <div>
              <form onSubmit={handleOccupationSubmit(onFormSubmit)}>
                <FormControl className={`flex justify-start ${checkHeroBrightness(auth.user?.character || 'Hero')}`}>
                  <div className='flex flex-col items-center justify-center'>
                    <div className='flex flex-col justify-center '>
                      <label htmlFor='occupation' className='block mb-2 text-sm font-medium dark:text-white'>
                        Your Occupation
                      </label>
                      {occupationError.occupation && (
                        <span className='text-sm text-red-900 '> This field is required</span>
                      )}
                    </div>

                    <Controller
                      name='occupation'
                      control={occupationControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <select
                          id='occupation'
                          value={value}
                          onChange={e => {
                            onChange(e)
                            setSelectedOccupation(e.target.value)
                          }}
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        >
                          <option value=''>Select an occupation</option>
                          {professions.map(prof => (
                            <option key={prof.index} value={prof.value}>
                              {prof.value}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                  </div>
                </FormControl>
                {selectedOccupation == 'Other' && (
<<<<<<< HEAD
                  <FormControl className='flex justify-center pt-5'>
<<<<<<< HEAD
=======
                  <FormControl
                    className={`flex justify-center pt-5 ${checkHeroBrightness(auth.user?.character || 'Hero')}`}
                  >
>>>>>>> 70df47f (update on quest)
                    <div className='flex flex-col items-center justify-center'>
                      <div className='flex flex-col justify-center '>
                        <label htmlFor='other_occupation' className='block mb-2 text-sm font-medium dark:text-white'>
                          Enter other occupation
                        </label>
                        {occupationError.other_occupation && (
=======
            <div className=''>
              <div>
                <form onSubmit={handleOccupationSubmit(onFormSubmit)}>
                  <FormControl className='flex justify-center'>
=======
>>>>>>> 58dbe8e (update to deploy)
                    <div className='flex flex-col items-center justify-center'>
                      <div className='flex flex-col justify-center '>
                        <label
                          htmlFor='other_occupation'
                          className='block mb-2 text-sm font-medium text-white-300 dark:text-white'
                        >
                          Enter other occupation
                        </label>
<<<<<<< HEAD
                        {occupationError.occupation && (
>>>>>>> e72a04a (done implement quest level 1)
=======
                        {occupationError.other_occupation && (
>>>>>>> 58dbe8e (update to deploy)
                          <span className='text-sm text-red-900 '> This field is required</span>
                        )}
                      </div>

                      <Controller
<<<<<<< HEAD
<<<<<<< HEAD
                        name='other_occupation'
                        control={occupationControl}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <input
                            id='other_occupation'
                            value={value}
                            onChange={onChange}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          ></input>
=======
                        name='occupation'
=======
                        name='other_occupation'
>>>>>>> 58dbe8e (update to deploy)
                        control={occupationControl}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <input
                            id='other_occupation'
                            value={value}
                            onChange={onChange}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
<<<<<<< HEAD
                          >
                            <option value=''>Choose a occupation</option>
                            {professions.map(prof => (
                              <option key={prof.index} value={prof.value}>
                                {prof.value}
                              </option>
                            ))}
                          </select>
>>>>>>> e72a04a (done implement quest level 1)
=======
                          ></input>
>>>>>>> 58dbe8e (update to deploy)
                        )}
                      />
                    </div>
                  </FormControl>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 58dbe8e (update to deploy)
                )}

                <div
                  className={`flex flex-col items-center justify-center pt-5 lg:flex-row ${checkHeroBrightness(
                    auth.user?.character || 'Hero'
                  )}`}
                >
                  <div className='flex justify-between '>
<<<<<<< HEAD
                    <label
                      htmlFor='level_of_satisfaction'
                      className='block mb-2 text-sm font-medium text-white-300 dark:text-white'
<<<<<<< HEAD
                    >
=======
                    <label htmlFor='level_of_satisfaction' className='block mb-2 text-sm font-medium dark:text-white'>
>>>>>>> 70df47f (update on quest)
                      Level of Satisfaction
                    </label>
                  </div>
                  <div>
                    <StatisfactionRadio valueRadio={satisfaction} onRadioChange={changeRadio}></StatisfactionRadio>
                  </div>
                </div>
                <div className='flex justify-center w-full pt-10'>
                  <button
                    disabled={loading}
                    type='submit'
                    className='w-1/2 px-5 py-3 bg-blue-500 lg:w-1/5 text-white-300 rounded-xl hover:opacity-80 hover:cursor-pointer'
                  >
                    Submit
                  </button>
                </div>
              </form>
=======
                  <div className='flex flex-col items-center justify-center pt-5'>
                    <div className='flex justify-between '>
                      <label
                        htmlFor='level_of_satisfaction'
                        className='block mb-2 text-lg font-medium text-white-300 dark:text-white'
                      >
                        Level of Satisfaction
                      </label>
                    </div>
                    <div>
                      <StatisfactionRadio valueRadio={satisfaction} onRadioChange={changeRadio}></StatisfactionRadio>
                    </div>
                  </div>
                  <div className='flex justify-center w-full pt-10'>
                    <button
                      disabled={loading}
                      type='submit'
                      className='w-1/2 px-5 py-3 bg-blue-500 lg:w-1/5 text-white-300 rounded-xl hover:opacity-80 hover:cursor-pointer'
=======
>>>>>>> 58dbe8e (update to deploy)
                    >
                      Level of Satisfaction
                    </label>
                  </div>
<<<<<<< HEAD
                </form>
              </div>
>>>>>>> e72a04a (done implement quest level 1)
=======
                  <div>
                    <StatisfactionRadio valueRadio={satisfaction} onRadioChange={changeRadio}></StatisfactionRadio>
                  </div>
                </div>
                <div className='flex justify-center w-full pt-10'>
                  <button
                    disabled={loading}
                    type='submit'
                    className='w-1/2 px-5 py-3 bg-blue-500 lg:w-1/5 text-white-300 rounded-xl hover:opacity-80 hover:cursor-pointer'
                  >
                    Submit
                  </button>
                </div>
              </form>
>>>>>>> 58dbe8e (update to deploy)
            </div>
          </>
        )}

        {type == 'fill_form' && code == '6' && !status && (
          <>
            <div>
              <form onSubmit={handleStrengthSubmit(onFormSubmit)}>
                <div className='flex flex-col items-start justify-center lg:justify-start lg:items-center lg:flex-row lg:gap-4'>
                  <FormControl
                    className={`flex justify-center w-full mt-2 lg:w-fit lg:mt-0 ${checkHeroBrightness(
                      auth.user?.character || 'Hero'
                    )}`}
                  >
                    <div className='flex flex-col items-start justify-center w-full'>
                      <div className='flex flex-col justify-center '>
                        <label htmlFor='strength_1' className='block mb-2 text-sm font-medium dark:text-white'>
                          Select Your First Strength
                        </label>
                        {strengthError.strength_1 && (
                          <span className='text-sm text-red-900 '> This field is required</span>
                        )}
                      </div>

                      <Controller
                        name='strength_1'
                        control={strengthControl}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <select
                            id='strength_1'
                            value={value}
                            onChange={onChange}
                            className='bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          >
                            <option value=''>Choose a First Strength</option>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 58dbe8e (update to deploy)
                            {roles.strength.map((myRole: string, index: number) => (
                              <option key={index} value={myRole}>
                                {myRole}
                              </option>
                            ))}
<<<<<<< HEAD
=======
                            {roles.map(
                              (myRole: Role, index: number) =>
                                myRole.role == auth.user?.character && (
                                  <option key={index} value={myRole.strength[0]}>
                                    {myRole.strength[0]}
                                  </option>
                                )
                            )}
>>>>>>> e72a04a (done implement quest level 1)
=======
>>>>>>> 58dbe8e (update to deploy)
                          </select>
                        )}
                      />
                    </div>
                  </FormControl>
                  <FormControl
                    className={`flex justify-center w-full mt-2 lg:w-fit lg:mt-0 ${checkHeroBrightness(
                      auth.user?.character || 'Hero'
                    )}`}
                  >
                    <div className='flex flex-col items-start justify-center w-full'>
                      <div className='flex flex-col justify-center '>
                        <label htmlFor='strength_1' className='block mb-2 text-sm font-medium dark:text-white'>
                          Select Your Second Strength
                        </label>
                        {strengthError.strength_2 && (
                          <span className='text-sm text-red-900 '> This field is required</span>
                        )}
                      </div>

                      <Controller
                        name='strength_2'
                        control={strengthControl}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <select
                            id='strength_2'
                            value={value}
                            onChange={onChange}
                            className='bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          >
                            <option value=''>Choose a Second Strength</option>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 58dbe8e (update to deploy)
                            {roles.strength.map((myRole: string, index: number) => (
                              <option key={index} value={myRole}>
                                {myRole}
                              </option>
                            ))}
<<<<<<< HEAD
=======
                            {roles.map(
                              (myRole: Role, index: number) =>
                                myRole.role == auth.user?.character && (
                                  <option key={index} value={myRole.strength[1]}>
                                    {myRole.strength[1]}
                                  </option>
                                )
                            )}
>>>>>>> e72a04a (done implement quest level 1)
=======
>>>>>>> 58dbe8e (update to deploy)
                          </select>
                        )}
                      />
                    </div>
                  </FormControl>
                  <FormControl
                    className={`flex justify-center w-full mt-2 lg:w-fit lg:mt-0 ${checkHeroBrightness(
                      auth.user?.character || 'Hero'
                    )}`}
                  >
                    <div className='flex flex-col items-start justify-center w-full'>
                      <div className='flex flex-col justify-center '>
                        <label htmlFor='strength_3' className='block mb-2 text-sm font-medium dark:text-white'>
                          Select Your Third Strength
                        </label>
                        {strengthError.strength_3 && (
                          <span className='text-sm text-red-900 '> This field is required</span>
                        )}
                      </div>

                      <Controller
                        name='strength_3'
                        control={strengthControl}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <select
                            id='strength_3'
                            value={value}
                            onChange={onChange}
                            className='bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          >
                            <option value=''>Choose a Third Strength</option>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 58dbe8e (update to deploy)
                            {roles.strength.map((myRole: string, index: number) => (
                              <option key={index} value={myRole}>
                                {myRole}
                              </option>
                            ))}
<<<<<<< HEAD
=======
                            {roles.map(
                              (myRole: Role, index: number) =>
                                myRole.role == auth.user?.character && (
                                  <option key={index} value={myRole.strength[2]}>
                                    {myRole.strength[2]}
                                  </option>
                                )
                            )}
>>>>>>> e72a04a (done implement quest level 1)
=======
>>>>>>> 58dbe8e (update to deploy)
                          </select>
                        )}
                      />
                    </div>
                  </FormControl>
                </div>
<<<<<<< HEAD
<<<<<<< HEAD

                <div className='flex flex-col items-center justify-center w-full pt-10 lg:flex-row lg:justify-start'>
=======
                <div className='flex justify-center w-full pt-10 lg:justify-start'>
>>>>>>> e72a04a (done implement quest level 1)
=======

                <div className='flex flex-col items-center justify-center w-full pt-10 lg:flex-row lg:justify-start'>
>>>>>>> 58dbe8e (update to deploy)
                  <button
                    disabled={loading}
                    type='submit'
                    className='w-1/2 px-5 py-3 bg-blue-500 lg:w-1/5 rounded-xl hover:opacity-80 hover:cursor-pointer'
                  >
                    Submit
                  </button>
<<<<<<< HEAD
<<<<<<< HEAD
                  {strengthError.root && (
                    <span className='ml-2 text-red-900 text-md '> {strengthError.root.message}</span>
                  )}
=======
>>>>>>> e72a04a (done implement quest level 1)
=======
                  {strengthError.root && (
                    <span className='ml-2 text-red-900 text-md '> {strengthError.root.message}</span>
                  )}
>>>>>>> 58dbe8e (update to deploy)
                </div>
              </form>
            </div>
          </>
        )}

        {type == 'fill_form' && code == '7' && !status && (
          <>
            <div>
              <form onSubmit={handleGrowthSubmit(onFormSubmit)}>
                <div className='flex flex-col items-start justify-center lg:justify-start lg:items-center lg:flex-row lg:gap-4'>
                  <FormControl
                    className={`flex justify-center w-full mt-2 lg:w-fit lg:mt-0 ${checkHeroBrightness(
                      auth.user?.character || 'Hero'
                    )}`}
                  >
                    <div className='flex flex-col items-start justify-center w-full'>
                      <div className='flex flex-col justify-center '>
                        <label htmlFor='area_of_growth_1' className='block mb-2 text-sm font-medium dark:text-white'>
                          Select Your First Area of Growth
                        </label>
                        {growthError.area_of_growth_1 && (
                          <span className='text-sm text-red-900 '> This field is required</span>
                        )}
                      </div>

                      <Controller
                        name='area_of_growth_1'
                        control={growthControl}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <select
                            id='area_of_growth_1'
                            value={value}
                            onChange={onChange}
                            className='bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          >
<<<<<<< HEAD
                            <option value=''>Choose a First Strength</option>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 58dbe8e (update to deploy)
=======
                            <option value=''>Choose a First Area of Growth</option>
>>>>>>> 70df47f (update on quest)
                            {roles.growth.map((myRole: string, index: number) => (
                              <option key={index} value={myRole}>
                                {myRole}
                              </option>
                            ))}
<<<<<<< HEAD
=======
                            {roles.map(
                              (myRole: Role, index: number) =>
                                myRole.role == auth.user?.character && (
                                  <option key={index} value={myRole.growth[0]}>
                                    {myRole.growth[0]}
                                  </option>
                                )
                            )}
>>>>>>> e72a04a (done implement quest level 1)
=======
>>>>>>> 58dbe8e (update to deploy)
                          </select>
                        )}
                      />
                    </div>
                  </FormControl>
                  <FormControl
                    className={`flex justify-center w-full mt-2 lg:w-fit lg:mt-0 ${checkHeroBrightness(
                      auth.user?.character || 'Hero'
                    )}`}
                  >
                    <div className='flex flex-col items-start justify-center w-full'>
                      <div className='flex flex-col justify-center '>
                        <label htmlFor='area_of_growth_2' className='block mb-2 text-sm font-medium dark:text-white'>
                          Select Your Second Area of Growth
                        </label>
                        {growthError.area_of_growth_2 && (
                          <span className='text-sm text-red-900 '> This field is required</span>
                        )}
                      </div>

                      <Controller
                        name='area_of_growth_2'
                        control={growthControl}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <select
                            id='area_of_growth_2'
                            value={value}
                            onChange={onChange}
                            className='bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          >
                            <option value=''>Choose a Second Area of Growth</option>
<<<<<<< HEAD
<<<<<<< HEAD
                            {/* {roles.map(
=======
                            {roles.map(
>>>>>>> e72a04a (done implement quest level 1)
=======
                            {/* {roles.map(
>>>>>>> 58dbe8e (update to deploy)
                              (myRole: Role, index: number) =>
                                myRole.role == auth.user?.character && (
                                  <option key={index} value={myRole.growth[1]}>
                                    {myRole.growth[1]}
                                  </option>
                                )
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 58dbe8e (update to deploy)
                            )} */}
                            {roles.growth.map((myRole: string, index: number) => (
                              <option key={index} value={myRole}>
                                {myRole}
                              </option>
                            ))}
<<<<<<< HEAD
=======
                            )}
>>>>>>> e72a04a (done implement quest level 1)
=======
>>>>>>> 58dbe8e (update to deploy)
                          </select>
                        )}
                      />
                    </div>
                  </FormControl>
                  <FormControl
                    className={`flex justify-center w-full mt-2 lg:w-fit lg:mt-0 ${checkHeroBrightness(
                      auth.user?.character || 'Hero'
                    )}`}
                  >
                    <div className='flex flex-col items-start justify-center w-full'>
                      <div className='flex flex-col justify-center '>
                        <label htmlFor='area_of_growth_3' className='block mb-2 text-sm font-medium dark:text-white'>
                          Select Your Third Area of Growth
                        </label>
                        {growthError.area_of_growth_3 && (
                          <span className='text-sm text-red-900 '> This field is required</span>
                        )}
                      </div>

                      <Controller
                        name='area_of_growth_3'
                        control={growthControl}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <select
                            id='area_of_growth_3'
                            value={value}
                            onChange={onChange}
                            className='bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          >
                            <option value=''>Choose a Third Area of Growth</option>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 58dbe8e (update to deploy)
                            {roles.growth.map((myRole: string, index: number) => (
                              <option key={index} value={myRole}>
                                {myRole}
                              </option>
                            ))}
<<<<<<< HEAD
=======
                            {roles.map(
                              (myRole: Role, index: number) =>
                                myRole.role == auth.user?.character && (
                                  <option key={index} value={myRole.growth[2]}>
                                    {myRole.growth[2]}
                                  </option>
                                )
                            )}
>>>>>>> e72a04a (done implement quest level 1)
=======
>>>>>>> 58dbe8e (update to deploy)
                          </select>
                        )}
                      />
                    </div>
                  </FormControl>
                </div>
<<<<<<< HEAD
<<<<<<< HEAD
                <div className='flex flex-col items-center justify-center w-full pt-10 lg:flex-row lg:justify-start'>
=======
                <div className='flex justify-center w-full pt-10 lg:justify-start'>
>>>>>>> e72a04a (done implement quest level 1)
=======
                <div className='flex flex-col items-center justify-center w-full pt-10 lg:flex-row lg:justify-start'>
>>>>>>> 58dbe8e (update to deploy)
                  <button
                    disabled={loading}
                    type='submit'
                    className='w-1/2 px-5 py-3 bg-blue-500 lg:w-1/5 text-white-300 rounded-xl hover:opacity-80 hover:cursor-pointer'
                  >
                    Submit
                  </button>
<<<<<<< HEAD
<<<<<<< HEAD
                  {growthError.root && <span className='ml-2 text-red-900 text-md '> {growthError.root.message}</span>}
=======
>>>>>>> e72a04a (done implement quest level 1)
=======
                  {growthError.root && <span className='ml-2 text-red-900 text-md '> {growthError.root.message}</span>}
>>>>>>> 58dbe8e (update to deploy)
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AccordionItem
