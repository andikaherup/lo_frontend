// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Configs
import contentConfig from 'src/configs/content'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType, RegisterParams } from './types'
import { ResponseData } from './characterType'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  googleLogin: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!

      if (storedToken) {
        setLoading(true)
        await axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          })
          .then(async response => {
            console.log(response)
            setLoading(false)
            setUser({ ...response.data.data })
          })
          .catch(() => {
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('home')) {
              router.replace('/home')
            }
          })
      } else {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    const payload = {
      username: params.email,
      password: params.password,

      grant_type: 'password',
      client_id: 'B1IT4OGO6YAgL7SL1xSLy50wirIHEdtBj1YpehNg',
      client_secret:
        'yJOuBa7oKvEuIiH2TqXSf2ufk55oo7P8RwFDdegg3IJ7jqwoRFE2HRCfYrId8X30PSLzTFf6QHE9lYtIwayE7ierqltG8d3TvskctcWMi7JALqlV8auitRHoMK8wGN3V'
    }
    axios
      .post(authConfig.credentialToken, payload)
      .then(async response => {
        if (params.rememberMe) {
          window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.access_token)
          window.localStorage.setItem(authConfig.onTokenExpiration, response.data.refresh_token)
        } else {
          window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.access_token)
        }
        await submitWhenLogin()
        await getUserData()

        const returnUrl = router.query.returnUrl

        // setUser({ ...response.data.access })
        params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null

        const redirectURL = returnUrl && returnUrl !== '/dashboard' ? returnUrl : '/dashboard'

        router.replace(redirectURL as string)
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const submitWhenLogin = async () => {
    const characterStringNoLogin = await localStorage.getItem('resultNoLogin')
    console.log('sini')

    //if user login but there was a result from previous test , tell user if they want to add this test to their profile or not
    const showConfirmationDialog = () => {
      return new Promise(resolve => {
        const confirmed = window.confirm('Do you want to add previous test to your account ?')
        resolve(confirmed)
      })
    }
    if (characterStringNoLogin) {
      const confirmAction = async () => {
        const confirmed = await showConfirmationDialog()
        if (confirmed) {
          const formData = new FormData()
          formData.append('response', JSON.stringify(character?.response))
          formData.append('gender', JSON.stringify(character?.gender))
          axios
            .post(contentConfig.getResultWithLogin, formData, {
              headers: { Authorization: 'Bearer ' + window.localStorage.getItem(contentConfig.storageTokenKeyName)! }
            })
            .then(async response => {
              await localStorage.removeItem('resultNoLogin')
              await window.localStorage.setItem('resultLogin', JSON.stringify(response.data.data))
            })
            .catch(error => {
              console.log(error, 'errorr')
            })
        } else {
        }
      }
      const character: ResponseData | null = JSON.parse(characterStringNoLogin)

      confirmAction()
    }
  }

  const getUserData = () => {
    axios
      .get(authConfig.meEndpoint, {
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)!
        }
      })
      .then(async response => {
        setUser({ ...response.data.data })
        await window.localStorage.setItem('userData', JSON.stringify(response.data.data))

        window.localStorage.setItem('refreshSocailAccounts', 'true')
      })
  }

  const handleGoogleLogin = (params: any, errorCallback?: ErrCallbackType) => {
    const payload = {
      token: params.access_token,
      backend: 'google-oauth2',
      grant_type: 'convert_token',
      client_id: '2Q73Gn8hklrDclaPy8iSkYmbgTr0jAkPNRjP2uq6',
      client_secret:
        '8JfOyZJedz4KBSAxdgVh00bxb3Md9SKeSXvuSQBEH48lwtZ9MN04WP16MsUfPyYAcyIIILT6PRSO0pD669QqCH0sMhacXyBa7NVom3jK1SKD3SVepF6FbvtOa2ozgpli'
    }

    axios
      .post(authConfig.convertToken, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(async res => {
        window.localStorage.setItem(authConfig.storageTokenKeyName, res.data.access_token)
        window.localStorage.setItem(authConfig.onTokenExpiration, res.data.refresh_token)
      })
      .then(async () => {
        await submitWhenLogin()
        await getUserData()
        router.replace('/dashboard')
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleRegister = (params: RegisterParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then(res => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error)
        } else {
          handleLogin({ email: params.email, password: params.password })
        }
      })
      .catch((err: { [key: string]: string }) => (errorCallback ? errorCallback(err) : null))
  }
  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem('resultNoLogin')
    window.localStorage.removeItem('resultLogin')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    window.localStorage.removeItem(authConfig.onTokenExpiration)
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    googleLogin: handleGoogleLogin,
    logout: handleLogout,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
