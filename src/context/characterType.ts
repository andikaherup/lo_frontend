interface Strength {
  title: string
  content: string
}

interface AreaOfGrowth {
  title: string
  content: string
}

interface MotivationAndAspiration {
  title: string
  content: string
}

interface Recommendation {
  title: string
  content: string
}

interface BonusClass {
  title: string
  content: string
  instructions: string
}

export interface Archetype {
  name: string
  char_description: string
  strengths: Strength[]
  embrace_text: string
  area_of_growth: AreaOfGrowth[]
  motivation_and_aspiration: MotivationAndAspiration[]
  recommend: Recommendation[]
  bonus_class: BonusClass
  conclusion: string
  background: string
  lvl1_image_F: string
  lvl0_image_F: string
  lvl1_image_M: string
  lvl0_image_M: string
}


export interface ResponseData {
  calculated_result: string
  created_at: string
  gender: string
  id: number
  is_completed: boolean
  response: Answer[]
  updated_at: string
  user: number
}

interface Answer {
  id: number
  answer: number
  answer_str: string
  question: string
}
