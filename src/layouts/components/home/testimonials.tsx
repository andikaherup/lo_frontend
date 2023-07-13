const Testimonials = () => {
  const data = [
    {
      name: 'Jia Qin',
      title: 'Content Lead',
      quote:
        'It was like opening a treasure chest of self-discovery and unleashing my true potential. This test made personal growth fun and exciting. Highly recommended for anyone looking to learn more about themselves and grow personally!',
      image: '/assets/testi/jia.png'
    },
    {
      name: 'Sean Seah',
      title: 'Founder & Group CEO of Next Level Ventures',
      quote:
        'The L0 personality test helps me understand more about myself, my talent, strength and most importantly, my area of growth, so I can improve more as a better investor, creator and individual!',
      image: '/assets/testi/sean.png'
    },
    {
      name: 'Chloe',
      title: ' Arigato Investor, President of Buffett Online School',
      quote:
        'The L0 personality test helps me understand more about myself, my talent, strength and most importantly, my area of growth, so I can improve more as a better investor, creator and individual!',
      image: '/assets/testi/cloe1.png'
    }
  ]

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

        <div className='grid lg:px-20 gap-x-6 md:grid-cols-3 xl:gap-x-15'>
          {data.map((datas, index) => (
            <div key={index} className='mb-6 lg:mb-0'>
              <div className='block h-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700'>
                <div className='relative overflow-hidden bg-no-repeat bg-cover'>
                  <img src={datas.image} className='w-full rounded-t-lg' alt='boss' />
                  <a href='#!'>
                    <div className='absolute top-0 bottom-0 left-0 right-0 w-full h-full overflow-hidden bg-fixed'></div>
                  </a>
                  <svg
                    className='absolute bottom-0 left-0 text-white dark:text-neutral-700'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 1440 320'
                  >
                    <path
                      fill='currentColor'
                      d='M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
                    ></path>
                  </svg>
                </div>
                <div className='p-6'>
                  <h5 className='mb-2 text-lg font-bold'>{datas.name}</h5>
                  <h6 className='mb-4 font-medium text-skyblue-300 dark:text-primary-400'>{datas.title}</h6>

                  <p className='text-sm'>{datas.quote}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Testimonials
