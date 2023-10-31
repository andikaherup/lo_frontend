// ** React Imports
import { ReactNode, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components

import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography, { TypographyProps } from '@mui/material/Typography'
import toast from 'react-hot-toast'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import FormControl from '@mui/material/FormControl'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { yupResolver } = require('@hookform/resolvers/yup')

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'

// ** Configs

// ** Layout Import

// ** Hooks

// ** Demo Imports

// ** Demo Imports
import BlankLayoutLandingPage from 'src/@core/layouts/BlankLayoutLandingPage'

const TypographyStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  '& svg': { mr: 1.5 },
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: theme.palette.primary.main
}))

const schema = yup.object().shape({
  email: yup.string().email().required()
})

const defaultValues = {
  email: ''
}

const ForgotPassword = () => {
  // ** Hooks
  const theme = useTheme()
  const [error, setError] = useState<string>('')
  const { control: accountControl, handleSubmit: handleAccountSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  // ** Vars

  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const onSubmit = (data: any) => {
    console.log(data)

    const payload = {
      email: data.email
    }
    axios
      .post(authConfig.resetPassword, payload)
      .then(async res => {
        toast.success(res.data.data)
      })
      .catch(err => {
        setError(err.response.data.data)
        console.log(err.response.data.data)
      })
  }

  return (
    <div className='justify-center w-full h-full pt-10 w-max-lg lg:px-20 content-right bg-skyblue-500 flex-'>
      <div className='flex w-full max-w-8xl '>
        {!hidden ? (
          <div className='flex items-center justify-center w-full'>
            <img src='/assets/characters/image.png' alt='Characters' className=' w-[80%] max-w-[500px]' />
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
              <div className='relative inset-0 w-full px-5 rounded-xl bg-white-300 '>
                <div className='flex flex-col items-center justify-center min-h-full p-2 text-center'>
                  <div className='w-full max-w-xl mx-auto'>
                    <div className='mt-8'>
                      <div className='my-6'>
                        <Box sx={{ mb: 6 }}>
                          <TypographyStyled variant='h5'>Reset Password? 🔒</TypographyStyled>
                          <Typography variant='body2'>
                            Enter your email and we&prime;ll send you instructions to reset your password
                          </Typography>
                        </Box>
                        <form autoComplete='off' onSubmit={handleAccountSubmit(onSubmit)}>
                          <div>
                            <FormControl fullWidth>
                              {/* <label className='block mb-2 text-sm font-medium text-left text-textcolorblack-300'>
                                Email address
                              </label> */}
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
                          <div className='px-5 py-2'>
                            {error != '' && <span className='text-sm font-bold text-red-900 '>Error: {error}</span>}
                          </div>
                          <div className='flex justify-center pb-3 '>
                            <button
                              className='w-full py-3 font-bold bg-gradient-to-r from-button1stcolor via-button2ndcolor to-button3rdcolor text-white-500 rounded-3xl hover:opacity-80 hover:cursor-pointer'
                              type='submit'
                            >
                              Send Reset Link
                            </button>
                          </div>
                          <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <LinkStyled href='/login'>
                              <Icon icon='mdi:chevron-left' fontSize='2rem' />
                              <span>Back to login</span>
                            </LinkStyled>
                          </Typography>
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

ForgotPassword.getLayout = (page: ReactNode) => <BlankLayoutLandingPage>{page}</BlankLayoutLandingPage>

ForgotPassword.guestGuard = true
export default ForgotPassword
