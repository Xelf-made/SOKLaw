import React, { useEffect, useRef } from 'react';
import { Trophy, DollarSign, Scale, TrendingUp } from 'lucide-react';

const TrackRecord = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.track-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-fade-in-up');
              }, index * 150);
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

  const achievements = [
    {
      icon: Trophy,
      value: '500+',
      label: 'Cases Won',
      description: 'Successfully resolved legal matters',
      color: 'bg-gradient-to-br from-yellow-400 to-orange-500'
    },
    {
      icon: DollarSign,
      value: 'KSh 50B+',
      label: 'Value Secured',
      description: 'Total value recovered for clients',
      color: 'bg-gradient-to-br from-green-400 to-blue-500'
    },
    {
      icon: Scale,
      value: '25+',
      label: 'Landmark Cases',
      description: 'Precedent-setting legal victories',
      color: 'bg-gradient-to-br from-purple-400 to-pink-500'
    },
    {
      icon: TrendingUp,
      value: '98%',
      label: 'Success Rate',
      description: 'Exceptional track record',
      color: 'bg-gradient-to-br from-blue-400 to-indigo-500'
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
            Our Track Record
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-delay">
            Numbers that speak to our commitment to excellence and our clients' success
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 animate-scale-in"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            return (
              <div
                key={index}
                className="track-card opacity-0 relative group"
              >
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center transform hover:-translate-y-2 transition-all duration-500 border border-gray-100 group-hover:shadow-2xl">
                  {/* Icon Background */}
                  <div className={`w-20 h-20 ${achievement.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>
                  
                  {/* Value */}
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {achievement.value}
                  </div>
                  
                  {/* Label */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {achievement.label}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600">
                    {achievement.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        </div>
    </section>
  );
};

export default TrackRecord;