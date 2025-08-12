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

  useEffect(() => {
    const loadBlogPost = async () => {
      try {
        setLoading(true);
        
        // Create fallback blog posts based on postId
        const postIndex = parseInt(postId || '0');
        const fallbackPosts = [
          {
            id: 'post-0',
            title: 'Understanding Corporate Law in Kenya',
            content: `
              <div class="prose prose-lg max-w-none">
                <p>Corporate law in Kenya has evolved significantly over the years, providing a robust framework for business operations and governance. Our legal team at SOK Law Associates has been at the forefront of these developments, helping businesses navigate the complex regulatory landscape.</p>
                
                <h2>Key Areas of Corporate Law</h2>
                <p>Our corporate law practice covers various aspects including:</p>
                <ul>
                  <li>Company formation and registration</li>
                  <li>Mergers and acquisitions</li>
                  <li>Corporate governance and compliance</li>
                  <li>Securities and capital markets</li>
                  <li>Joint ventures and partnerships</li>
                  <li>Corporate restructuring</li>
                </ul>
                
                <h2>Recent Developments</h2>
                <p>Recent amendments to the Companies Act have introduced new requirements for corporate transparency and accountability. These changes affect how companies report their activities and maintain their corporate records.</p>
                
                <h2>Why Choose SOK Law Associates</h2>
                <p>With over 15 years of experience in corporate law, our team has successfully handled over 200 corporate transactions. We provide strategic legal advice that goes beyond mere compliance, helping businesses achieve their commercial objectives while managing legal risks.</p>
                
                <p>For expert guidance on corporate law matters, contact our experienced team at SOK Law Associates. We're here to help your business thrive in Kenya's dynamic legal environment.</p>
              </div>
            `,
            excerpt: 'Corporate law in Kenya has evolved significantly over the years, providing a robust framework for business operations...',
            author: 'SOK Law Associates',
            date: new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }),
            image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop'
          },
          {
            id: 'post-1',
            title: 'Family Law and Succession Planning',
            content: `
              <div class="prose prose-lg max-w-none">
                <p>Family law encompasses various legal matters affecting families, including marriage, divorce, child custody, and succession planning. At SOK Law Associates, we understand that family legal matters are often emotionally challenging, and we provide compassionate, professional guidance during these difficult times.</p>
                
                <h2>Our Family Law Services</h2>
                <p>We offer comprehensive family law services including:</p>
                <ul>
                  <li>Divorce and separation proceedings</li>
                  <li>Child custody and support arrangements</li>
                  <li>Adoption procedures</li>
                  <li>Matrimonial property division</li>
                  <li>Prenuptial and postnuptial agreements</li>
                  <li>Domestic violence protection orders</li>
                </ul>
                
                <h2>Succession Planning</h2>
                <p>Proper succession planning ensures that your assets are distributed according to your wishes and provides security for your loved ones. Our succession planning services include will drafting, estate administration, and trust formation.</p>
                
                <h2>Our Approach</h2>
                <p>We believe in prioritizing the best interests of children and families in all our legal proceedings. Our approach combines legal expertise with sensitivity to the emotional aspects of family disputes.</p>
                
                <p>Contact us for confidential consultation on family law matters. Our experienced family law attorneys are here to guide you through these challenging times with professionalism and compassion.</p>
              </div>
            `,
            excerpt: 'Family law encompasses various legal matters affecting families, including marriage, divorce, child custody...',
            author: 'SOK Law Associates',
            date: new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }),
            image: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop'
          },
          {
            id: 'post-2',
            title: 'Real Estate Law and Property Transactions',
            content: `
              <div class="prose prose-lg max-w-none">
                <p>Real estate transactions require careful legal oversight to ensure proper transfer of ownership and compliance with local regulations. Kenya's property market has unique characteristics that require specialized knowledge and experience.</p>
                
                <h2>Our Real Estate Services</h2>
                <p>We provide comprehensive real estate legal services including:</p>
                <ul>
                  <li>Property purchase and sale transactions</li>
                  <li>Land title verification and searches</li>
                  <li>Conveyancing services</li>
                  <li>Lease agreement preparation and review</li>
                  <li>Property development legal support</li>
                  <li>Land dispute resolution</li>
                </ul>
                
                <h2>Property Due Diligence</h2>
                <p>Our comprehensive due diligence process protects your investment by identifying potential legal issues before they become problems. We conduct thorough searches and investigations to ensure clear title and proper documentation.</p>
                
                <h2>Conveyancing Excellence</h2>
                <p>We handle all aspects of property conveyancing, from initial searches to final registration of ownership. Our systematic approach ensures that all legal requirements are met and your interests are protected throughout the transaction.</p>
                
                <p>Trust our experienced real estate lawyers to guide you through your property transactions. With our deep understanding of Kenyan property law, we ensure your real estate investments are secure and properly documented.</p>
              </div>
            `,
            excerpt: 'Real estate transactions require careful legal oversight to ensure proper transfer of ownership...',
            author: 'SOK Law Associates',
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }),
            image: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop'
          }
        ];

        // Get the specific post or default to first one
        const selectedPost = fallbackPosts[postIndex] || fallbackPosts[0];
        setBlogPost({
          ...selectedPost,
          id: postId || '0'
        });
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