// ** React Imports
import { ReactNode, useState } from 'react'

// ** MUI Imports
import Link from 'next/link'

import React from 'react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import Grid from '@mui/material/Grid'

// ** Type Import
import { useGoogleLogin } from '@react-oauth/google'
import { GoogleLoginButton, FacebookLoginButton } from 'react-social-login-buttons'
import FacebookLogin from '@greatsumini/react-facebook-login'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Third Party Imports
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { yupResolver } = require('@hookform/resolvers/yup')

import * as yup from 'yup'

import { useForm, Controller } from 'react-hook-form'

// ** MUI Components

import IconButton from '@mui/material/IconButton'

import FormControl from '@mui/material/FormControl'

// ** Layout Import
import BlankLayoutLandingPage from 'src/@core/layouts/BlankLayoutLandingPage'

// import { RegisterParams } from 'src/context/types'

interface State {
  password: string

  showPassword: boolean
}

interface FormData {
  email: string
  name: string
  password: string
  age: string
  gender: string
  confirm_password: string
}

const accountSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  confirm_password: yup.string().min(6).required(),
  age: yup.string().required(),
  gender: yup.string().required()
})

const defaultAccountValues = {
  email: '',
  name: '',
  password: '',
  confirm_password: '',
  age: '',
  gender: ''
}
const Register = () => {
  const auth = useAuth()
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

  // ** States
  // const [showPassword, setShowPassword] = useState<boolean>(false)
  const [state, setState] = useState<State>({
    password: '',

    showPassword: false
  })
  const [error, setError] = useState<string>('')

  // ** Hooks
  const {
    control: accountControl,
    handleSubmit: handleAccountSubmit,
    formState: { errors: accountErrors }
  } = useForm({
    defaultValues: defaultAccountValues,
    resolver: yupResolver(accountSchema)
  })

  // Handle Password
  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword })
  }

  const onSubmit = (data: FormData) => {
    setError('')

    if (data.password != data.confirm_password) {
      setError('Confirm password mismatch')
      setTimeout(() => {
        setError('')
      }, 7000)
    }
    auth.register(data, (err: any) => {
      console.log(err)
    })

    //   // console.log('ini errornya',err.response?.data.password1)
    //   // if (err.response?.data.password1) {
    //   //   for (const element of err.response?.data.password1) {
    //   //     toast.error(element)
    //   //   }
    //   //   setError('password1', {
    //   //     type: 'manual',
    //   //     message: 'wrong password format'
    //   //   })
    //   // }
    //   // if (err.response?.data.password2) {
    //   //   for (const element of err.response?.data.password2) {
    //   //     toast.error(element)
    //   //   }
    //   //   setError('password2', {
    //   //     type: 'manual',
    //   //     message: 'wrong password format'
    //   //   })
    //   // }
    //   // if (err.response?.data.email) {
    //   //   for (const element of err.response?.data.email) {
    //   //     toast.error(element)
    //   //   }
    //   //   setError('email', {
    //   //     type: 'manual',
    //   //     message: 'wrong email format'
    //   //   })
    //   // }
    //   // if (err.response?.data.non_field_errors) {
    //   //   for (const element of err.response?.data.non_field_errors) {
    //   //     toast.error(element)
    //   //   }
    //   // }
  }

  return (
    <>
      <div className='px-8 pt-20 pb-10 mx-auto xl:px-16 ' id='about'>
        <div className='grid grid-flow-row gap-8 py-16 sm:grid-flow-col md:grid-rows-1 sm:grid-cols-2'>
          <div className='flex flex-col items-center justify-center row-start-2 lg:px-10 sm:row-start-1'>
            <h1 className='text-xl font-bold leading-normal lg:text-2xl text-black-600'>Create an account</h1>
            <div className='flex justify-center w-full mt-5'>
              <p className='text-sm text-center text-textcolorblack-300 dark:text-textcolorblack-300'>
                Not a member yet? sign up using your social media accounts.
              </p>
            </div>
            <div className='flex justify-center w-full mt-5'>
              <div className='grid lg:grid-cols-2 grid-col-1'>
                <div className='w-full'>
                  <GoogleLoginButton style={{ fontSize: '14px' }} onClick={loginGoogle}>
                    <span className='text-sm'>Sign up with Google</span>
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
                        <span className='text-sm'>Sign up with Facebook</span>
                      </FacebookLoginButton>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className='flex justify-center w-full mt-5'>
              <p className='text-sm text-center text-textcolorblack-300 dark:text-neutral-300'>
                or register with email
              </p>
            </div>
            <div className='flex justify-center w-full mt-5'>
              <div className='max-w-lg'>
                <form key={0} onSubmit={handleAccountSubmit(onSubmit)}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth>
                        <div className='flex justify-between w-full'>
                          {/* <label
                            className='block mb-2 font-bold tracking-wide uppercase text-md text-black-500'
                            htmlFor='grid-first-name'
                          >
                            Username
                          </label> */}
                          {accountErrors.name && <span className='text-sm text-red-900 '> This field is required</span>}
                        </div>

                        <Controller
                          name='name'
                          control={accountControl}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <input
                              value={value}
                              onChange={onChange}
                              className='block w-full px-4 py-3 mb-3 text-sm leading-tight border border-gray-200 appearance-none rounded-3xl bg-greyloading-300 text-black-500 focus:outline-none focus:bg-white focus:border-gray-500'
                              id='grid-password'
                              placeholder='Username'
                              type='text'
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth>
                        <div className='flex justify-between w-full'>
                          {/* <label
                            className='block mb-2 font-bold tracking-wide uppercase text-md text-black-500'
                            htmlFor='grid-first-name'
                          >
                            Email
                          </label> */}
                          {accountErrors.email && <span className='text-sm text-red-900'> This field is required</span>}
                        </div>
                        <Controller
                          name='email'
                          control={accountControl}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <input
                              value={value}
                              onChange={onChange}
                              className='block w-full px-4 py-3 mb-3 text-sm leading-tight border border-gray-200 appearance-none rounded-3xl bg-greyloading-300 text-black-500 focus:outline-none focus:bg-white focus:border-gray-500'
                              id='grid-password'
                              placeholder='Email Address'
                              type='text'
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth>
                        <div className='flex justify-between w-full'>
                          {/* <label
                            className='block mb-2 font-bold tracking-wide uppercase text-md text-black-500'
                            htmlFor='grid-first-name'
                          >
                            Gender
                          </label> */}
                          {accountErrors.gender && (
                            <span className='text-sm text-red-900'> This field is required</span>
                          )}
                        </div>
                        <Controller
                          name='gender'
                          control={accountControl}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <div className='relative'>
                              <select
                                onChange={onChange}
                                value={value}
                                placeholder='Gender'
                                className='block w-full px-4 py-3 mb-3 text-sm leading-tight border border-gray-200 rounded-3xl bg-greyloading-300 text-black-500 focus:outline-none focus:bg-white focus:border-gray-500'
                              >
                                <option value='' disabled hidden>
                                  Choose Gender
                                </option>

                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                                <option value='others'>Others</option>
                              </select>
                              {/* <div className='absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none'>
                                  <svg
                                    className='w-4 h-4 fill-current'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 20 20'
                                  >
                                    <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                                  </svg>
                                </div> */}
                            </div>
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth>
                        <div className='flex justify-between w-full'>
                          {/* <label
                            className='block mb-2 font-bold tracking-wide uppercase text-md text-black-500'
                            htmlFor='grid-first-name'
                          >
                            Your Age:
                          </label> */}
                          {accountErrors.age && <span className='text-sm text-red-900'> This field is required</span>}
                        </div>
                        <Controller
                          name='age'
                          control={accountControl}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <div className='relative'>
                              <select
                                onChange={onChange}
                                value={value}
                                placeholder='Age'
                                className='block w-full px-4 py-3 mb-3 text-sm leading-tight border border-gray-200 appearance-none rounded-3xl bg-greyloading-300 text-black-500 focus:outline-none focus:bg-white focus:border-gray-500'
                              >
                                <option value='' disabled hidden>
                                  Choose Age
                                </option>

                                <option value='Under 18'>Under 18</option>
                                <option value='18-24'>18-24</option>
                                <option value='25-34'>25-34</option>
                                <option value='35-44'>35-44</option>
                                <option value='45-54'>45-54</option>
                                <option value='55-64'>55-64</option>
                                <option value='65+'>65+</option>
                              </select>
                              {/* <div className='absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none'>
                                <svg
                                  className='w-4 h-4 fill-current'
                                  xmlns='http://www.w3.org/2000/svg'
                                  viewBox='0 0 20 20'
                                >
                                  <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                                </svg>
                              </div> */}
                            </div>
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth>
                        <div className='flex justify-between w-full'>
                          {/* <label
                            className='block mb-2 font-bold tracking-wide uppercase text-md text-black-500'
                            htmlFor='grid-first-name'
                          >
                            Password
                          </label> */}
                          {accountErrors.password && (
                            <span className='text-sm text-red-900'> This field is required</span>
                          )}
                        </div>
                        <Controller
                          name='password'
                          control={accountControl}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <div className='relative'>
                              <input
                                value={value}
                                onChange={onChange}
                                type={state.showPassword ? 'text' : 'password'}
                                placeholder='Password'
                                className='block w-full px-4 py-3 mb-3 text-sm leading-tight border border-gray-200 appearance-none rounded-3xl bg-greyloading-300 text-black-500 focus:outline-none focus:bg-white focus:border-gray-500'
                              />
                              <span className='absolute inset-y-0 right-0 flex items-center pb-3 pr-3'>
                                <IconButton
                                  edge='end'
                                  onClick={handleClickShowPassword}
                                  onMouseDown={e => e.preventDefault()}
                                  aria-label='toggle password visibility'
                                >
                                  <Icon
                                    icon={state.showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'}
                                    fontSize={25}
                                  />
                                </IconButton>
                              </span>
                            </div>
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth>
                        <div className='flex justify-between w-full'>
                          {/* <label
                            className='block mb-2 font-bold tracking-wide uppercase text-md text-black-500'
                            htmlFor='grid-first-name'
                          >
                            Confirm Password
                          </label> */}
                          {accountErrors.confirm_password && (
                            <span className='text-sm text-red-900'> This field is required</span>
                          )}
                        </div>
                        <Controller
                          name='confirm_password'
                          control={accountControl}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <div className='relative'>
                              <input
                                value={value}
                                onChange={onChange}
                                type={state.showPassword ? 'text' : 'password'}
                                placeholder='Confirm Password'
                                className='block w-full px-4 py-3 mb-3 text-sm leading-tight border border-gray-200 appearance-none rounded-3xl bg-greyloading-300 text-black-500 focus:outline-none focus:bg-white focus:border-gray-500'
                              />
                              <span className='absolute inset-y-0 right-0 flex items-center pb-3 pr-3'>
                                <IconButton
                                  edge='end'
                                  onClick={handleClickShowPassword}
                                  onMouseDown={e => e.preventDefault()}
                                  aria-label='toggle password visibility'
                                >
                                  <Icon
                                    icon={state.showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'}
                                    fontSize={25}
                                  />
                                </IconButton>
                              </span>
                            </div>
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      {/* <Button size='large' variant='outlined' color='secondary' disabled>
                  Back
                </Button> */}
                      <span className='text-sm text-textcolorblack-300 dark:text-textcolorblack-300'>
                        By continuing you agree to the L0’s{' '}
                        <Link
                          href='/tnc'
                          className='py-2 pl-3 pr-4 rounded text-skyblue-300 lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white'
                        >
                          terms of service{' '}
                        </Link>
                        and{' '}
                        <Link
                          href='/privacy-policy'
                          className='py-2 pl-3 pr-4 rounded text-skyblue-300 lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white'
                        >
                          privacy policy.
                        </Link>
                      </span>
                    </Grid>

                    <div className='flex flex-col items-center justify-center w-full mt-5 '>
                      <div className='px-5'>
                        {error != '' && <span className='text-sm font-bold text-red-900 '>Error: {error}</span>}
                      </div>
                      <button className='w-full py-3 font-bold bg-gradient-to-r from-button1stcolor via-button2ndcolor to-button3rdcolor text-white-500 rounded-3xl hover:opacity-80 hover:cursor-pointer'>
                        Submit
                      </button>
                    </div>
                  </Grid>
                </form>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-center w-full'>
            <img src='/assets/icon/sign/Signup-I2.png' alt='Characters' />
          </div>
        </div>
      </div>
    </>
  )
}

Register.getLayout = (page: ReactNode) => <BlankLayoutLandingPage>{page}</BlankLayoutLandingPage>

Register.guestGuard = true

export default Register
