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
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              to="/services" 
              className="inline-flex items-center text-blue-200 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Services
            </Link>
            <div className="flex items-center mb-6">
              <IconComponent className="h-16 w-16 text-blue-200 mr-6" />
              <h1 className="text-4xl md:text-5xl font-bold">{service.title}</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl">
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
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {service.overview}
                </p>
              </div>

              {/* Key Services */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Services</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.keyServices.map((keyService, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{keyService}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Choose Us */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose SOK Law Associates</h2>
                <div className="space-y-4">
                  {service.whyChooseUs.map((reason, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{reason.title}</h3>
                      <p className="text-gray-600">{reason.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Process</h2>
                <div className="space-y-6">
                  {service.process.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Contact Card */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Need Legal Assistance?</h3>
                <p className="text-gray-600 mb-6">
                  Contact our {service.title.toLowerCase()} specialists for a consultation.
                </p>
                <div className="space-y-4">
                  <a
                    href="tel:+254700123456"
                    className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Phone className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-900">+254 700 123 456</span>
                  </a>
                  <a
                    href="mailto:info@soklaw.co.ke"
                    className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Mail className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-900">info@soklaw.co.ke</span>
                  </a>
                </div>
                <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  Schedule Consultation
                </button>
              </div>

              {/* Related Services */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Related Services</h3>
                <div className="space-y-3">
                  {servicesData
                    .filter(s => s.id !== service.id)
                    .slice(0, 4)
                    .map((relatedService) => (
                      <Link
                        key={relatedService.id}
                        to={`/services/${relatedService.id}`}
                        className="block text-blue-600 hover:text-blue-700 transition-colors"
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