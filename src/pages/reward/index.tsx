import { ReactNode } from 'react'

import BlankLayoutLandingPage from 'src/@core/layouts/BlankLayoutLandingPage'

import Reward from 'src/layouts/components/dashboard/reward'

const reward = () => {
  return (
    <div className='mt-10'>
      <Reward isPublic={true} />
    </div>
  )
}

reward.getLayout = (page: ReactNode) => <BlankLayoutLandingPage>{page}</BlankLayoutLandingPage>

reward.guestGuard = true

export default reward
