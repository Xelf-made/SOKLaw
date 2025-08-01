import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { servicesData } from '../data/servicesData';
import { ArrowLeft, CheckCircle, Phone, Mail } from 'lucide-react';

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const service = servicesData.find(s => s.id === serviceId);

  if (!service) {
    return (
      <>
        <Navbar />
        <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
            <Link to="/services" className="text-blue-600 hover:text-blue-700">
              Back to Services
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const IconComponent = service.icon;

  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div 
          className="relative py-20 text-white min-h-[500px] flex items-center"
          style={{
            backgroundImage: `url(${service.headerImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Clear overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              to="/services" 
              className="inline-flex items-center text-white hover:text-blue-200 mb-8 transition-colors font-medium"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Services
            </Link>
            <div className="flex items-center mb-6">
              <IconComponent className="h-16 w-16 text-yellow-400 mr-6" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">{service.title}</h1>
            </div>
            <p className="text-xl text-white max-w-3xl font-medium">
              {service.detailedDescription}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Overview</h2>
                <p className="text-lg leading-relaxed mb-6">
                  {service.overview}
                </p>
              </div>

              {/* Key Services */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Key Services</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.keyServices.map((keyService, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                      <span>{keyService}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Choose Us */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Why Choose SOK Law Associates</h2>
                <div className="space-y-4">
                  {service.whyChooseUs.map((reason, index) => (
                    <div key={index} className="modern-card p-6">
                      <h3 className="text-xl font-semibold mb-2 text-yellow-600">{reason.title}</h3>
                      <p>{reason.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Process</h2>
                <div className="space-y-6">
                  {service.process.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                        <p>{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Contact Card */}
              <div className="modern-card p-8">
                <h3 className="text-2xl font-bold mb-6">Need Legal Assistance?</h3>
                <p className="mb-6">
                  Contact our {service.title.toLowerCase()} specialists for a consultation.
                </p>
                <div className="space-y-4">
                  <a
                    href="tel:+254700123456"
                    className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Phone className="h-5 w-5 text-yellow-600" />
                    <span>+254 700 123 456</span>
                  </a>
                  <a
                    href="mailto:info@soklaw.co.ke"
                    className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Mail className="h-5 w-5 text-yellow-600" />
                    <span>info@soklaw.co.ke</span>
                  </a>
                </div>
                <button className="w-full mt-6 btn-primary">
                  Schedule Consultation
                </button>
              </div>

              {/* Related Services */}
              <div className="modern-card p-8">
                <h3 className="text-xl font-bold mb-6">Related Services</h3>
                <div className="space-y-3">
                  {servicesData
                    .filter(s => s.id !== service.id)
                    .slice(0, 4)
                    .map((relatedService) => (
                      <Link
                        key={relatedService.id}
                        to={`/services/${relatedService.id}`}
                        className="block transition-colors hover:underline text-yellow-600 hover:text-yellow-700"
                      >
                        {relatedService.title}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServiceDetailPage;