import EmblaCarousel from './carrousel'
import { EmblaOptionsType } from 'embla-carousel-react'

const Testimonials = () => {
  const data = [
    {
      name: 'Jia Qin - The Oracle',
      title: 'Content Lead',
      quote:
        'It was like opening a treasure chest of self-discovery and unleashing my true potential. This test made personal growth fun and exciting. Highly recommended for anyone looking to learn more about themselves and grow personally!',
      image: '/assets/testi/jia.png'
    },
    {
      name: 'Sean Seah - The Magician',
      title: 'Best Selling Author, International Speaker',
      quote:
        'I used to think I am not going to do well in life as I did badly in school. Then I realised that each of us are gifted in different areas in life. The L0 test is one of the most advanced and comprehensive tests that helped me understand myself better and taught me how to excel in different areas of my life by being fully me!',
      image: '/assets/testi/sean.jpg'
    },
    {
      name: 'Jacintha - The Synergist',
      title: ' Entrepreneur',
      quote:
        'Had so much fun doing the L0 personality test! Pretty amazed at how accurate the description of a synergist matches how I have been interacting with people around me over the years. More importantly, the area of growth helped me to understand more about myself and what I need to improve on. What I love most about this test is that it provides me with bite size information on next steps recommendation which I can already start working on to excel in life and become a better version of myself!',
      image: '/assets/testi/Jacintha.jpg'
    },

    {
      name: 'Chloe - The Magician',
      title: ' Arigato Investor, President of Buffett Online School',
      quote:
        'The L0 personality test helps me understand more about myself, my talent, strength and most importantly, my area of growth, so I can improve more as a better investor, creator and individual!',
      image: '/assets/testi/cloe1.png'
    },
    {
      name: 'Sally – The Oracle',
      title: ' Entrepreneur',
      quote:
        "The discovery of my Oracle archetype through the L0 personality test has been truly empowering, as I never saw myself that way before. Embracing my innate wisdom and intuition has boosted my confidence in decision-making. Understanding both my strengths and weaknesses, I am able to offer guidance more readily and nurture stronger relationships as a leader. To grow further, I'll practise mindfulness to inspire positive change, fostering authenticity and empathy. The in-depth analysis provided by the personality test has given me great insights on the areas for improvement. I'm excited for the ongoing journey of self-improvement and levelling up everyday.",
      image: '/assets/testi/Sally.png'
    }
  ]
  const OPTIONS: EmblaOptionsType = { loop: true }

  return (
    <>
      {/* <section className='mb-32 text-center'>
        <h2 className='pb-4 mb-12 text-3xl font-bold text-center text-black-300'>Testimonials</h2>
        <Carousel loop>
          {data.map((datas, index) => {
            return (
              <div className='relative  flex-[0_0_100%]' key={index}>
                <section key={index} className='mb-5 text-center lg:text-left'>
                  <div className='py-12 md:px-12'>
                    <div className='container mx-auto xl:px-32'>
                      <div className={` sm:flex sm:items-center lg:grid lg:grid-cols-2`}>
                        <div className=' md:mt-12 lg:mt-0 lg:mb-0'>
                          <div className='relative z-[1] block rounded-lg bg-[hsla(0,0%,100%,0.55)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[25px] dark:bg-[hsla(0,0%,5%,0.7)] dark:shadow-black/20 md:px-12 lg:-mr-14'>
                            <h2 className='mb-2 text-3xl font-bold text-white-300 dark:text-primary-400'>
                              {datas.name}
                            </h2>
                            <p className='mb-4 font-semibold text-white-300'>{datas.title}</p>
                            <p className='mb-6 text-white-500 dark:text-neutral-300'>{datas.quote}</p>
                          </div>
                        </div>
                        <div className='w-full md:mb-12 lg:mb-0 '>
                          <img
                            src={datas.image}
                            className='lg:rotate-[6deg] lg:w-1/2 w-full rounded-lg shadow-lg dark:shadow-black/20'
                            alt='image'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )
          })}
        </Carousel>
        <div className='grid gap-6 md:grid-cols-3 xl:gap-x-12'>
          <div className='flex flex-col mb-6 lg:mb-0'>
            <div className='relative flex-grow block rounded-lg bg-white-300 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700'>
              <div className='flex'>
                <div
                  className='relative mx-4 flex justify-center -mt-4 w-full overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]'
                  data-te-ripple-init
                  data-te-ripple-color='light'
                >
                  <img alt='image' src='/assets/testi/Chloe_Lin_web_optimized.webp' className='w-[50%]' />
                  <a href='#!'>
                    <div className='absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsl(0,0%,98.4%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100'></div>
                  </a>
                </div>
              </div>
              <div className='p-6'>
                <h5 className='mb-2 text-lg font-bold text-black-300'>Chloe,</h5>
                <h6 className='mb-4 font-medium text-black-300 dark:text-primary-400'>
                  Arigato Investor, President of Buffett Online School
                </h6>

                <p>
                  The L0 personality test helps me understand more about myself, my talent, strength and most
                  importantly, my area of growth, so I can improve more as a better investor, creator and individual!
                </p>
              </div>
            </div>
          </div>

          <div className='flex flex-col mb-6 lg:mb-0'>
            <div className='relative flex-grow block rounded-lg bg-white-300 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700'>
              <div className='flex'>
                <div
                  className='relative mx-4 -mt-4 w-full overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]'
                  data-te-ripple-init
                  data-te-ripple-color='light'
                >
                  <img alt='image' src='/assets/testi/Jia_Qin_web_optimized.webp' className='w-[50%]' />
                  <a href='#!'>
                    <div className='absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsl(0,0%,98.4%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100'></div>
                  </a>
                </div>
              </div>
              <div className='p-6'>
                <h5 className='mb-2 text-lg font-bold text-black-300'>Jia Qin,</h5>
                <h6 className='mb-4 font-medium text-black-300 text-primary dark:text-primary-400'>Content Lead</h6>

                <p>
                  It was like opening a treasure chest of self-discovery and unleashing my true potential. This test
                  made personal growth fun and exciting. Highly recommended for anyone looking to learn more about
                  themselves and grow personally!
                </p>
              </div>
            </div>
          </div>

          <div className='flex flex-col mb-6 lg:mb-0'>
            <div className='relative flex-grow block rounded-lg bg-white-300 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700'>
              <div className='flex'>
                <div
                  className='relative mx-4 -mt-4 w-full overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]'
                  data-te-ripple-init
                  data-te-ripple-color='light'
                >
                  <img alt='image' src='/assets/testi/sean.webp' className='w-[50%]' />
                  <a href='#!'>
                    <div className='absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsl(0,0%,98.4%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100'></div>
                  </a>
                </div>
              </div>
              <div className='p-6'>
                <h5 className='mb-2 text-lg font-bold text-black-300'>Lisa Trey</h5>
                <h6 className='mb-4 font-medium text-black-300 text-primary dark:text-primary-400'>Public Relations</h6>

                <p>
                  The Level 0 Personality Test revolutionized my approach to public relations. It's a game-changer for
                  PR professionals!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className='px-5 mb-32 text-center lg:px-20'>
        <h2 className='mb-12 text-3xl font-bold text-white-300'>Testimonials</h2>
        <section className='sandbox__carousel'>
          <EmblaCarousel slides={data} options={OPTIONS}></EmblaCarousel>
        </section>
        {/* <Carousel loop>
          {data.map((datas, index) => {
            return (
              <div className='relative  flex-[0_0_100%]' key={index}>
                <section key={index} className='mb-5 text-center lg:text-left'>
                  <div className='py-12 md:px-12'>
                    <div className='container mx-auto xl:px-32'>
                      <div className={` sm:flex sm:items-center lg:grid lg:grid-cols-2`}>
                        <div className=' md:mt-12 lg:mt-0 lg:mb-0'>
                          <div className='relative z-[1] block rounded-lg bg-[hsla(0,0%,100%,0.55)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[25px] dark:bg-[hsla(0,0%,5%,0.7)] dark:shadow-black/20 md:px-12 lg:-mr-14'>
                            <h2 className='mb-2 text-3xl font-bold text-white-300 dark:text-primary-400'>
                              {datas.name}
                            </h2>
                            <p className='mb-4 font-semibold text-white-300'>{datas.title}</p>
                            <p className='mb-6 text-white-500 dark:text-neutral-300'>{datas.quote}</p>
                          </div>
                        </div>
                        <div className='w-full md:mb-12 lg:mb-0 '>
                          <img
                            src={datas.image}
                            className='lg:rotate-[6deg] lg:w-1/2 w-full rounded-lg shadow-lg dark:shadow-black/20'
                            alt='image'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )
          })}
        </Carousel> */}
      </section>
    </>
  )
}

export default Testimonials
