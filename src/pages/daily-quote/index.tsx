import { ReactNode } from 'react'

import BlankLayoutLandingPage from 'src/@core/layouts/BlankLayoutLandingPage'

import Quote from 'src/layouts/components/daily-quote/quote'

// ** Context
import { useAuth } from 'src/hooks/useAuth'
import PublicQuote from 'src/layouts/components/daily-quote/public'

const dailyQuote = () => {
  const auth = useAuth()

  return (
    <div className='mt-10'>
      {auth.user && <Quote isPublic={true} />}
      {!auth.user && <PublicQuote></PublicQuote>}
    </div>
  )
}

dailyQuote.getLayout = (page: ReactNode) => <BlankLayoutLandingPage>{page}</BlankLayoutLandingPage>

dailyQuote.guestGuard = true

export default dailyQuote
