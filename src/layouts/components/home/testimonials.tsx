const Testimonials = () => {
  return (
    <section className='mb-32 text-center'>
      <h2 className='pb-4 mb-12 text-3xl font-bold text-center text-black-300'>Testimonials</h2>

      <div className='grid gap-6 md:grid-cols-3 xl:gap-x-12'>
        <div className='mb-6 lg:mb-0'>
          <div className='relative block rounded-lg bg-white-300 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700'>
            {/* <div className='flex'>
              <div
                className='relative mx-4 -mt-4 w-full overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]'
                data-te-ripple-init
                data-te-ripple-color='light'
              >
                <img alt='image' src='https://mdbcdn.b-cdn.net/img/new/avatars/8.jpg' className='w-full' />
                <a href='#!'>
                  <div className='absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsl(0,0%,98.4%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100'></div>
                </a>
              </div>
            </div> */}
            <div className='p-6'>
              <h5 className='mb-2 text-lg font-bold text-black-300'>John Doe</h5>
              <h6 className='mb-4 font-medium text-black-300 dark:text-primary-400'>Web Developer</h6>

              <p>
                The test gave me invaluable insights into my problem-solving skills and creativity as a web developer.
                It's a must-try for anyone in the field
              </p>
            </div>
          </div>
        </div>

        <div className='mb-6 lg:mb-0'>
          <div className='relative block rounded-lg bg-white-300 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700'>
            {/* <div className='flex'>
              <div
                className='relative mx-4 -mt-4 w-full overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]'
                data-te-ripple-init
                data-te-ripple-color='light'
              >
                <img alt='image' src='https://mdbcdn.b-cdn.net/img/new/avatars/6.jpg' className='w-full' />
                <a href='#!'>
                  <div className='absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsl(0,0%,98.4%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100'></div>
                </a>
              </div>
            </div> */}
            <div className='p-6'>
              <h5 className='mb-2 text-lg font-bold text-black-300'>Halley Frank</h5>
              <h6 className='mb-4 font-medium text-black-300 text-primary dark:text-primary-400'>
                Marketing Specialist
              </h6>

              <p>
                The Personality Test transformed my marketing strategies by helping me understand my communication style
                and strategic thinking. Highly recommended!
              </p>
            </div>
          </div>
        </div>

        <div className='mb-0'>
          <div className='relative block rounded-lg bg-white-300 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700'>
            {/* <div className='flex'>
              <div
                className='relative mx-4 -mt-4 w-full overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]'
                data-te-ripple-init
                data-te-ripple-color='light'
              >
                <img alt='image' src='https://mdbcdn.b-cdn.net/img/new/avatars/18.jpg' className='w-full' />
                <a href='#!'>
                  <div className='absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsl(0,0%,98.4%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100'></div>
                </a>
              </div>
            </div> */}
            <div className='p-6'>
              <h5 className='mb-2 text-lg font-bold text-black-300'>Lisa Trey</h5>
              <h6 className='mb-4 font-medium text-black-300 text-primary dark:text-primary-400'>Public Relations</h6>

              <p>
                The Level 0 Personality Test revolutionized my approach to public relations. It's a game-changer for PR
                professionals!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
