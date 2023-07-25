import { ReactNode, useEffect } from 'react'
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { useRouter } from 'next/router'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import axios from 'axios'
import authConfig from 'src/configs/auth'

interface PageProps {
  url: string | null
  reffCode: string
}

const Referral = ({ url, reffCode }: PageProps) => {
  // const [url, setUrl] = useState<string>()
  const router = useRouter()

  // // const fallbackImageUrl = 'https://thel0.com/api/char=Hero&gender=male'

  useEffect(() => {
    const initAuth = async () => {
      if (url) {
        await localStorage.setItem('referralCode', reffCode.toString())
        router.replace('/home')
      } else {
        router.replace('/home')
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  if (url) {
    return (
      <>
        <Head>
          <title>Level 0 Personality Test</title>
          <meta name='description' content='Checkout our cool page' key='desc' />
          <meta property='og:title' content='Get your character' />
          <meta property='og:description' content='Personality test' />
          <meta property='og:image' content={url} />
        </Head>

        <div className='flex items-center justify-center w-full h-screen'>
          <Link href='/home'>
            <button className='p-10 text-2xl font-bold text-white transition bg-blue-500 rounded-xl animate-pulse hover:-translate-y-1 hover:scale-110'>
              You're being redirected to Level Zero page
            </button>
          </Link>
        </div>
      </>
    )
  }
}

export async function getServerSideProps(context: any) {
  const { referralCode } = context.query
  if (!referralCode) {
    // Handle case when referral code is not available
    return {
      props: {
        url: null,
        reffCode: null
      }
    }
  }

  const params = {
    referral_code: referralCode.toString()
  }

  try {
    const response = await axios.post(authConfig.getCharbyRef, params)

    const imageUrl = `https://thel0.com/api/char=${response.data.data.character}&gender=${response.data.data.gender}`

    return {
      props: {
        url: imageUrl,
        reffCode: referralCode
      }
    }
  } catch (error: any) {
    // console.log(error.response.data.message)

    return {
      props: {
        url: null,
        reffCode: null
      }
    }
  }
}

Referral.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Referral.guestGuard = true

export default Referral
