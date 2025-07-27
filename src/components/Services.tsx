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
          <h2 className="text-4xl md:text-5xl font-bold text-coffee-brown mb-6 animate-fade-in">
            Our Legal Services
          </h2>
          <p className="text-xl text-coffee-brown-light max-w-3xl mx-auto animate-fade-in-delay">
            We provide comprehensive legal solutions across various practice areas, 
            ensuring expert representation for all your legal needs.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 animate-scale-in"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="service-card service-card-enhanced p-8 rounded-2xl border-2 group opacity-0 text-white relative"
                style={{
                  backgroundImage: `url(${service.headerImage})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center'
                }}
              >
                <div className="backdrop-blur-md bg-white/30 p-4 rounded-xl text-black">
                  <div className="mb-6">
                    <IconComponent className={`service-icon h-12 w-12 ${service.iconColor}`} />
                  </div>
                  <h3 className="service-title text-xl font-bold mb-4">
                    {service.title}
                  </h3>
                  <p className="service-description leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <Link
                    to={`/services/${service.id}`}
                    className="service-link inline-flex items-center group/link font-semibold"
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
