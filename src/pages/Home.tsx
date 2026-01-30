import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, BookOpen, Target, Trophy, Star, Zap, Heart, Rocket, GraduationCap, Brain, Clock, CheckCircle, MapPin, Building } from 'lucide-react';
import gailgaonImage from '../assets/images/gailgaon.jpeg';
import scholarshipBanner from '../assets/images/scholarship-banner.png';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[80vh] text-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600">
          {/* Floating Elements */}
          <div className="absolute top-20 left-20 w-20 h-20 bg-warning-400/30 rounded-full animate-float"></div>
          <div className="absolute top-32 right-32 w-16 h-16 bg-accent-400/30 rounded-full animate-bounce-gentle"></div>
          <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-success-400/30 rounded-full animate-pulse-soft"></div>
          <div className="absolute bottom-20 right-20 w-18 h-18 bg-primary-300/30 rounded-full animate-float"></div>
          
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative z-20 px-4 max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-educational text-white mb-4 animate-slide-up">
            Advance Forte
          </h1>
          
          {/* Subtitle */}
          <div className="mb-6 animate-fade-in">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                <Target className="text-yellow-300" size={20} />
                <span className="text-white font-semibold">IIT-JEE</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                <GraduationCap className="text-green-300" size={20} />
                <span className="text-white font-semibold">NEET</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                <BookOpen className="text-blue-300" size={20} />
                <span className="text-white font-semibold">Foundation</span>
              </div>
            </div>
            <p className="text-lg md:text-xl text-primary-200 max-w-2xl mx-auto leading-relaxed mb-2">
              Premier coaching for IIT-JEE, NEET, and Foundation.
            </p>
            <p className="text-xl md:text-2xl font-semibold text-yellow-300 max-w-2xl mx-auto">
              Shaping Strong Foundations into Top Ranks
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/scholarship"
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-scale-in"
            >
              <Trophy className="mr-2 group-hover:animate-bounce text-white" size={20} />
              Scholarship
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform text-white" />
            </Link>
            <Link
              to="/contact"
              className="group inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-full shadow-xl hover:bg-white/30 hover:scale-105 transition-all duration-300 animate-scale-in"
            >
              <Users className="mr-2 group-hover:animate-pulse text-white" size={20} />
              Book Free Counselling
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform text-white" />
            </Link>
          </div>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 text-white/90 animate-fade-in">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Users className="text-yellow-300" size={20} />
              <span className="font-semibold">10,000+ Happy Students</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Trophy className="text-green-300" size={20} />
              <span className="font-semibold">98% Success Rate</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Star className="text-blue-300" size={20} />
              <span className="font-semibold">Expert Faculty</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Students & Parents Trust Advance Forte */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-educational text-gray-800 mb-4">
              Why Students & Parents Trust Advance Forte
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="group bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <GraduationCap className="text-white" size={28} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-800">
                Highly Experienced Faculty
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Learn from expert educators with years of experience in IIT-JEE and NEET coaching, known for concept clarity and mentoring.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="group bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Trophy className="text-white" size={28} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-800">
                Proven Results & Mentorship
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Personal mentors, regular mock tests, and detailed performance tracking for continuous improvement.
              </p>
            </div>
            
            {/* Card 3 */}
            <div className="group bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="text-white" size={28} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-800">
                Comprehensive Curriculum
              </h3>
              <p className="text-gray-700 leading-relaxed">
                NCERT-aligned syllabus with competitive depth, doubt sessions, and digital resources.
              </p>
            </div>
            
            {/* Card 4 */}
            <div className="group bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="text-white" size={28} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-800">
                Individual Attention
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Small batches ensuring focused guidance for every student.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scholarship Program */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Advance Forte Scholarship Program (AFSP)
              </h2>
              <div className="bg-gradient-to-r from-primary-400 to-primary-600 text-white font-bold text-lg px-4 py-2 rounded-full inline-block mb-6">
                Get up to 90% Scholarship on IIT-JEE, NEET & Foundation Courses
              </div>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                Advance Forte believes that no deserving student should miss quality education due to financial limitations. Our scholarship program is merit-based and transparent.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="text-gray-700">Scholarships up to 90%</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="text-gray-700">For Classes 8–12</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="text-gray-700">Scholarship Test</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="text-gray-700">Limited Seats Available</span>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/scholarship"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Apply for Scholarship Test
                  <ArrowRight size={18} className="ml-2" />
                </Link>
                <Link
                  to="/courses"
                  className="inline-flex items-center px-6 py-3 border-2 border-primary-500 text-primary-600 font-bold rounded-full hover:bg-primary-50 transition-all duration-300"
                >
                  Download Syllabus
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="relative">
              <img 
                src={scholarshipBanner} 
                alt="Scholarship Program" 
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-600/80 to-transparent rounded-2xl flex items-end">
                <div className="p-8 text-white">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                    <Trophy className="text-yellow-300 mb-2" size={48} />
                    <div className="text-2xl font-bold mb-1">UP TO 90%</div>
                    <div className="text-lg">Scholarship Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results & Impact Stats */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container mx-auto px-4 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-white">10,000+</div>
              <div className="text-primary-200">Students Mentored</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-white">98%</div>
              <div className="text-primary-200">Academic Success Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-white">100+</div>
              <div className="text-primary-200">Expert Faculty</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-white">Weekly</div>
              <div className="text-primary-200">Performance Tracking</div>
            </div>
          </div>
          <p className="text-primary-100 mt-8 text-sm max-w-2xl mx-auto">
            Results indicate consistent academic and competitive exam improvement.
          </p>
        </div>
      </section>

      {/* Announcements & Updates */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-educational text-gray-800 mb-4">
              Announcements & Updates
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-2xl flex-shrink-0">
                  <Building className="text-white" size={28} />
                </div>
                <div>
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-2">
                    NEW OPENING
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    Advance Forte Expands to GAILGAON
                  </h3>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-1 rounded-full">
                  <MapPin className="text-white" size={16} />
                </div>
                <h4 className="text-lg md:text-xl font-semibold text-primary-600">
                  Now Open in GAILGAON, Dibiyapur, Auraiya
                </h4>
              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                We are proud to announce the launch of our new Advance Forte centre at GAILGAON, Dibiyapur, Auraiya, bringing expert IIT-JEE, NEET, and Foundation coaching closer to aspiring students. Experience the same quality faculty, structured curriculum, and result-oriented mentoring—now in your city.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Visit New Centre
                  <ArrowRight size={18} className="ml-2" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center px-6 py-3 border-2 border-primary-500 text-primary-600 font-bold rounded-full hover:bg-primary-50 transition-all duration-300"
                >
                  Learn More
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="relative">
              <img 
                src={gailgaonImage} 
                alt="GAILGAON Centre" 
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-600/60 to-transparent rounded-2xl flex items-end">
                <div className="p-6 text-white w-full">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-full">
                        <MapPin className="text-white" size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-lg">New Centre</div>
                        <div className="text-sm">GAILGAON, Dibiyapur, Auraiya</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Counselling CTA */}
      <section className="py-16 bg-gradient-to-br from-warning-50 to-orange-50">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Confused About the Right Course for Your Child?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Talk to our academic experts and get a personalized learning roadmap.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <Users className="mr-3" size={24} />
            Book Free Counselling Session
            <ArrowRight size={24} className="ml-3" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;