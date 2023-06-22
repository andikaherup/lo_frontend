// ** React Imports
import { ReactNode, useState } from 'react'

// ** MUI Imports
import Link from 'next/link'

import React, { useMemo } from 'react'
import Image from 'next/image'

import { motion } from 'framer-motion'
import getScrollAnimation from 'src/views/pages/utils/getScrollAnimation'
import ScrollAnimationWrapper from 'src/layouts/ScrollAnimationWrapper'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import Grid from '@mui/material/Grid'

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
import ButtonPrimary from 'src/layouts/components/misc/ButtonPrimary'

interface State {
  password: string

  showPassword: boolean
}

const accountSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  age: yup.number().required(),
  gender: yup.string().required()
})

const defaultAccountValues = {
  email: '',
  username: '',
  password: '',
  age: '',
  gender: ''
}
const Register = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), [])

  // ** States
  // const [showPassword, setShowPassword] = useState<boolean>(false)
  const [state, setState] = useState<State>({
    password: '',

    showPassword: false
  })

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

  const onSubmit = (value: any) => {
    console.log(value)
  }

  return (
    <>
      <div className='px-8 pt-20 pb-10 mx-auto xl:px-16 bg-skyblue-500 ' id='about'>
        <ScrollAnimationWrapper>
          <div className='grid grid-flow-row gap-8 py-6 sm:grid-flow-col md:grid-rows-1 sm:grid-cols-2'>
            <div className='flex flex-col items-start justify-start row-start-2 lg:px-10 sm:row-start-1'>
              <h1 className='text-2xl leading-normal font-bold/2 lg:text-4xl xl:text-5xl text-black-600'>
                Create an account!
              </h1>
              <div className='w-full mt-10'>
                <form key={0} onSubmit={handleAccountSubmit(onSubmit)}>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth>
                        <div className='flex justify-between w-full'>
                          <label
                            className='block mb-2 font-bold tracking-wide uppercase text-md text-black-500'
                            htmlFor='grid-first-name'
                          >
                            Username
                          </label>
                          {accountErrors.username && (
                            <span className='text-sm text-red-900 '> This field is required</span>
                          )}
                        </div>

                        <Controller
                          name='username'
                          control={accountControl}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <input
                              value={value}
                              onChange={onChange}
                              className='block w-full px-4 py-2 mb-3 leading-tight border border-gray-200 rounded appearance-none bg-white-300 text-black-500 focus:outline-none focus:bg-white focus:border-gray-500'
                              id='grid-password'
                              type='text'
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth>
                        <div className='flex justify-between w-full'>
                          <label
                            className='block mb-2 font-bold tracking-wide uppercase text-md text-black-500'
                            htmlFor='grid-first-name'
                          >
                            Email
                          </label>
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
                              className='block w-full px-4 py-2 mb-3 leading-tight border border-gray-200 rounded appearance-none text-md bg-white-300 text-black-500 focus:outline-none focus:bg-white focus:border-gray-500'
                              id='grid-password'
                              type='text'
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth>
                        <div className='flex justify-between w-full'>
                          <label
                            className='block mb-2 font-bold tracking-wide uppercase text-md text-black-500'
                            htmlFor='grid-first-name'
                          >
                            Gender
                          </label>
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
                                className='block w-full px-4 py-2 pr-8 leading-tight border border-gray-200 rounded appearance-none text-black-500 bg-white-300 focus:outline-none focus:bg-white focus:border-gray-500'
                              >
                                <option value='man'>Male</option>
                                <option value='female'>Female</option>
                                <option value='others'>Others</option>
                              </select>
                              <div className='absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none'>
                                <svg
                                  className='w-4 h-4 fill-current'
                                  xmlns='http://www.w3.org/2000/svg'
                                  viewBox='0 0 20 20'
                                >
                                  <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                                </svg>
                              </div>
                            </div>
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth>
                        <div className='flex justify-between w-full'>
                          <label
                            className='block mb-2 font-bold tracking-wide uppercase text-md text-black-500'
                            htmlFor='grid-first-name'
                          >
                            Your Age:
                          </label>
                          {accountErrors.age && <span className='text-sm text-red-900'> This field is required</span>}
                        </div>
                        <Controller
                          name='age'
                          control={accountControl}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <input
                              value={value}
                              onChange={onChange}
                              className='block w-full px-4 py-2 mb-3 leading-tight border border-gray-200 rounded appearance-none bg-white-300 text-black-500 focus:outline-none focus:bg-white focus:border-gray-500'
                              id='grid-password'
                              type='number'
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth>
                        <div className='flex justify-between w-full'>
                          <label
                            className='block mb-2 font-bold tracking-wide uppercase text-md text-black-500'
                            htmlFor='grid-first-name'
                          >
                            Password
                          </label>
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
                                className='block w-full px-4 py-2 mb-3 leading-tight border border-gray-200 rounded appearance-none bg-white-300 text-black-500 focus:outline-none focus:bg-white focus:border-gray-500'
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
                    {/* <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <InputLabel
                    htmlFor='stepper-linear-account-confirm-password'
                    error={Boolean(accountErrors['confirm-password'])}
                  >
                    Confirm Password
                  </InputLabel>
                  <Controller
                    name='confirm-password'
                    control={accountControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <OutlinedInput
                        value={value}
                        onChange={onChange}
                        label='Confirm Password'
                        id='stepper-linear-account-confirm-password'
                        type={state.showPassword2 ? 'text' : 'password'}
                        error={Boolean(accountErrors['confirm-password'])}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              aria-label='toggle password visibility'
                              onClick={handleClickShowConfirmPassword}
                              onMouseDown={handleMouseDownConfirmPassword}
                            >
                              {state.showPassword2 ? <EyeOutline /> : <EyeOffOutline />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    )}
                  />
                  {accountErrors['confirm-password'] && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-confirm-password-helper'>
                      {accountErrors['confirm-password'].message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid> */}
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      {/* <Button size='large' variant='outlined' color='secondary' disabled>
                  Back
                </Button> */}
                      <span className='text-sm text-textcolorblack-300 dark:text-textcolorblack-300'>
                        By continuing you agree to the L0’s{' '}
                        <Link
                          href='/tnc'
                          className='py-2 pl-3 pr-4 bg-purple-700 rounded text-skyblue-300 lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white'
                        >
                          terms of service{' '}
                        </Link>
                        and{' '}
                        <Link
                          href='/privacy-policy'
                          className='py-2 pl-3 pr-4 bg-purple-700 rounded text-skyblue-300 lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white'
                        >
                          privacy policy.
                        </Link>
                      </span>
                    </Grid>
                    <div className='flex justify-end w-full mt-5 '>
                      <ButtonPrimary>Create</ButtonPrimary>
                    </div>
                  </Grid>
                </form>
              </div>
            </div>
            <div className='flex w-full px-20'>
              <motion.div className='hidden w-full h-full lg:flex' variants={scrollAnimation}>
                <Image
                  src='/assets/characters/image.png'
                  alt='Characters'
                  quality={100}
                  width={200}
                  height={200}
                  layout='responsive'
                />
              </motion.div>
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </>
  )
}

Register.getLayout = (page: ReactNode) => <BlankLayoutLandingPage>{page}</BlankLayoutLandingPage>

Register.guestGuard = true

export default Register
