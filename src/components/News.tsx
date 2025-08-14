import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const News = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.news-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-fade-in-up');
              }, index * 100);
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

  // Initialize BlogHandy
  useEffect(() => {
    // Function to load BlogHandy script
    const loadBlogHandy = () => {
      // Check if BlogHandy is already loaded
      if (window.bh_id || document.getElementById('bloghandy-script')) {
        return;
      }

      // Set BlogHandy ID
      window.bh_id = "60HwYmcpS5PD0XNTgyMQ";

      // Create and load BlogHandy script
      const script = document.createElement('script');
      script.id = 'bloghandy-script';
      script.src = 'https://www.bloghandy.com/api/bh_blogengine.js';
      script.async = true;
      
      script.onload = () => {
        console.log('BlogHandy script loaded successfully');
        // Wait for BlogHandy to populate content, then setup click handlers
        setTimeout(() => {
          setupBlogHandyClickHandlers();
        }, 2000);
      };
      
      script.onerror = () => {
        console.error('Failed to load BlogHandy script');
      };

      document.head.appendChild(script);
    };

    loadBlogHandy();
  }, []);

  // Setup click handlers for BlogHandy posts to prevent page refresh
  const setupBlogHandyClickHandlers = () => {
    const blogContainer = document.getElementById('bh-posts');
    if (!blogContainer) {
      console.log('BlogHandy container not found');
      return;
    }

    // Function to setup handlers for all clickable elements
    const setupHandlers = () => {
      // Find all links within the BlogHandy container
      const links = blogContainer.querySelectorAll('a[href]');
      links.forEach((link, index) => {
        const anchor = link as HTMLAnchorElement;
        
        // Store original href for potential use
        const originalHref = anchor.href;
        
        // Remove the click event listeners and add our own
        const newLink = anchor.cloneNode(true) as HTMLAnchorElement;
        anchor.parentNode?.replaceChild(newLink, anchor);
        
        newLink.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          // Navigate using React Router instead of following the link
          // You can customize this navigation logic based on your needs
          navigate(`/blog/post-${index}`);
        });
      });

      // Also handle clicks on post containers that might not have links
      const posts = blogContainer.querySelectorAll('.bh-post, .post, article, .blog-post, [class*="post"], div[onclick]');
      posts.forEach((post, index) => {
        const postElement = post as HTMLElement;
        
        // Make sure it's clickable
        postElement.style.cursor = 'pointer';
        
        // Remove existing onclick handlers
        postElement.removeAttribute('onclick');
        
        // Clone to remove all existing event listeners
        const newPost = postElement.cloneNode(true) as HTMLElement;
        postElement.parentNode?.replaceChild(newPost, postElement);
        
        newPost.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          // Navigate using React Router
          navigate(`/blog/post-${index}`);
        });
      });
    };

    // Run setup immediately
    setupHandlers();

    // Also run setup after additional delays in case BlogHandy loads content dynamically
    setTimeout(setupHandlers, 1000);
    setTimeout(setupHandlers, 3000);
    setTimeout(setupHandlers, 5000);

    // Set up a MutationObserver to watch for changes in the BlogHandy container
    const observer = new MutationObserver((mutations) => {
      let shouldSetupHandlers = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // New content was added, setup handlers again
          shouldSetupHandlers = true;
        }
      });
      
      if (shouldSetupHandlers) {
        setTimeout(setupHandlers, 100);
      }
    });

    // Start observing
    observer.observe(blogContainer, {
      childList: true,
      subtree: true
    });

    // Clean up observer when component unmounts
    return () => observer.disconnect();
  };

  // Re-run click handler setup periodically to catch any dynamically loaded content
  useEffect(() => {
    const intervalId = setInterval(() => {
      const blogContainer = document.getElementById('bh-posts');
      if (blogContainer && blogContainer.children.length > 0) {
        setupBlogHandyClickHandlers();
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [navigate]);

  return (
    <section ref={sectionRef} id="news" className="py-20" style={{ backgroundColor: '#f5f5f0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-blue-900">
            Latest News & Updates
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-600">
            Stay updated with our latest legal insights, case victories, and important legal developments
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-400 mx-auto mt-6"></div>
        </div>

        {/* BlogHandy Container - displays posts as they are from BlogHandy */}
        <div className="mt-8">
          <div 
            id="bh-posts" 
            className="blog-posts-container"
          >
            {/* BlogHandy will populate this container with original posts */}
          </div>
        </div>
      </div>
    </section>
  );
};

// Declare global BlogHandy variables for TypeScript
declare global {
  interface Window {
    bh_id: string;
  }
}

export default News;