import React, { useState, useEffect } from 'react'
import Link from 'next/link'

// Import react scroll
import { Link as LinkScroll } from 'react-scroll'
import ButtonOutline from '../misc/ButtonOutline.'

// ** Next Import
import { useRouter } from 'next/router'

const Header: React.FC = () => {
  const [activeLink, setActiveLink] = useState<string | null>('about')
  const [scrollActive, setScrollActive] = useState(false)

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  useEffect(() => {
    console.log('router', router.route)
    if (router.route == '/personality-types') {
      setActiveLink('Personality')
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
        <nav className='grid grid-flow-col px-6 py-3 mx-auto sm:px-8 lg:px-16 sm:py-4'>
          <Link href='/home' className='flex items-center'>
            <img src='/images/favicon.png' className='h-8 mr-3' alt='Flowbite Logo' />
            <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>SOFTWARE</span>
          </Link>
          <div className='flex md:order-2'>
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
                  'px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative' +
                  (activeLink === 'about'
                    ? ' text-blue-500 animation-active '
                    : ' text-black-500 hover:text-blue-500 a')
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
                  'px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative' +
                  (activeLink === 'Personality'
                    ? ' text-blue-500 animation-active '
                    : ' text-black-500 hover:text-blue-500 ')
                }
              >
                Personality Types
              </LinkScroll>
              <LinkScroll
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
              </LinkScroll>
            </ul>
          </div>
          <div className='items-center justify-end hidden col-start-10 col-end-12 font-medium md:flex'>
            <Link href='/home'>
              <span className='mx-2 tracking-wide capitalize transition-all text-black-600 sm:mx-4 hover:text-blue-500'>
                  Sign In
              </span>
            </Link>
            <ButtonOutline>Take Test</ButtonOutline>
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
            <li>
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
            </li>
          </ul>
        </div>
      </header>
    </>
  )
}

export default Header
