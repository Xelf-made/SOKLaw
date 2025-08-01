import React from 'react';
import { Scale, MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Our Team', href: '#team' },
    { label: 'Case Studies', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Blog', href: '#news' }
  ];

  const legalServices = [
    { label: 'Corporate Law', href: '#services' },
    { label: 'Commercial Litigation', href: '#services' },
    { label: 'Real Estate Law', href: '#services' },
    { label: 'Employment Law', href: '#services' },
    { label: 'Family Law', href: '#services' },
    { label: 'Criminal Defense', href: '#services' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <Scale className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">SOK Law Associates</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted legal partner in Kenya, providing comprehensive legal solutions 
              with excellence, integrity, and unwavering commitment to client success since 2009.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors duration-300"
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Legal Services</h3>
            <ul className="space-y-3">
              {legalServices.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(service.href)}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    {service.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-blue-400 mb-2">Nairobi Office</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>Upper Hill, ABC Place, 5th Floor<br />Waiyaki Way, Nairobi</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <a href="tel:+254700123456" className="hover:text-blue-400 transition-colors">
                      +254 700 123 456
                    </a>
                  </div>
                </div>
              </div>
                   
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:info@soklaw.co.ke" className="hover:text-blue-400 transition-colors">
                  info@soklaw.co.ke
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400 text-center md:text-left">
              © 2024 SOK Law Associates. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;