const base_url = process.env.NEXT_PUBLIC_BASE_URL
export default {
  getQuestion: `${base_url}/api/v1/question/`,
  getResult: `${base_url}/api/v1/test_calculate_response/`,


  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}

