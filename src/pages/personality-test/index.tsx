// ** React Imports
import { ReactNode, useEffect, useState, useRef, ChangeEvent } from 'react'

// ** MUI Imports

import React from 'react'

// import ButtonPrimary from 'src/layouts/components/misc/ButtonPrimary'
import axios from 'axios'

// ** Next Import
import { useRouter } from 'next/router'

// import { motion } from 'framer-motion'
// import getScrollAnimation from 'src/views/pages/utils/getScrollAnimation'

// import ScrollAnimationWrapper from 'src/layouts/ScrollAnimationWrapper'
// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Configs
import contentConfig from 'src/configs/content'

// ** Layout Import
import BlankLayoutLandingPage from 'src/@core/layouts/BlankLayoutLandingPage'

import RadioGroup from 'src/layouts/components/misc/RadioGroupTest'

interface Questions {
  category: string
  sorting_number: number
  code: null
  created_at: string
  id: number
  question: string
  updated_at: string
}

const PersonalityTest = () => {
  // ** Hooks
  const router = useRouter()
  const auth = useAuth()

  useEffect(() => {
    //disable user to retake the test
    if (auth.user?.character) {
      router.replace('/dashboard')
    }
    const initAuth = async () => {
      await axios.get(contentConfig.getQuestion).then(async res => {
        const data: Questions[] = res.data.data

        setQuestions(data.sort((a, b) => a.sorting_number - b.sorting_number))
        setInitialLoad(true)
      })
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [initialLoad, setInitialLoad] = useState(false)
  const [questionIndex, setQuestionIndex] = useState(1)
  const [questionIndexForAnswer, setQuestionIndexForAnswer] = useState(1)
  const [questions, setQuestions] = useState<Questions[]>([])
  const questionsPerPage = 6

  const currentQuestionRef = useRef<HTMLDivElement>(null)
  const currentPage = Math.floor(questionIndex / questionsPerPage) + 1
  const currentPagePercentage = ((currentPage * questionsPerPage) / questions.length) * 100
  const [answers, setAnswers] = useState<
    { id: number; answer: number; answer_str: string; question: string; sorting_number: number }[]
  >([])

  // const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(''))
  const [selectedValue, setSelectedValue] = useState('male')

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value)
  }

  useEffect(() => {
    if (currentQuestionRef.current) {
      currentQuestionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [questionIndexForAnswer])

  const handleNext = () => {
    if (questionIndexForAnswer + questionsPerPage - 1 <= questions.length) {
      setQuestionIndex(questionIndexForAnswer)
    }
    setTimeout(() => {
      if (currentQuestionRef.current) {
        currentQuestionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
        currentQuestionRef.current.focus()
      }
    }, 300)
  }

  const SubmitAnswer = () => {
    const formData = new FormData()
    formData.append('response', JSON.stringify(answers))
    formData.append('gender', selectedValue)

    if (auth.user) {
      axios
        .post(contentConfig.getResultWithLogin, formData, {
          headers: { Authorization: 'Bearer ' + window.localStorage.getItem(contentConfig.storageTokenKeyName)! }
        })
        .then(async response => {
          localStorage.removeItem('resultNoLogin')
          window.localStorage.setItem('resultLogin', JSON.stringify(response.data.data))
          await auth.refreshUser()
          router.replace('/dashboard')
        })
        .catch(error => {
          console.log(error, 'errorr')
        })
    } else {
      axios
        .post(contentConfig.getResultWithoutLogin, formData)
        .then(response => {
          localStorage.removeItem('resultLogin')
          window.localStorage.setItem('resultNoLogin', JSON.stringify(response.data.data))
          router.replace('/result')
        })
        .catch(error => {
          console.log(error, 'errorr')
        })
    }
  }

  // const handleAnswerSelection = (index: number, value: string, question: Questions) => {
  //   console.log('index', index, 'value', value, 'questionIndexForAnswer', question)
  //   const updatedAnswers = [...answers]
  //   updatedAnswers[index] = value
  //   setAnswers(updatedAnswers)
  //   setQuestionIndexForAnswer(questionIndexForAnswer + 1)
  // }

  const determineString = (number: number): string => {
    const mapping: { [key: string]: string } = {
      1: 'strongly_disagree',
      2: 'disagree',
      3: 'neutral',
      4: 'agree',
      5: 'strongly_agree'
    }

    if (number in mapping) {
      return mapping[number]
    }

    // Return an empty string or handle the case when the number is not found in the mapping
    return ''
  }

  const handleAnswerSelection = (value: number, question: Questions) => {
    const updatedAnswers = [...answers]
    const existingAnswer = updatedAnswers.find(a => a.sorting_number === question.sorting_number)

    if (existingAnswer) {
      existingAnswer.answer = value
      existingAnswer.answer_str = determineString(value)
    } else {
      updatedAnswers.push({
        id: question.id,
        answer: value,
        answer_str: determineString(value),
        question: question.question,
        sorting_number: question.sorting_number
      })
      if (questionIndexForAnswer != questions.length) {
        setQuestionIndexForAnswer(questionIndexForAnswer + 1)
      }
    }

    setAnswers(updatedAnswers)
  }

  if (!initialLoad) return <>Loading....</>

  return (
    <div className='pt-20 bg-white-500'>
      <div className='w-full '>
        <div className='flex justify-center pt-20 lg:px-20 '>
          <h2 className='mt-10 text-2xl font-extrabold tracking-tight text-left lg:px-20 text-black-300 lg:text-4xl dark:text-white'>
            LO Personality Test
          </h2>
        </div>
        <div className='relative px-10 bg-white-500 lg:px-20'>
          <div className='absolute inset-0 w-full ' style={{ height: '50%' }}></div>
          <div className='absolute inset-0 top-1/2' style={{ height: '50%' }}></div>
          <div className='relative flex items-center justify-center py-20'>
            {/* Content */}
            <section className='text-center '>
              <div className='grid lg:px-20 lg:grid-cols-3 lg:gap-x-12'>
                <div className='mb-16 lg:mb-0'>
                  <div className='block h-full rounded-lg bg-newUIbackground dark:bg-neutral-700'>
                    <div className='p-6'>
                      <div className='flex justify-center mb-5'>
                        <img className='object-scale-down w-40' src='/assets/PersonalityTest-Page-I1.png' alt='rule1' />
                      </div>
                      <p className='text-xl font-bold text-center text-black-300 '>
                        Spend some time and choose the answer that best describes you.
                      </p>
                    </div>
                  </div>
                </div>

                <div className='mb-16 lg:mb-0'>
                  <div className='block h-full rounded-lg bg-newUIbackground dark:bg-neutral-700'>
                    <div className='p-6'>
                      <div className='flex justify-center mb-5'>
                        <img className='object-scale-down w-40' src='/assets/PersonalityTest-Page-I2.png' alt='rule2' />
                      </div>
                      <p className='text-xl font-bold text-center text-black-300 '>
                        Be as honest as possible, there is no right or wrong.
                      </p>
                    </div>
                  </div>
                </div>

                <div className=''>
                  <div className='block h-full rounded-lg bg-newUIbackground dark:bg-neutral-700'>
                    <div className='p-6'>
                      <div className='flex justify-center mb-5'>
                        <img className='object-scale-down w-40' src='/assets/PersonalityTest-Page-I3.png' alt='rule3' />
                      </div>
                      <p className='text-xl font-bold text-center text-black-300 '>
                        Try not to leave a “neutral” response.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className='flex justify-center pb-10 align-middle bg-white-500'>
          <div className='w-full rounded-full bg-newUIbackground' style={{ width: '80%' }}>
            <div
              className='flex items-center justify-end text-sm font-bold leading-none text-right rounded-full h-7 lg:h-10 bg-gradient-to-r from-button1stcolor via-button2ndcolor to-button3rdcolor lg:text-md text-white-500'
              style={{ width: `${currentPagePercentage}%` }}
            >
              {currentPagePercentage}%
            </div>
          </div>
        </div>
        {questions
          .slice((currentPage - 1) * questionsPerPage, (currentPage - 1) * questionsPerPage + questionsPerPage)
          .map((question, index) => (
            <div
              key={question.sorting_number}
              className={`flex flex-col justify-center w-full bg-white-500`}
              ref={
                question.sorting_number === questions[questionIndexForAnswer - 1].sorting_number
                  ? currentQuestionRef
                  : null
              }
            >
              <div className='flex justify-center w-full bg-white-500'>
                {index != 0 && (
                  <hr className=' my-10 h-0.5 border-t-0 bg-black-300 opacity-10' style={{ width: '75%' }} />
                )}
              </div>
              <div
                className={`flex flex-col justify-center w-full ${
                  questions[questionIndexForAnswer - 1].sorting_number === question.sorting_number
                    ? 'bg-white-500 '
                    : 'opacity-25'
                }`}
              >
                <div className='w-full '>
                  <p className='px-10 text-xl font-bold text-center text-black-300'>{question.question}</p>
                </div>
                <div className='w-full px-5 mt-10'>
                  <RadioGroup
                    disable={questions[questionIndexForAnswer - 1].sorting_number < question.sorting_number}
                    value={answers.find(answer => answer.sorting_number === question.sorting_number)?.answer || 0} // Pass the value of the corresponding question's answer
                    onChange={value => handleAnswerSelection(value, question)} // Pass the index and value of the selected answer
                  />
                </div>
              </div>
            </div>
          ))}
        {questionIndexForAnswer == questions.length && (
          <div className='w-full pt-10 bg-white-500'>
            <div className='flex justify-center w-full py-10'>
              <p className='text-center text-gray-400'>
                <span className='text-2xl text-black-300'>Your Gender</span>
                <br />
                This will determine your avatar in the results screen.
              </p>
            </div>
            <div className='flex justify-center w-full bg-white-500'>
              <select
                value={selectedValue}
                onChange={handleSelectChange}
                className='w-full max-w-xs px-4 py-2 pr-8 leading-tight border border-gray-200 rounded appearance-none lg:max-w-md text-black-500 bg-white-300 focus:outline-none focus:bg-white focus:border-gray-500'
              >
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </select>
            </div>
          </div>
        )}
        <div className='flex justify-center w-full pt-10 pb-20 bg-white-500'>
          <button
            className={`py-3 lg:py-4 px-12 lg:px-16 text-white-500 font-semibold rounded-full ${
              answers.length != currentPage * questionsPerPage
                ? 'bg-gray-500 '
                : 'hover:shadow-blue-md transition-all outline-none active bg-gradient-to-r from-button1stcolor via-button2ndcolor to-button3rdcolor'
            }   `}
            onClick={questionIndexForAnswer != questions.length ? handleNext : SubmitAnswer}
            disabled={answers.length != currentPage * questionsPerPage}
          >
            {questionIndexForAnswer == questions.length ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}

PersonalityTest.getLayout = (page: ReactNode) => <BlankLayoutLandingPage>{page}</BlankLayoutLandingPage>

PersonalityTest.guestGuard = true

export default PersonalityTest
