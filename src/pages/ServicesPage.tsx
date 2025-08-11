import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { servicesData } from '../data/servicesData';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const ServicesPage = () => {
  const navigate = useNavigate();

  // Handle back navigation using browser history
  const handleBackToHome = () => {
    navigate(-1); // Uses browser history without page refresh
  };

  // Navigate to individual service detail
  const handleServiceClick = (serviceId: string) => {
    navigate(`/services/${serviceId}`); // Client-side navigation
  };

  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <button
            onClick={handleBackToHome}
            className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-8 transition-colors font-medium group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Legal Services
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Comprehensive legal solutions across various practice areas, 
              ensuring expert representation for all your legal needs.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-600 to-yellow-500 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servicesData.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  onClick={() => handleServiceClick(service.id)}
                  className="relative service-card overflow-hidden rounded-2xl group opacity-100 cursor-pointer h-80"
                  aria-label={`Learn more about ${service.title}`}
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center scale-110"
                    style={{ backgroundImage: `url(${service.headerImage})` }}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300" />

                  {/* Card Content */}
                  <div className="relative z-10 text-white p-8 h-full flex flex-col justify-between group-hover:transform group-hover:scale-105 transition-transform duration-300">
                    <div>
                      <div className="mb-6">
                        <IconComponent className="h-12 w-12 text-yellow-400" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                      <p className="leading-relaxed text-white/90">{service.description}</p>
                    </div>
                    <div className="mt-6">
                      <div className="inline-flex items-center group/link font-semibold hover:text-yellow-300 text-yellow-400">
                        <span>Learn More</span>
                        <ArrowRight className="h-4 w-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServicesPage;