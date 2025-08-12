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
        // Wait a bit for BlogHandy to populate content, then extract posts
        setTimeout(() => {
          extractBlogPosts();
        }, 2000);
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
          console.log('BlogHandy container is empty, creating fallback posts...');
          createFallbackPosts();
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
                     `Legal Insights ${index + 1}`;
        
        const content = postElement.innerHTML || 
                       contentElement?.innerHTML || 
                       contentElement?.textContent || 
                       'Stay updated with our latest legal insights and case developments.';

        const image = imageElement?.src || 'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop';
        const url = linkElement?.href;

        extractedPosts.push({
          id: `post-${index}`,
          title,
          content,
          excerpt: content.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
          author: 'SOK Law Associates',
          date: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          image,
          url
        });
      });

      if (extractedPosts.length > 0) {
        setBlogPosts(extractedPosts);
      } else {
        createFallbackPosts();
      }

      return true;
    };

    // Create fallback posts if BlogHandy fails
    const createFallbackPosts = () => {
      const fallbackPosts: BlogPost[] = [
        {
          id: 'post-0',
          title: 'Understanding Corporate Law in Kenya',
          content: `
            <div class="prose prose-lg max-w-none">
              <p>Corporate law in Kenya has evolved significantly over the years, providing a robust framework for business operations and governance.</p>
              
              <h2>Key Areas of Corporate Law</h2>
              <p>Our corporate law practice covers various aspects including company formation, mergers and acquisitions, corporate governance, and compliance matters.</p>
              
              <h2>Recent Developments</h2>
              <p>Recent amendments to the Companies Act have introduced new requirements for corporate transparency and accountability.</p>
              
              <p>For expert guidance on corporate law matters, contact our experienced team at SOK Law Associates.</p>
            </div>
          `,
          excerpt: 'Corporate law in Kenya has evolved significantly over the years, providing a robust framework for business operations...',
          author: 'SOK Law Associates',
          date: new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
        },
        {
          id: 'post-1',
          title: 'Family Law and Succession Planning',
          content: `
            <div class="prose prose-lg max-w-none">
              <p>Family law encompasses various legal matters affecting families, including marriage, divorce, child custody, and succession planning.</p>
              
              <h2>Succession Planning</h2>
              <p>Proper succession planning ensures that your assets are distributed according to your wishes and provides security for your loved ones.</p>
              
              <h2>Our Approach</h2>
              <p>We provide compassionate and professional legal services for families going through difficult times, always prioritizing the best interests of children and families.</p>
              
              <p>Contact us for confidential consultation on family law matters.</p>
            </div>
          `,
          excerpt: 'Family law encompasses various legal matters affecting families, including marriage, divorce, child custody...',
          author: 'SOK Law Associates',
          date: new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          image: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
        },
        {
          id: 'post-2',
          title: 'Real Estate Law and Property Transactions',
          content: `
            <div class="prose prose-lg max-w-none">
              <p>Real estate transactions require careful legal oversight to ensure proper transfer of ownership and compliance with local regulations.</p>
              
              <h2>Property Due Diligence</h2>
              <p>Our comprehensive due diligence process protects your investment by identifying potential legal issues before they become problems.</p>
              
              <h2>Conveyancing Services</h2>
              <p>We handle all aspects of property conveyancing, from initial searches to final registration of ownership.</p>
              
              <p>Trust our experienced real estate lawyers to guide you through your property transactions.</p>
            </div>
          `,
          excerpt: 'Real estate transactions require careful legal oversight to ensure proper transfer of ownership...',
          author: 'SOK Law Associates',
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          image: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
        }
      ];
      
      setBlogPosts(fallbackPosts);
    };

    // Also try to extract posts after a delay in case BlogHandy loads slowly
    const timeoutId = setTimeout(() => {
      if (blogPosts.length === 0) {
        extractBlogPosts();
      }
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [blogPosts.length]);

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