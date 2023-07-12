export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}
export type GoogleLoginParams = {
  access_token: string
  authuser: string
  expires_in: string
  hd: string
  prompt: string
  scope: string
  token_type: string
}
export type FacebookLoginParams = {
  access_token: string
  authuser: string
  expires_in: string
  hd: string
  prompt: string
  scope: string
  token_type: string
}

export type RegisterParams = {
  email: string
  password: string
  age: number
  username: string
  gender: string
}


export type UserDataType = {
  age: number | null;
  character: string;
  character_level: number | null;
  date_created: string;
  email: string;
  gender: string;
  id: number;
  is_active: boolean;
  is_admin: boolean;
  name: string | null;
  points: number;
  referral_code: string;
  timezone: string;
  used_points: number | null;
  next_character_level: number;
  user_points: number;
  current_level_points: number;
  next_level_required_points: number;
  username: string;
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  googleLogin: (paramsL: GoogleLoginParams, errorCallback?: ErrCallbackType) => void
  facebookLogin: (paramsL: FacebookLoginParams, errorCallback?: ErrCallbackType) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void

}
