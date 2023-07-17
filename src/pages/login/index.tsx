'use client'

// ** React Imports
import { useState, ReactNode, useEffect } from 'react'

import { Dialog, Transition } from '@headlessui/react'
// ** Type Import
import { useGoogleLogin } from '@react-oauth/google'
import { GoogleLoginButton, FacebookLoginButton } from 'react-social-login-buttons'
import FacebookLogin from '@greatsumini/react-facebook-login'
// ** Next Imports
import Link from 'next/link'
import Image from 'next/image'

// ** MUI Components
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Typography, { TypographyProps } from '@mui/material/Typography'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Next Import
import ButtonPrimary from 'src/layouts/components/misc/ButtonPrimary'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { yupResolver } = require('@hookform/resolvers/yup')

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import useBgColor from 'src/@core/hooks/useBgColor'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import BlankLayoutLandingPage from 'src/@core/layouts/BlankLayoutLandingPage'

// ** Styled Components
const LoginIllustrationWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10)
  }
}))

const LoginIllustration = styled('img')(({ theme }) => ({
  maxWidth: '48rem',
  [theme.breakpoints.down('xl')]: {
    maxWidth: '38rem'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '30rem'
  }
}))

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 650
  }
}))

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

const TypographyStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

interface FormData {
  email: string
  password: string
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
interface LoginProps {
  open: boolean
  close: () => void
}

const LoginPage = () => {
  useEffect(() => {}, [])

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
    const { email, password } = data
    auth.login({ email, password }, (err: any) => {
      if (err.response?.data.non_field_errors) {
        for (const element of err.response?.data.non_field_errors) {
          console.log(element)
        }
      }
    })
  }

  // ** Hooks
  const auth = useAuth()
  const theme = useTheme()
  const bgColors = useBgColor()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings

  const { control: accountControl, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

  return (
    <Box className='h-full pt-10 lg:px-20 content-right bg-skyblue-500'>
      {!hidden ? (
        <div className='flex items-center justify-center'>
          <img src='/assets/characters/image.png' alt='Characters' className=' w-[80%]' />
        </div>
      ) : null}
      <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
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
          <BoxWrapper>
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
                  {/* <button className='flex gap-2 px-4 py-2 transition duration-150 border rounded-lg border-slate-200 text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow'>
                  <img
                    className='w-6 h-6'
                    src='https://www.svgrepo.com/show/475656/google-color.svg'
                    loading='lazy'
                    alt='google logo'
                  />
                  <span>Sign Up with Google</span>
                </button> */}
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
                            <label className='block mb-2 text-sm font-medium text-left text-textcolorblack-300'>
                              Email address
                            </label>
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

                        <div className='space-y-1'>
                          <FormControl fullWidth>
                            <label
                              htmlFor='password'
                              className='block mt-3 mb-2 text-sm font-medium text-left text-textcolorblack-300'
                            >
                              Password{' '}
                            </label>
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

                          <div className='text-sm'>
                            <a href='#' className='font-medium text-blue-600 hover:text-blue-500'>
                              Forgot your password?
                            </a>
                          </div>
                        </div>

                        <div className='flex justify-center pt-3'>
                          <ButtonPrimary>Sign In</ButtonPrimary>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayoutLandingPage>{page}</BlankLayoutLandingPage>

LoginPage.guestGuard = true

export default LoginPage
