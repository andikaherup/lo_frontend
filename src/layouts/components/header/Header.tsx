import React, { useState, useEffect, Fragment } from 'react'
import Link from 'next/link'
import { Dialog, Transition } from '@headlessui/react'

// Import react scroll
import { Link as LinkScroll } from 'react-scroll'
import ButtonOutline from '../misc/ButtonOutline.'

// ** Next Import
import { useRouter } from 'next/router'
import ButtonPrimary from '../misc/ButtonPrimary'

const Header: React.FC = () => {
  const [activeLink, setActiveLink] = useState<string | null>(null)
  const [scrollActive, setScrollActive] = useState(false)

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  useEffect(() => {
    console.log('router', router.route)
    if (router.route == '/personality-types') {
      setActiveLink('Personality')
    }
    if (router.route == '/home') {
      setActiveLink(null)
    }
    if (router.route == '/personality-test') {
      setActiveLink('about')
    }
  }, [router])

  const navChange = (value: string) => {
    router.replace(value)
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScrollActive(window.scrollY > 20)
    })
  }, [])

  return (
    <>
      <header
        className={'fixed top-0 w-full  z-10 transition-all bg-white-300 ' + (scrollActive ? ' shadow-md pt-0' : '')}
      >
        <nav className='grid grid-flow-col px-6 pt-3 pb-2 mx-auto sm:px-8 lg:px-16'>
          <Link href='/home' className='flex items-center lg:justify-center '>
            {/* <img src='/images/logo-level0.png' className='h-8 mr-3' alt='Flowbite Logo' /> */}
            <img src='/images/level0.png' className='h-8 mr-3' alt='Flowbite Logo' />

            {/* <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>LEVEL 0</span> */}
          </Link>
          <div className='flex justify-end md:order-2'>
            <button
              data-collapse-toggle='mobile-menu-2'
              type='button'
              onClick={toggleMobileMenu}
              className='inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              aria-controls='mobile-menu-2'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : ''} w-6 h-6`}
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                  clipRule='evenodd'
                ></path>
              </svg>
              <svg
                className={`${isMobileMenuOpen ? '' : 'hidden'} w-6 h-6`}
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </button>
          </div>

          <div className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1' id='navbar-sticky'>
            <ul className='items-center hidden col-start-4 col-end-8 lg:flex text-black-500'>
              <LinkScroll
                activeClass='active'
                to='about'
                spy={true}
                smooth={true}
                duration={1000}
                onClick={() => navChange('/personality-test')}
                className={
                  'px-4 py-3 mx-2 cursor-pointer text-sm font-semibold  animation-hover inline-block relative' +
                  (activeLink === 'about'
                    ? ' text-blue-500 animation-active '
                    : ' text-black-300 hover:text-blue-500 a')
                }
              >
                Personality Test
              </LinkScroll>
              <LinkScroll
                activeClass='active'
                to='Personality'
                spy={true}
                smooth={true}
                duration={1000}
                onClick={() => navChange('/personality-types')}
                className={
                  'px-4 py-3 mx-2 cursor-pointer  text-sm font-semibold  animation-hover inline-block relative' +
                  (activeLink === 'Personality'
                    ? ' text-blue-500 animation-active '
                    : ' text-black-300 hover:text-blue-500 ')
                }
              >
                Personality Types
              </LinkScroll>
              {/* <LinkScroll
                activeClass='active'
                to='specialized'
                spy={true}
                smooth={true}
                duration={1000}
                className={
                  'px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative' +
                  (activeLink === 'specialized'
                    ? ' text-blue-500 animation-active '
                    : ' text-black-500 hover:text-blue-500 ')
                }
              >
                Specialized Test
              </LinkScroll>
              <LinkScroll
                activeClass='active'
                to='resources'
                spy={true}
                smooth={true}
                duration={1000}
                className={
                  'px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative' +
                  (activeLink === 'resources'
                    ? ' text-blue-500 animation-active '
                    : ' text-black-500 hover:text-blue-500 ')
                }
              >
                Resources
              </LinkScroll> */}
            </ul>
          </div>
          <div className='items-center justify-end hidden col-start-10 col-end-12 font-medium md:flex'>
            <button
              type='button'
              onClick={openModal}
              className='px-4 py-2 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none '
            >
              <span className='mx-2 text-sm font-semibold tracking-wide capitalize transition-all text-black-600 sm:mx-4 hover:text-blue-500'>
                  Sign In
              </span>
            </button>
            <Link
              href='/personality-test'
              className='block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white'
              aria-current='page'
            >
              <ButtonOutline>
                {' '}
                <span className='text-sm font-semibold'>Take Test</span>
              </ButtonOutline>
            </Link>
          </div>
        </nav>
        <div
          className={`items-center justify-between w-full lg:order-1 ${isMobileMenuOpen ? '' : 'hidden'}`}
          id='mobile-menu-2'
        >
          <ul className='flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0'>
            <li>
              <a
                href='#'
                className='block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white'
                aria-current='page'
              >
                Personality Test
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700'
              >
                Personality Type
              </a>
            </li>
            {/* <li>
              <a
                href='#'
                className='block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700'
              >
                Marketplace
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700'
              >
                Features
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700'
              >
                Team
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700'
              >
                Contact
              </a>
            </li> */}
          </ul>
        </div>
      </header>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={closeModal}>
          <div className='fixed inset-0 bg-gray-500 opacity-50' aria-hidden='true' />
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 w-full overflow-y-auto'>
            <div className='flex items-center justify-center min-h-full p-2 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-xl px-10 overflow-hidden text-left align-middle transition-all transform shadow-xl bg-white-500 rounded-2xl'>
                  <Dialog.Title
                    as='h1'
                    className='mt-10 text-3xl font-medium leading-6 text-center text-textcolorblack-300'
                  >
                    Get Your Results
                  </Dialog.Title>
                  <div className='flex justify-center w-full mt-5'>
                    <p className='text-sm text-center text-textcolorblack-300 dark:text-textcolorblack-300'>
                      Not a member yet?<span className='text-skyblue-300'> Create a free profile</span> and get your
                      detailed report by
                      <span className='text-skyblue-300'> signing up using your social media accounts</span>.
                    </p>
                  </div>
                  <div className='flex justify-center mt-5'>
                    <button className='flex gap-2 px-4 py-2 transition duration-150 border rounded-lg border-slate-200 text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow'>
                      <img
                        className='w-6 h-6'
                        src='https://www.svgrepo.com/show/475656/google-color.svg'
                        loading='lazy'
                        alt='google logo'
                      />
                      <span>Sign Up with Google</span>
                    </button>
                  </div>
                  <div className='flex justify-center w-full mt-10'>
                    <p className='text-sm text-center text-textcolorblack-300 dark:text-neutral-300'>
                      If you have an account, log in below and your detailed report will be sent to the registered
                      email.
                    </p>
                  </div>
                  <div className='w-full max-w-xl mx-auto'>
                    <div className='mt-8'>
                      <div className='my-6'>
                        <form action='#' method='POST' className='space-y-6'>
                          <div>
                            <label className='block text-sm font-medium text-textcolorblack-300'> Email address </label>
                            <div className='mt-1'>
                              <input
                                id='email'
                                name='email'
                                type='email'
                                autoComplete='email'
                                placeholder='Your Email'
                                className='block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300'
                              />
                            </div>
                          </div>

                          <div className='space-y-1'>
                            <label htmlFor='password' className='block text-sm font-medium text-textcolorblack-300'>
                              {' '}
                              Password{' '}
                            </label>
                            <div className='mt-1'>
                              <input
                                id='password'
                                name='password'
                                type='password'
                                autoComplete='current-password'
                                placeholder='Your Password'
                                className='block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300'
                              />
                            </div>
                          </div>

                          <div className='flex items-center justify-between'>
                            <div className='flex items-center'>
                              <input
                                id='remember-me'
                                name='remember-me'
                                type='checkbox'
                                placeholder='Your password'
                                className='w-4 h-4 text-blue-600 border-gray-200 rounded focus:ring-blue-500'
                              />
                              <label htmlFor='remember-me' className='block ml-2 text-sm text-neutral-600'>
                                {' '}
                                Remember me{' '}
                              </label>
                            </div>

                            <div className='text-sm'>
                              <a href='#' className='font-medium text-blue-600 hover:text-blue-500'>
                                {' '}
                                Forgot your password?{' '}
                              </a>
                            </div>
                          </div>

                          <div className='flex justify-center'>
                            <ButtonPrimary>Sign In</ButtonPrimary>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Header
