const base_url = process.env.NEXT_PUBLIC_BASE_URL
export default {
  meEndpoint: `${base_url}/api/v1/account/`,
  changePasswordEndpoint: `${base_url}/api/v1/change_password/`,

  editUserEndpoint: `${base_url}/api/v1/account_update/`,
  registReferralEndpoint: `${base_url}/api/v1/referral_register/`,
  getCharbyRef: `${base_url}/api/v1/char/`,



  convertToken: `${base_url}/api-auth/convert-token/`,
  credentialToken: `${base_url}/api-auth/token/`,

  googleLogin: `${base_url}/api/v1/social_account_signup/`,
  loginEndpoint: `${base_url}/api/token/`,
  registerEndpoint: `${base_url}/api/v1/account/`,
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}

