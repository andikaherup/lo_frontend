import { ReactNode } from 'react'
import Rewards from 'src/layouts/components/daily-rewards/rewards'
import BlankLayoutLandingPage from 'src/@core/layouts/BlankLayoutLandingPage'

const DailyRewards = () => {
  return (
    <>
      <Rewards></Rewards>
    </>
  )
}

DailyRewards.getLayout = (page: ReactNode) => <BlankLayoutLandingPage>{page}</BlankLayoutLandingPage>

DailyRewards.guestGuard = true

export default DailyRewards
