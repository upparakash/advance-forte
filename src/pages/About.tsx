import React from 'react';
import AboutSection from '../components/AboutSection';
// import TeamSection from '../components/TeamSection';
import FoundersMessage from '../components/FoundersMessage';
import VisionMission from '../components/VisionMission';
import WhyAdvanceForte from '../components/WhyAdvanceForte';
import TeachingMethodology from '../components/TeachingMethodology';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-indigo-100">
      {/* Page Header */}
      <div className="pt-20 pb-8 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-educational mb-4">
              About <span className="text-blue-300">Advance Forte</span>
            </h1>
            <p className="text-xl font-body text-blue-100 max-w-3xl mx-auto">
              Learn about our journey, mission, and the values that drive Advance Forte to set new benchmarks in education and student success.
            </p>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="relative">
        {/* Decorative background elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-400/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-purple-400/10 rounded-full blur-xl"></div>
        
        <div className="relative z-10">
          <AboutSection />
          <FoundersMessage />
          <VisionMission />
          <WhyAdvanceForte />
          <TeachingMethodology />
          {/* <TeamSection /> */}
        </div>
      </div>
    </div>
  );
};

export default About; 