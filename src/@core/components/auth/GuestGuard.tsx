// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'

interface GuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children } = props
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (auth.user?.using_default_password === true) {
      router.replace('/account-security')
    }
    //if no user login send back to login page for all page that required login

    if (router.route === '/account-security') {
      if (!auth.user) {
        router.replace('/')
      }

      // if (auth.user?.using_default_password === false) {
      //   router.replace('/')
      // }
    }

    if (router.route === '/forgot-password') {
      router.replace('/')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route])

  // if (auth.loading || (!auth.loading && auth.user !== null)) {
  //   return fallback
  // }

  return <>{children}</>
}

export default GuestGuard
