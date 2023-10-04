import React from 'react'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import BottomText from './bottomText'

interface Testimonial {
  name: string
  title: string
  quote: string
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
            <div className='embla__slide' key={index}>
              <div className='relative h-full mb-6'>
                <div className='block h-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700'>
                  <div className='relative overflow-hidden bg-no-repeat bg-cover'>
                    <img src={datas.image} className='w-full rounded-t-lg' alt='boss' />

                    <svg
                      className='absolute bottom-0 left-0 text-white dark:text-neutral-700'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 1440 320'
                    >
                      <path
                        fill='currentColor'
                        d='M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
                      ></path>
                    </svg>
                  </div>
                  <BottomText name={datas.name} title={datas.title} quote={datas.quote}></BottomText>
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
