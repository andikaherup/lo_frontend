import React from 'react'

import BottomText from './bottomText'
import { gettestimonialRingCOlor } from 'src/configs/getBackground'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

interface Testimonial {
  name: string
  title: string
  quote: string
  character: string
  image: string
}
type PropType = {
  slides: Testimonial[]
}

const EmblaCarousel: React.FC<PropType> = props => {
  const { slides } = props
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      partialVisibilityGutter: 0,
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      partialVisibilityGutter: 0,
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 40
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 40
    }
  }

  return (
    <Carousel
      swipeable={true}
      draggable={false}
      showDots={false}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={2000}
      partialVisbile
      slidesToSlide={1}
      keyBoardControl={true}
      customTransition='transform 1000ms ease-in-out '
      transitionDuration={1000}
      containerClass='carousel-container'
      removeArrowOnDeviceType={['tablet', 'mobile']}
      itemClass='  mb-10'
    >
      {slides.map((datas, index) => (
        <div className='h-full' key={index}>
          <div className='relative flex flex-col justify-start h-full mx-4 my-6 '>
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
    </Carousel>
  )
}

export default EmblaCarousel
