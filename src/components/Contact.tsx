import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    legalService: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Instant form submission with multiple fallback strategies
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Strategy 1: Try EngageBay if available (instant check)
      if (window.EhForms && typeof window.EhForms.submitForm === 'function') {
        try {
          await window.EhForms.submitForm('6351369855041536', formData);
          setSubmitStatus('success');
          resetForm();
          return;
        } catch (error) {
          console.warn('EngageBay submission failed, trying fallbacks:', error);
        }
      }

      // Strategy 2: Direct API call to EngageBay (if you have endpoint)
      try {
        const response = await fetch('https://app.engagebay.com/dev/api/panel/subscribers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            form_id: '6351369855041536',
            ...formData,
            source: 'website_form'
          })
        });
        
        if (response.ok) {
          setSubmitStatus('success');
          resetForm();
          return;
        }
      } catch (error) {
        console.warn('Direct API call failed, trying email fallback:', error);
      }

      // Strategy 3: Email fallback using mailto (instant)
      const emailBody = `
New Contact Form Submission:

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Legal Service: ${formData.legalService}

Message:
${formData.message}
      `.trim();

      const mailtoUrl = `mailto:nairobi@soklaw.co.ke?subject=New Contact Form Submission&body=${encodeURIComponent(emailBody)}`;
      window.open(mailtoUrl, '_blank');
      
      setSubmitStatus('success');
      resetForm();

    } catch (error) {
      console.error('All submission strategies failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      legalService: '',
      message: ''
    });
  };

  // Preload EngageBay script immediately (non-blocking)
  useEffect(() => {
    if (!window.EhForms) {
      const script = document.createElement('script');
      script.src = 'https://d2p078bqz5urf7.cloudfront.net/jsforms/ehforms.js';
      script.async = true;
      script.onload = () => {
        console.log('EngageBay loaded for future submissions');
      };
      document.head.appendChild(script);
    }
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
    <section ref={sectionRef} id="contact" className="contact-section bg-white">
      <div className="container">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
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
            <div className="contact-form">
              <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Request a Consultation
              </h3>
              
              {/* EngageBay Form Container */}
              <div className="engage-hub-form-embed" 
                   id="eh_form_6351369855041536" 
                   data-id="6351369855041536"
                   role="form"
                   aria-label="Contact form">
                
                {/* Loading State */}
                <div id="form-loading" className="flex items-center justify-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
                  <span className="ml-4 text-gray-600">Loading form...</span>
                </div>
                
                {/* Fallback Form (Hidden by default, shown if EngageBay fails) */}
                <form id="fallback-form" className="hidden space-y-6" role="form" aria-label="Fallback contact form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                        First Name <span style={{color: '#e74c3c'}}>*</span>
                      </label>
                      <input 
                        type="text" 
                        id="firstName"
                        name="firstName" 
                        placeholder="Your first name" 
                        required 
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors"
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                        Last Name <span style={{color: '#e74c3c'}}>*</span>
                      </label>
                      <input 
                        type="text" 
                        id="lastName"
                        name="lastName" 
                        placeholder="Your last name" 
                        required 
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors"
                        aria-required="true"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address <span style={{color: '#e74c3c'}}>*</span>
                      </label>
                      <input 
                        type="email" 
                        id="email"
                        name="email" 
                        placeholder="your.email@example.com" 
                        required 
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors"
                        aria-required="true"
                        aria-describedby="email-error"
                      />
                      <div id="email-error" className="validation-message" style={{display: 'none'}} aria-live="polite"></div>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input 
                        type="tel" 
                        id="phone"
                        name="phone" 
                        placeholder="+254 700 000 000" 
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                      Legal Service Required <span style={{color: '#e74c3c'}}>*</span>
                    </label>
                    <select 
                      id="service"
                      name="service" 
                      required 
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors appearance-none bg-white cursor-pointer"
                      aria-required="true"
                    >
                      <option value="" disabled selected>Select a service</option>
                      <option value="corporate-law">Corporate Law</option>
                      <option value="litigation">Litigation</option>
                      <option value="real-estate">Real Estate</option>
                      <option value="employment-law">Employment Law</option>
                      <option value="intellectual-property">Intellectual Property</option>
                      <option value="family-law">Family Law</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message <span style={{color: '#e74c3c'}}>*</span>
                    </label>
                    <textarea 
                      id="message"
                      name="message" 
                      placeholder="Please describe your legal matter and how we can help you..." 
                      required 
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors resize-vertical"
                      aria-required="true"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary w-full"
                    aria-label="Send consultation request"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
                    </svg>
                    Send Message
                  </button>
                </form>
              </div>
              
              {/* Form Scripts */}
              <script dangerouslySetInnerHTML={{__html: `
                // Initialize EngageBay form
                document.addEventListener('DOMContentLoaded', function() {
                  // Show loading state
                  const loadingDiv = document.getElementById('form-loading');
                  const fallbackForm = document.getElementById('fallback-form');
                  
                  // Try to load EngageBay form
                  setTimeout(function() {
                    if (typeof EhForms !== 'undefined' && EhForms.init) {
                      try {
                        EhForms.init();
                        // Hide loading, EngageBay form should appear
                        if (loadingDiv) loadingDiv.style.display = 'none';
                      } catch (error) {
                        console.warn('EngageBay form failed to load, showing fallback:', error);
                        showFallbackForm();
                      }
                    } else {
                      console.warn('EngageBay not available, showing fallback form');
                      showFallbackForm();
                    }
                  }, 2000); // Wait 2 seconds for EngageBay to load
                  
                  function showFallbackForm() {
                    if (loadingDiv) loadingDiv.style.display = 'none';
                    if (fallbackForm) {
                      fallbackForm.style.display = 'block';
                      fallbackForm.classList.remove('hidden');
                    }
                  }
                  
                  // Handle fallback form submission
                  if (fallbackForm) {
                    fallbackForm.addEventListener('submit', function(e) {
                      e.preventDefault();
                      
                      const formData = new FormData(fallbackForm);
                      const data = Object.fromEntries(formData);
                      
                      // Create email body
                      const emailBody = \`New Contact Form Submission:

Name: \${data.firstName} \${data.lastName}
Email: \${data.email}
Phone: \${data.phone || 'Not provided'}
Legal Service: \${data.service}

Message:
\${data.message}\`;
                      
                      // Open email client
                      const mailtoUrl = \`mailto:nairobi@soklaw.co.ke?subject=New Contact Form Submission&body=\${encodeURIComponent(emailBody)}\`;
                      window.open(mailtoUrl, '_blank');
                      
                      // Show success message
                      alert('Thank you for your message! Your email client should open with the form data. Please send the email to complete your submission.');
                      
                      // Reset form
                      fallbackForm.reset();
                    });
                  }
                });
              `}} />
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .animate-on-scroll {
          transition: all 0.6s ease-out;
          transform: translateY(20px);
        }
        
        .animate-fade-in-up {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        /* Custom select arrow */
        select {
          background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23666'%3E%3Cpath d='M8 10.5L4 6.5h8z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 40px;
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