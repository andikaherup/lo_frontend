// import { positions } from '@mui/system'
import React from 'react'

interface Sparkle {
  x: number
  y: number
  start: string
  duration: string
}

const generateRandomSparkle = (): Sparkle => {
  const containerWidth = 700 // Adjust the container width based on your SVG viewBox
  const containerHeight = 700 // Adjust the container height based on your SVG viewBox
  const minDuration = 1
  const maxDuration = 3 // Adjust the maximum duration value as needed

  const randomX = Math.random() * containerWidth
  const randomY = Math.random() * containerHeight
  const randomStart = `${Math.random()}s`
  const randomDuration = `${Math.random() * (maxDuration - minDuration) + minDuration}s`

  return { x: randomX, y: randomY, start: randomStart, duration: randomDuration }
}

const SparklingSvg: React.FC = () => {
  const sparkles: Sparkle[] = new Array(5).fill(null).map(generateRandomSparkle)

  return (
    <div className='relative w-full '>
      <svg className='z-10 '>
        {/* Your SVG content here */}
        <g>
          {sparkles.map((sparkle, index) => (
            <path
              key={index}
              style={{
                animation: `sparkle-${index} 2s infinite`
              }}
              fill='rgb(31, 162, 49)'
              d='M 143.21 131.761 C 143.21 131.761 144.398 125.559 145.453 131.761 C 145.453 131.761 151.391 132.816 145.453 133.872 C 145.453 133.872 144.398 140.206 143.21 133.872 C 139.647 133.212 139.911 132.553 143.21 131.761 Z'
            ></path>
          ))}
          {/* Add other path elements with similar animation */}
        </g>
      </svg>
      <div className='absolute top-0 left-0 w-full h-full'>{/* Render additional sparkles here */} </div>
      <style>
        {sparkles.map(
          (sparkle, index) =>
            `@keyframes sparkle-${index} {
            0%, 100% { transform: scale(0); }
            50% { transform: scale(1); }
          }`
        )}
      </style>
    </div>
  )
}

export default SparklingSvg
