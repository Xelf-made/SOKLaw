import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import { ArrowRight } from 'lucide-react';

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.service-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-fade-in-up');
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Our Legal Services
          </h2>
          <p className="text-xl max-w-3xl mx-auto animate-fade-in-delay">
            We provide comprehensive legal solutions across various practice areas, 
            ensuring expert representation for all your legal needs.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-600 to-yellow-500 mx-auto mt-6 animate-scale-in"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="relative service-card overflow-hidden p-8 rounded-2xl group opacity-0 modern-card"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center scale-110"
                  style={{ backgroundImage: `url(${service.headerImage})` }}
                />

                {/* Neutral Blur Overlay (no blue tint) */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />

                {/* Card Content */}
                <div className="relative z-10 text-white group-hover:transform group-hover:scale-105 transition-transform duration-300">
                  <div className="mb-6">
                    <IconComponent className="h-12 w-12 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">{service.title}</h3>
                  <p className="leading-relaxed mb-4 text-white/90">{service.description}</p>
                  <Link
                    to={`/services/${service.id}`}
                    className="inline-flex items-center group/link font-semibold hover:text-yellow-300 text-yellow-400"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/services"
            className="btn-primary inline-flex items-center space-x-2 transform hover:scale-105 shadow-lg"
          >
            <span>View All Services</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
