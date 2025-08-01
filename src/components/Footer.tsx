import React from 'react';
import {
  Scale,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram
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
    { label: 'Litigation & Dispute Resolution', href: '#services' },
    { label: 'Real Estate & Conveyancing', href: '#services' },
    { label: 'Employment & Labour Law', href: '#services' },
    { label: 'Family & Succession Law', href: '#services' },
    { label: 'Criminal Law', href: '#services' }
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
    <footer className="bg-[#0e1013] text-[#f9f9f9] font-sans">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Firm Branding */}
        <div>
          <div className="flex items-center space-x-3 mb-5">
            <Scale className="h-7 w-7 text-[#bfa06f]" />
            <span className="text-2xl font-bold tracking-tight text-[#bfa06f]">SOKLAW ADVOCATES</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-6">
            A full-service law firm based in Nairobi offering strategic legal solutions with diligence, innovation, and integrity.
          </p>
          <div className="flex space-x-3 mt-2">
            {socialLinks.map((item, i) => {
              const Icon = item.icon;
              return (
                <a
                  key={i}
                  href={item.href}
                  aria-label={item.label}
                  title={item.label}
                  className="p-2 bg-[#1c1e22] hover:bg-[#bfa06f] text-white rounded-full transition duration-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#bfa06f]">Quick Links</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            {quickLinks.map((link, i) => (
              <li key={i}>
                <button
                  onClick={() => scrollToSection(link.href)}
                  className="hover:text-[#bfa06f] transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#bfa06f]">Legal Services</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            {legalServices.map((service, i) => (
              <li key={i}>
                <button
                  onClick={() => scrollToSection(service.href)}
                  className="hover:text-[#bfa06f] transition-colors"
                >
                  {service.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Nairobi Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#bfa06f]">Nairobi Office</h3>
          <ul className="text-sm text-gray-300 space-y-4">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-1" />
              <span>
                Upperhill Gardens, Block D1, 5th Floor<br />
                Ragati Road, Nairobi
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <a href="tel:+254700123456" className="hover:text-[#bfa06f]">+254 700 123 456</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href="mailto:info@soklaw.co.ke" className="hover:text-[#bfa06f]">info@soklaw.co.ke</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1f2226] bg-[#0c0e11]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} SOKLAW Advocates. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <img
              src="https://soklaw.co.ke/images/KLR-logo.jpg"
              alt="Kenya Law Reports Logo"
              className="h-8 w-auto rounded"
              title="Kenya Law Reports"
            />
            <img
              src="https://soklaw.co.ke/images/law-society-of-kenya.jpg"
              alt="Law Society of Kenya Logo"
              className="h-8 w-auto rounded"
              title="Law Society of Kenya"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
