import React from 'react';
import NewsSection from '../components/NewsSection';

const News: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-indigo-100">
      {/* Page Header */}
      <div className="pt-20 pb-8 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-educational mb-4">
              News & <span className="text-blue-300">Updates</span>
            </h1>
            <p className="text-xl font-body text-blue-100 max-w-3xl mx-auto">
              Stay updated with the latest news, achievements, and events at Advance Forte
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative">
        {/* Decorative background elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-400/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-purple-400/10 rounded-full blur-xl"></div>
        
        <div className="relative z-10">
          <NewsSection />
        </div>
      </div>
    </div>
  );
};

export default News; 