// ** React Imports
import { ReactNode, useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import { useTheme } from '@mui/material/styles'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { yupResolver } = require('@hookform/resolvers/yup')

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Demo Imports
import BlankLayoutLandingPage from 'src/@core/layouts/BlankLayoutLandingPage'

interface FormData {
  oldPassword: string
  password: string
  retypepassword: string
}

const schema = yup.object().shape({
  oldPassword: yup.string().min(5).required(),
  password: yup.string().min(5).required(),
  retypepassword: yup.string().min(5).required()
})

const defaultValues = {
  oldPassword: '',
  retypepassword: '',
  password: ''
}

// interface LoginProps {
//   open: boolean
//   close: () => void
// }

const ChangePasswordPage = () => {
  const auth = useAuth()
  const router = useRouter()

  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    console.log(auth.user)
  }, [])
  const onSubmit = async (data: FormData) => {
    setLoading(true)
    const { oldPassword, retypepassword, password } = data
    console.log(oldPassword, password, retypepassword)
    const payload = {
      old_password: oldPassword,
      new_password: password,
      confirm_password: retypepassword
    }
    axios
      .post(authConfig.changePasswordEndpoint, payload, {
        headers: { Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)! }
      })
      .then(async res => {
        console.log(res)
        axios
          .put(
            authConfig.editUserEndpoint,
            { using_default_password: false },
            {
              headers: { Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)! }
            }
          )
          .then(() => {
            auth.refreshUser()

            router.replace('/')
          })
      })

      .catch(err => {
        console.log(err)
        // toast.error(err.response.data.data)
        setError(err.response.data.data)
        // if (errorCallback) errorCallback(err)
      })
    // auth.login({ email, password }, (err: any) => {
    //   if (err.response?.data.non_field_errors) {
    //     for (const element of err.response?.data.non_field_errors) {
    //       console.log(element)
    //     }
    //   }
    // })
    setLoading(false)
  }

  // ** Hooks
  // const auth = useAuth()
  const theme = useTheme()

  // const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const {
    control: accountControl,
    formState: { errors: formError },
    handleSubmit
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  return (
    <div className='justify-center w-full h-full pt-10 w-max-lg lg:px-20 content-right bg-gradient-to-b from-leaderboardTopBlue to-leaderboardBotBlue flex-'>
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
                    Change Password
                  </h1>
                  {/* <div className='flex justify-center w-full mt-5'>
                    <p className='text-sm text-center text-textcolorblack-300 dark:text-textcolorblack-300'>
                      Not a member yet?{' '}
                      <Link href='/register'>
                        <span className='text-skyblue-300'> Create a free profile</span>
                      </Link>{' '}
                      and get your detailed report by
                      <span className='text-skyblue-300'> signing up using your social media accounts</span>.
                    </p>
                  </div> */}

                  <div className='flex justify-center w-full mt-10'>
                    <p className='text-sm text-center text-textcolorblack-300 dark:text-neutral-300'>
                      Please input your old password and new password to proceed.
                    </p>
                  </div>
                  <div className='w-full max-w-xl mx-auto'>
                    <div className='w-full mt-8'>
                      <div className='w-full my-6'>
                        <form noValidate autoComplete='off' className='w-full' onSubmit={handleSubmit(onSubmit)}>
                          <div className='w-full'>
                            <FormControl fullWidth>
                              <div className='flex justify-between'>
                                <label className='block mb-2 text-sm font-medium text-left text-textcolorblack-300'>
                                  Old Password
                                </label>
                                {formError.oldPassword && (
                                  <span className='text-sm text-red-900 '> {formError.oldPassword.message}</span>
                                )}
                              </div>
                              <div className='mt-1'>
                                <Controller
                                  name='oldPassword'
                                  control={accountControl}
                                  rules={{ required: true }}
                                  render={({ field: { value, onChange } }) => (
                                    <input
                                      id='oldPassword'
                                      name='oldPassword'
                                      type='password'
                                      value={value}
                                      onChange={onChange}
                                      autoComplete='oldPassword'
                                      placeholder='Your Old password'
                                      className='block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300'
                                    />
                                  )}
                                />
                              </div>
                            </FormControl>
                          </div>
                          <div className='py-5'>
                            <FormControl fullWidth>
                              <div className='flex justify-between'>
                                <label className='block mb-2 text-sm font-medium text-left text-textcolorblack-300'>
                                  New Password
                                </label>
                                {formError.password && (
                                  <span className='text-sm text-red-900 '> {formError.password.message}</span>
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
                                      name='password'
                                      type='password'
                                      value={value}
                                      onChange={onChange}
                                      autoComplete='password'
                                      placeholder='Your password'
                                      className='block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300'
                                    />
                                  )}
                                />
                              </div>
                            </FormControl>
                          </div>
                          <div className='space-y-1'>
                            <FormControl fullWidth>
                              <div className='flex items-center justify-between overflow-hidden'>
                                <label
                                  htmlFor='password'
                                  className='block mt-3 mb-2 text-sm font-medium text-left text-textcolorblack-300'
                                >
                                  Re-type New Password{' '}
                                </label>
                                {formError.retypepassword && (
                                  <span className='overflow-hidden text-sm text-red-900 '>
                                    {formError.retypepassword.message}
                                  </span>
                                )}
                              </div>

                              <div className='mt-1'>
                                <Controller
                                  name='retypepassword'
                                  control={accountControl}
                                  rules={{ required: true }}
                                  render={({ field: { value, onChange } }) => (
                                    <input
                                      id='retypepassword'
                                      value={value}
                                      onChange={onChange}
                                      name='retypepassword'
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
                          <div className='py-5'>
                            {error != '' && <span className='text-sm text-red-900 '>Error: {error}</span>}
                          </div>
                          <div className='flex justify-center'>
                            <button
                              className={
                                'py-3 lg:py-4 px-12 lg:px-16 text-white-500 font-semibold rounded-full bg-blue-500 hover:shadow-blue-md transition-all outline-none '
                              }
                              disabled={loading}
                            >
                              Submit
                            </button>
                          </div>
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

ChangePasswordPage.getLayout = (page: ReactNode) => <BlankLayoutLandingPage>{page}</BlankLayoutLandingPage>

ChangePasswordPage.guestGuard = true

export default ChangePasswordPage
