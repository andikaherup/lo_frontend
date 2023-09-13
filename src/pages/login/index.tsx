// ** React Imports
import { ReactNode, useState } from 'react'

// ** Type Import
import { useGoogleLogin } from '@react-oauth/google'
import { GoogleLoginButton, FacebookLoginButton } from 'react-social-login-buttons'
import FacebookLogin from '@greatsumini/react-facebook-login'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components

import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'

import { useTheme } from '@mui/material/styles'

// ** Next Import
import ButtonPrimary from 'src/layouts/components/misc/ButtonPrimary'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { yupResolver } = require('@hookform/resolvers/yup')

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports
import BlankLayoutLandingPage from 'src/@core/layouts/BlankLayoutLandingPage'

interface FormData {
  email: string
  password: string
}

interface Error {
  error: string
  error_description: string
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required()
})

const defaultValues = {
  email: '',
  password: ''
}

interface FormData {
  email: string
  password: string
}

// interface LoginProps {
//   open: boolean
//   close: () => void
// }

const LoginPage = () => {
  const loginGoogle = useGoogleLogin({
    onSuccess: (codeResponse: any) => googleLogin(codeResponse)
  })

  const googleLogin = async (response: any) => {
    await auth.googleLogin(response)
  }

  const facebookLogin = async (response: any) => {
    console.log('here', response)
    await auth.facebookLogin(response)
  }

  const onSubmit = async (data: FormData) => {
    setError('')
    const { email, password } = data
    auth.login({ email, password }, (err: any) => {
      setError(err.response?.data.error_description)
    })
  }

  // ** Hooks
  const auth = useAuth()
  const theme = useTheme()
  const [error, setError] = useState<string>('')

  // const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const {
    control: accountControl,
    formState: { errors: accountErrors },
    handleSubmit
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  return (
    <div className='flex justify-center w-full h-full pt-10 w-max-lg lg:px-20 content-right bg-gradient-to-b from-leaderboardTopBlue to-leaderboardBotBlue'>
      <div className='flex w-full max-w-8xl '>
        {!hidden ? (
          <div className='flex items-center justify-center w-full'>
            <img src='/assets/characters/image.webp' alt='Characters' className=' w-[80%] max-w-[500px]' />
          </div>
        ) : null}
        <div className='justify-start w-full'>
          <Box
            sx={{
              p: 7,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            className='bg'
          >
            <div>
              <div className='relative inset-0 w-full '>
                <div className='flex flex-col items-center justify-center min-h-full p-2 text-center'>
                  <h1 className='mt-10 text-3xl font-medium leading-6 text-center text-textcolorblack-300'>
                    Get Your Results
                  </h1>
                  <div className='flex justify-center w-full mt-5'>
                    <p className='text-sm text-center text-textcolorblack-300 dark:text-textcolorblack-300'>
                      Not a member yet?{' '}
                      <Link href='/register'>
                        <span className='text-skyblue-300'> Create a free profile</span>
                      </Link>{' '}
                      and get your detailed report by
                      <span className='text-skyblue-300'> signing up using your social media accounts</span>.
                    </p>
                  </div>
                  <div className='flex justify-center mt-5'>
                    <div className='grid w-full lg:grid-cols-2 grid-col-1'>
                      <div className='w-full'>
                        <GoogleLoginButton style={{ fontSize: '14px' }} onClick={loginGoogle}>
                          <span className='text-sm'>Login with Google</span>
                        </GoogleLoginButton>
                      </div>
                      <div className='w-full'>
                        <FacebookLogin
                          appId='120705577700367'
                          onSuccess={response => {
                            facebookLogin(response)
                          }}
                          onFail={error => {
                            console.log('Login Failed!', error)
                          }}
                          onProfileSuccess={response => {
                            console.log('Get Profile Success!', response)
                          }}
                          render={({ onClick }) => (
                            <FacebookLoginButton onClick={onClick}>
                              <span className='text-sm'>Login with Facebook</span>
                            </FacebookLoginButton>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-center w-full mt-10'>
                    <p className='text-sm text-center text-textcolorblack-300 dark:text-neutral-300'>
                      If you have an account, log in below and view your detailed report on the Level 0 dashboard.
                    </p>
                  </div>
                  <div className='w-full max-w-xl mx-auto'>
                    <div className='mt-8'>
                      <div className='my-6'>
                        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                          <div>
                            <FormControl fullWidth>
                              <div className='flex justify-between'>
                                <label className='block mb-2 text-sm font-medium text-left text-textcolorblack-300'>
                                  Email address
                                </label>
                                {accountErrors.email && (
                                  <span className='text-sm text-red-900'> {accountErrors.email.message}</span>
                                )}
                              </div>
                              <div className='mt-1'>
                                <Controller
                                  name='email'
                                  control={accountControl}
                                  rules={{ required: true }}
                                  render={({ field: { value, onChange } }) => (
                                    <input
                                      id='email'
                                      name='email'
                                      type='email'
                                      value={value}
                                      onChange={onChange}
                                      autoComplete='email'
                                      placeholder='Your Email'
                                      className='block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300'
                                    />
                                  )}
                                />
                              </div>
                            </FormControl>
                          </div>
                          <div className='mt-4 space-y-1'>
                            <FormControl fullWidth>
                              <div className='flex justify-between'>
                                <label className='block mb-2 text-sm font-medium text-left text-textcolorblack-300'>
                                  Password
                                </label>
                                {accountErrors.password && (
                                  <span className='text-sm text-red-900'> {accountErrors.password.message}</span>
                                )}
                              </div>
                              <div className='mt-1'>
                                <Controller
                                  name='password'
                                  control={accountControl}
                                  rules={{ required: true }}
                                  render={({ field: { value, onChange } }) => (
                                    <input
                                      id='password'
                                      value={value}
                                      onChange={onChange}
                                      name='password'
                                      type='password'
                                      autoComplete='current-password'
                                      placeholder='Your Password'
                                      className='block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300'
                                    />
                                  )}
                                />
                              </div>
                            </FormControl>
                          </div>
                          <div className='flex items-center justify-between pt-2 mt-2'>
                            <div className='flex items-center'>
                              <input
                                id='remember-me'
                                name='remember-me'
                                type='checkbox'
                                placeholder='Your password'
                                className='w-4 h-4 text-blue-600 border-gray-200 rounded focus:ring-blue-500'
                              />
                              <label htmlFor='remember-me' className='block ml-2 text-sm text-neutral-600'>
                                Remember me
                              </label>
                            </div>

                            {/* <div className='text-sm'>
                              <Link href='/forgot-password' className='font-medium text-blue-600 hover:text-blue-500'>
                                Forgot your password?
                              </Link>
                            </div> */}
                          </div>
                          <div className='flex flex-col items-center justify-center py-3 '>
                            {error != '' && <span className='mb-2 text-sm text-red-900'> {error}</span>}
                            <ButtonPrimary>Sign In</ButtonPrimary>
                          </div>

                          <span className='text-sm text-black-300'>
                            Don't have account ?{' '}
                            <Link href='/register' className='text-skyblue-300'>
                              Sign up
                            </Link>
                          </span>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayoutLandingPage>{page}</BlankLayoutLandingPage>

LoginPage.guestGuard = true

export default LoginPage
