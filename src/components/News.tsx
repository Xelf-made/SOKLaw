import React, { useEffect, useRef, useState } from 'react';

const News = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [blogContent, setBlogContent] = useState<string | null>(null);
  const [selectedBlogUrl, setSelectedBlogUrl] = useState<string | null>(null);

  useEffect(() => {
    // Wait a little to ensure BlogHandy script has injected posts
    const timer = setTimeout(() => {
      const container = document.getElementById('bh-posts');
      if (!container) return;

      // Add click listener to intercept blog links
      const handleClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const anchor = target.closest('a');
        if (anchor && anchor.href && anchor.closest('#bh-posts')) {
          event.preventDefault();

          // Save blog URL and load blog content
          setSelectedBlogUrl(anchor.href);
        }
      };

      container.addEventListener('click', handleClick);

      // Cleanup on unmount
      return () => {
        container.removeEventListener('click', handleClick);
      };
    }, 1500); // 1.5 seconds delay to allow blog posts to load

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!selectedBlogUrl) return;

    // Fetch the blog post content dynamically by URL
    // NOTE: BlogHandy may not expose API for fetching post HTML directly
    // As a workaround, you could fetch the HTML and extract the post content,
    // or open in iframe, or have BlogHandy provide embed options.

    // Example: simple iframe embed for demo purposes
    setBlogContent(`<iframe src="${selectedBlogUrl}" width="100%" height="600px" frameBorder="0"></iframe>`);
  }, [selectedBlogUrl]);

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

        {/* Blog posts container */}
        <div id="bh-posts" className="blog-posts-container"></div>

        {/* Blog content modal or inline view */}
        {blogContent && (
          <div className="blog-content-modal p-6 bg-white shadow-lg rounded mt-8 max-w-4xl mx-auto relative">
            <button
              onClick={() => {
                setBlogContent(null);
                setSelectedBlogUrl(null);
              }}
              className="absolute top-4 right-4 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
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
