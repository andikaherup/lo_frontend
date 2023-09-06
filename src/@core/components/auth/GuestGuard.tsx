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
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (auth.user?.using_default_password === true) {
      router.replace('/change-password')
    }

    if (router.route === '/change-password') {
      console.log('herrrr')
      if (auth.user?.using_default_password === false) {
        router.replace('/')
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route])

  // if (auth.loading || (!auth.loading && auth.user !== null)) {
  //   return fallback
  // }

  return <>{children}</>
}

export default GuestGuard
