const base_url = process.env.NEXT_PUBLIC_BASE_URL
export default {
  getQuestion: `${base_url}/api/v1/question/`,
  getResultWithoutLogin: `${base_url}/api/v1/test_calculate_response/`,
  getResultWithLogin: `${base_url}/api/v1/test_response/`,
  submitEmail: `${base_url}/api/v1/referral/`,
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}

