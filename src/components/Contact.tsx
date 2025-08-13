{/* Enhanced CSS for EngageBay form styling to match current design */}
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

        /* EngageBay CRM form custom styling to match current design */
        .engagebay-form-container {
          width: 100%;
        }

        /* Style all EngageBay form elements */
        .engage-hub-form-embed,
        .engage-hub-form-embed * {
          box-sizing: border-box !important;
        }

        /* Form container */
        .engage-hub-form-embed {
          width: 100% !important;
          max-width: none !important;
          margin: 0 !important;
          padding: 0 !important;
          background: transparent !important;
          border: none !important;
        }

        /* Form wrapper */
        .engage-hub-form-embed > div,
        .engage-hub-form-embed form {
          width: 100% !important;
          max-width: none !important;
          margin: 0 !important;
          padding: 0 !important;
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }

        /* Input fields styling to match current design */
        .engage-hub-form-embed input[type="text"],
        .engage-hub-form-embed input[type="email"],
        .engage-hub-form-embed input[type="tel"],
        .engage-hub-form-embed input[type="phone"],
        .engage-hub-form-embed select,
        .engage-hub-form-embed textarea {
          width: 100% !important;
          padding: 12px 16px !important;
          border: 2px solid #e5e7eb !important;
          border-radius: 8px !important;
          font-size: 14px !important;
          font-family: inherit !important;
          background: white !important;
          color: #374151 !important;
          transition: all 0.3s ease !important;
          margin-bottom: 6px !important;
          box-shadow: none !important;
        }

        /* Focus states to match current design */
        .engage-hub-form-embed input[type="text"]:focus,
        .engage-hub-form-embed input[type="email"]:focus,
        .engage-hub-form-embed input[type="tel"]:focus,
        .engage-hub-form-embed input[type="phone"]:focus,
        .engage-hub-form-embed select:focus,
        .engage-hub-form-embed textarea:focus {
          outline: none !important;
          border-color: #eab308 !important;
          box-shadow: 0 0 0 3px rgba(234, 179, 8, 0.1) !important;
        }

        /* Labels styling */
        .engage-hub-form-embed label {
          display: block !important;
          font-size: 14px !important;
          font-weight: 500 !important;
          color: #374151 !important;
          margin-bottom: 8px !important;
          font-family: inherit !important;
        }

        /* Form rows/groups */
        .engage-hub-form-embed .form-group,
        .engage-hub-form-embed .form-row,
        .engage-hub-form-embed > div > div {
          margin-bottom: 24px !important;
          width: 100% !important;
        }

        /* Two-column layout for name fields */
        .engage-hub-form-embed .form-row {
          display: flex !important;
          gap: 24px !important;
          flex-wrap: wrap !important;
        }

        .engage-hub-form-embed .form-row > div,
        .engage-hub-form-embed .form-row .form-group {
          flex: 1 !important;
          min-width: 200px !important;
        }

        /* Submit button styling to match current design */
        .engage-hub-form-embed button[type="submit"],
        .engage-hub-form-embed input[type="submit"],
        .engage-hub-form-embed .submit-btn,
        .engage-hub-form-embed [class*="submit"],
        .engage-hub-form-embed [class*="button"] {
          background: linear-gradient(to right, #eab308, #ca8a04) !important;
          color: white !important;
          padding: 16px 24px !important;
          border-radius: 8px !important;
          font-weight: 600 !important;
          font-size: 16px !important;
          border: none !important;
          width: 100% !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
          margin-top: 8px !important;
          font-family: inherit !important;
          text-transform: none !important;
          letter-spacing: normal !important;
        }

        /* Submit button hover effect */
        .engage-hub-form-embed button[type="submit"]:hover,
        .engage-hub-form-embed input[type="submit"]:hover,
        .engage-hub-form-embed .submit-btn:hover,
        .engage-hub-form-embed [class*="submit"]:hover,
        .engage-hub-form-embed [class*="button"]:hover {
          background: linear-gradient(to right, #ca8a04, #a16207) !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 4px 12px rgba(234, 179, 8, 0.3) !important;
        }

        /* Remove any default EngageBay styling */
        .engage-hub-form-embed .form-control,
        .engage-hub-form-embed .form-input {
          background: white !important;
          border: 2px solid #e5e7eb !important;
          border-radius: 8px !important;
        }

        /* Placeholder text styling */
        .engage-hub-form-embed input::placeholder,
        .engage-hub-form-embed textarea::placeholder {
          color: #9ca3af !important;
          opacity: 1 !important;
        }

        /* Select dropdown styling */
        .engage-hub-form-embed select {
          appearance: none !important;
          background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23666'%3E%3Cpath d='M8 10.5L4 6.5h8z'/%3E%3C/svg%3E") !important;
          background-repeat: no-repeat !important;
          background-position: right 12px center !important;
          padding-right: 40px !important;
        }

        /* Textarea specific stylingimport React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [engageBayLoaded, setEngageBayLoaded] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Official EngageBay configuration from your account
  const ENGAGEBAY_CONFIG = {
    accountId: 'scq2bqf88ontbg2g3432fpspk', // Javascript API Key
    jsApiKey: 'gmailrkfn', // JS API Key  
    restApiKey: '51q2n6a51fje59mchld8audokm', // REST API Key
    formId: 6351369855041536, // Form ID as number
    formIdString: '6351369855041536', // Form ID as string
    baseUrl: 'https://app.engagebay.com',
    domain: 'app.engagebay.com'
  };

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

  // Load EngageBay Scripts - Using your exact tracking code
  useEffect(() => {
    let isComponentMounted = true;

    const loadEngageBayScripts = async () => {
      try {
        // Load the official EngageBay tracking script (EXACT code from your documentation)
        const loadTrackingScript = () => {
          return new Promise<void>((resolve, reject) => {
            if (window.EhAPI) {
              resolve();
              return;
            }

            // Your exact JS API & Tracking Code
            window.EhAPI = window.EhAPI || {};
            window.EhAPI.after_load = function() {
              if (isComponentMounted) {
                window.EhAPI.set_account(ENGAGEBAY_CONFIG.accountId, ENGAGEBAY_CONFIG.jsApiKey);
                window.EhAPI.execute('rules');
                console.log('✅ EngageBay tracking initialized with your account');
                resolve();
              }
            };

            // Exact script loading from your documentation
            const sc = document.createElement('script');
            sc.type = 'text/javascript';
            sc.async = true;
            sc.src = '//d2p078bqz5urf7.cloudfront.net/jsapi/ehform.js?v' + new Date().getHours();
            
            sc.onload = () => {
              console.log('✅ EngageBay tracking script loaded');
            };
            sc.onerror = () => reject(new Error('Failed to load EngageBay tracking script'));
            
            const m = document.getElementsByTagName('script')[0];
            if (m && m.parentNode) {
              m.parentNode.insertBefore(sc, m);
            } else {
              document.head.appendChild(sc);
            }
          });
        };

        // Load EngageBay Forms Script
        const loadFormsScript = () => {
          return new Promise<void>((resolve, reject) => {
            const formsScript = document.createElement('script');
            formsScript.type = 'text/javascript';
            formsScript.src = `https://${ENGAGEBAY_CONFIG.domain}/load_forms.js`;
            
            formsScript.onload = () => {
              setTimeout(() => {
                if (window.EhForms && isComponentMounted) {
                  try {
                    // Your exact EhForms.create() implementation
                    window.EhForms.create({
                      "formId": ENGAGEBAY_CONFIG.formId, // Required: The unique ID of your form
                      "target": "#eh_form_6351369855041536", // Target your specific form
                      "onFormReady": function(el: any, setValue: any) { 
                        console.log('✅ EngageBay CRM form loaded and ready');
                        if (isComponentMounted) {
                          setEngageBayLoaded(true);
                        }
                        
                        // Apply custom styling to match current design
                        if (el) {
                          el.style.width = '100%';
                          el.style.maxWidth = 'none';
                        }
                      },
                      "onFormSubmit": function(data: any) {
                        console.log('✅ Form submitted successfully to EngageBay CRM:', data);
                        if (isComponentMounted) {
                          setSubmitMessage('🎉 Thank you! Your consultation request has been submitted successfully to our CRM. We will contact you within 24 hours.');
                        }
                      }
                    });
                    resolve();
                  } catch (error) {
                    console.error('❌ Error creating EngageBay form:', error);
                    reject(error);
                  }
                } else {
                  reject(new Error('EhForms not available'));
                }
              }, 2000); // Increased timeout for reliable loading
            };
            
            formsScript.onerror = () => reject(new Error('Failed to load EngageBay forms script'));
            document.head.appendChild(formsScript);
          });
        };

        // Load both scripts in sequence
        await loadTrackingScript();
        await loadFormsScript();

      } catch (error) {
        console.error('❌ EngageBay form loading failed:', error);
        if (isComponentMounted) {
          setEngageBayLoaded(false);
        }
      }
    };

    loadEngageBayScripts();

    return () => {
      isComponentMounted = false;
    };
  }, []);

  // Remove all the unused functions since we're using native EngageBay form
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

          {/* EngageBay CRM Form - Styled to match current design */}
          <div className="animate-on-scroll opacity-0">
            <div className="bg-white p-8 rounded-2xl shadow-xl border">
              <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Request a Consultation
              </h3>
              
              {/* Success message */}
              {submitMessage && (
                <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-700 border border-green-200">
                  {submitMessage}
                </div>
              )}

              {/* Official EngageBay CRM Form */}
              <div className="engagebay-form-container">
                {/* Your exact HTML code from EngageBay */}
                <div className="engage-hub-form-embed" id="eh_form_6351369855041536" data-id="6351369855041536"></div>
              </div>

              {/* Loading state */}
              {!engageBayLoaded && (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
                  <span className="ml-3 text-gray-600">Loading CRM form...</span>
                </div>
              )}

              {/* Footer message */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  🔒 Submits directly to EngageBay CRM • Secure & Confidential
                </p>
              </div>
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

        /* Textarea specific styling */
        .engage-hub-form-embed textarea {
          min-height: 120px !important;
          resize: vertical !important;
          font-family: inherit !important;
        }

        /* Error message styling */
        .engage-hub-form-embed .error,
        .engage-hub-form-embed .validation-error,
        .engage-hub-form-embed [class*="error"] {
          color: #dc2626 !important;
          font-size: 12px !important;
          margin-top: 4px !important;
          display: block !important;
        }

        /* Success message styling */
        .engage-hub-form-embed .success,
        .engage-hub-form-embed .validation-success,
        .engage-hub-form-embed [class*="success"] {
          color: #059669 !important;
          font-size: 14px !important;
          margin-top: 8px !important;
          display: block !important;
        }

        /* Required field indicators */
        .engage-hub-form-embed .required::after,
        .engage-hub-form-embed [class*="required"]::after {
          content: " *" !important;
          color: #dc2626 !important;
        }

        /* Hide EngageBay branding if present */
        .engage-hub-form-embed .powered-by,
        .engage-hub-form-embed [class*="powered"],
        .engage-hub-form-embed [class*="branding"] {
          display: none !important;
        }

        /* Responsive design for mobile */
        @media (max-width: 768px) {
          .engage-hub-form-embed .form-row {
            flex-direction: column !important;
            gap: 0 !important;
          }

          .engage-hub-form-embed .form-row > div,
          .engage-hub-form-embed .form-row .form-group {
            width: 100% !important;
            min-width: auto !important;
          }

          .engage-hub-form-embed input[type="text"],
          .engage-hub-form-embed input[type="email"],
          .engage-hub-form-embed input[type="tel"],
          .engage-hub-form-embed input[type="phone"],
          .engage-hub-form-embed select,
          .engage-hub-form-embed textarea {
            font-size: 16px !important; /* Prevents zoom on iOS */
          }
        }

        /* Loading animation improvements */
        .engage-hub-form-embed .loading,
        .engage-hub-form-embed [class*="loading"] {
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          padding: 20px !important;
        }

        /* Form spacing adjustments */
        .engage-hub-form-embed {
          line-height: normal !important;
        }

        .engage-hub-form-embed * {
          box-sizing: border-box !important;
        }

        /* Override any inline styles that might conflict */
        .engage-hub-form-embed input[style],
        .engage-hub-form-embed select[style],
        .engage-hub-form-embed textarea[style],
        .engage-hub-form-embed button[style] {
          padding: 12px 16px !important;
          border: 2px solid #e5e7eb !important;
          border-radius: 8px !important;
          font-size: 14px !important;
          background: white !important;
        }

        .engage-hub-form-embed button[style],
        .engage-hub-form-embed input[type="submit"][style] {
          background: linear-gradient(to right, #eab308, #ca8a04) !important;
          color: white !important;
          padding: 16px 24px !important;
          font-weight: 600 !important;
        }
      `}</style>
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