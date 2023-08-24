const base_url = process.env.NEXT_PUBLIC_BASE_URL
export default {
  getQuest: `${base_url}/api/v1/non_daily_levels/`,
  getQuestDaily: `${base_url}/api/v1/daily_levels/`,

  getQuestById: `${base_url}/api/v1/quests/`,
  questSubmit: `${base_url}/api/v1/user_quests/`,


  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}

