import React, { useEffect, useRef } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

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

  const newsItems = [
    {
      title: 'SOK Law Associates Wins Major Corporate Dispute',
      category: 'Corporate Law',
      excerpt: 'Our team successfully represented a multinational corporation in a complex commercial dispute, securing a favorable settlement worth KSh 2.5 billion.',
      image: 'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      date: 'March 15, 2024',
      readTime: '5 min read',
      categoryColor: 'bg-blue-100 text-blue-800'
    },
    {
      title: 'Landmark Constitutional Case Victory',
      category: 'Constitutional Law',
      excerpt: 'Setting a new legal precedent, we successfully challenged unconstitutional legislation in the High Court, protecting citizens\' fundamental rights.',
      image: 'https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      date: 'March 10, 2024',
      readTime: '7 min read',
      categoryColor: 'bg-purple-100 text-purple-800'
    },
    {
      title: 'Real Estate Development Deal Completion',
      category: 'Real Estate',
      excerpt: 'We facilitated the largest real estate transaction in Nairobi this year, overseeing the legal aspects of a KSh 8 billion development project.',
      image: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      date: 'March 5, 2024',
      readTime: '4 min read',
      categoryColor: 'bg-green-100 text-green-800'
    }
  ];

  return (
    <section ref={sectionRef} id="news" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in" style={{ color: '#000000' }}>
            Latest News & Case Wins
          </h2>
          <p className="text-xl max-w-3xl mx-auto animate-fade-in-delay" style={{ color: '#333333' }}>
            Stay updated with our recent legal victories, industry insights, and important legal developments
          </p>
          <div className="w-24 h-1 bg-gray-800 mx-auto mt-6 animate-scale-in"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <article
              key={index}
              className="news-card opacity-0 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 group"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="news-img group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${item.categoryColor}`}>
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-gray-600 transition-colors duration-300" style={{ color: '#000000' }}>
                  {item.title}
                </h3>
                <p className="mb-4 line-clamp-3" style={{ color: '#333333' }}>
                  {item.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm mb-4" style={{ color: '#666666' }}>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{item.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Read More Button */}
                <button className="group/btn flex items-center space-x-2 font-medium transition-colors" style={{ color: '#1E3A8A' }}>
                  <span>Read More</span>
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* View All News Button */}
        <div className="text-center mt-12">
          <button className="btn-primary transform hover:scale-105 shadow-lg animate-fade-in">
            View All News
          </button>
        </div>
      </div>
    </section>
  );
};

export default News;