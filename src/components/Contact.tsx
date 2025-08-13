import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [showFallbackForm, setShowFallbackForm] = useState(true);
  const [engageBayLoaded, setEngageBayLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

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

  // Load EngageBay scripts
  useEffect(() => {
    // EngageBay Account Tracking Code
    const loadEngageBayTracking = () => {
      if (window.EhAPI) return; // Already loaded
      
      window.EhAPI = window.EhAPI || {};
      window.EhAPI.after_load = function() {
        window.EhAPI.set_account('scq2bqf88ontbg2g3432fpspk', 'gmailrkfn');
        window.EhAPI.execute('rules');
      };
      
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = '//d2p078bqz5urf7.cloudfront.net/jsapi/ehform.js?v' + new Date().getHours();
      document.head.appendChild(script);
    };

    // Load EngageBay Forms
    const loadEngageBayForms = () => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://app.engagebay.com/load_forms.js';
      script.onload = () => {
        // Initialize form after script loads
        setTimeout(() => {
          if (window.EhForms) {
            window.EhForms.create({
              formId: 6351369855041536,
              target: "#eh_form_6351369855041536",
              onFormReady: function(el: any, setValue: any) { 
                // Hide fallback form when EngageBay loads successfully
                setShowFallbackForm(false);
                setEngageBayLoaded(true);
              }
            });
          }
        }, 1000);
      };
      script.onerror = () => {
        // If EngageBay fails to load, keep showing fallback form
        console.log('EngageBay failed to load, using fallback form');
        setShowFallbackForm(true);
        setEngageBayLoaded(false);
      };
      document.head.appendChild(script);
    };

    loadEngageBayTracking();
    loadEngageBayForms();

    // Cleanup function to reset state if component unmounts
    return () => {
      setShowFallbackForm(true);
      setEngageBayLoaded(false);
    };
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      service: formData.get('service') as string,
      message: formData.get('message') as string,
    };

    try {
      // Method 1: Try using EngageBay's JavaScript API if available
      if (window.EhAPI && window.EhAPI.execute) {
        try {
          // Use EngageBay's client-side API
          window.EhAPI.execute('rules', {
            email: data.email,
            first_name: data.firstName,
            last_name: data.lastName,
            phone: data.phone,
            custom_field_1: data.service,
            custom_field_2: data.message,
          });
          
          setSubmitMessage('Thank you! Your consultation request has been submitted successfully. We will contact you soon.');
          (e.target as HTMLFormElement).reset();
          return;
        } catch (apiError) {
          console.log('EngageBay API method failed, trying form submission');
        }
      }

      // Method 2: Create a hidden form and submit it directly to EngageBay
      const hiddenForm = document.createElement('form');
      hiddenForm.method = 'POST';
      hiddenForm.action = 'https://forms.engagebay.com/collect';
      hiddenForm.style.display = 'none';
      hiddenForm.target = '_blank';

      // Add form fields
      const fields = {
        'account_id': 'scq2bqf88ontbg2g3432fpspk',
        'form_id': '6351369855041536',
        'email': data.email,
        'first_name': data.firstName,
        'last_name': data.lastName,
        'phone': data.phone || '',
        'custom_field_1': data.service,
        'custom_field_2': data.message,
      };

      Object.entries(fields).forEach(([name, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        hiddenForm.appendChild(input);
      });

      document.body.appendChild(hiddenForm);
      hiddenForm.submit();
      document.body.removeChild(hiddenForm);

      // Show success message immediately (since we can't verify submission)
      setSubmitMessage('Thank you! Your consultation request has been submitted successfully. We will contact you soon.');
      (e.target as HTMLFormElement).reset();

    } catch (error) {
      console.error('Form submission error:', error);
      
      // Final fallback: Email link
      try {
        const subject = encodeURIComponent('Consultation Request - ' + data.service);
        const body = encodeURIComponent(`
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Legal Service: ${data.service}

Message:
${data.message}
        `);
        
        const mailtoLink = `mailto:nairobi@soklaw.co.ke?subject=${subject}&body=${body}`;
        window.open(mailtoLink, '_blank');
        
        setSubmitMessage('We\'ve opened your email client with your consultation request. Please send the email to complete your submission, or contact us directly at nairobi@soklaw.co.ke');
        (e.target as HTMLFormElement).reset();
        
      } catch (emailError) {
        console.error('Email fallback error:', emailError);
        setSubmitMessage('There was an error submitting your request. Please contact us directly at nairobi@soklaw.co.ke or call +254 700 123 456');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
                <div key={index} className="mb-8 p-6 modern-card hover:shadow-lg transition-shadow duration-300">
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

            <div className="animate-on-scroll opacity-0 p-6 modern-card">
              <h4 className="text-xl font-semibold mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-yellow-600" />
                Business Hours
              </h4>
              <div className="space-y-2">
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
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Request a Consultation
              </h3>
              
              {/* EngageBay Form Container - Only show when EngageBay is loaded */}
              {engageBayLoaded && (
                <div className="engage-hub-form-embed" 
                     id="eh_form_6351369855041536" 
                     data-id="6351369855041536">
                </div>
              )}
                
              {/* Fallback form - Only show when EngageBay hasn't loaded */}
              {showFallbackForm && (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {submitMessage && (
                    <div className={`p-4 rounded-lg ${submitMessage.includes('error') || submitMessage.includes('There was') 
                      ? 'bg-red-50 text-red-700 border border-red-200' 
                      : 'bg-green-50 text-green-700 border border-green-200'
                    }`}>
                      {submitMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-2 text-gray-700">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="Your first name"
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-2 text-gray-700">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Your last name"
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="your.email@example.com"
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+254 700 000 000"
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium mb-2 text-gray-700">
                      Legal Service Required <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 appearance-none bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23666'%3E%3Cpath d='M8 10.5L4 6.5h8z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 12px center',
                        paddingRight: '40px'
                      }}
                    >
                      <option value="">Select a service</option>
                      <option value="Corporate Law">Corporate Law</option>
                      <option value="Family Law">Family Law</option>
                      <option value="Criminal Defense">Criminal Defense</option>
                      <option value="Real Estate Law">Real Estate Law</option>
                      <option value="Employment Law">Employment Law</option>
                      <option value="Personal Injury">Personal Injury</option>
                      <option value="Immigration Law">Immigration Law</option>
                      <option value="Estate Planning">Estate Planning</option>
                      <option value="Commercial Litigation">Commercial Litigation</option>
                      <option value="Contract Law">Contract Law</option>
                      <option value="Constitutional Law">Constitutional Law</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Please describe your legal matter and how we can help you..."
                      required
                      rows={5}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 resize-vertical disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Loading state (optional) */}
              {!showFallbackForm && !engageBayLoaded && (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
                  <span className="ml-3 text-gray-600">Loading form...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Declare global EngageBay variables for TypeScript
declare global {
  interface Window {
    EhAPI: any;
    EhForms: any;
  }
}

export default Contact;