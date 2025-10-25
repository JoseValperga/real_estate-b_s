'use client'

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'

const images = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2075&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
]

export function HeroCarousel() {
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true,
      duration: 60,
      dragFree: true
    }, 
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  )

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container h-full flex">
          {images.map((src, index) => (
            <div
              key={index}
              className="embla__slide relative flex-[0_0_100%] min-w-0 h-full"
              style={{ flex: '0 0 100%' }}
            >
              <div className="absolute inset-0 md:inset-x-0">
                <Image
                  src={src}
                  alt={`Property ${index + 1}`}
                  fill
                  className="object-cover object-center"
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 