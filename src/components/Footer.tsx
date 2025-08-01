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
    <footer className="bg-[#f9f7f1] text-[#1e1e1e] font-sans">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Logo & Firm Name */}
        <div>
          <div className="mb-4">
            <img
              src="your-logo-url.png" // Replace with your logo
              alt="SOKLAW Logo"
              className="h-10 w-auto"
            />
          </div>
          <p className="text-sm font-medium text-[#4b4b4b] mb-5 tracking-wide uppercase">
            SIMIYU, OPONDO, KIRANGA & COMPANY ADVOCATES
          </p>
          <p className="text-sm text-[#444] leading-relaxed mb-6">
            A full-service law firm in Nairobi offering strategic, dependable legal solutions with integrity and diligence.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-3 mt-2">
            {socialLinks.map((item, i) => {
              const Icon = item.icon;
              return (
                <a
                  key={i}
                  href={item.href}
                  aria-label={item.label}
                  title={item.label}
                  className="p-2 bg-[#eae7df] hover:bg-[#bfa06f] text-[#1e1e1e] rounded-full transition duration-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#bfa06f]">Quick Links</h3>
          <ul className="space-y-3 text-sm text-[#333]">
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
          <ul className="space-y-3 text-sm text-[#333]">
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

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#bfa06f]">Nairobi Office</h3>
          <ul className="text-sm text-[#333] space-y-4">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-1 text-[#bfa06f]" />
              <span>
                Upperhill Gardens, Block D1, 5th Floor<br />
                Ragati Road, Nairobi
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#bfa06f]" />
              <a href="tel:+254700123456" className="hover:text-[#bfa06f]">+254 700 123 456</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#bfa06f]" />
              <a href="mailto:info@soklaw.co.ke" className="hover:text-[#bfa06f]">info@soklaw.co.ke</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[#ddd]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#888] text-center md:text-left">
            © {new Date().getFullYear()} SOKLAW Advocates. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <img
              src="https://soklaw.co.ke/images/KLR-logo.jpg"
              alt="Kenya Law Reports"
              title="Kenya Law Reports"
              className="h-8 w-auto rounded"
            />
            <img
              src="https://soklaw.co.ke/images/law-society-of-kenya.jpg"
              alt="Law Society of Kenya"
              title="Law Society of Kenya"
              className="h-8 w-auto rounded"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
