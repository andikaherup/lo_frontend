// ** React Imports
import { ReactNode, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Types
import type { ACLObj, AppAbility } from 'src/configs/acl'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Config Import
import { buildAbilityFor } from 'src/configs/acl'

// ** Component Import
import NotAuthorized from 'src/pages/401'
import Spinner from 'src/@core/components/spinner'
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Util Import
import getHomeRoute from 'src/layouts/components/acl/getHomeRoute'

interface AclGuardProps {
  children: ReactNode
  authGuard?: boolean
  guestGuard?: boolean
  aclAbilities: ACLObj
}

const AclGuard = (props: AclGuardProps) => {
  // ** Props
  const { aclAbilities, children, guestGuard = false, authGuard = true } = props

  // ** Hooks
  const auth = useAuth()
  const router = useRouter()

  // ** Vars
  let ability: AppAbility

  useEffect(() => {
    if (auth.user && !guestGuard && router.route === '/') {
      console.log('here1')
      const homeRoute = getHomeRoute('admin')
      router.replace(homeRoute)
    }
  }, [auth.user, guestGuard, router])

  // User is logged in, build ability for the user based on his role
  if (auth.user && !ability) {
    console.log('hereeee3')

    ability = buildAbilityFor('admin', aclAbilities.subject)
    if (router.route === '/') {
      console.log('hereeee4')

      return <Spinner></Spinner>
    }
  }

  // If guest guard or no guard is true or any error page
  if (guestGuard || router.route === '/404' || router.route === '/500' || !authGuard) {
    // If user is logged in and his ability is built
    if (auth.user && ability) {
      console.log('hereeee1')

      return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
    } else {
      console.log('hereeee2')

      // If user is not logged in (render pages like login, register etc..)
      return <>{children}</>
    }
  }

  // Check the access of current user and render pages
  if (ability && auth.user && ability.can(aclAbilities.action, aclAbilities.subject)) {
    console.log('hereeee5')

    if (router.route === '/') {
      console.log('hereeee7')

      return <Spinner />
    }

    return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  }

  // Render Not Authorized component if the current user has limited access
  return (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  )
}

export default AclGuard
