// ** MUI Imports
// ** React Imports
import { ReactNode, useEffect } from 'react'
import React from 'react'
import Head from 'next/head'

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

  return (
    <>
      <Head>
        <title>My Character is Rebel , what is your character?</title>
        <meta name='description' content='Checkout our cool page' key='desc' />
        <meta property='og:title' content='Social Title for Cool Page' />
        <meta property='og:description' content='And a social description for our cool page' />
        <meta property='og:image' content='/assets/characters/Rebel_LVL_1_(F).png' />
      </Head>
    </>
  )
}

Referral.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Referral.guestGuard = true

export default Referral
