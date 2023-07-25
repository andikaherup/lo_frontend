import React, { useState, useRef, useEffect } from 'react'

interface dataProps {
  name: string
  title: string
  quote: string
}

const BottomText = ({ name, title, quote }: dataProps) => {
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
    <div className='p-6'>
      <h5 className='mb-2 text-lg font-bold'>{name}</h5>
      <h6 className='mb-4 font-medium text-skyblue-300 dark:text-primary-400'>{title}</h6>

      <p className='text-sm' ref={quoteRef} style={{ maxHeight: showFullQuote ? 'none' : '5rem', overflow: 'hidden' }}>
        {quote}
      </p>
      {!showFullQuote && (
        <button className=' text-skyblue-300 dark:text-primary-400' onClick={toggleQuote}>
          See more
        </button>
      )}
      {showFullQuote && (
        <button className=' text-skyblue-300 dark:text-primary-400' onClick={toggleQuote}>
          See less
        </button>
      )}
    </div>
  )
}

export default BottomText
