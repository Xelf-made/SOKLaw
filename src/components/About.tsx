import React, { useEffect, useRef } from 'react';
import { Users, Award, Clock, TrendingUp } from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.animate-on-scroll');
            elements.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add('animate-fade-in-up');
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

  const stats = [
    { icon: Clock, label: 'Years of Experience', value: '15+', color: 'text-blue-600' },
    { icon: Award, label: 'Cases Won', value: '500+', color: 'text-green-600' },
    { icon: Users, label: 'Satisfied Clients', value: '1000+', color: 'text-purple-600' },
    { icon: TrendingUp, label: 'Success Rate', value: '98%', color: 'text-orange-600' },
  ];

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="animate-on-scroll opacity-0 text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About SOK Law Associates
          </h2>
          <div className="animate-on-scroll opacity-0 w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="animate-on-scroll opacity-0 relative">
            <img
              src="https://i.postimg.cc/Hs0FkvXp/7-X2-A2923-1.jpg"
              className="rounded-2xl shadow-2xl w-full h-96 object-cover transform hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-xl shadow-lg animate-pulse">
              <div className="text-center">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm">Years Serving Kenya</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="animate-on-scroll opacity-0">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Excellence in Legal Practice Since 2009
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                SOK Law Associates has been at the forefront of legal practice in Kenya, 
                providing comprehensive legal solutions to individuals, corporations, and 
                institutions. Our commitment to excellence, integrity, and client satisfaction 
                has made us one of the most trusted law firms in the region.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We combine deep legal expertise with innovative approaches to deliver 
                outstanding results for our clients. Our team of experienced lawyers 
                specializes in various areas of law, ensuring that we can handle complex 
                legal matters with precision and professionalism.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="animate-on-scroll opacity-0 bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <IconComponent className={`h-8 w-8 ${stat.color} mb-3`} />
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;