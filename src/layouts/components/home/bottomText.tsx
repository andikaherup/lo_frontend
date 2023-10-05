import React, { useState, useRef, useEffect } from 'react'
import { gettestimonialTextCOlor } from 'src/configs/getBackground'

interface dataProps {
  name: string
  title: string
  quote: string
  character: string
}

const BottomText = ({ name, title, quote, character }: dataProps) => {
  const [showFullQuote, setShowFullQuote] = useState(false)
  const quoteRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (quoteRef.current) {
      // Check if the quote has more than five lines
      if (quoteRef.current.clientHeight > 5 * 15) {
        setShowFullQuote(false)
      } else {
        setShowFullQuote(true)
      }
    }
  }, [quote])

  const toggleQuote = () => {
    setShowFullQuote(!showFullQuote)
  }

  return (
    <div className='pt-5'>
      <p className='flex flex-col text-black-300'>
        <span className='text-xl font-bold '>{name}</span>

        <span className='text-xs font-semibold'>{title}</span>
      </p>
      <span className={`${gettestimonialTextCOlor(character)} font-bold`}>{character}</span>
      <p
        className='pt-5 text-xs text-black-300'
        ref={quoteRef}
        style={{ maxHeight: showFullQuote ? 'none' : '5rem', overflow: 'hidden' }}
      >
        {quote}
      </p>
      {!showFullQuote && (
        <button className='text-xs text-skyblue-300 dark:text-primary-400' onClick={toggleQuote}>
          See more
        </button>
      )}
      {showFullQuote && (
        <button className='text-xs text-skyblue-300 dark:text-primary-400' onClick={toggleQuote}>
          See less
        </button>
      )}
    </div>
  )
}

export default BottomText
