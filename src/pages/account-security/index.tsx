// ** React Imports
import { ReactNode, useState } from 'react'

import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Icon from 'src/@core/components/icon'

// ** Next Import
import { useRouter } from 'next/router'
import { characters } from 'src/configs/characterData'
import IconButton from '@mui/material/IconButton'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { yupResolver } = require('@hookform/resolvers/yup')

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Demo Imports
import BlankLayoutLandingPage from 'src/@core/layouts/BlankLayoutLandingPage'
import toast from 'react-hot-toast'
import SecurityPopup from 'src/layouts/components/account-security/securitypopup'

interface FormData {
  oldPassword: string
  password: string
  retypepassword: string
}
interface FormCreateData {
  password: string
  retypepassword: string
}

interface State {
  showOldPassword: boolean
  showPassword: boolean

  showConfirmPassword: boolean
}

const schema = yup.object().shape({
  oldPassword: yup.string().min(5).required(),
  password: yup.string().min(5).required(),
  retypepassword: yup.string().min(5).required()
})
const createSchema = yup.object().shape({
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
  const [loadingPopup, setLoadingPopup] = useState<boolean>(false)
  const [openRef, setOpenRef] = useState<boolean>(false)
  const [securityMessage, setSecurityMessage] = useState<string>('')

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setLoadingPopup(true)
    const { oldPassword, retypepassword, password } = data

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
            setError('')
            setSecurityMessage('Password Changed')
            setOpenRef(true)
            // router.replace('/')
          })
      })

      .catch(err => {
        console.log(err)
        setError(err.response.data.data)

        // toast.error(err.response.data.data)
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
    setLoadingPopup(false)
  }

  const textProcess = (text: string) => {
    return text.replace(/(oldPassword|password|retypepassword)/gi, match => {
      switch (match.toLowerCase()) {
        case 'oldpassword':
          return 'Old Password'
        case 'password':
          return 'Password'
        case 'retypepassword':
          return 'Re-type Password'
        default:
          return match
      }
    })
  }

  const onCreateSubmit = async (data: FormCreateData) => {
    setLoading(true)
    const { retypepassword, password } = data

    const payload = {
      password: password,
      confirm_password: retypepassword
    }
    axios
      .post(authConfig.createPasswordEndpoint, payload, {
        headers: { Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)! }
      })
      .then(() => {
        auth.refreshUser()
        toast.success('Password creation success')
        setError('')
      })

      .catch(err => {
        console.log(err)
        setError(err.response.data.data)
      })

    setLoading(false)
  }

  // ** Hooks
  // const auth = useAuth()

  const [passwordShow, setPasswordShow] = useState<State>({
    showOldPassword: false,
    showConfirmPassword: false,
    showPassword: false
  })

  // const { settings } = useSettings()
  // const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const handleClickShowPassword = () => {
    setPasswordShow({ ...passwordShow, showPassword: !passwordShow.showPassword })
  }
  const handleClickShowOldPassword = () => {
    setPasswordShow({ ...passwordShow, showOldPassword: !passwordShow.showOldPassword })
  }
  const handleClickShowConfirmPassword = () => {
    setPasswordShow({ ...passwordShow, showConfirmPassword: !passwordShow.showConfirmPassword })
  }

  const {
    control: accountControl,
    formState: { errors: formError },
    handleSubmit
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const {
    control: passwordCreateControl,
    formState: { errors: formCreateError },
    handleSubmit: handleCreateSubmit
  } = useForm({
    defaultValues,
    resolver: yupResolver(createSchema)
  })

  const closeRef = () => {
    setOpenRef(false)
  }

  return (
    <section
      className={`h-full min-h-screen bg-white-300 ${
        characters.find(character => character.name === auth.user?.character)?.background
      }`}
    >
      <div className='max-w-2xl px-4 py-8 mx-auto lg:py-16'>
        <div className='justify-start w-full'>
          <Box
            sx={{
              p: 7,
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            className='w-full mt-10 rounded-xl bg-white-300'
          >
            <div className='w-full'>
              <div className='relative inset-0 w-full '>
                {auth.user?.password_is_set && (
                  <div className='flex flex-col items-start justify-center min-h-full p-2 text-center'>
                    <h1 className='mt-10 text-3xl font-medium leading-6 text-center text-textcolorblack-300'>
                      Change Password
                    </h1>

                    <div className='flex justify-start w-full mt-10'>
                      <p className='text-sm text-center text-textcolorblack-300 dark:text-neutral-300'>
                        {auth.user?.using_default_password
                          ? 'Default user password is in use. Change the password'
                          : 'Please input your old password and new password to proceed.'}
                      </p>
                    </div>
                    <div className='w-full max-w-xl'>
                      <div className='w-full mt-8'>
                        <div className='w-full '>
                          <form noValidate autoComplete='off' className='w-full' onSubmit={handleSubmit(onSubmit)}>
                            <div className='w-full'>
                              <FormControl fullWidth>
                                <div className='flex items-center justify-between overflow-hidden'>
                                  <label className='block mt-3 mb-2 text-sm font-medium text-left text-textcolorblack-300'>
                                    Old Password
                                  </label>
                                </div>
                                <div className='mt-1'>
                                  <Controller
                                    name='oldPassword'
                                    control={accountControl}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                      <div className='relative'>
                                        <input
                                          id='oldPassword'
                                          name='oldPassword'
                                          type={passwordShow.showOldPassword ? 'text' : 'password'}
                                          value={value}
                                          onChange={onChange}
                                          autoComplete='oldPassword'
                                          placeholder='Your Old password'
                                          className='block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 bg-gray-50 focus:outline-none ring-gray-400 focus:border-transparent ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300'
                                        />
                                        <span className='absolute inset-y-0 right-0 flex items-center justify-center pr-3'>
                                          <IconButton
                                            edge='end'
                                            onClick={handleClickShowOldPassword}
                                            onMouseDown={e => e.preventDefault()}
                                            aria-label='toggle password visibility'
                                          >
                                            <Icon
                                              icon={
                                                passwordShow.showOldPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'
                                              }
                                              fontSize={25}
                                            />
                                          </IconButton>
                                        </span>
                                      </div>
                                    )}
                                  />
                                </div>
                                {formError.oldPassword && (
                                  <span className='mt-1 text-sm text-left text-red-900 '>
                                    {textProcess(formError.oldPassword.message || '')}
                                  </span>
                                )}
                              </FormControl>
                            </div>
                            {/* <hr className={`h-0.5  border-t-0  my-5  bg-gray-400`} /> */}
                            <div className='w-full pt-5'>
                              <FormControl fullWidth>
                                <div className='flex items-center justify-between overflow-hidden'>
                                  <label className='block mt-3 mb-2 text-sm font-medium text-left text-textcolorblack-300'>
                                    New Password
                                  </label>
                                </div>

                                <div className='mt-1'>
                                  <Controller
                                    name='password'
                                    control={accountControl}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                      <div className='relative'>
                                        <input
                                          id='password'
                                          name='password'
                                          type={passwordShow.showPassword ? 'text' : 'password'}
                                          value={value}
                                          onChange={onChange}
                                          autoComplete='password'
                                          placeholder='Your password'
                                          className='block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg ring-gray-400 text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300'
                                        />
                                        <span className='absolute inset-y-0 right-0 flex items-center justify-center pr-3'>
                                          <IconButton
                                            edge='end'
                                            onClick={handleClickShowPassword}
                                            onMouseDown={e => e.preventDefault()}
                                            aria-label='toggle password visibility'
                                          >
                                            <Icon
                                              icon={
                                                passwordShow.showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'
                                              }
                                              fontSize={25}
                                            />
                                          </IconButton>
                                        </span>
                                      </div>
                                    )}
                                  />
                                </div>
                                {formError.password && (
                                  <span className='mt-1 text-sm text-left text-red-900 '>
                                    {textProcess(formError.password.message || '')}
                                  </span>
                                )}
                              </FormControl>
                            </div>
                            <div className='w-full'>
                              <FormControl fullWidth>
                                <div className='flex items-center justify-between overflow-hidden'>
                                  <label
                                    htmlFor='password'
                                    className='block mt-3 mb-2 text-sm font-medium text-left text-textcolorblack-300'
                                  >
                                    Re-type New Password{' '}
                                  </label>
                                </div>

                                <div className='mt-1'>
                                  <Controller
                                    name='retypepassword'
                                    control={accountControl}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                      <div className='relative'>
                                        <input
                                          id='retypepassword'
                                          value={value}
                                          onChange={onChange}
                                          name='retypepassword'
                                          type={passwordShow.showConfirmPassword ? 'text' : 'password'}
                                          autoComplete='current-password'
                                          placeholder='Your Password'
                                          className='block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg ring-gray-400 text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300'
                                        />
                                        <span className='absolute inset-y-0 right-0 flex items-center justify-center pr-3'>
                                          <IconButton
                                            edge='end'
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={e => e.preventDefault()}
                                            aria-label='toggle password visibility'
                                          >
                                            <Icon
                                              icon={
                                                passwordShow.showConfirmPassword
                                                  ? 'mdi:eye-outline'
                                                  : 'mdi:eye-off-outline'
                                              }
                                              fontSize={25}
                                            />
                                          </IconButton>
                                        </span>
                                      </div>
                                    )}
                                  />
                                </div>
                                {formError.retypepassword && (
                                  <span className='mt-1 text-sm text-left text-red-900 '>
                                    {textProcess(formError.retypepassword.message || '')}
                                  </span>
                                )}
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
                )}

                {!auth.user?.password_is_set && (
                  <div className='flex flex-col items-start justify-center min-h-full p-2 text-center'>
                    <h1 className='mt-10 text-3xl font-medium leading-6 text-center text-textcolorblack-300'>
                      Create Password
                    </h1>

                    <div className='flex justify-start w-full mt-10'>
                      <p className='text-sm text-center text-textcolorblack-300 dark:text-neutral-300'>
                        Add a password to your account
                      </p>
                    </div>
                    <div className='w-full'>
                      <div className='w-full'>
                        <div className='w-full '>
                          <form
                            noValidate
                            autoComplete='off'
                            className='w-full'
                            onSubmit={handleCreateSubmit(onCreateSubmit)}
                          >
                            <div className='w-full pt-5'>
                              <FormControl fullWidth>
                                <div className='flex items-center justify-between overflow-hidden'>
                                  <label className='block mt-3 mb-2 text-sm font-medium text-left text-textcolorblack-300'>
                                    New Password
                                  </label>
                                </div>

                                <div className='mt-1'>
                                  <Controller
                                    name='password'
                                    control={passwordCreateControl}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                      <div className='relative'>
                                        <input
                                          id='password'
                                          name='password'
                                          type={passwordShow.showPassword ? 'text' : 'password'}
                                          value={value}
                                          onChange={onChange}
                                          autoComplete='password'
                                          placeholder='Your password'
                                          className='block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg ring-gray-400 text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300'
                                        />
                                        <span className='absolute inset-y-0 right-0 flex items-center justify-center pr-3'>
                                          <IconButton
                                            edge='end'
                                            onClick={handleClickShowPassword}
                                            onMouseDown={e => e.preventDefault()}
                                            aria-label='toggle password visibility'
                                          >
                                            <Icon
                                              icon={
                                                passwordShow.showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'
                                              }
                                              fontSize={25}
                                            />
                                          </IconButton>
                                        </span>
                                      </div>
                                    )}
                                  />
                                </div>
                                {formCreateError.password && (
                                  <span className='mt-1 text-sm text-left text-red-900 '>
                                    {textProcess(formCreateError.password.message || '')}
                                  </span>
                                )}
                              </FormControl>
                            </div>
                            <div className='w-full'>
                              <FormControl fullWidth>
                                <div className='flex items-center justify-between overflow-hidden'>
                                  <label
                                    htmlFor='password'
                                    className='block mt-3 mb-2 text-sm font-medium text-left text-textcolorblack-300'
                                  >
                                    Re-type New Password{' '}
                                  </label>
                                </div>

                                <div className='mt-1'>
                                  <Controller
                                    name='retypepassword'
                                    control={passwordCreateControl}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                      <div className='relative'>
                                        <input
                                          id='retypepassword'
                                          value={value}
                                          onChange={onChange}
                                          name='retypepassword'
                                          type={passwordShow.showConfirmPassword ? 'text' : 'password'}
                                          autoComplete='current-password'
                                          placeholder='Your Password'
                                          className='block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg ring-gray-400 text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300'
                                        />
                                        <span className='absolute inset-y-0 right-0 flex items-center justify-center pr-3'>
                                          <IconButton
                                            edge='end'
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={e => e.preventDefault()}
                                            aria-label='toggle password visibility'
                                          >
                                            <Icon
                                              icon={
                                                passwordShow.showConfirmPassword
                                                  ? 'mdi:eye-outline'
                                                  : 'mdi:eye-off-outline'
                                              }
                                              fontSize={25}
                                            />
                                          </IconButton>
                                        </span>
                                      </div>
                                    )}
                                  />
                                </div>
                                {formCreateError.retypepassword && (
                                  <span className='mt-1 text-sm text-left text-red-900 '>
                                    {textProcess(formCreateError.retypepassword.message || '')}
                                  </span>
                                )}
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
                )}
              </div>
            </div>
          </Box>
          <SecurityPopup load={loadingPopup} open={openRef} close={closeRef} message={securityMessage}></SecurityPopup>
        </div>
      </div>
    </section>
  )
}

ChangePasswordPage.getLayout = (page: ReactNode) => <BlankLayoutLandingPage>{page}</BlankLayoutLandingPage>

ChangePasswordPage.guestGuard = true

export default ChangePasswordPage
