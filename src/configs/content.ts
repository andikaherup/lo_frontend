const base_url = process.env.NEXT_PUBLIC_BASE_URL
export default {
  getQuestion: `${base_url}/api/v1/question/`,
  getResultWithoutLogin: `${base_url}/api/v1/test_calculate_response/`,
  getResultWithLogin: `${base_url}/api/v1/test_response/`,
  submitEmail: `${base_url}/api/v1/referral/`,
  getLeaderBoardData: `${base_url}/api/v1/leaderboard/`,
  getDailyLoginReward: `${base_url}/api/v1/daily_login_reward/`,
  getDailyLoginRewardStatus: `${base_url}/api/v1/daily_login_reward_status/`,
  getBanner: `${base_url}/api/v1/banner/`,
  getThemeList: `${base_url}/api/v1/theme_list/`,
  getDailyQuote: `${base_url}/api/v1/daily_quote/`,
  getDailyQuoteGallery: `${base_url}/api/v1/daily_quote_gallery/`,
  getPublicDailyQuote: `${base_url}/api/v1/public_daily_quote/`,
  getAuthLeaderBoardData: `${base_url}/api/v1/authenticated_leaderboard/`,
  getSEO: `${base_url}/api/v1/seo/`,

  //reward
  getReward: `${base_url}/api/v1/public_reward/`,
  getAuthReward: `${base_url}/api/v1/reward_list/`,
  redeemReward: `${base_url}/api/v1/reward_claim/`,

  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}

