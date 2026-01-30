import React from 'react';
import { Download, FileText, BookOpen } from 'lucide-react';

const Syllabus: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Course <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">Syllabus</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Download comprehensive syllabus for IIT-JEE, NEET, and Foundation courses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* IIT-JEE Syllabus */}
          <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 p-8 hover:scale-105 transition-all duration-300">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <FileText className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">IIT-JEE Syllabus</h3>
              <p className="text-gray-600 mb-6">Complete syllabus for JEE Main & Advanced preparation</p>
              <a
                href="/Scholarship Test Syllabus/IIT-JEE-Syllabus-Advance-Forte.pdf"
                download="IIT-JEE-Syllabus-Advance-Forte.pdf"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <Download size={20} className="mr-2" />
                Download PDF
              </a>
            </div>
          </div>

          {/* NEET Syllabus */}
          <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 p-8 hover:scale-105 transition-all duration-300">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <BookOpen className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">NEET Syllabus</h3>
              <p className="text-gray-600 mb-6">Comprehensive syllabus for NEET medical entrance exam</p>
              <a
                href="/Scholarship Test Syllabus/NEET-Syllabus-Advance-Forte.pdf"
                download="NEET-Syllabus-Advance-Forte.pdf"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <Download size={20} className="mr-2" />
                Download PDF
              </a>
            </div>
          </div>

          {/* Foundation Syllabus */}
          <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 p-8 hover:scale-105 transition-all duration-300">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <FileText className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Foundation Syllabus</h3>
              <p className="text-gray-600 mb-6">Foundation course syllabus for Classes 8-10</p>
              <a
                href="/Scholarship Test Syllabus/Foundation-Syllabus-Advance-Forte.pdf"
                download="Foundation-Syllabus-Advance-Forte.pdf"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <Download size={20} className="mr-2" />
                Download PDF
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-green-500/10 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Need More Information?</h3>
            <p className="text-gray-600 mb-6">Contact our academic counselors for detailed course information</p>
            <a
              href="https://wa.me/918853123199?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20the%20syllabus"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
            >
              Contact Counselor
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Syllabus;