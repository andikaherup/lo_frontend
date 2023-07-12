// ** MUI Imports
// ** React Imports
import { ReactNode, useEffect } from 'react'
import React from 'react'

// ** Configs

// ** Layout Import

import { useRouter } from 'next/router'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const Referral = () => {
  const router = useRouter()
  const { referralCode } = router.query // 'ref' is the name of the query parameter

  useEffect(() => {
    if (referralCode) {
      localStorage.setItem('referralCode', referralCode.toString())
    }
    router.replace('/home')
  }, [referralCode, router])

  return <></>
}

Referral.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Referral.guestGuard = true

export default Referral
