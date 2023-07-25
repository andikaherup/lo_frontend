// ** React Imports
import { ReactNode } from 'react'

// ** MUI Imports

// import ScrollAnimationWrapper from 'src/layouts/ScrollAnimationWrapper'

// ** Configs

// ** Layout Import
import BlankLayoutLandingPage from 'src/@core/layouts/BlankLayoutLandingPage'

import React, { useState } from 'react'

const faqData = [
  {
    question: 'Do I need to register to take the Level 0 personality test?',
    answer: `No. Simply click <a href='/personality-test' style='color:blue'>here</a> to take the test.`
  },
  {
    question: 'What should I do if I have not received an e-mail to verify my registration?',
    answer: 'Please check your Spam folder.  The e-mail provider may have placed our email there.'
  },
  {
    question: 'How do I access the report after completing the personality test?',
    answer: `Register an account with us and <a href='/login' style='color:blue'>login</a> to view your personalised report.`
  },
  {
    question: 'What happens if I close the browser or navigate away without completing the personality test?',
    answer:
      "We encourage you to complete the test to avoid resetting the questions. An intriguing character awaits you at the end of the test, and you'll have the opportunity to unlock exciting rewards."
  },
  {
    question: 'Is it possible for me to retake the personality test?',
    answer: 'Yes, you can retake L0 soon. Be excited to see more analysis in your report.'
  },
  {
    question: 'Am I able to purchase a physical report?',
    answer: 'You will have the opportunity to purchase a physical report in the future.'
  },
  {
    question:
      'Why does the personality type I received from your test differ from the one I obtained on another website?',
    answer:
      "There are several reasons why the personality type you obtained after completing Level 0 personality test differs from the one you received on a different website. Here are a few explanations:<ol class='list-decimal'><li> Test Variations: Different personality tests may use different methodologies, question formats, or scoring systems, which can lead to variations in results. Each test has its own unique approach to assessing personality traits, and slight differences in these approaches can yield different outcomes.</li><li> Sample Bias: Personality tests rely on a sample of questions or scenarios to assess various traits. The specific questions or scenarios included in a test can influence the results. If the test you took on a different website had a different set of questions or scenarios, it could generate different results.</li><li>Individual Differences: Personality is a complex and multifaceted construct. Different tests may emphasize different aspects or dimensions of personality, leading to variations in results. Additionally, individual differences and fluctuations in mood, mindset, or circumstances at the time of taking the tests can influence the outcomes.</li><li> Test Interpretation: Even if two tests provide the same personality type label, the interpretations and descriptions associated with that type might differ. The way the test results are explained and presented can vary, leading to differences in how individuals perceive and relate to their personality types.</li></ol> <br/>It's important to note that no single test can perfectly capture the entirety of an individual's personality. Personality is a rich and dynamic phenomenon that goes beyond the boundaries of a single assessment tool. Therefore, it is not uncommon to encounter variations in results when taking different personality tests."
  },
  {
    question: 'Why did I receive a different result when retaking the Level 0 personality test after some time?',
    answer:
      "Receiving a different result when retaking the Level 0 personality test after some time can be attributed to several factors. Here are the reasons: <ol class='list-decimal'><li>  <b><i>Mood and Mindset</i></b> : Your mood, mindset, and overall state of mind can influence your responses on a personality test. Different emotional states or mental perspectives at the time of taking the test can lead to variations in how you answer the questions, potentially resulting in a different outcome.</li><li><b><i>Self-Reflection and Growth</i></b>: Personalities are not fixed entities and can evolve over time. As you gain new experiences, insights, and self-awareness, your perspectives and behaviors may change. If you took the test after a significant period, personal growth or shifts in your self-perception could account for the different result.</li><li><b><i>Test Familiarity</i></b>:If you have taken the same personality test before, you might remember some of the questions or be more familiar with the test format. This prior exposure can influence your responses, consciously or subconsciously, potentially leading to a different outcome compared to your initial attempt.</li><li><b><i>Test Variability</i></b>:Personality tests often consist of a set of questions or scenarios designed to assess different traits. In some cases, the test may include alternative questions or variations in the question order, which can impact the outcome. If you encountered different questions or a different test version when retaking it, the result could differ.</li><li><b><i>Random Factors</i></b>: Personality tests are subject to inherent variability and measurement error. Even with consistent conditions and honest responses, there can be slight fluctuations in results due to random factors, such as minor changes in your mood or mindset on the day of testing.</li></ol> <br/> It's important to remember that personality tests provide an approximation of your traits and preferences based on your responses within a specific context. They do not capture the entirety of your personality and should be considered as one tool among many for self-reflection and understanding."
  },
  {
    question: 'Is the Level 0 personality test reliable and valid?',
    answer:
      'Yes. Statistical analysis has proven that the measurement instruments (statements) are reliable and effective in assessing the constructs (profile).'
  },
  {
    question: 'How can my character move to the next level?',
    answer: 'Your character can level up by completing the quests.'
  },
  {
    question: 'Why do I need to register?',
    answer:
      'By registering, you unlock access to a range of rewards and benefits as you engage with our Level 0 website.  These rewards can include exclusive content, personalized recommendations, participation in special events or promotions, and the ability to track your progress and achievements.<br/> Registration is completely free of charge.  '
  },
  {
    question: 'Is the merchandise for the character available for purchase?',
    answer:
      'We are delighted to share that the merchandise related to the character will be made available for purchase in the near future. <br/>Keep engaging with Level 0 for captivating announcements!'
  }
]
const FaQ = () => {
  return (
    <section className='relative z-5 h-full bg-skyblue-500 pt-20 pb-12 lg:pt-[120px] lg:pb-[90px]'>
      <div className='container mx-auto'>
        <div className='flex flex-wrap -mx-4'>
          <div className='w-full px-4'>
            <div className='mx-auto mb-[60px] max-w-[520px] text-center lg:mb-20'>
              <span className='block mb-2 text-lg font-semibold text-primary'>FAQ</span>
              <h2 className='mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px]'>Any Questions? Look Here</h2>
            </div>
          </div>
        </div>
        <div className='flex flex-wrap '>
          <div className='w-full px-4 '>
            {faqData.map((data, index) => (
              <AccordionItem key={index} header={data.question} text={data.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const AccordionItem = ({ header, text }: any) => {
  const [active, setActive] = useState(false)
  const returnText = (textInsert: string) => {
    return (
      <p
        className='py-3 text-base leading-relaxed text-body-color'
        dangerouslySetInnerHTML={{ __html: textInsert }}
      ></p>
    )
  }

  const handleToggle = () => {
    setActive(!active)
  }

  return (
    <div className='single-faq mb-8 w-full rounded-lg border border-[#F3F4FE] bg-white-300 p-4 sm:p-8 lg:px-6 xl:px-8'>
      <button className={`faq-btn flex w-full justify-center items-center text-left`} onClick={() => handleToggle()}>
        <div className='mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-blue-500 bg-opacity-10 text-primary'>
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

        <div className='w-full'>
          <h4 className='text-lg font-semibold text-black'>{header}</h4>
        </div>
      </button>

      <div className={`pl-[62px] duration-200 ease-in-out ${active ? 'block' : 'hidden'}`}>{returnText(text)}</div>
    </div>
  )
}

FaQ.getLayout = (page: ReactNode) => <BlankLayoutLandingPage>{page}</BlankLayoutLandingPage>

FaQ.guestGuard = true

export default FaQ
