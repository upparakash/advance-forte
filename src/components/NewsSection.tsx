import React from 'react';
import { Calendar, ArrowRight, Clock, Tag, ExternalLink } from 'lucide-react';
import { NewsItem } from '../types';
import { newsData } from '../data/news';
import BlogCardList from '../pages/BlogCardList';

const NewsSection: React.FC = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  const featuredNews = newsData[0];
  const regularNews = newsData.slice(1, 4);
  const latestNews = newsData.slice(4);

  return (
    <section className="py-16">
      <BlogCardList />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Featured News */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold font-educational text-gray-900 mb-8 flex items-center">
              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm px-3 py-1 rounded-full mr-3 shadow-lg">FEATURED</span>
              Featured Story
            </h3>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-white/50">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-full">
                  <img 
                    src={featuredNews.image} 
                    alt={featuredNews.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {featuredNews.category}
                  </div>
                </div>
                <div className="p-8 lg:p-12">
                  <div className="flex items-center text-gray-600 mb-4">
                    <Calendar size={16} className="mr-2" />
                    <span className="text-sm font-body">{formatDate(featuredNews.date)}</span>
                    <span className="mx-2">•</span>
                    <Clock size={16} className="mr-2" />
                    <span className="text-sm font-body">{getTimeAgo(featuredNews.date)}</span>
                  </div>
                  
                  <h4 className="text-2xl font-bold font-educational text-gray-900 mb-4 leading-tight">
                    {featuredNews.title}
                  </h4>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed font-body">
                    {featuredNews.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <a 
                      href={`/news/${featuredNews.slug}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium font-educational transition-colors duration-200"
                    >
                      Read Full Article
                      <ArrowRight size={16} className="ml-1" />
                    </a>
                    <div className="flex items-center space-x-2">
                      <Tag size={14} className="text-gray-400" />
                      <span className="text-sm text-gray-500 font-body">{featuredNews.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Latest News Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {regularNews.map((news) => (
              <div key={news.id} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-white/50 hover:scale-105">
                <div className="relative h-48">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {news.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-gray-600 mb-3">
                    <Calendar size={14} className="mr-2" />
                    <span className="text-xs font-body">{formatDate(news.date)}</span>
                    <span className="mx-2">•</span>
                    <Clock size={14} className="mr-2" />
                    <span className="text-xs font-body">{getTimeAgo(news.date)}</span>
                  </div>
                  
                  <h5 className="text-lg font-bold font-educational text-gray-900 mb-3 line-clamp-2">
                    {news.title}
                  </h5>
                  
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3 font-body">
                    {news.excerpt}
                  </p>
                  
                  <a 
                    href={`/news/${news.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium font-educational transition-colors duration-200"
                  >
                    Read More
                    <ArrowRight size={14} className="ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* News Categories */}
          <div className="mb-12">
            <h3 className="text-xl font-bold font-educational text-gray-900 mb-6">Browse by Category</h3>
            <div className="flex flex-wrap gap-3">
              {['All News', 'Results', 'Admissions', 'Programs', 'Services', 'Events'].map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium font-educational transition-colors duration-200 ${
                    category === 'All News' 
                      ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg' 
                      : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Latest Updates List */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-white/50">
            <h3 className="text-xl font-bold font-educational text-gray-900 mb-6 flex items-center">
              <Clock size={20} className="mr-2 text-blue-600" />
              Latest Updates
            </h3>
            <div className="space-y-4">
              {latestNews.map((news) => (
                <div key={news.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white/50 transition-colors duration-200">
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                    <img 
                      src={news.image} 
                      alt={news.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center text-gray-600 mb-2">
                      <Calendar size={14} className="mr-2" />
                      <span className="text-xs font-body">{formatDate(news.date)}</span>
                      <span className="mx-2">•</span>
                      <span className="text-xs bg-gradient-to-r from-blue-100 to-green-100 text-blue-600 px-2 py-1 rounded-full font-body">
                        {news.category}
                      </span>
                    </div>
                    <h6 className="text-sm font-semibold font-educational text-gray-900 mb-1 line-clamp-2">
                      {news.title}
                    </h6>
                    <p className="text-xs text-gray-600 line-clamp-2 font-body">
                      {news.excerpt}
                    </p>
                  </div>
                  <a 
                    href={`/news/${news.slug}`}
                    className="flex-shrink-0 text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8 border border-blue-200">
            <div className="text-center">
              <h3 className="text-2xl font-bold font-educational text-gray-900 mb-4">Stay Updated</h3>
              <p className="text-gray-700 mb-6 font-body">
                Subscribe to our newsletter for the latest news, exam updates, and important announcements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-body"
                />
                <button className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-lg font-semibold font-educational hover:from-blue-700 hover:to-green-700 transition-all duration-300 shadow-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;