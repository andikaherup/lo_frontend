import { useState } from 'react'

import ReactPlayer from 'react-player/lazy'

// ** Axios
import axios from 'axios'

// ** Configs
import questConfig from 'src/configs/quest'
import { FacebookShareButton, FacebookIcon } from 'next-share'

interface Props {
  header: string
  text: string
  status: boolean
  video_url: string
  type: string | null
  character: string
  image: string
  id: number
  onFinishVideo: () => void
}

const AccordionItem = ({ header, text, status, video_url, character, type, image, id, onFinishVideo }: Props) => {
  const [active, setActive] = useState(false)

  const checkHeroBrightness = (name: string): string => {
    let nams = 'text-white-300'

    if (name == 'Hero' || name == 'Magician') {
      nams = 'text-black-300'
    }

    return nams
  }

  const handleToggle = () => {
    setActive(!active)
  }

  const shareButton = () => {
    console.log('share')
    handleVideoEnd()
  }
  const getBackground = (hero: string) => {
    switch (hero) {
      case 'Hero':
        return 'bg-gradient-to-r from-darkHero from-10% via-darkHero via-10% to-lightHero'

      case 'Magician':
        return 'bg-gradient-to-r from-darkMagician from-10% via-darkMagician via-10% to-lightMagician'

      case 'Rebel':
        return 'bg-gradient-to-r from-darkRebel from-10% via-darkRebel via-10% to-lightRebel'

      case 'Creator':
        return 'bg-gradient-to-r from-darkCreator from-10% via-darkCreator via-10% to-lightCreator'

      case 'Synergist':
        return 'bg-gradient-to-r from-darkGreen from-10% via-darkGreen via-10% to-lightGreen'

      case 'Oracle':
        return 'bg-gradient-to-r from-darkOracle from-10% via-darkOracle via-10% to-lightOracle'

      case 'Protector':
        return 'bg-gradient-to-r from-darkProtector from-10% via-darkProtector via-10% to-lightProtector'

      case 'Ruler':
        return 'bg-gradient-to-r from-darkBlue from-10% via-darkBlue via-10% to-lightBlue'
    }
  }

  const getTextColor = (hero: string) => {
    switch (hero) {
      case 'Hero':
      case 'Magician':
        return 'text-black-300'

      case 'Rebel':
      case 'Creator':
      case 'Synergist':
      case 'Oracle':
      case 'Protector':
      case 'Ruler':
        return 'text-white-300'
    }
  }

  const handleVideoEnd = async () => {
    // Run your function when the video finishes playing
    if (!status) {
      const param = {
        quest: id,
        completed: true
      }
      await axios
        .post(questConfig.questSubmit, param, {
          headers: { Authorization: 'Bearer ' + window.localStorage.getItem(questConfig.storageTokenKeyName)! }
        })
        .then(() => {
          onFinishVideo()
        })
        .catch(error => {
          console.log(error, 'errorr')
        })
    }
  }

  return (
    <div className={`single-faq w-full rounded-lg border border-[#F3F4FE] ${getBackground(character)}   px-5 py-3 `}>
      <button className={`faq-btn flex flex-row-reverse items-center w-full text-left`} onClick={() => handleToggle()}>
        <div className='flex items-center justify-end w-full '>
          <span className={`text-left lg:text-md font-bold text-xs ${getTextColor(character)}`}>
            {status ? 'COMPLETED' : 'GET STARTED'}
          </span>

          <div className=' flex h-10 w-full max-w-[40px] items-center justify-end rounded-lg bg-opacity-10 text-primary'>
            <svg
              className={`duration-200 ease-in-out fill-primary stroke-primary ${active ? 'rotate-180' : ''}`}
              width='17'
              height='10'
              viewBox='0 0 17 10'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z'
                fill=''
                stroke=''
              />
            </svg>
          </div>
        </div>

        <div className='w-full'>
          <h4 className={`lg:text-lg text-sm font-semibold ${getTextColor(character)}`}>{header}</h4>
          <p className={`lg:text-md  text-xs leading-relaxed ${getTextColor(character)}`}>{text}</p>
        </div>
      </button>

      <div className={` duration-2000 my-10 ease-in-out ${active ? 'block' : 'hidden'}`}>
        {video_url && type == 'video' && (
          <div className='flex justify-center w-full h-full'>
            <ReactPlayer playing url={video_url} controls onEnded={handleVideoEnd} light={image} width='100%' />
          </div>
        )}

        {!type && !video_url && (
          <>
            <FacebookShareButton
              url={'https://thel0.com'}
              onClick={shareButton}
              quote={`I’m a ${character}! What’s yours?`}
              hashtag={'#personality-test'}
            >
              <div className='flex flex-row items-center justify-center'>
                <FacebookIcon size={32} round />
                <span className={`pl-2 ${checkHeroBrightness(character)}`}>Share Your Character on Facebook</span>
              </div>
            </FacebookShareButton>
          </>
        )}
      </div>
    </div>
  )
}

export default AccordionItem
