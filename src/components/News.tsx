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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.postId) {
        const post = blogPosts.find(p => p.id === event.state.postId);
        setSelectedPost(post || null);
      } else {
        setSelectedPost(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [blogPosts]);

  // Extract blog posts from BlogHandy when they load
  useEffect(() => {
    const extractBlogPosts = () => {
      const blogContainer = document.getElementById('bh-posts');
      if (blogContainer && blogContainer.children.length > 0) {
        const posts: BlogPost[] = [];
        
        Array.from(blogContainer.children).forEach((postElement, index) => {
          const titleElement = postElement.querySelector('.bh-post-title');
          const contentElement = postElement.querySelector('.bh-post-content');
          const imageElement = postElement.querySelector('.bh-post-image') as HTMLImageElement;
          const linkElement = postElement.querySelector('a[href]') as HTMLAnchorElement;
          
          if (titleElement && contentElement) {
            const post: BlogPost = {
              id: `post-${index}`,
              title: titleElement.textContent || 'Untitled',
              content: contentElement.innerHTML || '',
              excerpt: contentElement.textContent?.substring(0, 150) + '...' || '',
              author: 'SOK Law Team',
              date: new Date().toLocaleDateString(),
              image: imageElement?.src,
              url: linkElement?.href
            };
            posts.push(post);
          }
        });
        
        setBlogPosts(posts);
      }
    };

    // Check for BlogHandy posts periodically until they load
    const checkInterval = setInterval(() => {
      const blogContainer = document.getElementById('bh-posts');
      if (blogContainer && blogContainer.children.length > 0) {
        extractBlogPosts();
        clearInterval(checkInterval);
      }
    }, 500);

    // Clear interval after 10 seconds to prevent infinite checking
    setTimeout(() => clearInterval(checkInterval), 10000);

    return () => clearInterval(checkInterval);
  }, []);

  const handlePostClick = (post: BlogPost, event: React.MouseEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate loading delay for smooth transition
    setTimeout(() => {
      setSelectedPost(post);
      setLoading(false);
      
      // Update browser history
      const newUrl = `${window.location.pathname}#post-${post.id}`;
      window.history.pushState(
        { postId: post.id }, 
        post.title, 
        newUrl
      );
      
      // Scroll to top of news section
      sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const handleBackToList = () => {
    setSelectedPost(null);
    setLoading(false);
    setError(null);
    
    // Update browser history
    window.history.pushState(null, 'News', window.location.pathname);
    
    // Scroll to top of news section
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderBlogList = () => (
    <>
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in text-brand-navy">
          Latest News & Updates
        </h2>
        <p className="text-xl max-w-3xl mx-auto animate-fade-in-delay text-brand-gray">
          Stay updated with our latest legal insights, case victories, and important legal developments
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-brand-gold to-brand-gold-light mx-auto mt-6 animate-scale-in"></div>
      </div>

      {/* Custom Blog Posts if available */}
      {blogPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className="news-card opacity-0 modern-card overflow-hidden cursor-pointer transform hover:-translate-y-2 transition-all duration-300 group"
              onClick={(e) => handlePostClick(post, e)}
            >
              {post.image && (
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center text-sm text-brand-gray mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{post.date}</span>
                  <User className="h-4 w-4 ml-4 mr-2" />
                  <span>{post.author}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-brand-navy group-hover:text-brand-gold transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-brand-gray mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center text-brand-gold font-semibold group-hover:text-brand-gold-dark transition-colors">
                  <span>Read More</span>
                  <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* BlogHandy Blog Posts Container */}
      <div className="animate-fade-in-up">
        <div id="bh-posts" className="blog-posts-container"></div>
      </div>
    </>
  );

  const renderBlogPost = (post: BlogPost) => (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={handleBackToList}
        className="inline-flex items-center text-brand-gold hover:text-brand-gold-dark mb-8 transition-colors font-medium group"
      >
        <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to News
      </button>

      {/* Blog Post Content */}
      <article className="modern-card p-8 lg:p-12">
        {post.image && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 lg:h-96 object-cover"
            />
          </div>
        )}

        <div className="flex items-center text-sm text-brand-gray mb-6">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{post.date}</span>
          <User className="h-4 w-4 ml-6 mr-2" />
          <span>{post.author}</span>
        </div>

        <h1 className="text-3xl lg:text-4xl font-bold mb-8 text-brand-navy">
          {post.title}
        </h1>

        <div 
          className="prose prose-lg max-w-none text-brand-gray"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {post.url && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-brand-gold hover:text-brand-gold-dark transition-colors font-medium"
            >
              <span>Read Original Article</span>
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </div>
        )}
      </article>
    </div>
  );

  const renderLoadingState = () => (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
      <span className="ml-4 text-brand-gray">Loading article...</span>
    </div>
  );

  const renderErrorState = () => (
    <div className="text-center py-20">
      <div className="text-red-600 mb-4">
        <span className="text-lg">Failed to load article</span>
      </div>
      <button
        onClick={handleBackToList}
        className="btn-primary"
      >
        Back to News
      </button>
    </div>
  );

  return (
    <section ref={sectionRef} id="news" className="py-20 brand-section-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading && renderLoadingState()}
        {error && renderErrorState()}
        {!loading && !error && (
          selectedPost ? renderBlogPost(selectedPost) : renderBlogList()
        )}
      </div>
    </section>
  );
};

export default News;