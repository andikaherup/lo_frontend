import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

// ** Type Import
import { useGoogleLogin } from '@react-oauth/google'
import { GoogleLoginButton, FacebookLoginButton } from 'react-social-login-buttons'
import FacebookLogin from '@greatsumini/react-facebook-login'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { yupResolver } = require('@hookform/resolvers/yup')

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import FormControl from '@mui/material/FormControl'

// ** Next Import
import ButtonPrimary from '../misc/ButtonPrimary'

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

const LoginDialog = (props: LoginProps) => {
  const { open, close } = props
  const auth = useAuth()

  // const [isOpen, setIsOpen] = useState(open)

  function closeModal() {
    close()
  }

  // function openModal() {
  //   setIsOpen(true)
  // }

  const { control: accountControl, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })
  const loginGoogle = useGoogleLogin({
    onSuccess: (codeResponse: any) => googleLogin(codeResponse)
  })

  const googleLogin = async (response: any) => {
    await auth.googleLogin(response)
    closeModal()
  }

  const facebookLogin = async (response: any) => {
    console.log('here', response)
    await auth.facebookLogin(response)
    closeModal()
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
    closeModal()
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={closeModal}>
        <div className='fixed inset-0 bg-gray-500 opacity-50' aria-hidden='true' />
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 w-full overflow-y-auto'>
          <div className='flex items-center justify-center min-h-full p-2 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-xl px-10 overflow-hidden text-left align-middle transition-all transform shadow-xl bg-white-500 rounded-2xl'>
                <Dialog.Title
                  as='h1'
                  className='mt-10 text-3xl font-medium leading-6 text-center text-textcolorblack-300'
                >
                  Get Your Results
                </Dialog.Title>
                <div className='flex justify-center w-full mt-5'>
                  <p className='text-sm text-center text-textcolorblack-300 dark:text-textcolorblack-300'>
                    Not a member yet?<span className='text-skyblue-300'> Create a free profile</span> and get your
                    detailed report by
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
                  <div className='grid lg:grid-cols-2 grid-col-1'>
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
                            <label className='block mb-2 text-sm font-medium text-textcolorblack-300'>
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
                              className='block mt-3 mb-2 text-sm font-medium text-textcolorblack-300'
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default LoginDialog
