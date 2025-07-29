import React, { useState, useEffect } from 'react';
import { ArrowRight, Phone } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Corporate Legal Excellence',
      subtitle: 'Comprehensive business law solutions',
      description: 'Expert corporate legal services for businesses of all sizes, ensuring compliance and strategic growth in Kenya\'s dynamic market.'
    },
    {
      image: 'https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Constitutional Law Experts',
      subtitle: 'Protecting your fundamental rights',
      description: 'Leading constitutional law practice with landmark victories protecting citizens\' rights and challenging unconstitutional legislation.'
    },
    {
      image: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Real Estate Law Specialists',
      subtitle: 'Securing your property investments',
      description: 'Comprehensive real estate legal services from residential transactions to large-scale development projects across Kenya.'
    },
    {
      image: 'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Commercial Litigation',
      subtitle: 'Aggressive advocacy for your business',
      description: 'Strategic litigation representation with a proven track record of successful outcomes in complex commercial disputes.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden flex items-center justify-center">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
      ))}

      {/* Navigation Zones */}
      <div
        className="absolute left-0 top-0 h-full w-1/3 z-20 cursor-pointer"
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
      />
      <div
        className="absolute right-0 top-0 h-full w-1/3 z-20 cursor-pointer"
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
      />

      {/* Content */}
      <div className="relative z-30 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">Welcome</h1>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-blue-300 mb-4">We are Soklaw</h2>
        <div className="min-h-[120px]">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-medium text-white mb-2">{slides[currentSlide].title}</h3>
          <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-3xl mx-auto leading-relaxed">{slides[currentSlide].description}</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => scrollTo('#contact')}
            className="group btn-secondary flex items-center space-x-2 hover:scale-105 transition transform shadow-md"
          >
            <Phone className="h-5 w-5 text-white" />
            <span className="text-white">Get Legal Consultation</span>
            <ArrowRight className="h-5 w-5 text-white group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scrollTo('#services')}
            className="group btn-outline flex items-center space-x-2 hover:scale-105 transition transform shadow-md"
          >
            <span className="text-white">Our Services</span>
            <ArrowRight className="h-5 w-5 text-white group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white/50'} transition-all`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center items-start">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
