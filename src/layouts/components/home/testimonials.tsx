const Testimonials = () => {
  const data = [
    {
      name: 'Jia Qin',
      title: 'Content Lead',
      quote:
        'The L0 personality test helps me understand more about myself, my talent, strength and most importantly, my area of growth, so I can improve more as a better investor, creator and individual!',
      image: '/assets/testi/Jia_Qin_web_optimized.webp'
    },
    {
      name: 'Chloe',
      title: ' Arigato Investor, President of Buffett Online School',
      quote:
        'The L0 personality test helps me understand more about myself, my talent, strength and most importantly, my area of growth, so I can improve more as a better investor, creator and individual!',
      image: '/assets/testi/Chloe_Lin_web_optimized.webp'
    },
    {
      name: 'Chloe',
      title: 'Arigato Investor',
      quote: 'sd',
      image: '/assets/testi/Jia_Qin_web_optimized.webp'
    }
  ]
  return (
    <>
      <section className='mb-32 text-center'>
        <h2 className='pb-4 mb-12 text-3xl font-bold text-center text-black-300'>Testimonials</h2>

        <div className='grid gap-6 md:grid-cols-3 xl:gap-x-12'>
          <div className='flex flex-col mb-6 lg:mb-0'>
            <div className='relative flex-grow block rounded-lg bg-white-300 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700'>
              {/* <div className='flex'>
              <div
                className='relative mx-4 -mt-4 w-full overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]'
                data-te-ripple-init
                data-te-ripple-color='light'
              >
                <img alt='image' src='/assets/testi/Chloe_Lin_web_optimized.webp' className='w-full' />
                <a href='#!'>
                  <div className='absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsl(0,0%,98.4%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100'></div>
                </a>
              </div>
            </div> */}
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
              {/* <div className='flex'>
              <div
                className='relative mx-4 -mt-4 w-full overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]'
                data-te-ripple-init
                data-te-ripple-color='light'
              >
                <img alt='image' src='/assets/testi/Jia_Qin_web_optimized.webp' className='w-full' />
                <a href='#!'>
                  <div className='absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsl(0,0%,98.4%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100'></div>
                </a>
              </div>
            </div> */}
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
              {/* <div className='flex'>
              <div
                className='relative mx-4 -mt-4 w-full overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]'
                data-te-ripple-init
                data-te-ripple-color='light'
              >
                <img alt='image' src='/assets/testi/sean.webp' className='w-full' />
                <a href='#!'>
                  <div className='absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsl(0,0%,98.4%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100'></div>
                </a>
              </div>
            </div> */}
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
      </section>
      {data.map((datas, index) => (
        <section key={index} className='mb-5 text-center lg:text-left'>
          <div className='py-12 md:px-12'>
            <div className='container mx-auto xl:px-32'>
              <div className={` flex items-center lg:grid lg:grid-cols-2`}>
                <div className='mb-12 md:mt-12 lg:mt-0 lg:mb-0'>
                  <div className='relative z-[1] block rounded-lg bg-[hsla(0,0%,100%,0.55)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[25px] dark:bg-[hsla(0,0%,5%,0.7)] dark:shadow-black/20 md:px-12 lg:-mr-14'>
                    <h2 className='mb-2 text-3xl font-bold text-white-300 dark:text-primary-400'>{datas.name}</h2>
                    <p className='mb-4 font-semibold text-white-300'>{datas.title}</p>
                    <p className='mb-6 text-white-500 dark:text-neutral-300'>{datas.quote}</p>
                  </div>
                </div>
                <div className='w-1/2 md:mb-12 lg:mb-0'>
                  <img
                    src={datas.image}
                    className='lg:rotate-[6deg] w-full rounded-lg shadow-lg dark:shadow-black/20'
                    alt='image'
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* <div id='carouselExampleIndicators' className='relative' data-te-carousel-init data-te-carousel-slide>
        <div
          className='absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0'
          data-te-carousel-indicators
        >
          <button
            type='button'
            data-te-target='#carouselExampleIndicators'
            data-te-slide-to='0'
            className='mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white-300bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none'
            aria-label='Slide 1'
          ></button>
          <button
            type='button'
            data-te-target='#carouselExampleIndicators'
            data-te-slide-to='1'
            data-te-carousel-active
            aria-current='true'
            className='mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white-300bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none'
            aria-label='Slide 2'
          ></button>
          <button
            type='button'
            data-te-target='#carouselExampleIndicators'
            data-te-slide-to='2'
            className='mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white-300bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none'
            aria-label='Slide 3'
          ></button>
        </div>

        <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
          <div
            className='relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none'
            data-te-carousel-item
          ></div>

          <div
            className='relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none'
            data-te-carousel-item
            data-te-carousel-active
          >
            <img src='https://mdbcdn.b-cdn.net/img/new/slides/042.webp' className='block w-full' alt='Camera' />
          </div>

          <div
            className='relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none'
            data-te-carousel-item
          >
            <img src='https://mdbcdn.b-cdn.net/img/new/slides/043.webp' className='block w-full' alt='Exotic Fruits' />
          </div>
        </div>
      </div> */}
    </>
  )
}

export default Testimonials
