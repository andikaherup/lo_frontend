import { useEffect, useState } from 'react'

// import { NextRequest } from 'next/server'

interface UTMParams {
  campaign: string
}

const UTMForm: React.FC = () => {
  const [utmParams, setUtmParams] = useState<UTMParams>({
    campaign: ''
  })

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)

    if (urlParams.has('campaign')) {
      setUtmParams(prevParams => ({
        ...prevParams,
        utm_source: urlParams.get('campaign') || ''
      }))
      localStorage.setItem('campaign', urlParams.get('campaign') || '')
    }

    // if (urlParams.has('utm_medium')) {
    //   setUtmParams(prevParams => ({
    //     ...prevParams,
    //     utm_medium: urlParams.get('utm_medium') || ''
    //   }))
    // }

    // if (urlParams.has('utm_campaign')) {
    //   setUtmParams(prevParams => ({
    //     ...prevParams,
    //     utm_campaign: urlParams.get('utm_campaign') || ''
    //   }))
    // }

    // if (urlParams.has('utm_id')) {
    //   setUtmParams(prevParams => ({
    //     ...prevParams,
    //     utm_id: urlParams.get('utm_id') || ''
    //   }))
    // }
  }, [])

  return (
    <form id='utm-form' style={{ display: 'none' }} method='post' action='/submit-utm'>
      <input type='hidden' name='utm_source' value={utmParams.campaign} />
      {/* <input type='hidden' name='utm_medium' value={utmParams.utm_medium} />
      <input type='hidden' name='utm_campaign' value={utmParams.utm_campaign} />
      <input type='hidden' name='utm_id' value={utmParams.utm_id} /> */}
    </form>
  )
}
export async function getServerSideProps(context: any) {
  const { referralCode } = context.query
  console.log(referralCode)
}

export default UTMForm
