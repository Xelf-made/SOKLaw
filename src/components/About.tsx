import React, { useEffect, useRef, useState } from 'react';
import { Users, Award, Clock, TrendingUp } from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false); // triggers re-count

  const animateCount = (el: HTMLElement, target: number, duration = 1200) => {
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * target);
      el.innerText = value.toString();

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !sectionRef.current) return;

    const counters = sectionRef.current.querySelectorAll('.count-up');
    counters.forEach((counter) => {
      const target = Number(counter.getAttribute('data-count-to'));
      if (!isNaN(target)) {
        animateCount(counter as HTMLElement, target, 1500);
      }
    });
  }, [visible]);

  const stats = [
    { icon: Clock, label: 'Years of Experience', value: 15, color: 'text-blue-600' },
    { icon: Award, label: 'Cases Won', value: 500, color: 'text-green-600' },
    { icon: Users, label: 'Satisfied Clients', value: 1000, color: 'text-purple-600' },
    { icon: TrendingUp, label: 'Success Rate (%)', value: 98, color: 'text-orange-600' },
  ];

  return (
    <section ref={sectionRef} id="about" className="py-20 brand-section-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="animate-on-scroll opacity-0 text-4xl md:text-5xl font-bold mb-6">
            About SOK Law Associates
          </h2>
          <div className="animate-on-scroll opacity-0 w-24 h-1 bg-gradient-to-r from-yellow-600 to-yellow-500 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="animate-on-scroll opacity-0 relative">
            <img
              loading="lazy"
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
              alt="SOK Law Associates Team"
              className="about-img shadow-2xl transform hover:scale-105 transition-transform duration-500 rounded-2xl"
            />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full opacity-20"></div>
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-blue-800 to-blue-900 rounded-full opacity-20"></div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="animate-on-scroll opacity-0">
              <h3 className="text-2xl font-bold mb-4">
                Excellence in Legal Practice Since 2009
              </h3>
              <p className="text-lg leading-relaxed mb-6">
                SOK Law Associates has been at the forefront of legal practice in Kenya,
                providing comprehensive legal solutions to individuals, corporations, and
                institutions. Our commitment to excellence, integrity, and client satisfaction
                has made us one of the most trusted law firms in the region.
              </p>
              <p className="text-lg leading-relaxed">
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
                  <div
                    key={index}
                    className="animate-on-scroll opacity-0 modern-card p-6 transform hover:-translate-y-1"
                  >
                    <IconComponent className={`h-8 w-8 ${stat.color} mb-3`} />
                    <div
                      className="text-2xl font-bold mb-1 count-up"
                      data-count-to={stat.value}
                    >
                      0
                    </div>
                    <div className="text-sm">{stat.label}</div>
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
