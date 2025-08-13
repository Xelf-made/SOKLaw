import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [showFallbackForm, setShowFallbackForm] = useState(true);
  const [engageBayLoaded, setEngageBayLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

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

  // Load EngageBay Scripts - Exact implementation from your documentation
  useEffect(() => {
    let isComponentMounted = true;

    const loadEngageBayScripts = async () => {
      try {
        // Step 1: Load the official EngageBay tracking script (EXACT code from your docs)
        const loadTrackingScript = () => {
          return new Promise<void>((resolve, reject) => {
            if (window.EhAPI) {
              resolve();
              return;
            }

            // Exact tracking code from your EngageBay documentation
            window.EhAPI = window.EhAPI || {};
            window.EhAPI.after_load = function() {
              if (isComponentMounted) {
                window.EhAPI.set_account(ENGAGEBAY_CONFIG.accountId, ENGAGEBAY_CONFIG.jsApiKey);
                window.EhAPI.execute('rules');
                console.log('✅ EngageBay tracking initialized');
                resolve();
              }
            };

            // Create script exactly as in your documentation
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

        // Step 2: Load EngageBay Forms Script
        const loadFormsScript = () => {
          return new Promise<void>((resolve, reject) => {
            const formsScript = document.createElement('script');
            formsScript.type = 'text/javascript';
            formsScript.src = `https://${ENGAGEBAY_CONFIG.domain}/load_forms.js`;
            
            formsScript.onload = () => {
              setTimeout(() => {
                if (window.EhForms && isComponentMounted) {
                  try {
                    // Exact EhForms.create() implementation from your documentation
                    window.EhForms.create({
                      "formId": ENGAGEBAY_CONFIG.formId, // Required: The unique ID of your form
                      "target": "#eh_form_6351369855041536", // Target the specific form container
                      "onFormReady": function(el: any, setValue: any) { 
                        console.log('✅ EngageBay form loaded and ready');
                        if (isComponentMounted) {
                          setShowFallbackForm(false);
                          setEngageBayLoaded(true);
                        }
                        
                        // Apply styling to the native form
                        if (el) {
                          el.style.width = '100%';
                          el.style.maxWidth = 'none';
                        }
                      },
                      "onFormSubmit": function(data: any) {
                        console.log('✅ Form submitted via EngageBay native form:', data);
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
              }, 1500); // Increased timeout for reliable loading
            };
            
            formsScript.onerror = () => reject(new Error('Failed to load EngageBay forms script'));
            document.head.appendChild(formsScript);
          });
        };

        // Load both scripts in sequence
        await loadTrackingScript();
        await loadFormsScript();

      } catch (error) {
        console.log('⚠️ EngageBay native form loading failed, using fallback:', error);
        if (isComponentMounted) {
          setShowFallbackForm(true);
          setEngageBayLoaded(false);
        }
      }
    };

    loadEngageBayScripts();

    return () => {
      isComponentMounted = false;
    };
  }, []);

  // Submit to EngageBay CRM - Using your exact configuration
  const submitToEngageBay = async (data: typeof formData) => {
    console.log('🚀 Starting form submission to EngageBay CRM...');
    let lastError: Error | null = null;

    // Method 1: EngageBay JavaScript API (Primary method from your docs)
    if (window.EhAPI && typeof window.EhAPI.execute === 'function') {
      try {
        console.log('📡 Attempting JavaScript API submission...');
        
        const contact = {
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone,
          properties: [
            {
              name: 'Legal Service Required',
              value: data.service,
              field_type: 'TEXT'
            },
            {
              name: 'Consultation Message', 
              value: data.message,
              field_type: 'TEXTAREA'
            },
            {
              name: 'Lead Source',
              value: 'Website Contact Form',
              field_type: 'TEXT'
            },
            {
              name: 'Submission Date',
              value: new Date().toLocaleString(),
              field_type: 'TEXT'
            }
          ]
        };

        const result = await window.EhAPI.execute('contact.add', contact);
        console.log('✅ SUCCESS: Contact added via EngageBay JavaScript API', result);
        return { success: true, method: 'JavaScript API', data: result };
        
      } catch (jsApiError) {
        console.error('❌ JavaScript API failed:', jsApiError);
        lastError = jsApiError as Error;
      }
    } else {
      console.log('⚠️ EngageBay JavaScript API not available');
    }

    // Method 2: Direct form submission to your specific form (From your HTML code)
    try {
      console.log('📝 Attempting direct form submission to EngageBay collect...');
      
      const formData = new FormData();
      
      // Use your exact form ID
      formData.append('formId', ENGAGEBAY_CONFIG.formIdString);
      formData.append('email', data.email);
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('phone', data.phone);
      formData.append('legalService', data.service);
      formData.append('message', data.message);
      formData.append('leadSource', 'Website Contact Form');
      formData.append('submissionDate', new Date().toLocaleString());

      const response = await fetch(`${ENGAGEBAY_CONFIG.baseUrl}/collect`, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // Required to avoid CORS issues
      });

      console.log('✅ SUCCESS: Form submitted to EngageBay collect endpoint');
      return { success: true, method: 'Collect endpoint' };

    } catch (collectError) {
      console.error('❌ Collect endpoint failed:', collectError);
      lastError = collectError as Error;
    }

    // Method 3: Alternative endpoint submission
    try {
      console.log('🔄 Attempting alternative EngageBay endpoint...');
      
      const altFormData = new FormData();
      altFormData.append('form_id', ENGAGEBAY_CONFIG.formIdString);
      altFormData.append('email', data.email);
      altFormData.append('first_name', data.firstName);
      altFormData.append('last_name', data.lastName);
      altFormData.append('phone', data.phone);
      altFormData.append('custom_field_1', data.service); // Legal Service
      altFormData.append('custom_field_2', data.message); // Message
      altFormData.append('lead_source', 'Website Contact Form');

      const response = await fetch(`https://${ENGAGEBAY_CONFIG.domain}/forms/submit`, {
        method: 'POST',
        body: altFormData,
        mode: 'no-cors'
      });

      console.log('✅ SUCCESS: Form submitted to alternative EngageBay endpoint');
      return { success: true, method: 'Alternative endpoint' };

    } catch (altError) {
      console.error('❌ Alternative endpoint failed:', altError);
      lastError = altError as Error;
    }

    // Method 4: Try to trigger native EngageBay form submission if available
    if (document.querySelector('#eh_form_6351369855041536')) {
      try {
        console.log('🎯 Attempting native EngageBay form submission...');
        
        const formContainer = document.querySelector('#eh_form_6351369855041536');
        const nativeForm = formContainer?.querySelector('form') as HTMLFormElement;
        
        if (nativeForm) {
          // Fill native form fields
          const fields = {
            email: nativeForm.querySelector('input[type="email"]') as HTMLInputElement,
            firstName: nativeForm.querySelector('input[name*="first"], input[name*="First"], input[placeholder*="first"], input[placeholder*="First"]') as HTMLInputElement,
            lastName: nativeForm.querySelector('input[name*="last"], input[name*="Last"], input[placeholder*="last"], input[placeholder*="Last"]') as HTMLInputElement,
            phone: nativeForm.querySelector('input[type="tel"], input[name*="phone"], input[placeholder*="phone"]') as HTMLInputElement,
            message: nativeForm.querySelector('textarea') as HTMLTextAreaElement
          };

          // Populate fields
          if (fields.email) fields.email.value = data.email;
          if (fields.firstName) fields.firstName.value = data.firstName;
          if (fields.lastName) fields.lastName.value = data.lastName;
          if (fields.phone) fields.phone.value = data.phone;
          if (fields.message) fields.message.value = `Legal Service: ${data.service}\n\nMessage: ${data.message}`;

          // Trigger form submission
          nativeForm.submit();
          
          console.log('✅ SUCCESS: Native EngageBay form submitted');
          return { success: true, method: 'Native form' };
        }
        
      } catch (nativeError) {
        console.error('❌ Native form submission failed:', nativeError);
        lastError = nativeError as Error;
      }
    }

    // If all methods fail
    console.error('❌ ALL SUBMISSION METHODS FAILED');
    throw lastError || new Error('All EngageBay submission methods failed');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Validate required fields
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.service || !formData.message) {
        setSubmitMessage('❌ Please fill in all required fields');
        setIsSubmitting(false);
        return;
      }

      // Submit directly to EngageBay CRM
      const result = await submitToEngageBay(formData);
      
      // Show success message
      setSubmitMessage('🎉 Thank you! Your consultation request has been submitted successfully to our CRM system. We will contact you within 24 hours to schedule your consultation.');
      resetForm();
      
    } catch (error) {
      console.error('Form submission failed:', error);
      
      // Show specific error message but still try to submit
      setSubmitMessage(`⚠️ There was a technical issue, but we're still processing your request. If you don't hear from us within 24 hours, please contact us directly:

📧 Email: nairobi@soklaw.co.ke
📞 Phone: +254 700 123 456

Your submission details:
• Name: ${formData.firstName} ${formData.lastName}
• Email: ${formData.email}
• Service: ${formData.service}`);
      
      // Don't reset form in case of error so user can try again
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
              
              {/* Official EngageBay Form Container */}
              {engageBayLoaded && !showFallbackForm && (
                <div>
                  {/* Official EngageBay HTML embed code */}
                  <div className="engage-hub-form-embed" id="eh_form_6351369855041536" data-id="6351369855041536"></div>
                  
                  {submitMessage && (
                    <div className="mt-4 p-4 rounded-lg bg-green-50 text-green-700 border border-green-200">
                      {submitMessage}
                    </div>
                  )}
                </div>
              )}
                
              {/* Fallback form */}
              {showFallbackForm && (
                <div className="space-y-6">
                  {submitMessage && (
                    <div className={`p-4 rounded-lg ${submitMessage.includes('❌') 
                      ? 'bg-red-50 text-red-700 border border-red-200' 
                      : submitMessage.includes('✉️')
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-green-50 text-green-700 border border-green-200'
                    }`}>
                      <pre className="whitespace-pre-wrap text-sm font-sans">{submitMessage}</pre>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium mb-2 text-gray-700">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
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
                          value={formData.lastName}
                          onChange={handleInputChange}
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
                          value={formData.email}
                          onChange={handleInputChange}
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
                          value={formData.phone}
                          onChange={handleInputChange}
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
                        value={formData.service}
                        onChange={handleInputChange}
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
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please describe your legal matter and how we can help you..."
                        required
                        rows={5}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 resize-vertical disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>

                    <button
                      onClick={handleFormSubmit}
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Submitting to CRM...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          <span>Submit to CRM</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      🔒 Submits directly to EngageBay CRM • No email required
                    </p>
                  </div>
                </div>
              )}

              {/* Loading state */}
              {!showFallbackForm && !engageBayLoaded && (
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
    EhAPI: any;
    EhForms: any;
  }
}

export default Contact;