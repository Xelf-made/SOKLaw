import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { servicesData } from '../data/servicesData';
import { ArrowRight } from 'lucide-react';

const ServicesPage = () => {
  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Legal Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive legal solutions across various practice areas, 
              ensuring expert representation for all your legal needs.
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service) => {
              const IconComponent = service.icon;
              return (
                <Link
                  key={service.id}
                  to={`/services/${service.id}`}
                  className="group"
                >
                  <div className={`p-8 rounded-2xl border-2 ${service.color} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full`}>
                    <div className="mb-6">
                      <IconComponent className={`h-12 w-12 ${service.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                      <span>Learn More</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
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