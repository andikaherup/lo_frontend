import React from 'react'
import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer className='bg-white dark:bg-white-900'>
      <div className='w-full max-w-screen-xl p-4 mx-auto md:py-8'>
        <div className='sm:flex sm:items-center sm:justify-between'>
          <div className='flex items-center mb-4 sm:mb-0'>
            <a
              href='https://www.tiktok.com/@level0_personalitytest'
              target='blank'
              aria-label='youtube'
              className='mr-4 hover:text-cyan-600'
            >
              <svg
                fill='#636579'
                className='w-6 h-6'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
                xmlSpace='preserve'
              >
                <path d='M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z' />
              </svg>
            </a>
            <a
              href='https://www.facebook.com/L0PersonalityTest'
              target='blank'
              aria-label='facebook'
              className='mr-4 hover:text-cyan-600'
            >
              <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z' />
              </svg>
            </a>
            {/* <a href='https://www.linkedin.com/company/we-the-next-level/' target='blank' aria-label='linkedin' className='mr-4 hover:text-cyan-600'>
            <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='w-5 h-5'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path d='M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z' />
                        </svg>
            </a> */}
            <a
              href='https://www.instagram.com/level0_personalitytest/'
              target='blank'
              aria-label='Instagram'
              className='mr-4 hover:text-cyan-600'
            >
              <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
              </svg>
            </a>
          </div>
          <ul className='flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400'>
            <li>
              <Link href='/tnc' className='mr-4 hover:underline md:mr-6'>
                Terms & Condition
              </Link>
            </li>
            <li>
              <Link href='/privacy-policy' className='mr-4 hover:underline md:mr-6'>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href='#' className='mr-4 hover:underline md:mr-6'>
                hello@thel0.com
              </Link>
            </li>
          </ul>
        </div>
        <hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
        <span className='block text-sm text-gray-500 sm:text-center dark:text-gray-400'>
          © 2023{' '}
          <a href='https://flowbite.com/' className='hover:underline'>
            Level 0
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}

export default Footer
