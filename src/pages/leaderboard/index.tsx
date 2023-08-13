import { ReactNode, useEffect, useState } from 'react'
import Leaderboard from 'src/layouts/components/leaderboard/leaderboard'
import BlankLayoutLandingPage from 'src/@core/layouts/BlankLayoutLandingPage'

const LeaderBoard = () => {
  return (
    <>
      <Leaderboard />
    </>
  )
}

LeaderBoard.getLayout = (page: ReactNode) => <BlankLayoutLandingPage>{page}</BlankLayoutLandingPage>

LeaderBoard.guestGuard = true

export default LeaderBoard
