import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const TYPING_TEXT = 'SIMIYU, OPONDO, KIRANGA & COMPANY ADVOCATES';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < TYPING_TEXT.length) {
        setTypedText((prev) => prev + TYPING_TEXT[index]);
        index++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowCursor(false), 500);
      }
    }, 60);
    return () => clearInterval(typingInterval);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { 
      href: '#services', 
      label: 'Services',
      dropdown: [
        { href: '#services', label: 'All Services' },
        { href: '/services/corporate-law', label: 'Corporate Law' },
        { href: '/services/commercial-litigation', label: 'Commercial Litigation' },
        { href: '/services/real-estate-law', label: 'Real Estate Law' },
        { href: '/services/employment-law', label: 'Employment Law' },
        { href: '/services/family-law', label: 'Family Law' },
        { href: '/services/criminal-defense', label: 'Criminal Defense' }
      ]
    },
    { href: '#team', label: 'Team' },
    { href: '#news', label: 'News' },
    { href: '#contact', label: 'Contact' },
  ];

  const scrollToSection = useCallback((href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  }, []);

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const handleDropdownItemClick = (href: string) => {
    if (href.startsWith('#')) {
      scrollToSection(href);
    } else {
      window.location.href = href;
    }
    setActiveDropdown(null);
    setIsOpen(false);
  };

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`navbar transition-all duration-300 ${
          isScrolled ? 'navbar-scrolled' : 'bg-transparent'
        }`}
      >
        <div className="container">
          <div className="flex justify-between items-center h-20">
            {/* Logo and Typing Text */}
            <div className="navbar-brand">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#home');
                }}
                aria-label="SOK Law Associates - Home"
              >
                <img
                  src="https://soklaw.co.ke/images/logo.png"
                  alt="SOK Law Associates Logo"
                  className="h-9 w-auto object-contain transition-all duration-300"
                />
              </a>
              <p className="navbar-brand-text">
                {typedText}
                {showCursor && <span className="animate-pulse">|</span>}
              </p>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navLinks.map((link) => (
                  <div key={link.href} className="relative">
                    {link.dropdown ? (
                      <button
                        onClick={() => handleDropdownToggle(link.label)}
                        className={`px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-blue-400 flex items-center gap-1 ${
                          isScrolled ? 'text-gray-700' : 'text-white'
                        }`}
                        aria-expanded={activeDropdown === link.label}
                        aria-haspopup="true"
                      >
                        {link.label}
                        <ChevronDown className={`h-4 w-4 transition-transform ${
                          activeDropdown === link.label ? 'rotate-180' : ''
                        }`} />
                      </button>
                    ) : (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(link.href);
                        }}
                        className={`px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-blue-400 ${
                          isScrolled ? 'text-gray-700' : 'text-white'
                        }`}
                      >
                        {link.label}
                      </a>
                    )}
                    
                    {/* Dropdown Menu */}
                    {link.dropdown && activeDropdown === link.label && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                        {link.dropdown.map((item) => (
                          <button
                            key={item.href}
                            onClick={() => handleDropdownItemClick(item.href)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 ${isScrolled ? 'text-gray-700' : 'text-white'}`}
                aria-expanded={isOpen}
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="mobile-menu md:hidden" role="menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <div key={link.href}>
                  {link.dropdown ? (
                    <>
                      <button
                        onClick={() => handleDropdownToggle(link.label)}
                        className="mobile-menu-item w-full text-left flex items-center justify-between"
                        aria-expanded={activeDropdown === link.label}
                      >
                        {link.label}
                        <ChevronDown className={`h-4 w-4 transition-transform ${
                          activeDropdown === link.label ? 'rotate-180' : ''
                        }`} />
                      </button>
                      {activeDropdown === link.label && (
                        <div className="pl-4">
                          {link.dropdown.map((item) => (
                            <button
                              key={item.href}
                              onClick={() => handleDropdownItemClick(item.href)}
                              className="mobile-menu-item w-full text-left text-sm"
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="mobile-menu-item w-full text-left"
                    >
                      {link.label}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Click outside to close dropdown */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setActiveDropdown(null)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Navbar;
