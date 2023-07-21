import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { characters } from 'src/configs/characterData'

export const config = {
  runtime: 'edge'
}

const imageUrls = [
  { char: 'Hero', gender: 'female', url: 'https://storage.googleapis.com/lo_char/1.png' },
  { char: 'Hero', gender: 'male', url: 'https://storage.googleapis.com/lo_char/2.png' },
  { char: 'Magician', gender: 'female', url: 'https://storage.googleapis.com/lo_char/3.png' },
  { char: 'Magician', gender: 'male', url: 'https://storage.googleapis.com/lo_char/4.png' },
  { char: 'Rebel', gender: 'female', url: 'https://storage.googleapis.com/lo_char/5.png' },
  { char: 'Rebel', gender: 'male', url: 'https://storage.googleapis.com/lo_char/6.png' },
  { char: 'Creator', gender: 'female', url: 'https://storage.googleapis.com/lo_char/7.png' },
  { char: 'Creator', gender: 'male', url: 'https://storage.googleapis.com/lo_char/8.png' },
  { char: 'Synergist', gender: 'female', url: 'https://storage.googleapis.com/lo_char/9.png' },
  { char: 'Synergist', gender: 'male', url: 'https://storage.googleapis.com/lo_char/10.png' },
  { char: 'Oracle', gender: 'female', url: 'https://storage.googleapis.com/lo_char/11.png' },
  { char: 'Oracle', gender: 'male', url: 'https://storage.googleapis.com/lo_char/12.png' },
  { char: 'Protector', gender: 'female', url: 'https://storage.googleapis.com/lo_char/13.png' },
  { char: 'Protector', gender: 'male', url: 'https://storage.googleapis.com/lo_char/14.png' },
  { char: 'Ruler', gender: 'female', url: 'https://storage.googleapis.com/lo_char/15.png' },
  { char: 'Ruler', gender: 'male', url: 'https://storage.googleapis.com/lo_char/16.png' }
]

export default function (request: NextRequest) {
  const { searchParams } = request.nextUrl
  const slug: string | null = searchParams.get('slug')
  const urlParams = slug ? new URLSearchParams(slug) : null
  const char = urlParams ? urlParams.get('char') : null
  const gender = urlParams ? urlParams.get('gender') : null
  const character = characters.find(character => character.name === char)
  const image = imageUrls.find(obj => obj.char === char && obj.gender === gender)

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white'
        }}
      >
        <div tw=' flex w-full h-full pt-20 '>
          <div tw='flex flex-col  w-full items-center justify-center '>
            <div tw='flex justify-center items-center'>
              <h2 tw='flex flex-col text-6xl  font-semibold tracking-tight text-gray-900 text-center'>
                I am a {char} What's yours ?
              </h2>
            </div>
            <div tw=' flex h-full justify-center items-center  w-full rounded-lg px-20'>
              <div tw='flex w-full rounded-2xl'>
                <div tw='flex justify-center items-center '>
                  <img alt='char' src={image?.url} tw='h-100 w-100'></img>
                </div>
                <div tw=' flex rounded-md w-full '>
                  <p tw='text-2xl w-[60%]  text-left'>{character?.char_description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )
}
