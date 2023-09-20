import { ReactNode, useEffect, useState } from 'react'

import BlankLayoutLandingPage from 'src/@core/layouts/BlankLayoutLandingPage'

// ** Type
import { characters } from 'src/configs/characterData'
import Badge from '@mui/material/Badge'
import Grid from '@mui/material/Grid'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'
import ProgressQuest from 'src/layouts/components/header/progressQuest'
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Type
import { Archetype } from 'src/context/characterType'

// ** Third Party Imports
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { yupResolver } = require('@hookform/resolvers/yup')

import * as yup from 'yup'

import { useForm, Controller } from 'react-hook-form'

// ** MUI Components

// import IconButton from '@mui/material/IconButton'

import FormControl from '@mui/material/FormControl'

import toast from 'react-hot-toast'

interface FormData {
  email: string
  name: string
  age: string
  gender: string
  bank_account_number: string
  bank_name: string
  phone_number: string
}

const accountSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  age: yup.string().required(),
  gender: yup.string(),
  bank_account_number: yup.string().required(),
  bank_name: yup.string().required(),
  phone_number: yup.string().required()
})

const Setting = () => {
  useEffect(() => {
    const character = characters.find(character => character.name === auth.user?.character)
    setChar(character)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const auth = useAuth()

  const [tooltipShow, setTooltipShow] = useState<boolean>(false)
  const [char, setChar] = useState<Archetype>()
  const [selected, setSelected] = useState<boolean>(auth.user?.anonymous_on_leaderboard || false)

  const defaultAccountValues = {
    email: auth.user?.email || '',
    name: auth.user?.name || '',
    age: auth.user?.age || '',
    gender: auth.user?.gender || '',
    bank_account_number: auth.user?.bank_account_number || '',
    bank_name: auth.user?.bank_name || '',
    phone_number: auth.user?.phone_number || ''
  }

  const {
    control: accountControl,
    handleSubmit: handleAccountSubmit,
    formState: { errors: accountErrors }
  } = useForm({
    defaultValues: defaultAccountValues,
    resolver: yupResolver(accountSchema)
  })

  const onSubmit = (data: FormData) => {
    const payload = {
      bank_account_number: data.bank_account_number,
      bank_name: data.bank_name,
      phone_number: data.phone_number,
      name: data.name,
      age: data.age,
      gender: data.gender
    }
    axios
      .put(authConfig.editUserEndpoint, payload, {
        headers: { Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)! }
      })
      .then(async () => {
        toast.success('User data has been updated')
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleChange = (value: any) => {
    // Check if the value is already in the selected array
    setSelected(value.target.checked)
    const payload = {
      anonymous_on_leaderboard: value.target.checked
    }
    axios
      .put(authConfig.editUserEndpoint, payload, {
        headers: { Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)! }
      })
      .then(async () => {
        toast.success(`Your account is now ${value.target.checked === true ? 'Anonymous' : 'Public'}`)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <section
      className={`h-full min-h-screen bg-white-300 ${
        characters.find(character => character.name === auth.user?.character)?.background
      }`}
    >
      <div className='max-w-2xl px-4 py-8 mx-auto lg:py-16'>
        <div className='mx-auto mt-6 w-fit'>
          <Badge
            overlap='circular'
            sx={{ ml: 2, cursor: 'pointer' }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
          >
            <img
              alt='userimage'
              src={`/assets/characters/${
                auth.user?.character_level == 0
                  ? auth.user?.gender == 'male'
                    ? char?.lvl0_image_M
                    : char?.lvl0_image_F
                  : auth.user?.gender == 'male'
                  ? char?.lvl1_image_M
                  : char?.lvl1_image_F
              }`}
              className='w-40 h-40'
            />
          </Badge>
        </div>
        <div className='mb-5'>
          <h1 className='text-xl font-bold text-center uppercase text-black-300 '>the {auth.user?.character}</h1>
        </div>
        {auth.user && (
          <div>
            <ProgressQuest user={auth.user}></ProgressQuest>
          </div>
        )}
        <div className='p-10 mt-10 bg-white-300 rounded-xl'>
          <div className='flex items-center justify-end'>
            <div className='flex items-center justify-center'>
              <label className='relative inline-flex items-center cursor-pointer'>
                <input type='checkbox' checked={selected} onChange={handleChange} className='sr-only peer' />
                <div className="w-11 h-6 bg-gray-400 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <span className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>Anonymous Mode</span>

            <Tooltip open={tooltipShow} title='Hide your character on the leaderboard' placement='top'>
              <IconButton
                sx={{ color: '#db4437' }}
                onClick={() => {
                  setTooltipShow(!tooltipShow)
                }}
              >
                <Icon icon='mdi:info' className='w-8 h-8' />
              </IconButton>
            </Tooltip>
          </div>

          <div className='flex items-center justify-between pb-4 mt-5 mb-4 border-b rounded-t sm:mb-5 dark:border-gray-600'>
            <h3 className='text-lg font-semibold text-gray-900 text-black-300'> User Info</h3>
          </div>

          <div className='mt-5'>
            <form onSubmit={handleAccountSubmit(onSubmit)}>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <div className='flex justify-between '>
                      <label
                        htmlFor='bank_name'
                        className='block mb-2 text-sm font-medium text-black-300 dark:text-white'
                      >
                        Bank Name
                      </label>
                      {accountErrors.bank_name && (
                        <span className='text-sm text-red-900 '> This field is required</span>
                      )}
                    </div>

                    <Controller
                      name='bank_name'
                      control={accountControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <input
                          value={value}
                          onChange={onChange}
                          className='bg-gray-50 border border-black-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                          id='grid-password'
                          type='text'
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <div className='flex justify-between '>
                      <label
                        htmlFor='bank_account_number'
                        className='block mb-2 text-sm font-medium text-black-300 dark:text-white'
                      >
                        Bank Account Number
                      </label>
                      {accountErrors.bank_account_number && (
                        <span className='text-sm text-red-900 '> This field is required</span>
                      )}
                    </div>

                    <Controller
                      name='bank_account_number'
                      control={accountControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <input
                          value={value}
                          onChange={onChange}
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                          id='grid-password'
                          type='text'
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <div className='flex justify-between'>
                      <label
                        htmlFor='phone_number'
                        className='block mb-2 text-sm font-medium text-black-300 dark:text-white'
                      >
                        Phone Number
                      </label>
                      {accountErrors.phone_number && (
                        <span className='text-sm text-red-900 '> This field is required</span>
                      )}
                    </div>

                    <Controller
                      name='phone_number'
                      control={accountControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <input
                          value={value}
                          onChange={onChange}
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                          id='grid-password'
                          type='text'
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <div className='grid gap-4 mt-10 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5'>
                <div className='w-full border-b-2 border-white-300'>
                  <h1 className='py-1 text-xl font-bold text-black-300'>Personal Data</h1>
                </div>
                <div className='sm:col-span-2'>
                  <label htmlFor='name' className='block mb-2 text-sm font-medium text-black-300 dark:text-white'>
                    Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    disabled
                    id='name'
                    className='bg-gray-50 hover:cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                    value={auth.user?.name || ''}
                    placeholder='Type product name'
                    required
                  />
                </div>
                <div className='w-full'>
                  <label htmlFor='brand' className='block mb-2 text-sm font-medium text-black-300 dark:text-white'>
                    Email
                  </label>
                  <input
                    type='text'
                    name='brand'
                    id='brand'
                    disabled
                    className='bg-gray-50 border hover:cursor-not-allowed  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                    value={auth.user?.email}
                    placeholder='Product brand'
                    required
                  />
                </div>

                <div>
                  <FormControl fullWidth>
                    <div className='flex justify-between w-full'>
                      <label
                        htmlFor='phone_number'
                        className='block mb-2 text-sm font-medium text-black-300 dark:text-white'
                      >
                        Age
                      </label>
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
                            className='bg-gray-50 border hover:cursor-not-allowed  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                          >
                            <option value=''></option>

                            <option value='Under 18'>Under 18</option>
                            <option value='18-24'>18-24</option>
                            <option value='25-34'>25-34</option>
                            <option value='35-44'>35-44</option>
                            <option value='45-54'>45-54</option>
                            <option value='55-64'>55-64</option>
                            <option value='65+'>65+</option>
                          </select>
                        </div>
                      )}
                    />
                  </FormControl>
                  {/* <label htmlFor='category' className='block mb-2 text-sm font-medium text-black-300 dark:text-white'>
                    Age
                  </label> */}
                  {/* <input
                    type='text'
                    name='age'
                    disabled
                    id='age'
                    className='bg-gray-50 hover:cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                    value={auth.user?.age || ''}
                    required
                  /> */}
                </div>
                <div>
                  <label
                    htmlFor='item-weight'
                    className='block mb-2 text-sm font-medium text-black-300 dark:text-white'
                  >
                    Gender
                  </label>
                  <input
                    type='text'
                    name='gender'
                    disabled
                    id='gender'
                    className='bg-gray-50 hover:cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                    value={auth.user?.gender || ''}
                    required
                  />
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <button
                  type='submit'
                  className='text-white bg-blue-500 hover:opacity-80 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                >
                  Update Info
                </button>
                {/* <button
                type='button'
                className='text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900'
              >
                <svg
                  className='w-5 h-5 mr-1 -ml-1'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
                Delete
              </button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
Setting.getLayout = (page: ReactNode) => <BlankLayoutLandingPage>{page}</BlankLayoutLandingPage>

Setting.guestGuard = true

export default Setting
