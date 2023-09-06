// ** React Imports
import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// import { useAuth } from 'src/hooks/useAuth'

// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import contentConfig from 'src/configs/content'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'

// ** Config Imports

// import { defaultACLObj } from 'src/configs/acl'
import themeConfig from 'src/configs/themeConfig'

// ** Third Party Import
import { Toaster } from 'react-hot-toast'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'

// import AclGuard from 'src/@core/components/auth/AclGuard'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// import AuthGuard from 'src/@core/components/auth/AuthGuard'
import GuestGuard from 'src/@core/components/auth/GuestGuard'
import { GoogleOAuthProvider } from '@react-oauth/google'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'
import axios from 'axios'

// ** Contexts
import { AuthProvider } from 'src/context/AuthContext'
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Styled Components
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** Prismjs Styles
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

import 'src/iconify-bundle/icons-bundle-react'

// ** Global css styles
import '../../styles/globals.css'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

type GuardProps = {
  authGuard: boolean
  guestGuard: boolean
  children: ReactNode
}

type MetaInfo = {
  description: string

  image: string | null
  keywords: string
  page: string
  title: string
  url: string
}

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

const Guard = ({ children, guestGuard }: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
  }

  //   console.log('hereeee21')

  // return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
  // } else if (!guestGuard && !authGuard) {
  //   console.log('hereeee22')

  //   return <>{children}</>
  // } else {
  //   console.log('hereeee23')

  //   return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
  // }
  return <>{children}</>
}

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const router = useRouter()

  useEffect(() => {
    import('react-facebook-pixel')
      .then(x => x.default)
      .then(ReactPixel => {
        ReactPixel.init('741251821138037') // facebookPixelId
        ReactPixel.pageView()
        router.events.on('routeChangeComplete', () => {
          ReactPixel.pageView()
        })
      })
  }, [router.events])

  useEffect(() => {
    const getPage = () => {
      switch (router.route) {
        case '/':
          return 'homepage'
        case '/leaderboard':
          return 'leaderboard'
        case '/login':
          return 'login'
        case '/reward':
          return 'reward'
        case '/personality-types':
          return 'personality_types'
      }
    }

    axios.get(contentConfig.getSEO).then(response => {
      const data = response.data.data

      const page = getPage()
      console.log(data, 'dia', page)

      setSeo(data.find((datas: MetaInfo) => datas.page === page))
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const [seo, setSeo] = useState<MetaInfo>()

  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false
  const getLayout =
    Component.getLayout ?? (page => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>)

  const setConfig = Component.setConfig ?? undefined

  const authGuard = Component.authGuard ?? true

  const guestGuard = Component.guestGuard ?? false

  // const aclAbilities = Component.acl ?? defaultACLObj

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{seo?.title}</title>
        <meta name='robots' content='noindex' />
        <meta name='description' content={seo?.description} />
        <meta name='keywords' content={seo?.keywords} />
        <meta property='og:title' content={seo?.title} />
        <meta property='og:description' content={seo?.description} />
        <meta property='og:image' content={seo?.image || ''} />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <meta name='facebook-domain-verification' content='z1k751wen6q754z5qasx66i3cjed0j' />
        <script
          type='text/javascript'
          src='https://d2ieqaiwehnqqp.cloudfront.net/t0cda0b479c1a0a9cd46a87563eed6864.js'
          async
        ></script>
      </Head>

      <AuthProvider>
        <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
          <GoogleOAuthProvider clientId={'1035210079248-7m12p0lsoplcees3o5o0qioph1krrs90.apps.googleusercontent.com'}>
            <SettingsConsumer>
              {({ settings }) => {
                return (
                  <ThemeComponent settings={settings}>
                    <Guard authGuard={authGuard} guestGuard={guestGuard}>
                      {getLayout(<Component {...pageProps} />)}
                    </Guard>
                    <ReactHotToast>
                      <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
                    </ReactHotToast>
                  </ThemeComponent>
                )
              }}
            </SettingsConsumer>
          </GoogleOAuthProvider>
        </SettingsProvider>
      </AuthProvider>
    </CacheProvider>
  )
}

export default App
