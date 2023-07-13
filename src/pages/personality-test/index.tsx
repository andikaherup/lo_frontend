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
    const initAuth = async () => {
      await axios.get(contentConfig.getQuestion).then(async res => {
        const data: Questions[] = res.data.data

        setQuestions(data.sort((a, b) => a.sorting_number - b.sorting_number))
        setInitialLoad(true)
      })
    }

    initAuth()
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
    console.log('questionIndnexAnswer', questionIndexForAnswer, questionIndex, currentPage)
    const updatedAnswers = [...answers]
    const existingAnswer = updatedAnswers.find(a => a.sorting_number === question.sorting_number)

    if (existingAnswer) {
      existingAnswer.answer = value
      existingAnswer.answer_str = determineString(value)
    } else {
      console.log('here push')
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
    <>
      <div className='w-full '>
        <div className='flex justify-center pt-20 lg:px-20 bg-skyblue-500'>
          <h2 className='mt-10 text-2xl font-extrabold tracking-tight text-left lg:px-20 text-black-300 lg:text-4xl dark:text-white'>
            LO Personality Test
          </h2>
        </div>
        <div className='relative px-10 lg:px-20'>
          <div className='absolute inset-0 w-full bg-skyblue-500' style={{ height: '50%' }}></div>
          <div className='absolute inset-0 bg-white-500 top-1/2' style={{ height: '50%' }}></div>
          <div className='relative flex items-center justify-center py-20'>
            {/* Content */}
            <section className='text-center '>
              <div className='grid lg:px-20 lg:grid-cols-3 lg:gap-x-12'>
                <div className='mb-16 lg:mb-0'>
                  <div className='block h-full rounded-lg bg-cardbg-300 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700'>
                    <div className='p-6'>
                      <div className='flex justify-center mb-5'>
                        <svg width='67' height='88' viewBox='0 0 67 88' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M47.3561 34.8405C53.1879 29.5236 61.0743 22.3328 61.7931 5.15385H67V0H0V5.15385H5.20693C5.92572 22.3328 13.8121 29.5236 19.6439 34.8405C23.5558 38.4072 25.7692 40.5901 25.7692 43.9795C25.7692 47.3688 23.5558 49.5518 19.6439 53.1185C13.8121 58.4353 5.92572 65.6262 5.20693 82.8051H0V87.959H67V82.8051H61.7931C61.0743 65.6262 53.1879 58.4353 47.3561 53.1185C43.4442 49.5518 41.2308 47.3688 41.2308 43.9795C41.2308 40.5901 43.4442 38.4072 47.3561 34.8405ZM30.9231 63.2958C30.1272 63.46 29.3408 63.699 28.5734 64.0164L12.7894 70.5479C15.3671 63.9939 19.5186 60.2071 23.1162 56.9272C27.1311 53.2667 30.9231 49.8093 30.9231 43.9795V63.2958ZM43.8838 56.9272C47.4814 60.2071 51.6328 63.9939 54.2106 70.5477L38.4266 64.0163C37.6592 63.6988 36.8728 63.4598 36.0769 63.2956V43.9795C36.0769 49.8093 39.8689 53.2667 43.8838 56.9272ZM12.6989 17.1795C11.4529 13.9327 10.5924 10.0125 10.3671 5.15385H56.6327C56.4075 10.0125 55.5471 13.9327 54.3009 17.1795H12.6989Z'
                            fill='#21978B'
                          />
                        </svg>
                      </div>
                      <p className='text-neutral-500 dark:text-neutral-300'>
                        Spend some time and choose the answer that best describes you.
                      </p>
                    </div>
                  </div>
                </div>

                <div className='mb-16 lg:mb-0'>
                  <div className='block h-full rounded-lg bg-cardbg-300 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700'>
                    <div className='p-6'>
                      <div className='flex justify-center mb-5'>
                        <svg width='95' height='95' viewBox='0 0 95 95' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <g clipPath='url(#clip0_182_11749)'>
                            <path
                              d='M14.1087 16.8501H48.5429C50.0758 16.8501 51.3188 15.6071 51.3188 14.0734C51.3188 12.5398 50.0758 11.2967 48.5429 11.2967H14.1087C12.5751 11.2967 11.332 12.5398 11.332 14.0734C11.332 15.6071 12.5751 16.8501 14.1087 16.8501Z'
                              fill='#21978B'
                            />
                            <path
                              d='M14.1087 27.9567H48.5429C50.0758 27.9567 51.3188 26.7137 51.3188 25.1801C51.3188 23.6464 50.0758 22.4034 48.5429 22.4034H14.1087C12.5751 22.4034 11.332 23.6464 11.332 25.1801C11.332 26.7137 12.5751 27.9567 14.1087 27.9567Z'
                              fill='#21978B'
                            />
                            <path
                              d='M32.6199 33.5101H14.1087C12.5751 33.5101 11.332 34.7531 11.332 36.2868C11.332 37.8197 12.5751 39.0635 14.1087 39.0635H32.6199C34.1528 39.0635 35.3959 37.8197 35.3959 36.2868C35.3959 34.7531 34.1528 33.5101 32.6199 33.5101Z'
                              fill='#21978B'
                            />
                            <path
                              d='M92.2231 33.5101H62.938V2.96236C62.938 1.4287 61.6942 0.185684 60.1613 0.185684H2.77667C1.24302 0.185684 0 1.4287 0 2.96236V47.6696C0 49.2033 1.24302 50.4463 2.77667 50.4463H9.25558V62.2648C9.25558 63.4222 9.97385 64.458 11.0567 64.8646C11.3749 64.9842 11.7047 65.0414 12.0315 65.0414C12.8179 65.0414 13.5862 64.7073 14.124 64.0912L26.0381 50.4463H40.9485V75.7393C40.9485 77.273 42.1923 78.516 43.7252 78.516H68.8624L80.7729 93.8867C81.3092 94.5788 82.1261 94.963 82.9683 94.963C83.2683 94.963 83.5713 94.9137 83.8663 94.8129C84.9897 94.4288 85.7442 93.3728 85.7442 92.1856V78.516H92.2231C93.7568 78.516 94.9998 77.273 94.9998 75.7393V36.2868C94.9998 34.7531 93.7568 33.5101 92.2231 33.5101V33.5101ZM24.777 44.893C23.9746 44.893 23.2129 45.2394 22.6852 45.8432L14.8089 54.8639V47.6696C14.8089 46.136 13.5659 44.893 12.0323 44.893H5.55335V5.73903H57.3846V33.5101H43.7252C42.1923 33.5101 40.9485 34.7531 40.9485 36.2868V44.893H24.777ZM89.4465 72.9627H82.9676C81.4339 72.9627 80.1909 74.2057 80.1909 75.7393V84.0694L72.4182 74.039C71.892 73.3599 71.0817 72.9627 70.2236 72.9627H46.5019V39.0635H89.4465V72.9627Z'
                              fill='#21978B'
                            />
                            <path
                              d='M61.7624 65.09C62.261 65.7648 63.0387 66.1772 63.8766 66.212C63.9157 66.2142 63.9549 66.2149 63.994 66.2149C64.7898 66.2149 65.5494 65.8735 66.0778 65.2734L79.7213 49.7788C80.7345 48.6278 80.6229 46.8738 79.4719 45.8598C78.321 44.8466 76.567 44.9582 75.553 46.1092L64.181 59.0242L60.9499 54.6595C60.0374 53.4267 58.2986 53.1672 57.0664 54.0797C55.8336 54.9922 55.5741 56.731 56.4866 57.9631L61.7624 65.09Z'
                              fill='#21978B'
                            />
                          </g>
                          <defs>
                            <clipPath id='clip0_182_11749'>
                              <rect width='95' height='95' fill='white' />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <p className='text-neutral-500 dark:text-neutral-300'>
                        Be as honest as possible, even if you don’t like the answer.
                      </p>
                    </div>
                  </div>
                </div>

                <div className=''>
                  <div className='block h-full rounded-lg bg-cardbg-300 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700'>
                    <div className='p-6'>
                      <div className='flex justify-center mb-5'>
                        <svg width='96' height='96' viewBox='0 0 96 96' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <g clipPath='url(#clip0_182_11746)'>
                            <path
                              d='M93.3834 52.5099L85.5139 27.3274C87.5447 26.3728 89.1351 24.6322 89.8916 22.5002H93.1875C94.7408 22.5002 96 21.2409 96 19.6877C96 18.1344 94.7408 16.8752 93.1875 16.8752H89.8913C88.7303 13.6016 85.6041 11.2502 81.9375 11.2502C78.2709 11.2502 75.1447 13.6016 73.9837 16.8752H67.9905C67.0639 14.9299 65.2078 13.5103 63 13.1931V6.5625C63 2.94394 60.0561 0 56.4375 0H35.8125C32.1939 0 29.25 2.94394 29.25 6.5625V16.875H22.0163C20.8552 13.6014 17.7291 11.25 14.0625 11.25C10.3959 11.25 7.26975 13.6014 6.10875 16.875H2.8125C1.25925 16.875 0 18.1343 0 19.6875C0 21.2407 1.25925 22.5 2.8125 22.5H6.10875C6.86513 24.6324 8.45531 26.3726 10.4861 27.3272L2.61656 52.5099C1.15519 52.6108 0 53.8252 0 55.3125V59.0625C0 66.8166 6.30844 73.125 14.0625 73.125C21.8166 73.125 28.125 66.8166 28.125 59.0625V55.3125C28.125 53.8252 26.9698 52.6108 25.5084 52.5099L17.6387 27.3272C19.6695 26.3726 21.2597 24.6324 22.0161 22.5H29.25V30.4826C29.25 35.9631 31.2386 41.1377 34.875 45.1826V50.7885C33.7834 51.1749 33 52.2135 33 53.4375V93.1875C33 94.7408 34.2593 96 35.8125 96H60.1875C61.7407 96 63 94.7408 63 93.1875V53.4375C63 52.2135 62.2166 51.1749 61.125 50.7885V45.0491L68.0087 36.4446C68.4077 35.9458 68.625 35.3263 68.625 34.6875V22.5H73.9836C74.7401 24.6321 76.3305 26.3728 78.3613 27.3272L70.4917 52.5098C69.0302 52.6108 67.875 53.8252 67.875 55.3125V59.0625C67.875 66.8166 74.1834 73.125 81.9375 73.125C89.6916 73.125 96 66.8166 96 59.0625V55.3125C96 53.8252 94.8448 52.6108 93.3834 52.5099ZM14.0625 16.875C15.6133 16.875 16.875 18.1367 16.875 19.6875C16.875 21.2383 15.6133 22.5 14.0625 22.5C12.5117 22.5 11.25 21.2383 11.25 19.6875C11.25 18.1367 12.5117 16.875 14.0625 16.875ZM22.5 59.0625C22.5 63.7149 18.7149 67.5 14.0625 67.5C9.41006 67.5 5.625 63.7149 5.625 59.0625V58.125H22.5V59.0625ZM8.51306 52.5L14.0625 34.7417L19.6119 52.5H8.51306ZM81.9375 16.875C83.4883 16.875 84.75 18.1367 84.75 19.6875C84.75 21.2383 83.4883 22.5 81.9375 22.5C80.3867 22.5 79.125 21.2383 79.125 19.6875C79.125 18.1367 80.3867 16.875 81.9375 16.875ZM34.875 6.5625C34.875 6.04556 35.2956 5.625 35.8125 5.625H56.4375C56.9544 5.625 57.375 6.04556 57.375 6.5625V13.125H49.875C46.7338 13.125 44.0392 15.0669 42.9242 17.8125H37.6875C36.1367 17.8125 34.875 16.5508 34.875 15V6.5625ZM57.375 90.375H38.625V56.25H57.375V90.375ZM63 33.7009L56.1163 42.3054C55.7173 42.8042 55.5 43.4237 55.5 44.0625V50.625H40.5V44.0625C40.5 43.3166 40.2036 42.6013 39.6761 42.0739C36.5801 38.9777 34.875 34.8611 34.875 30.4826V22.9538C35.7553 23.2659 36.7016 23.4375 37.6875 23.4375H42.9242C43.9063 25.8557 46.1136 27.6506 48.7725 28.0442C47.0751 30.492 46.125 33.4406 46.125 36.5625C46.125 38.1157 47.3843 39.375 48.9375 39.375C50.4907 39.375 51.75 38.1157 51.75 36.5625C51.75 33.0084 53.7247 29.8132 56.9034 28.224L57.6953 27.8282C58.8621 27.2449 59.4744 25.9359 59.1748 24.6664C58.8752 23.3968 57.7419 22.5 56.4375 22.5H49.875C48.8411 22.5 48 21.6589 48 20.625C48 19.5911 48.8411 18.75 49.875 18.75H62.0625C62.5794 18.75 63 19.1706 63 19.6875V33.7009ZM81.9375 34.7417L87.4869 52.5H76.3882L81.9375 34.7417ZM90.375 59.0625C90.375 63.7149 86.5899 67.5 81.9375 67.5C77.2851 67.5 73.5 63.7149 73.5 59.0625V58.125H90.375V59.0625Z'
                              fill='#21978B'
                            />
                          </g>
                          <defs>
                            <clipPath id='clip0_182_11746'>
                              <rect width='96' height='96' fill='white' />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <p className='text-neutral-500 dark:text-neutral-300'>Try not to leave a “neutral” response.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className='flex justify-center align-middle bg-white-500'>
          <div className='w-full rounded-lg bg-greyloading-300 dark:bg-greyloading-300' style={{ width: '75%' }}>
            <div
              className='flex items-center justify-end h-4 text-sm font-medium leading-none text-right rounded-lg bg-glaregreen-300 lg:h-7 lg:text-md text-white-500'
              style={{ width: `${currentPagePercentage}%` }}
            >
              {currentPagePercentage}%
            </div>
          </div>
        </div>
        {questions
          .slice((currentPage - 1) * questionsPerPage, (currentPage - 1) * questionsPerPage + questionsPerPage)
          .map(question => (
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
                <hr className='my-12 h-0.5 border-t-0 bg-black-300 opacity-10' style={{ width: '75%' }} />
              </div>
              <div
                className={`flex flex-col justify-center w-full ${
                  questions[questionIndexForAnswer - 1].sorting_number === question.sorting_number
                    ? 'bg-white-500 '
                    : 'opacity-25'
                }`}
              >
                <div className='w-full '>
                  <p className='px-10 font-extrabold text-center'>{question.question}</p>
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
          <div className='w-full py-10 bg-white-500'>
            <div className='flex justify-center w-full py-10'>
              <p className='text-center text-gray-400'>
                <h1 className='text-2xl text-black-300'>Your Gender</h1>
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
        <div className='flex justify-center w-full py-20 bg-white-500'>
          <button
            className={`py-3 lg:py-4 px-12 lg:px-16 text-white-500 font-semibold rounded-full ${
              answers.length != currentPage * questionsPerPage
                ? 'bg-gray-500 '
                : 'bg-blue-500 hover:shadow-blue-md transition-all outline-none active'
            }   `}
            onClick={questionIndexForAnswer != questions.length ? handleNext : SubmitAnswer}
            disabled={answers.length != currentPage * questionsPerPage}
          >
            {questionIndexForAnswer == questions.length ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </>
  )
}

PersonalityTest.getLayout = (page: ReactNode) => <BlankLayoutLandingPage>{page}</BlankLayoutLandingPage>

PersonalityTest.guestGuard = true

export default PersonalityTest
