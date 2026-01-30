import React from 'react';
import ContactSection from '../components/ContactSection';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/5 via-purple-400/5 to-green-400/5"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Page Header */}
      <div className="relative z-10 pt-20 pb-12 bg-gradient-to-r from-blue-900 via-purple-900 to-green-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-green-300">Us</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-green-400 mx-auto mb-6"></div>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Ready to transform your academic journey? Get in touch with Advance Forte for admissions, course information, or any questions about our programs.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10">
        <ContactSection />
      </div>
    </div>
  );
};

export default Contact; 