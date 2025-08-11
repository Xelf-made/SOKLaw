import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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

const BlogPostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Handle back navigation using browser history
  const handleBackToNews = () => {
    navigate(-1); // Uses browser history without page refresh
  };

  useEffect(() => {
    const loadBlogPost = async () => {
      try {
        setLoading(true);
        
        // Try to get the blog post from BlogHandy
        const blogContainer = document.getElementById('bh-posts');
        if (blogContainer) {
          const posts = blogContainer.querySelectorAll('.bh-post, .post, article, .blog-post');
          
          // Find the post by ID or index
          const postIndex = parseInt(postId || '0');
          const postElement = posts[postIndex];
          
          if (postElement) {
            // Extract post data
            const titleElement = postElement.querySelector('h1, h2, h3, h4, .title, .post-title, .bh-title, .blog-title');
            const contentElement = postElement.querySelector('.content, .post-content, .bh-content, p, .excerpt, .description');
            const imageElement = postElement.querySelector('img') as HTMLImageElement;
            const linkElement = postElement.querySelector('a[href]') as HTMLAnchorElement;

            const title = titleElement?.textContent?.trim() || `Blog Post ${postIndex + 1}`;
            // Get the complete original blog post content without extraction
            const content = postElement.innerHTML || contentElement?.innerHTML || contentElement?.textContent || 'Content not available';
            const image = imageElement?.src || 'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop';
            const url = linkElement?.href;

            setBlogPost({
              id: postId || '0',
              title,
              content,
              excerpt: content.substring(0, 200) + '...',
              author: 'SOK Law Associates',
              date: new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }),
              image,
              url
            });
          } else {
            // Fallback blog post
            setBlogPost({
              id: postId || '0',
              title: 'Legal Insights and Updates',
              content: `
                <div class="prose prose-lg max-w-none">
                  <p>Welcome to our legal blog where we share insights, updates, and analysis on various legal matters affecting our clients and the broader community.</p>
                  
                  <h2>Our Commitment to Legal Excellence</h2>
                  <p>At SOK Law Associates, we believe in keeping our clients and the public informed about important legal developments. Our blog serves as a platform to share our expertise and provide valuable insights on various areas of law.</p>
                  
                  <h2>Areas We Cover</h2>
                  <ul>
                    <li>Corporate Law and Business Regulations</li>
                    <li>Constitutional Law and Human Rights</li>
                    <li>Real Estate and Property Law</li>
                    <li>Family Law and Succession</li>
                    <li>Employment and Labor Relations</li>
                    <li>Criminal Defense and Litigation</li>
                  </ul>
                  
                  <h2>Stay Connected</h2>
                  <p>We regularly update our blog with fresh content, case studies, and legal analysis. Follow us to stay informed about the latest developments in Kenyan law and how they might affect you or your business.</p>
                  
                  <p>For personalized legal advice, don't hesitate to contact our experienced team of lawyers who are ready to assist you with your specific legal needs.</p>
                </div>
              `,
              excerpt: 'Welcome to our legal blog where we share insights, updates, and analysis on various legal matters...',
              author: 'SOK Law Associates',
              date: new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }),
              image: 'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop'
            });
          }
        } else {
          throw new Error('Blog container not found');
        }
      } catch (err) {
        setError('Failed to load blog post');
        console.error('Error loading blog post:', err);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPost();
  }, [postId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blog post...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !blogPost) {
    return (
      <>
        <Navbar />
        <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 mb-6">{error || 'The requested blog post could not be found.'}</p>
            <button
              onClick={handleBackToNews}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to News</span>
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <button
              onClick={handleBackToNews}
              className="inline-flex items-center text-yellow-600 hover:text-yellow-700 mb-8 transition-colors font-medium group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to News
            </button>

            <div className="mb-8">
              <img
                src={blogPost.image}
                alt={blogPost.title}
                className="w-full h-64 lg:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            <div className="flex items-center text-sm text-gray-500 mb-6">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{blogPost.date}</span>
              <User className="h-4 w-4 ml-6 mr-2" />
              <span>{blogPost.author}</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold mb-8 text-gray-900">
              {blogPost.title}
            </h1>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="bg-white rounded-lg shadow-lg p-8 lg:p-12">
            <div className="prose prose-lg max-w-none text-gray-600">
              {blogPost.content.includes('<') ? (
                // Display the complete original blog post content as-is
                <div 
                  dangerouslySetInnerHTML={{ __html: blogPost.content }}
                  className="original-blog-content"
                />
              ) : (
                <div className="text-lg leading-relaxed whitespace-pre-line">{blogPost.content}</div>
              )}
            </div>

            {blogPost.url && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <a
                  href={blogPost.url}
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
                onClick={handleBackToNews}
                className="btn-primary inline-flex items-center space-x-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to All News</span>
              </button>
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPostPage;