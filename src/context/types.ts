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
  age: string
  name: string
  gender: string
}

export type RewardData = {
  created_at: string
  description: string
  id: number
  image: string
  is_active: boolean
  level_required_to_unlock: number
  name: string
  points: number
  coin_price: number
  shown_on_public_page: boolean
  stock: number
  updated_at: string
}

export type ThemeData = {
  uuid: string
  theme: string,
  quote: string,
  author: string,
  scheduled_date: string,
  points_reward: number,
  quote_images: string,
  created_at: string,
  updated_at: string
}

export type Theme = {
  created_at: string
  id: number
  image: string
  theme: string
  updated_at: string
}

export type DailyRewardData = {
  date: string
  day: number
  points: number
  status: string
}

export interface QuoteData {
  author: string
  created_at: string
  quote: string
  quote_images: string
  theme: number
  points_reward?: number
  updated_at: string
  uuid: string
}


export type UserDataType = {
  age: string;
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
  referral_points: number;
  progress_percentage: number;
  friend_sign_ups: number;
  is_new_user: boolean;
  current_level_points: number;
  next_level_required_points: number;
  username: string;
  bank_account_number: string;
  bank_name: string;
  campaign_source: null;
  has_just_leveled_up: boolean;
  hidden_points: number;
  phone_number: string;
  point_updated_at: string;
  available_points: number;
  coin: number;
  used_coin: number;
  using_default_password: boolean;
  password_is_set: boolean;
  alias: null | string;
  anonymous_on_leaderboard: boolean;
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  refreshUser: () => void
  googleLogin: (paramsL: GoogleLoginParams, errorCallback?: ErrCallbackType) => void
  facebookLogin: (paramsL: FacebookLoginParams, errorCallback?: ErrCallbackType) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void

}
