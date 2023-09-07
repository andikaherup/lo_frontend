import React, { useState, useEffect } from 'react'
import Link from 'next/link'

// Import react scroll
import { Link as LinkScroll } from 'react-scroll'
import ButtonOutline from '../misc/ButtonOutline.'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { yupResolver } = require('@hookform/resolvers/yup')

// ** Third Party Imports
import * as yup from 'yup'
import { useForm } from 'react-hook-form'

// ** Next Import
import { useRouter } from 'next/router'
import { getBaseTextColor } from 'src/configs/getBackground'

import Dropdown from './dropdown'
import ProgressQuest from './progressQuest'
import LoginDialog from './loginDialog'

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required()
})

const defaultValues = {
  email: '',
  password: ''
}

const Header: React.FC = () => {
  const auth = useAuth()

  const [activeLink, setActiveLink] = useState<string | null>(null)
  const [scrollActive, setScrollActive] = useState(false)
  const [sideMenu, setSideMenu] = useState(false)

  const [isMobileMenuOpen] = useState(false)
  const router = useRouter()

  // const toggleMobileMenu = () => {
  //   setIsMobileMenuOpen(!isMobileMenuOpen)
  // }

  const openSideMenu = () => {
    setSideMenu(true)
  }
  const closeSideMenu = () => {
    setSideMenu(false)
  }

  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    // setIsOpen(true)
    router.replace('/login')
    closeSideMenu()
  }

  const {} = useForm({
    defaultValues,

    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (router.route == '/personality-types') {
      setActiveLink('Personality')
    }
    if (router.route == '/') {
      setActiveLink(null)
    }
    if (router.route == '/personality-test') {
      setActiveLink('about')
    }
    if (router.route == '/quest') {
      setActiveLink('Quest')
    }
    if (router.route == '/dashboard') {
      setActiveLink('Dashboard')
    }
    if (router.route == '/faq') {
      setActiveLink('Faq')
    }
    if (router.route == '/leaderboard') {
      setActiveLink('Leaderboard')
    }
    if (router.route == '/account-security') {
      setActiveLink('security')
    }
    if (router.route == '/reward') {
      setActiveLink('Reward')
    }
  }, [router])

  const navChange = (value: string) => {
    router.replace(value)
    closeSideMenu()
  }
  const handleLogout = () => {
    auth.logout()
    closeSideMenu()
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScrollActive(window.scrollY > 20)
    })
  }, [])

  return (
    <>
      <header
        className={'fixed top-0 w-full  z-30 transition-all bg-white-300 ' + (scrollActive ? ' shadow-md pt-0' : '')}
      >
        <nav className='grid grid-flow-col px-6 pt-3 pb-2 mx-auto sm:px-8 lg:px-16'>
          <Link href='/' className='flex items-center lg:justify-center '>
            <img src='/images/level0tr.png' className='h-8 mr-3' alt='Flowbite Logo' />
          </Link>

          <div className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1' id='navbar-sticky'>
            <ul className='items-center hidden col-start-4 col-end-8 mt-1 lg:flex text-black-500'>
              {(auth.user && !auth.user.character) ||
                (!auth.user && (
                  <LinkScroll
                    activeClass='active'
                    to='about'
                    spy={true}
                    smooth={true}
                    duration={1000}
                    onClick={() => navChange('/personality-test')}
                    className={
                      'px-4 py-3 mx-2 cursor-pointer text-sm     inline-block relative' +
                      (activeLink === 'about'
                        ? ' text-blue-500 animation-active font-semibold'
                        : ' text-black-300 hover:text-blue-500 font-normal')
                    }
                  >
                    Personality Test
                  </LinkScroll>
                ))}

              {auth.user && (
                <LinkScroll
                  activeClass='active'
                  to='Dashboard'
                  spy={true}
                  smooth={true}
                  duration={1000}
                  onClick={() => navChange('/dashboard')}
                  className={
                    'px-4 py-3 mx-2 cursor-pointer text-sm     inline-block relative' +
                    (activeLink === 'Dashboard'
                      ? ' text-blue-500 animation-active font-semibold'
                      : ' text-black-300 hover:text-blue-500 font-normal')
                  }
                >
                  Dashboard
                </LinkScroll>
              )}

              <LinkScroll
                activeClass='active'
                to='Personality'
                spy={true}
                smooth={true}
                duration={1000}
                onClick={() => navChange('/personality-types')}
                className={
                  'px-4 py-3 mx-2 cursor-pointer  text-sm   inline-block relative' +
                  (activeLink === 'Personality'
                    ? ' text-blue-500 animation-active font-semibold   '
                    : ' text-black-300 hover:text-blue-500 font-normal')
                }
              >
                Personality Types
              </LinkScroll>

              {/* <LinkScroll
                activeClass='active'
                to='Faq'
                spy={true}
                smooth={true}
                duration={1000}
                onClick={() => navChange('/faq')}
                className={
                  'px-4 py-3 mx-2 cursor-pointer  text-sm   inline-block relative' +
                  (activeLink === 'Faq'
                    ? ' text-blue-500 animation-active  font-semibold  '
                    : ' text-black-300 hover:text-blue-500 font-normal')
                }
              >
                FAQ
              </LinkScroll> */}
              <LinkScroll
                activeClass='active'
                to='Leaderboard'
                spy={true}
                smooth={true}
                duration={1000}
                onClick={() => navChange('/leaderboard')}
                className={
                  'px-4 py-3 mx-2 cursor-pointer  text-sm   inline-block relative' +
                  (activeLink === 'Leaderboard'
                    ? ' text-blue-500 animation-active  font-semibold  '
                    : ' text-black-300 hover:text-blue-500 font-normal')
                }
              >
                Leaderboard
              </LinkScroll>
              <LinkScroll
                activeClass='active'
                to='Reward'
                spy={true}
                smooth={true}
                duration={1000}
                onClick={() => navChange('/reward')}
                className={
                  'px-4 py-3 mx-2 cursor-pointer  text-sm   inline-block relative' +
                  (activeLink === 'Reward'
                    ? ' text-blue-500 animation-active  font-semibold  '
                    : ' text-black-300 hover:text-blue-500 font-normal')
                }
              >
                Rewards
              </LinkScroll>
            </ul>
          </div>
          <div className='items-center justify-end hidden col-start-6 col-end-12 font-medium md:flex'>
            {!auth.user && (
              <>
                <Link
                  href='/login'
                  className='block py-2 pl-3 pr-4 text-white rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white'
                  aria-current='page'
                >
                  <button
                    type='button'
                    className='px-4 py-2 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none '
                  >
                    <span className='mx-2 text-sm font-semibold tracking-wide capitalize transition-all text-black-600 sm:mx-4 hover:text-blue-500'>
                        Sign In
                    </span>
                  </button>
                </Link>

                <Link
                  href='/personality-test'
                  className='block py-2 pl-3 pr-4 text-white rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white'
                  aria-current='page'
                >
                  <ButtonOutline>
                    <span className='text-sm font-semibold'>Take Test</span>
                  </ButtonOutline>
                </Link>
              </>
            )}

            {auth.user && <ProgressQuest user={auth.user}></ProgressQuest>}
            {/* {auth.user && (
              <div className='flex flex-row items-center justify-center ml-2'>
                <img alt='img' src='/assets/icon/medal.png'></img>
                <span className='pt-2'>{auth.user.coin}</span>
              </div>
            )} */}

            {auth.user && <Dropdown></Dropdown>}
          </div>

          <div className='flex justify-end md:order-2'>
            <button
              data-collapse-toggle='mobile-menu-2'
              type='button'
              onClick={openSideMenu}
              className='inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
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
        </nav>
        <aside
          className={` sm:hidden h-full fixed top-0 right-0 z-40 w-80 transition-transform ${
            !sideMenu ? 'translate-x-full' : ''
          } sm:translate-x-0`}
          aria-label='Sidenav'
        >
          <div className='w-full h-full py-5 overflow-y-auto bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
            <div className='flex justify-end'>
              <button onClick={closeSideMenu} className='p-1 rounded-lg focus:outline-none focus:ring'>
                <svg
                  className='w-6 h-6'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                </svg>
                <span className='sr-only'>Close sidebar</span>
              </button>
            </div>
            {auth.user && (
              <>
                <div className='flex flex-col items-center justify-center pt-5'>
                  <h1 className='font-bold'>Archetype</h1>
                  <h1 className={`text-3xl uppercase font-bold ${getBaseTextColor(auth.user?.character)}`}>
                    {auth.user?.character}
                  </h1>
                </div>
                <div className='flex items-center justify-center mt-3 mb-8 px-7'>
                  <ProgressQuest user={auth.user}></ProgressQuest>
                </div>
                {/* <hr className={`h-[0.2px] w-full  border-t-0 bg-gray-400`} /> */}
              </>
            )}

            <div className='flex flex-col my-3'>
              {(auth.user && !auth.user.character) ||
                (!auth.user && (
                  <LinkScroll
                    activeClass='active'
                    to='about'
                    spy={true}
                    smooth={true}
                    duration={1000}
                    onClick={() => navChange('/personality-test')}
                    className={
                      'px-4 py-3 mx-2 cursor-pointer text-sm inline-block relative' +
                      (activeLink === 'about'
                        ? ' text-blue-500 animation-active font-semibold '
                        : ' text-black-300 hover:text-blue-500 font-normal')
                    }
                  >
                    Personality Test
                  </LinkScroll>
                ))}

              {auth.user && (
                <LinkScroll
                  activeClass='active'
                  to='Dashboard'
                  spy={true}
                  smooth={true}
                  duration={1000}
                  onClick={() => navChange('/dashboard')}
                  className={
                    'px-4 py-3 mx-2 cursor-pointer text-sm     inline-block relative' +
                    (activeLink === 'Dashboard'
                      ? ' text-blue-500 animation-active font-semibold'
                      : ' text-black-300 hover:text-blue-500 font-normal')
                  }
                >
                  Dashboard
                </LinkScroll>
              )}

              <LinkScroll
                activeClass='active'
                to='Personality'
                spy={true}
                smooth={true}
                duration={1000}
                onClick={() => navChange('/personality-types')}
                className={
                  'px-4 py-3 mx-2 cursor-pointer  text-sm    inline-block relative' +
                  (activeLink === 'Personality'
                    ? ' text-blue-500 animation-active font-semibold'
                    : ' text-black-300 hover:text-blue-500 font-normal')
                }
              >
                Personality Types
              </LinkScroll>

              {/* <LinkScroll
                activeClass='active'
                to='Faq'
                spy={true}
                smooth={true}
                duration={1000}
                onClick={() => navChange('/faq')}
                className={
                  'px-4 py-3 mx-2 cursor-pointer  text-sm    inline-block relative' +
                  (activeLink === 'Faq'
                    ? ' text-blue-500 animation-active font-semibold '
                    : ' text-black-300 hover:text-blue-500 font-normal')
                }
              >
                FAQ
              </LinkScroll> */}
              <LinkScroll
                activeClass='active'
                to='Leaderboard'
                spy={true}
                smooth={true}
                duration={1000}
                onClick={() => navChange('/leaderboard')}
                className={
                  'px-4 py-3 mx-2 cursor-pointer  text-sm    inline-block relative' +
                  (activeLink === 'Leaderboard'
                    ? ' text-blue-500 animation-active font-semibold '
                    : ' text-black-300 hover:text-blue-500 font-normal')
                }
              >
                Leaderboard
              </LinkScroll>
              <LinkScroll
                activeClass='active'
                to='Reward'
                spy={true}
                smooth={true}
                duration={1000}
                onClick={() => navChange('/reward')}
                className={
                  'px-4 py-3 mx-2 cursor-pointer  text-sm    inline-block relative' +
                  (activeLink === 'Reward'
                    ? ' text-blue-500 animation-active font-semibold '
                    : ' text-black-300 hover:text-blue-500 font-normal')
                }
              >
                Rewards
              </LinkScroll>
            </div>
            <hr className={`h-[0.2px] w-full  border-t-0 bg-gray-400`} />
            {auth.user && (
              <>
                <div className='pt-2'>
                  <h1 className='pt-2 pl-6 text-lg '>User Menu </h1>
                  <div className='flex flex-col'>
                    <LinkScroll
                      activeClass='active'
                      to='profile'
                      spy={true}
                      smooth={true}
                      duration={1000}
                      onClick={() => navChange('/user-setting')}
                      className={
                        'px-4 py-3 mx-2 cursor-pointer  text-sm    inline-block relative' +
                        (activeLink === 'profile'
                          ? ' text-blue-500 animation-active font-semibold '
                          : ' text-black-300 hover:text-blue-500 font-normal')
                      }
                    >
                      Profile
                    </LinkScroll>
                    <LinkScroll
                      activeClass='active'
                      to='security'
                      spy={true}
                      smooth={true}
                      duration={1000}
                      onClick={() => navChange('/account-security')}
                      className={
                        'px-4 py-3 mx-2 cursor-pointer  text-sm    inline-block relative' +
                        (activeLink === 'security'
                          ? ' text-blue-500 animation-active font-semibold '
                          : ' text-black-300 hover:text-blue-500 font-normal')
                      }
                    >
                      Security Settings
                    </LinkScroll>
                  </div>
                </div>
              </>
            )}

            <div className='absolute bottom-0 w-full '>
              {/* <hr className={`h-[0.2px] w-full  border-t-0 bg-gray-400`} /> */}
              {auth.user && (
                <div className='w-full px-6 pt-3 pb-5 '>
                  <button
                    onClick={handleLogout}
                    className='flex items-center justify-center w-full py-3 mt-3 rounded-lg ring-1 ring-gray-400'
                  >
                    <span>Logout</span>
                  </button>
                </div>
              )}
              {!auth.user && (
                <div className='w-full px-6 pt-3 pb-5 '>
                  <button
                    onClick={openModal}
                    className='flex items-center justify-center w-full py-3 mt-3 rounded-lg ring-1 ring-gray-400'
                  >
                    <span>Login</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* <div
          className={`items-center justify-between w-full lg:order-1 ${isMobileMenuOpen ? '' : 'hidden'}`}
          id='mobile-menu-2'
        >
          <ul className='flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0'>
            {(auth.user && !auth.user.character) ||
              (!auth.user && (
                <li>
                  <Link
                    href='/personality-test'
                    className='block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white'
                    aria-current='page'
                  >
                    Personality Test
                  </Link>
                </li>
              ))}
            <li>
              <Link
                href='/personality-types'
                className='block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700'
              >
                Personality Type
              </Link>
            </li>

            <li>
              <Link
                href='/faq'
                className='block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700'
              >
                FaQ
              </Link>
            </li>
          </ul>
        </div> */}
      </header>
      <LoginDialog open={isOpen} close={closeModal}></LoginDialog>
    </>
  )
}

export default Header
