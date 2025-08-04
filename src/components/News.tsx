import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Calendar, User, ExternalLink } from 'lucide-react';

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
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
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

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      if (event.state?.postId && blogPosts.length > 0) {
        const post = blogPosts.find(p => p.id === event.state.postId);
        if (post) {
          setSelectedPost(post);
        }
      } else {
        setSelectedPost(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [blogPosts]);

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
    
    setIsTransitioning(true);
    setSelectedPost(post);
    
    const newUrl = `${window.location.pathname}${window.location.search}#post-${post.id}`;
    window.history.pushState(
      { postId: post.id }, 
      post.title, 
      newUrl
    );
    
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleBackToList = (event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    setIsTransitioning(true);
    setSelectedPost(null);
    
    const baseUrl = `${window.location.pathname}${window.location.search}`;
    window.history.pushState(null, 'News', baseUrl);
    
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const renderBlogList = () => (
    <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-blue-900">
          Latest News & Updates
        </h2>
        <p className="text-xl max-w-3xl mx-auto text-gray-600">
          Stay updated with our latest legal insights, case victories, and important legal developments
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-400 mx-auto mt-6"></div>
      </div>



      {/* BlogHandy Container - Now visible for debugging */}
      <div className="mt-8">
        <div 
          id="bh-posts" 
          className="blog-posts-container min-h-[50px]"
          onClick={(e) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a');
            if (link) {
              e.preventDefault();
            }
          }}
        >
          {/* BlogHandy will populate this container */}
        </div>
      </div>
    </div>
  );

  const renderBlogPost = (post: BlogPost) => (
    <div className={`max-w-4xl mx-auto transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
      <button
        onClick={handleBackToList}
        className="inline-flex items-center text-yellow-600 hover:text-yellow-700 mb-8 transition-colors font-medium group bg-transparent border-none cursor-pointer"
        type="button"
      >
        <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to News
      </button>

      <article className="bg-white rounded-lg shadow-lg p-8 lg:p-12">
        <div className="mb-8 rounded-lg overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 lg:h-96 object-cover"
            loading="lazy"
          />
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{post.date}</span>
          <User className="h-4 w-4 ml-6 mr-2" />
          <span>{post.author}</span>
        </div>

        <h1 className="text-3xl lg:text-4xl font-bold mb-8 text-blue-900">
          {post.title}
        </h1>

        <div className="prose prose-lg max-w-none text-gray-600">
          {post.content.includes('<') ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <div className="text-lg leading-relaxed whitespace-pre-line">{post.content}</div>
          )}
        </div>

        {post.url && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-yellow-600 hover:text-yellow-700 transition-colors font-medium"
            >
              <span>Read Original Article</span>
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <button
            onClick={handleBackToList}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center space-x-2 transition-colors"
            type="button"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to All News</span>
          </button>
        </div>
      </article>
    </div>
  );

  return (
    <section ref={sectionRef} id="news" className="py-20" style={{ backgroundColor: '#f5f5f0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {selectedPost ? renderBlogPost(selectedPost) : renderBlogList()}
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