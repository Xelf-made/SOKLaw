import React, { useState, useEffect } from 'react'
import { ArrowRight, Phone } from 'lucide-react'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [ /* same as before */ ]

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % slides.length),
      4000
    )
    return () => clearInterval(timer)
  }, [slides.length])

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleCarouselClick = (side: 'left' | 'right') => {
    setCurrentSlide((prev) =>
      side === 'left'
        ? (prev - 1 + slides.length) % slides.length
        : (prev + 1) % slides.length
    )
  }

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            loading="lazy"
            className="hero-img w-full h-full object-cover"
          />
          {/* Dark overlay for legibility */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
      ))}

      {/* Touchable areas */}
      <div /* left navigation area */ {...{}} />
      <div /* right navigation area */ {...{}} />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
          Welcome
        </h1>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-blue-200 mb-2">
          We are Soklaw
        </h2>
        <div className="min-h-[120px] flex flex-col justify-center">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-medium text-white transition duration-500">
            {slides[currentSlide].title}
          </h3>
          <p className="text-lg md:text-xl text-gray-100 mt-3 max-w-3xl mx-auto leading-relaxed">
            {slides[currentSlide].description}
          </p>
        </div>
        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => scrollTo('#contact')}
            className="btn-secondary flex items-center space-x-2"
          >
            <Phone className="h-5 w-5 text-white" />
            <span className="text-white">Get Legal Consultation</span>
            <ArrowRight className="h-5 w-5 text-white" />
          </button>
          <button
            onClick={() => scrollTo('#services')}
            className="btn-outline flex items-center space-x-2"
          >
            <span className="text-white">Our Services</span>
            <ArrowRight className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      {/* Indicators and Scroll cue */}
      {/* ... same as before ... */}
    </section>
  )
}

export default Hero
