import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [engageBayLoaded, setEngageBayLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.animate-on-scroll');
            elements.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add('animate-fade-in-up');
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

  // Load EngageBay Form
  useEffect(() => {
    // Wait for EngageBay to load and initialize the form
    const initializeEngageBayForm = () => {
      if (window.EhForms) {
        try {
          window.EhForms.create({
            "formId": 6351369855041536,
            "target": "#eh_form_6351369855041536",
            "onFormReady": function(el: any, setValue: any) {
              console.log('✅ EngageBay form loaded and ready');
              setEngageBayLoaded(true);
              
              // Apply custom styling to match existing design
              if (el) {
                el.style.width = '100%';
                el.style.maxWidth = 'none';
              }
            },
            "onFormSubmit": function(data: any) {
              console.log('✅ Form submitted via EngageBay:', data);
            }
          });
        } catch (error) {
          console.error('❌ Error creating EngageBay form:', error);
        }
      } else {
        // Retry after a short delay if EhForms is not yet available
        setTimeout(initializeEngageBayForm, 1000);
      }
    };

    // Start initialization after component mounts
    const timer = setTimeout(initializeEngageBayForm, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const officeInfo = [
    {
      city: 'Nairobi Office',
      address: 'Upper Hill, ABC Place, 5th Floor\nWaiyaki Way, Nairobi',
      phone: '+254 700 123 456',
      email: 'nairobi@soklaw.co.ke'
    },
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="animate-on-scroll opacity-0 text-4xl md:text-5xl font-bold mb-6">
            Get In Touch
          </h2>
          <p className="animate-on-scroll opacity-0 text-xl max-w-3xl mx-auto">
            Ready to discuss your legal needs? Contact us today for a consultation 
            with our experienced legal team.
          </p>
          <div className="animate-on-scroll opacity-0 w-24 h-1 bg-gradient-to-r from-yellow-600 to-yellow-500 mx-auto mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="animate-on-scroll opacity-0">
              <h3 className="text-2xl font-bold mb-6">
                Our Office Locations
              </h3>
              
              {officeInfo.map((office, index) => (
                <div key={index} className="mb-8 p-6 bg-gray-50 rounded-xl border hover:shadow-lg transition-shadow duration-300">
                  <h4 className="text-xl font-semibold mb-4">
                    {office.city}
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 mt-1 flex-shrink-0 text-yellow-600" />
                      <p className="whitespace-pre-line">
                        {office.address}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 flex-shrink-0 text-yellow-600" />
                      <a href={`tel:${office.phone}`} className="transition-colors hover:text-yellow-600">
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 flex-shrink-0 text-yellow-600" />
                      <a href={`mailto:${office.email}`} className="transition-colors hover:text-yellow-600">
                        {office.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="animate-on-scroll opacity-0 p-6 bg-yellow-50 rounded-xl border border-yellow-200">
              <h4 className="text-xl font-semibold mb-4 flex items-center text-yellow-800">
                <Clock className="h-5 w-5 mr-2 text-yellow-600" />
                Business Hours
              </h4>
              <div className="space-y-2 text-yellow-700">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Emergency Only</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-on-scroll opacity-0">
            <div className="bg-white p-8 rounded-2xl shadow-xl border">
              <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Request a Consultation
              </h3>
              
              {/* EngageBay Form Container */}
              <div className="engage-hub-form-embed" id="eh_form_6351369855041536" data-id="6351369855041536"></div>
              
              {/* Loading state while EngageBay form loads */}
              {!engageBayLoaded && (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
                  <span className="ml-3 text-gray-600">Loading EngageBay form...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS for animations and EngageBay form styling */}
      <style jsx>{`
        .animate-on-scroll {
          transition: all 0.6s ease-out;
        }
        
        .animate-fade-in-up {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        .animate-on-scroll {
          transform: translateY(20px);
        }

        /* EngageBay form styling */
        .engage-hub-form-embed input,
        .engage-hub-form-embed select,
        .engage-hub-form-embed textarea {
          width: 100% !important;
          padding: 12px 16px !important;
          border: 2px solid #e5e7eb !important;
          border-radius: 8px !important;
          font-size: 14px !important;
          transition: all 0.3s ease !important;
        }
        
        .engage-hub-form-embed input:focus,
        .engage-hub-form-embed select:focus,
        .engage-hub-form-embed textarea:focus {
          outline: none !important;
          border-color: #eab308 !important;
          box-shadow: 0 0 0 3px rgba(234, 179, 8, 0.1) !important;
        }
        
        .engage-hub-form-embed button[type="submit"] {
          background: linear-gradient(to right, #eab308, #ca8a04) !important;
          color: white !important;
          padding: 16px 24px !important;
          border-radius: 8px !important;
          font-weight: 600 !important;
          border: none !important;
          width: 100% !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
        }
        
        .engage-hub-form-embed button[type="submit"]:hover {
          background: linear-gradient(to right, #ca8a04, #a16207) !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 4px 12px rgba(234, 179, 8, 0.3) !important;
        }
      `}</style>
    </section>
  );
};

// Declare global EngageBay variables for TypeScript
declare global {
  interface Window {
    EhForms: any;
  }
}

export default Contact;