import React, { useEffect, useRef } from 'react';

const News = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.news-card');
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

  return (
    <section ref={sectionRef} id="news" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in" style={{ color: '#000000' }}>
            Latest News & Updates
          </h2>
          <p className="text-xl max-w-3xl mx-auto animate-fade-in-delay" style={{ color: '#333333' }}>
            Stay updated with our latest legal insights, case victories, and important legal developments
          </p>
          <div className="w-24 h-1 bg-gray-800 mx-auto mt-6 animate-scale-in"></div>
        </div>

        {/* BlogHandy Blog Posts Container */}
        <div className="animate-fade-in-up">
          <div id="bh-posts" className="blog-posts-container"></div>
        </div>
      </div>
    </section>
  );
};

export default News;