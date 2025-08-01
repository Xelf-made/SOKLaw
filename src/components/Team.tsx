import React, { useEffect, useRef } from 'react';
import { Linkedin, Mail, Phone } from 'lucide-react';

const Team = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.team-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-fade-in-up');
              }, index * 200);
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

  const teamMembers = [
    {
      name: 'Sospeter Opondo',
      role: 'Senior Partner',
      specialization: 'Corporate Law & Commercial Litigation',
      image: 'https://i.postimg.cc/MGfCq6YL/7X2A2792.jpg',
      email: 'sopondo@soklaw.co.ke',
      phone: '+254 700 123 456'
    },
    {
      name: 'Faith Simiyu',
      role: 'Partner',
      specialization: 'Family Law & Real Estate',
      image: 'https://images.pexels.com/photos/3760854/pexels-photo-3760854.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      email: 'fsimiyu@soklaw.co.ke',
      phone: '+254 700 123 457'
    },
    {
      name: 'Paul Kiranga',
      role: 'Associate Partner',
      specialization: 'Criminal Defense & Constitutional Law',
      image: 'https://i.postimg.cc/v8KZvBN1/Whats-App-Image-2025-07-20-at-03-11-55.jpg',
      email: 'pkiranga@soklaw.co.ke',
      phone: '+254 700 123 458'
    }
  ];

  return (
    <section ref={sectionRef} id="team" className="py-20 brand-section-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Our Legal Team
          </h2>
          <p className="text-xl max-w-3xl mx-auto animate-fade-in-delay">
            Meet our experienced team of legal professionals dedicated to providing 
            exceptional legal services and achieving the best outcomes for our clients.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-600 to-yellow-500 mx-auto mt-6 animate-scale-in"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="team-card opacity-0 modern-card overflow-hidden transform hover:-translate-y-2 transition-all duration-500 group"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-img group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">
                  {member.name}
                </h3>
                <p className="font-semibold text-lg mb-3 text-yellow-600">
                  {member.role}
                </p>
                <p className="mb-6">
                  {member.specialization}
                </p>

                {/* Contact Icons */}
                <div className="flex space-x-4">
                  <a
                    href={`mailto:${member.email}`}
                    className="p-3 bg-gray-100 text-gray-600 rounded-full hover:bg-yellow-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                  <a
                    href={`tel:${member.phone}`}
                    className="p-3 bg-gray-100 text-gray-600 rounded-full hover:bg-blue-800 hover:text-white transition-all duration-300 transform hover:scale-110"
                  >
                    <Phone className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="p-3 bg-gray-100 text-gray-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-lg mb-8 animate-fade-in">
            Ready to work with our experienced legal team?
          </p>
          <button className="btn-primary transform hover:scale-105 shadow-lg animate-fade-in-delay" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Schedule a Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default Team;