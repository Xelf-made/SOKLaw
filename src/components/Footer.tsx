import React, { useState, useEffect } from 'react';
import {
  Scale,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Newspaper,
  X,
  ArrowRight,
  Clock
} from 'lucide-react';

const Footer = () => {
  const [showNewsPopup, setShowNewsPopup] = useState(false);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  // Sample news articles - replace with your actual news data
  const newsArticles = [
    {
      id: 1,
      title: "New Employment Law Regulations in Kenya 2025",
      excerpt: "Understanding the latest changes in employment legislation and their impact on businesses.",
      date: "2025-08-10",
      category: "Employment Law",
      readTime: "3 min read",
      href: "#news-1"
    },
    {
      id: 2,
      title: "Supreme Court Ruling on Property Rights",
      excerpt: "Recent landmark decision affects property ownership and inheritance laws in Kenya.",
      date: "2025-08-08",
      category: "Property Law",
      readTime: "5 min read",
      href: "#news-2"
    },
    {
      id: 3,
      title: "Corporate Compliance Updates for 2025",
      excerpt: "Essential regulatory changes every business owner should know about this year.",
      date: "2025-08-05",
      category: "Corporate Law",
      readTime: "4 min read",
      href: "#news-3"
    },
    {
      id: 4,
      title: "Family Law Mediation: A Growing Trend",
      excerpt: "Alternative dispute resolution methods gaining popularity in family law cases.",
      date: "2025-08-02",
      category: "Family Law",
      readTime: "3 min read",
      href: "#news-4"
    }
  ];

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

  // Auto-cycle through news articles
  useEffect(() => {
    if (!showNewsPopup) return;
    
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % newsArticles.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [showNewsPopup, newsArticles.length]);

  // Auto-show popup after page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNewsPopup(true);
    }, 3000); // Show popup 3 seconds after component mounts

    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const currentArticle = newsArticles[currentNewsIndex];

  return (
    <>
      <footer className="bg-[#f9f7f1] text-[#1e1e1e] font-sans relative">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Logo & Firm Name */}
          <div>
            <div className="mb-4">
              <img
                src="https://soklaw.co.ke/images/logo.png"
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

            {/* News Button */}
            <div className="mt-6">
              <button
                onClick={() => setShowNewsPopup(true)}
                className="flex items-center gap-2 bg-[#bfa06f] hover:bg-[#a08a5f] text-white px-4 py-2 rounded-lg transition-colors duration-300"
              >
                <Newspaper className="h-4 w-4" />
                Latest News
              </button>
            </div>
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

      {/* News Popup */}
      {showNewsPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden animate-in fade-in duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#bfa06f] to-[#a08a5f] text-white p-6 relative">
              <button
                onClick={() => setShowNewsPopup(false)}
                className="absolute top-4 right-4 p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-3">
                <Newspaper className="h-6 w-6" />
                <div>
                  <h3 className="text-xl font-bold">Latest Legal News</h3>
                  <p className="text-white text-opacity-90 text-sm">Stay updated with legal developments</p>
                </div>
              </div>
            </div>

            {/* News Content */}
            <div className="p-6">
              <div className="mb-4">
                <div className="flex items-center gap-2 text-sm text-[#666] mb-2">
                  <span className="bg-[#bfa06f] bg-opacity-20 text-[#bfa06f] px-2 py-1 rounded-full text-xs font-medium">
                    {currentArticle.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {currentArticle.readTime}
                  </div>
                </div>
                <h4 className="text-lg font-bold text-[#1e1e1e] mb-2">
                  {currentArticle.title}
                </h4>
                <p className="text-[#444] text-sm leading-relaxed mb-3">
                  {currentArticle.excerpt}
                </p>
                <p className="text-xs text-[#888]">
                  Published: {formatDate(currentArticle.date)}
                </p>
              </div>

              {/* Navigation Dots */}
              <div className="flex items-center justify-center gap-2 mb-4">
                {newsArticles.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentNewsIndex(index)}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      index === currentNewsIndex 
                        ? 'bg-[#bfa06f] w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    scrollToSection(currentArticle.href);
                    setShowNewsPopup(false);
                  }}
                  className="flex-1 bg-[#bfa06f] hover:bg-[#a08a5f] text-white px-4 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    scrollToSection('#news');
                    setShowNewsPopup(false);
                  }}
                  className="px-4 py-3 border-2 border-[#bfa06f] text-[#bfa06f] hover:bg-[#bfa06f] hover:text-white rounded-lg font-medium transition-colors duration-300"
                >
                  All News
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;