import React, { useEffect, useRef, useState } from 'react';
import { Trophy, DollarSign, Scale, TrendingUp } from 'lucide-react';

const TrackRecord = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [startCount, setStartCount] = useState(false);

  const achievements = [
    {
      icon: Trophy,
      value: 500,
      suffix: '+',
      label: 'Cases Won',
      description: 'Successfully resolved legal matters',
      color: 'bg-gradient-to-br from-yellow-400 to-orange-500'
    },
    {
      icon: DollarSign,
      value: 50,
      suffix: 'B+',
      prefix: 'KSh ',
      label: 'Value Secured',
      description: 'Total value recovered for clients',
      color: 'bg-gradient-to-br from-green-400 to-blue-500'
    },
    {
      icon: Scale,
      value: 25,
      suffix: '+',
      label: 'Landmark Cases',
      description: 'Precedent-setting legal victories',
      color: 'bg-gradient-to-br from-purple-400 to-pink-500'
    },
    {
      icon: TrendingUp,
      value: 98,
      suffix: '%',
      label: 'Success Rate',
      description: 'Exceptional track record',
      color: 'bg-gradient-to-br from-blue-400 to-indigo-500'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStartCount(true);
            const cards = entry.target.querySelectorAll('.track-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-fade-in-up');
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Count up animation
  const useCountUp = (end: number, duration = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!startCount) return;

      let start = 0;
      const step = Math.ceil(end / (duration / 16));
      const interval = setInterval(() => {
        start += step;
        if (start >= end) {
          setCount(end);
          clearInterval(interval);
        } else {
          setCount(start);
        }
      }, 16);

      return () => clearInterval(interval);
    }, [end, startCount]);

    return count;
  };

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Our Track Record
          </h2>
          <p className="text-xl max-w-3xl mx-auto animate-fade-in-delay">
            Numbers that speak to our commitment to excellence and our clients' success
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-600 to-yellow-500 mx-auto mt-6 animate-scale-in"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            const count = useCountUp(achievement.value);

            return (
              <div
                key={index}
                className="track-card opacity-0 relative group"
              >
                <div className="modern-card p-8 text-center transform hover:-translate-y-2 transition-all duration-500 group-hover:shadow-2xl">
                  <div className={`w-20 h-20 ${achievement.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>

                  <div className="text-4xl font-bold mb-2">
                    {achievement.prefix || ''}
                    {count}
                    {achievement.suffix || ''}
                  </div>

                  <h3 className="text-xl font-semibold mb-3">
                    {achievement.label}
                  </h3>

                  <p>{achievement.description}</p>
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
