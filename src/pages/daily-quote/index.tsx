import { ReactNode } from 'react'

import BlankLayoutLandingPage from 'src/@core/layouts/BlankLayoutLandingPage'

import Quote from 'src/layouts/components/daily-quote/quote'

const dailyQuote = () => {
  return (
    <div className='mt-10'>
      <Quote isPublic={true} />
    </div>
  )
}

dailyQuote.getLayout = (page: ReactNode) => <BlankLayoutLandingPage>{page}</BlankLayoutLandingPage>

dailyQuote.guestGuard = true

export default dailyQuote
