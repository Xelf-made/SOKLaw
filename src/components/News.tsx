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

  useEffect(() => {
    // Intercept clicks inside #bh-posts to prevent full page reload
    const container = document.getElementById('bh-posts');
    if (!container) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Find closest anchor tag if clicked inside a link
      const anchor = target.closest('a');
      if (anchor && anchor.href && anchor.href.startsWith(window.location.origin)) {
        event.preventDefault();
        const url = new URL(anchor.href);
        // Use client-side navigation instead of full reload
        // If using React Router:
        // history.push(url.pathname + url.search);
        // Or with Next.js use router.push(url.pathname)
        // Here, let's just simulate navigation without reload:
        window.history.pushState({}, '', url.pathname + url.search);
        // Optionally scroll to news section or show content dynamically here
        // Or trigger any state update to load blog content dynamically
        // For now, just prevent reload and update URL

        // If you want to scroll to the top or somewhere:
        window.scrollTo(0, 0);
      }
    };

    container.addEventListener('click', handleClick);

    return () => {
      container.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <section ref={sectionRef} id="news" className="py-20 brand-section-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Latest News & Updates
          </h2>
          <p className="text-xl max-w-3xl mx-auto animate-fade-in-delay">
            Stay updated with our latest legal insights, case victories, and important legal developments
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-600 to-yellow-500 mx-auto mt-6 animate-scale-in"></div>
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
