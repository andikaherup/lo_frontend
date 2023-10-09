import React from 'react'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import BottomText from './bottomText'
import { gettestimonialRingCOlor } from 'src/configs/getBackground'

interface Testimonial {
  name: string
  title: string
  quote: string
  character: string
  image: string
}
type PropType = {
  slides: Testimonial[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = props => {
  const { slides, options } = props
  const [emblaRef] = useEmblaCarousel(options, [Autoplay()])

  return (
    <div className='embla'>
      <div className='embla__viewport' ref={emblaRef}>
        <div className='h-full embla__container'>
          {slides.map((datas, index) => (
            <div className=' embla__slide' key={index}>
              <div className='relative flex flex-col justify-start h-full max-w-sm mx-4 my-6 '>
                <div className='px-4 py-12 rounded-t-lg sm:px-8 md:px-12 '></div>
                <div className='flex flex-col items-center justify-start h-full p-8 rounded-b-lg bg-white-300'>
                  <img
                    src={datas.image}
                    alt=''
                    className={`w-40 h-40 mb-2 mt-[-100px] bg-center ring-4 rounded-full ${gettestimonialRingCOlor(
                      datas.character
                    )} `}
                  />
                  <BottomText
                    name={datas.name}
                    title={datas.title}
                    character={datas.character}
                    quote={datas.quote}
                  ></BottomText>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
