import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  image?: string;
  url?: string;
}

const News = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogHandyLoaded, setBlogHandyLoaded] = useState(false);

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

  // Initialize BlogHandy and extract posts
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
        setBlogHandyLoaded(true);
        console.log('BlogHandy script loaded successfully');
      };
      
      script.onerror = () => {
        console.error('Failed to load BlogHandy script');
      };

      document.head.appendChild(script);
    };

    // Function to extract blog posts from BlogHandy
    const extractBlogPosts = () => {
      const blogContainer = document.getElementById('bh-posts');
      
      if (!blogContainer) {
        console.log('BlogHandy container not found');
        return false;
      }

      // Check if BlogHandy has populated the container
      const posts = blogContainer.querySelectorAll('.bh-post, .post, article, .blog-post');
      
      if (posts.length === 0) {
        // Also check for any child elements that might contain posts
        const allChildren = blogContainer.children;
        if (allChildren.length === 0) {
          console.log('BlogHandy container is empty, waiting...');
          return false;
        }
      }

      console.log(`Found ${posts.length || blogContainer.children.length} potential blog posts`);

      const extractedPosts: BlogPost[] = [];
      const elementsToProcess = posts.length > 0 ? posts : blogContainer.children;

      Array.from(elementsToProcess).forEach((postElement, index) => {
        // Try multiple selectors for title
        const titleElement = postElement.querySelector('h1, h2, h3, h4, .title, .post-title, .bh-title, .blog-title') ||
                           postElement.querySelector('[class*="title"], [class*="heading"]');
        
        // Try multiple selectors for content
        const contentElement = postElement.querySelector('.content, .post-content, .bh-content, p, .excerpt, .description') ||
                             postElement.querySelector('[class*="content"], [class*="excerpt"], [class*="description"]');
        
        // Try to find images
        const imageElement = postElement.querySelector('img') as HTMLImageElement;
        
        // Try to find links
        const linkElement = postElement.querySelector('a[href]') as HTMLAnchorElement;

        // Extract text content
        const title = titleElement?.textContent?.trim() || 
                     titleElement?.innerHTML?.replace(/<[^>]*>/g, '').trim() ||
                     `Blog Post ${index + 1}`;
        
        const content = contentElement?.innerHTML || 
                       contentElement?.textContent || 
                       postElement.textContent || 
                       'Content not available';

      });

      return false;
    };
  }, []);

  const handlePostClick = (post: BlogPost, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Navigate to dedicated blog post page using client-side routing
    navigate(`/blog/${post.id}`);
  };

  const renderBlogList = () => (
    <div>
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-blue-900">
          Latest News & Updates
        </h2>
        <p className="text-xl max-w-3xl mx-auto text-gray-600">
          Stay updated with our latest legal insights, case victories, and important legal developments
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-400 mx-auto mt-6"></div>
      </div>



      {/* BlogHandy Container */}
      <div className="mt-8">
        <div 
          id="bh-posts" 
          className="blog-posts-container"
          onClick={(e) => {
            const target = e.target as HTMLElement;
            const postElement = target.closest('.bh-post, .post, article, .blog-post');
            if (postElement) {
              e.preventDefault();
              e.stopPropagation();
              
              // Get the index of the clicked post
              const allPosts = document.querySelectorAll('#bh-posts .bh-post, #bh-posts .post, #bh-posts article, #bh-posts .blog-post');
              const postIndex = Array.from(allPosts).indexOf(postElement as Element);
              
              // Navigate to blog post page using client-side routing
              navigate(`/blog/${postIndex}`);
            }
          }}
        >
          {/* BlogHandy will populate this container */}
        </div>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} id="news" className="py-20" style={{ backgroundColor: '#f5f5f0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderBlogList()}
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