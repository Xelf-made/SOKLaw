import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const News = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);
  const [blogContent, setBlogContent] = useState<string | null>(null);

  // Animation effect omitted for brevity...

  useEffect(() => {
    const container = document.getElementById('bh-posts');
    if (!container) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.href) {
        event.preventDefault();

        // Extract slug or id from URL - customize based on your URLs
        const url = new URL(anchor.href);
        const slug = url.pathname.split('/').pop();

        if (slug) {
          setSelectedBlogSlug(slug);
          // Change URL without reload - SPA navigation
          navigate(`/news/${slug}`);
        }
      }
    };

    container.addEventListener('click', handleClick);

    return () => {
      container.removeEventListener('click', handleClick);
    };
  }, [navigate]);

  // Fetch blog content based on slug (simulate API call)
  useEffect(() => {
    if (!selectedBlogSlug) return;

    // Replace with real API call or BlogHandy API
    async function fetchBlog() {
      // Example: fetch(`/api/blog/${selectedBlogSlug}`).then...
      // For demo, simulate content:
      const simulatedContent = `<h2>Blog: ${selectedBlogSlug}</h2><p>This is the blog content loaded dynamically.</p>`;
      setBlogContent(simulatedContent);
    }

    fetchBlog();
  }, [selectedBlogSlug]);

  return (
    <section ref={sectionRef} id="news" className="py-20 brand-section-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading and description */}

        {/* Blog posts container */}
        <div id="bh-posts" className="blog-posts-container" />

        {/* Blog content modal or section */}
        {blogContent && (
          <div className="blog-content-modal p-6 bg-white shadow-lg rounded mt-8 max-w-4xl mx-auto">
            <button onClick={() => setBlogContent(null)} className="mb-4">
              Close
            </button>
            <div dangerouslySetInnerHTML={{ __html: blogContent }} />
          </div>
        )}
      </div>
    </section>
  );
};

export default News;
