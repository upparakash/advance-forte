import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, Target, GraduationCap, Zap } from 'lucide-react';
import CoursesSection from '../components/CoursesSection';

const Courses: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Enhanced Hero Banner */}
      <section className="relative pt-20 pb-16 overflow-hidden">
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
        
        <div className="relative z-20 container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            {/* Course Icons */}
            <div className="flex justify-center gap-6 mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                <Target className="text-yellow-300" size={32} />
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                <GraduationCap className="text-green-300" size={32} />
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                <BookOpen className="text-blue-300" size={32} />
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                <Zap className="text-orange-300" size={32} />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold font-educational mb-6">
              Our <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Courses</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-200 mb-8 leading-relaxed">
              Comprehensive programs designed to prepare you for success in competitive examinations
            </p>
            
            {/* Course Categories Preview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <Target className="text-yellow-300 mx-auto mb-2" size={24} />
                <div className="text-sm font-semibold">IIT-JEE</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <GraduationCap className="text-green-300 mx-auto mb-2" size={24} />
                <div className="text-sm font-semibold">NEET</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <BookOpen className="text-blue-300 mx-auto mb-2" size={24} />
                <div className="text-sm font-semibold">Foundation</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <Zap className="text-orange-300 mx-auto mb-2" size={24} />
                <div className="text-sm font-semibold">Crash Course</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="relative">
        <div className="relative z-10">
          <CoursesSection initialCategory={selectedCategory} />
        </div>
      </div>
    </div>
  );
};

export default Courses; 