const base_url = process.env.NEXT_PUBLIC_BASE_URL
export default {
  getQuestion: `${base_url}/api/v1/question/`,
  getResultWithoutLogin: `${base_url}/api/v1/test_calculate_response/`,
  getResultWithLogin: `${base_url}/api/v1/test_response/`,
  submitEmail: `${base_url}/api/v1/referral/`,
  getLeaderBoardData: `${base_url}/api/v1/leaderboard/`,
  getAuthLeaderBoardData: `${base_url}/api/v1/authenticated_leaderboard/`,
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}

