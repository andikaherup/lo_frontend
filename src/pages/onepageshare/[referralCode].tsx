import { ReactNode, useEffect } from 'react'
import React from 'react'
import Head from 'next/head'

import { useRouter } from 'next/router'
import BlankLayout from 'src/@core/layouts/BlankLayout'

interface PageProps {
  url: string | null
  reffCode: string
}

const OnePageShare = ({ url }: PageProps) => {
  // const [url, setUrl] = useState<string>()
  const router = useRouter()

  // // const fallbackImageUrl = 'https://thel0.com/api/char=Hero&gender=male'

  useEffect(() => {
    const initAuth = async () => {
      router.replace('/')
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
      </>
    )
  }
}

export async function getServerSideProps(context: any) {
  const { char, gender } = context.query

  try {
    const imageUrl = `https://newuistaging.thel0.com/api/char=${char}&gender=${gender}&onepage=true`

    return {
      props: {
        url: imageUrl
      }
    }
  } catch (error: any) {
    return {
      props: {
        url: null,
        reffCode: null
      }
    }
  }
}

OnePageShare.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

OnePageShare.guestGuard = true

export default OnePageShare
