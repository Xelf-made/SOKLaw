import React from 'react';
import {
  Scale, MapPin, Phone, Mail,
  Facebook, Twitter, Linkedin, Instagram
} from 'lucide-react';

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
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0f172a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand + Social */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Scale className="h-7 w-7 text-yellow-400" />
              <span className="text-xl font-bold tracking-wide">SOK Law Associates</span>
            </div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Trusted legal experts serving clients across Kenya since 2009 — committed to clarity, excellence, and strategic results.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map(({ icon: Icon, href, label }, idx) => (
                <a
                  key={idx}
                  href={href}
                  aria-label={label}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition"
                >
                  <Icon className="h-4 w-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              {quickLinks.map(({ label, href }, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollToSection(href)}
                    className="hover:text-yellow-400 transition"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Services */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Legal Services</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              {legalServices.map(({ label, href }, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollToSection(href)}
                    className="hover:text-yellow-400 transition"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Contact Information</h3>
            <div className="space-y-4 text-sm text-gray-300">
              <div>
                <h4 className="text-yellow-400 font-medium mb-2">Nairobi Office</h4>
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 mt-1" />
                  <span>Upper Hill, ABC Place, 5th Floor<br />Waiyaki Way, Nairobi</span>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+254700123456" className="hover:text-yellow-400 transition">
                    +254 700 123 456
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@soklaw.co.ke" className="hover:text-yellow-400 transition">
                  info@soklaw.co.ke
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <span>© {new Date().getFullYear()} SOK Law Associates. All rights reserved.</span>
          <div className="flex space-x-6 mt-3 md:mt-0">
            <a href="#" className="hover:text-yellow-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-yellow-400 transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
